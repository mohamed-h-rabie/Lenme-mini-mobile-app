import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";

import apiClient from "@/api/index";
import { RootStackParamList } from "@/navigation/types";

const forgetPassword = async (data: { email: string }) => {
  try {
    const res = await apiClient.post(`/users/forgetPassword`, data);
    return res.data;
  } catch (error: unknown) {
    throw error;
  }
};

const useForgetPassword = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const mutation = useMutation({
    mutationFn: forgetPassword,
    onSuccess: async (data) => {
      const email = data.email;
      await SecureStore.setItemAsync("email", email);
      navigation.replace("Verification", { type: "resetPassword" });
    },
  });
  return mutation;
};
export default useForgetPassword;
