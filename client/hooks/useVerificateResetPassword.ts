import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import apiClient from "@/api/index";
import { RootStackParamList } from "@/navigation/types";

const verificateResetPassword = async (data: {
  email: string;
  otp: string;
}) => {
  try {
    const res = await apiClient.post(`/users/verifyResetPassword`, data);
    return res.data;
  } catch (error: unknown) {
    throw error;
  }
};

const useVerificateResetPassword = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const mutation = useMutation({
    mutationFn: verificateResetPassword,
    onSuccess: async () => {
      navigation.replace("ResetPassword");
    },
  });
  return mutation;
};
export default useVerificateResetPassword;
