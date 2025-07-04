import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export  function useEditCabin (){
    const queryClient = useQueryClient();
    const { mutate: editCabin, isloading: isEditing } = useMutation({
        mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
        onSuccess: () => {
          toast.success("cabin succsesfully Edited");
          queryClient.invalidateQueries({ queryKey: ["cabins"] });
        //   reset();
        },
        onError: (err) => toast.error(err.message),
      });
      return{editCabin,isEditing}
}