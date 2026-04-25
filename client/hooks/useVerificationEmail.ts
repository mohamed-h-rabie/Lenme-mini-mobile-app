import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";

/**
 * Loads verification email from storage for the OTP screen; redirects if missing.
 */
export function useVerificationEmail() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        if (Platform.OS === "web" && typeof localStorage !== "undefined") {
          const fromWeb = localStorage.getItem("email");
          if (!cancelled) setEmail(fromWeb ?? "");
        }

        const stored = await SecureStore.getItemAsync("email");
        if (cancelled) return;

        setEmail(stored ?? "");
        if (!stored) {
          navigation.replace("SignIn");
          return;
        }
      } catch {
      } finally {
        if (!cancelled) setReady(true);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [navigation]);

  return { email, ready };
}
