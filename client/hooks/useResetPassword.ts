import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import apiClient from "@/api/index";
import { RootStackParamList } from "@/navigation/types";

const resetPassword = async (data: { email: string; password: string }) => {
  try {
    const res = await apiClient.post(`/users/resetPassword`, data);
    return res.data;
  } catch (error: unknown) {
    throw error;
  }
};

const useResetPassword = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: async (_data) => {
      navigation.replace("SignIn");
    },
  });
  return mutation;
};
export default useResetPassword;
