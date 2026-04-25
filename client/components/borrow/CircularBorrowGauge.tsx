import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, LayoutChangeEvent } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export type CircularBorrowGaugeProps = {
  min: number;
  max: number;
  value: number;
  maxCreditLine: { leadPurple: string; amountMuted: string };
  accentColor: string;
  mutedColor: string;
  textPrimary: string;
  trackColor: string;
};

function clamp(n: number, lo: number, hi: number) {
  "worklet";
  return Math.min(hi, Math.max(lo, n));
}

/** 0° = +x (right), 90° = +y (down), per React Native coords */
function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

/** Figma-like donut segment: 270° visible arc, 90° gap centered at bottom. */
const ARC_START_ANGLE = 135;
const ARC_SWEEP_ANGLE = 270;

function valueToAngle(value: number, min: number, max: number) {
  "worklet";
  const t = clamp((value - min) / (max - min), 0, 1);
  return ARC_START_ANGLE + t * ARC_SWEEP_ANGLE;
}

const TRACK_STROKE = 42;
const THUMB_DIAMETER = 54;
const THUMB_RADIUS = THUMB_DIAMETER / 2;

export function CircularBorrowGauge({
  min,
  max,
  value,
  maxCreditLine,
  accentColor,
  mutedColor,
  textPrimary,
  trackColor,
}: CircularBorrowGaugeProps) {
  const [w, setW] = useState(0);
  const progressAnimation = useSharedValue(0);

  const width = Math.max(w, 300);
  const size = Math.min(width - 8, 264);
  const left = (width - size) / 2;
  const cx = left + size / 2;
  const cy = size / 2;
  const r = (size - TRACK_STROKE) / 2;

  const { height, circumference, visibleArc, gapArc, progressArc, pStart, pEnd, labelCenterY } =
    useMemo(() => {
      const circum = 2 * Math.PI * r;
      const visible = circum * (ARC_SWEEP_ANGLE / 360);
      const gap = circum - visible;
      const progressRatio = clamp((value - min) / (max - min), 0, 1);
      const start = polar(cx, cy, r, ARC_START_ANGLE);
      const end = polar(cx, cy, r, ARC_START_ANGLE + ARC_SWEEP_ANGLE);
      return {
        height: start.y + TRACK_STROKE / 2 + 54,
        circumference: circum,
        visibleArc: visible,
        gapArc: gap,
        progressArc: visible * progressRatio,
        pStart: start,
        pEnd: end,
        labelCenterY: cy + 4,
      };
    }, [cx, cy, r, value, min, max]);

  const onLayout = (e: LayoutChangeEvent) => {
    setW(e.nativeEvent.layout.width);
  };

  useEffect(() => {
    progressAnimation.value = 0;
    progressAnimation.value = withTiming(1, {
      duration: 900,
      easing: Easing.out(Easing.cubic),
    });
  }, [progressAnimation, value, min, max, cx, cy, r]);

  const progressCircleProps = useAnimatedProps(() => {
    "worklet";
    return {
      strokeDasharray: `${progressArc * progressAnimation.value} ${circumference}`,
      strokeDashoffset: 0,
    };
  });

  const thumbStyle = useAnimatedStyle(() => {
    "worklet";
    const targetAngle = valueToAngle(value, min, max);
    const angle =
      ARC_START_ANGLE +
      (targetAngle - ARC_START_ANGLE) * progressAnimation.value;
    const rad = (angle * Math.PI) / 180;
    return {
      position: "absolute",
      left: cx + r * Math.cos(rad) - THUMB_RADIUS,
      top: cy + r * Math.sin(rad) - THUMB_RADIUS,
      width: THUMB_DIAMETER,
      height: THUMB_DIAMETER,
      borderRadius: THUMB_RADIUS,
      backgroundColor: "#FFFFFF",
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: "rgba(0,0,0,0.06)",
      zIndex: 4,
    };
  }, [cx, cy, r, value, min, max]);

  return (
    <View onLayout={onLayout}>
      <View style={[styles.gaugeFrame, { width, height }]}>
        <Svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          style={StyleSheet.absoluteFill}
        >
          <Circle
            stroke={trackColor}
            strokeWidth={TRACK_STROKE}
            strokeLinecap="round"
            fill="none"
            cx={cx}
            cy={cy}
            r={r}
            transform={`rotate(${ARC_START_ANGLE}, ${cx}, ${cy})`}
            strokeDasharray={`${visibleArc} ${gapArc}`}
            strokeDashoffset={0}
          />
          <AnimatedCircle
            stroke={accentColor}
            strokeWidth={TRACK_STROKE}
            strokeLinecap="round"
            fill="none"
            cx={cx}
            cy={cy}
            r={r}
            transform={`rotate(${ARC_START_ANGLE}, ${cx}, ${cy})`}
            animatedProps={progressCircleProps}
          />
        </Svg>

        <View
          pointerEvents="none"
          style={[
            styles.centerCluster,
            {
              left: 0,
              right: 0,
              top: labelCenterY - 44,
            },
          ]}
        >
          <Text style={[styles.amount, { color: textPrimary }]}>
            ${value}
          </Text>
          <Text style={styles.maxLine}>
            <Text style={{ color: accentColor, fontFamily: "generalSemiBold" }}>
              {maxCreditLine.leadPurple}
            </Text>
            <Text style={{ color: mutedColor, fontFamily: "generalRegular" }}>
              {" "}
              {maxCreditLine.amountMuted}
            </Text>
          </Text>
        </View>

        <Animated.View style={thumbStyle} />

        <Text
          style={[
            styles.endLabel,
            {
              color: mutedColor,
              position: "absolute",
              left: pStart.x - 20,
              top: pStart.y + TRACK_STROKE / 2 + 18,
            },
          ]}
        >
          ${min}
        </Text>
        <Text
          style={[
            styles.endLabel,
            {
              color: mutedColor,
              position: "absolute",
              left: pEnd.x - 30,
              top: pEnd.y + TRACK_STROKE / 2 + 18,
            },
          ]}
        >
          ${max}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gaugeFrame: {
    alignSelf: "center",
    position: "relative",
  },
  centerCluster: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  amount: {
    fontSize: 44,
    fontFamily: "generalSemiBold",
    letterSpacing: -1.8,
  },
  maxLine: {
    marginTop: 2,
    fontSize: 16,
    textAlign: "center",
  },
  endLabel: {
    fontSize: 16,
    fontFamily: "generalMedium",
  },
});
