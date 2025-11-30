import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGuest } from "../../services/apiGuest";
import toast from "react-hot-toast";

export function useCreateGuest() {
  const queryClient = useQueryClient();
  const { mutate: createNewGuest, isLoading: isCreateGuest } = useMutation({
    mutationFn: createGuest,
    onSuccess: () => {
      (toast.success("Your Booking is created"),
        queryClient.invalidateQueries({ queryKey: ["guest"] }));
    },
    onError: (err) => toast.error(err.message),
  });
  return{createNewGuest,isCreateGuest}
}
