import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCreateBooking() {
  const queryClient = useQueryClient();
  const { mutate: createNewBooking, isLoading: isCreatingBooking } = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      (toast.success("Your Booking is created"),
        queryClient.invalidateQueries({ queryKey: ["booking"] }));
    },
  });
  return { createNewBooking, isCreatingBooking };
}
