import { useSession } from "@/components/providers/SessionProvider";
import { useMutation } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import axios from "axios";

import apiClient from "@/api/index";

const signIn = async (data: { email: string; password: string }) => {
  try {
    const res = await apiClient.post(`/users/signIn`, data);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(
        typeof message === "string" && message.trim().length > 0
          ? message
          : "Invalid email or password"
      );
    }
    throw new Error("Something went wrong");
  }
};

const useSignIn = () => {
  const { signIn: saveToken } = useSession();

  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: async (data) => {
      const token = data.token;
      const expiresInMs = Number(data.expiresInMs);
      const expiryTime =
        Number.isFinite(expiresInMs) && expiresInMs > 0
          ? Date.now() + expiresInMs
          : null;
      // if (Platform.OS === "web") {
      //   localStorage.setItem("email", email);
      // }
      const canBio = await SecureStore.canUseBiometricAuthentication();

      if (canBio) {
        Alert.alert(
          "Enable Biometric Login?",
          "You can unlock the app next time with your fingerprint/FaceID.",
          [
            {
              text: "Yes",
              onPress: async () => {
                await SecureStore.setItemAsync("biometricEnabled", "true");
              },
            },
            {
              text: "No",
              onPress: async () => {
                await SecureStore.setItemAsync("biometricEnabled", "false");
              },
            },
          ],
        );
      }

      saveToken(token, expiryTime);
    },
  });
  return mutation;
};
export default useSignIn;
