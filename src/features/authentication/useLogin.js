import { login as loginApi } from "../../services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading: isLogin } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueriesData(["user"].user)
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log("Error", err);
      toast.error("Provided email or password is incorrect");
    },
  });
  return { login, isLogin };
}
