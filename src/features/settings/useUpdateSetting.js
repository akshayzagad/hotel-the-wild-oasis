import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export  function useUpdateSetting (){
    const queryClient = useQueryClient();
    const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
          toast.success("Settings succsesfully Edited");
          queryClient.invalidateQueries({ queryKey: ["settings"] });
        //   reset();
        },
        onError: (err) => toast.error(err.message),
      });
      return{updateSetting,isUpdating}
} 