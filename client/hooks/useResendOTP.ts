import { useMutation } from "@tanstack/react-query";

import apiClient from "@/api/index";

const resendCode = async (data: { email: string }) => {
  try {
    const res = await apiClient.post(`/users/requestNewOTP`, data);
    return res.data;
  } catch (error: unknown) {
    throw error;
  }
};

const useResendOTP = () => {
  const mutation = useMutation({
    mutationFn: resendCode,
  });
  return mutation;
};
export default useResendOTP;
