import "react-native-reanimated";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SessionProvider, useSession } from "@/components/providers/SessionProvider";
import ThemeProvider from "@/constants/ThemeProvider";
import useTheme from "@/hooks/useTheme";
import { SplashScreenController } from "@/components/splashScreen";
import { Colors } from "@/constants/theme";
import RootNavigator from "@/navigation/RootNavigator";
import { StyleSheet, Text, View } from "react-native";

const queryClient = new QueryClient();

void SplashScreen.preventAutoHideAsync();

function RootLoader() {
  const [unlocked, setUnlocked] = useState(false);
  const { isLoading: sessionLoading, session, tokenExpiresInMs } = useSession();
  const [fontsLoaded] = useFonts({
    generalSemiBold: require("./assets/fonts/GeneralSans-Semibold.otf"),
    generalRegular: require("./assets/fonts/GeneralSans-Regular.otf"),
    generalMedium: require("./assets/fonts/GeneralSans-Medium.otf"),
  });
  const { theme } = useTheme();
  const appBackground = theme.dark
    ? Colors.dark.background.primary
    : Colors.light.background.primary;

  useEffect(() => {
    if (fontsLoaded && !sessionLoading) {
      void SplashScreen.hideAsync();
    }
  }, [fontsLoaded, sessionLoading]);

  if (!fontsLoaded || sessionLoading) {
    return null;
  }

  if (!unlocked) {
    return <SplashScreenController setUnlocked={setUnlocked} />;
  }

  const secondsLeft =
    tokenExpiresInMs != null ? Math.ceil(tokenExpiresInMs / 1000) : null;
  const countdownLabel =
    secondsLeft != null
      ? [
          Math.floor(secondsLeft / 3600),
          Math.floor((secondsLeft % 3600) / 60),
          secondsLeft % 60,
        ]
          .map((n, i) => (i === 0 ? String(n) : String(n).padStart(2, "0")))
          .join(":")
      : null;

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <RootNavigator isAuthenticated={Boolean(session)} backgroundColor={appBackground} />
      </NavigationContainer>
      {/* {__DEV__ && session && countdownLabel != null && (
        <View style={styles.expiryBadge}>
          <Text style={styles.expiryText}>Token expires in {countdownLabel}</Text>
        </View>
      )} */}
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <RootLoader />
        </SessionProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  expiryBadge: {
    position: "absolute",
    top: 52,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.75)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    zIndex: 9999,
  },
  expiryText: {
    color: "#FFFFFF",
    fontFamily: "generalMedium",
    fontSize: 12,
  },
});
