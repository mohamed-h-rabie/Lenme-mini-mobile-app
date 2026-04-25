import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";

import apiClient from "@/api/index";
import { RootStackParamList } from "@/navigation/types";

const signUp = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await apiClient.post(`/users/signUp`, data);
    return res.data;
  } catch (error: unknown) {
    throw error;
  }
};

const useSignUp = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: async (data) => {
      const email = data.data.email;
      // if (Platform.OS === "web") {
      //   localStorage.setItem("email", email);
      // }
      await SecureStore.setItemAsync("email", email);
      navigation.replace("Verification");
    },
  });
  return mutation;
};
export default useSignUp;
