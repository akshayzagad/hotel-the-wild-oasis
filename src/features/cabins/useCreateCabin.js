import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCabin(){
    const queryClient = useQueryClient();

    const { mutate: createCabin, isloading: isCreating } = useMutation({
      mutationFn: createEditCabin,
      onSuccess: () => {
        toast.success("New cabin succsesfully genrated");
        queryClient.invalidateQueries({ queryKey: ["cabins"] });
        // reset();
      },
      onError: (err) => toast.error(err.message),
    });
    return {createCabin,isCreating};
}