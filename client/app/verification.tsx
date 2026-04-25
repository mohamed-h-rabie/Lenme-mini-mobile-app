import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react-native";
import { OtpInput } from "react-native-otp-entry";
import useVerificate from "@/hooks/useVerificate";
import useResendOTP from "@/hooks/useResendOTP";
import useVerificateResetPassword from "@/hooks/useVerificateResetPassword";
import { useVerificationEmail } from "@/hooks/useVerificationEmail";
import useTheme from "@/hooks/useTheme";
import { Colors } from "@/constants/theme";
import { getAxiosErrorMessage } from "@/utils/axiosError";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";

const Verification = () => {
  const { theme } = useTheme();
  const c = theme.dark ? Colors.dark : Colors.light;
  const route = useRoute<RouteProp<RootStackParamList, "Verification">>();
  const type = route.params?.type;
  const { email } = useVerificationEmail();
  const [otp, setOtp] = useState("");
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { mutate: verificate, isPending, error: verifyError } = useVerificate();
  const { mutate: verificateResetPassword, isPending: isPendingResetPassword, error: resetVerifyError } =
    useVerificateResetPassword();
  const { mutate: resendCode, error: resendError } = useResendOTP();

  const errorMessage =
    verifyError != null
      ? getAxiosErrorMessage(verifyError)
      : resetVerifyError != null
        ? getAxiosErrorMessage(resetVerifyError)
        : resendError != null
          ? getAxiosErrorMessage(resendError)
          : null;

  return (
    <View
      style={{
        backgroundColor: c.background.primary,
        flex: 1,
        paddingHorizontal: 24,
        gap: 16,
        paddingTop: 59,
      }}
    >
      <ArrowLeft
        onPress={() => navigation.goBack()}
        size={24}
        color={c.text.primary}
        strokeWidth={3}
      />
      <View>
        <Text style={[styles.headerText, { color: c.text.primary }]}>Enter 6 Digit Code</Text>
        <Text style={[styles.secondaryText, { color: c.text.secondary }]}>
          Enter 6 digit code that your receive on your email ({email}).
        </Text>
      </View>
      <OtpInput
        numberOfDigits={6}
        onTextChange={(text) => {
          setOtp(text);
        }}
        theme={{
          pinCodeTextStyle: { ...styles.pinCodeText, color: c.text.primary },
          pinCodeContainerStyle: { borderColor: c.border.default },
          focusedPinCodeContainerStyle: styles.activePinCodeContainer,
          focusStickStyle: styles.focusStick,
        }}
      />

      {errorMessage != null && (
        <Text
          style={{
            color: "#ED1010",
            textAlign: "center",
            fontFamily: "generalMedium",
          }}
        >
          {errorMessage}
        </Text>
      )}

      <TouchableOpacity
        onPress={() =>
          type === "resetPassword"
            ? verificateResetPassword({ otp, email })
            : verificate({ otp, email })
        }
        style={[
          styles.verifyButton,
          { borderColor: c.border.default },
          otp.length < 6 ? { backgroundColor: c.interactive.disabled } : { backgroundColor: c.button.primaryBg },
        ]}
        disabled={!otp}
      >
        {isPending || isPendingResetPassword ? (
          <ActivityIndicator
            style={{ alignSelf: "center" }}
            size="small"
            color={c.button.primaryText}
          />
        ) : (
          <Text
            style={{
              color: c.button.primaryText,
              textAlign: "center",
              fontSize: 16,
              fontFamily: "generalMedium",
            }}
          >
            {type === "resetPassword" ? "Continue" : "verify"}
          </Text>
        )}
      </TouchableOpacity>
      <Text
        style={{
          color: c.text.secondary,
          fontSize: 16,
          fontFamily: "generalRegular",
          textAlign: "center",
        }}
      >
        Email not received?
        <Text
          onPress={() => {
            resendCode({ email });
          }}
          style={{
            color: c.text.primary,
            textDecorationLine: "underline",
            textDecorationColor: c.text.primary,
            fontFamily: "generalMedium",
          }}
        >
          Resend code
        </Text>
      </Text>
    </View>
  );
};

export default Verification;

const styles = StyleSheet.create({
  headerText: {
    color: "#1A1A1A",
    fontSize: 32,
    letterSpacing: -1.6,
    fontFamily: "generalSemiBold",
  },
  secondaryText: {
    color: "#808080",
    marginTop: 12,
    fontSize: 16,
    fontFamily: "generalRegular",
  },
  pinCodeText: {
    fontFamily: "generalSemiBold",
  },

  activePinCodeContainer: {
    borderColor: "#0C9409",
  },
  focusStick: {
    height: 25,
    backgroundColor: "#0C9409",
  },
  verifyButton: {
    paddingHorizontal: 84,
    paddingVertical: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
  },
  disabled: {
    backgroundColor: "#CCCCCC",
  },
  enabled: {
    backgroundColor: "#1A1A1A",
  },
});
