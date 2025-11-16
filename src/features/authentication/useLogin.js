import { login as loginApi } from "../../services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading: isLogin } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (data) => {
      queryClient.setQueryData(["user"],data.user);
      toast.success("Login successful!");
       // slight delay ensures Supabase session is available
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 300);
    },
    

    onError: (err) => {
      console.log("Error", err);
      toast.error("Provided email or password is incorrect");
    },
  });
  return { login, isLogin };
}
