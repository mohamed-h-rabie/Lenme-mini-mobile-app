import { useSession } from "@/components/providers/SessionProvider";
import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

import apiClient from "@/api/index";
import { RootStackParamList } from "@/navigation/types";

const verificate = async (data: { email: string; otp: string }) => {
  try {
    const res = await apiClient.post(`/users/verifyUser`, data);
    return res.data;
  } catch (error: unknown) {
    throw error;
  }
};

const useVerificate = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { signIn } = useSession();

  const mutation = useMutation({
    mutationFn: verificate,
    onSuccess: async (data) => {
      const token = data.token;
      const expiresInMs = Number(data.expiresInMs);
      const expiryTime =
        Number.isFinite(expiresInMs) && expiresInMs > 0
          ? Date.now() + expiresInMs
          : null;
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
          ]
        );
      }

      signIn(token, expiryTime);
      navigation.replace("AppTabs");
    },
  });
  return mutation;
};
export default useVerificate;
