import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { createCabin } from "../../services/apiCabins";
import FromRow from "../../ui/FormRow"

function CreateCabinForm() {

  const { register, handleSubmit, reset, getValues, formState } = useForm();

  const {errors} = formState;

  console.log(errors);
  

  const queryClient = useQueryClient();

  const { mutate, isloading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin succsesfully genrated");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => toast.error(err.message),

  });

  function onsubmit(data) {
    mutate({...data, image: data.image[0]});
  }

  function onError(error) {
    console.log(error);

  }

  return (
    <Form onSubmit={handleSubmit(onsubmit, onError)}>

        <FromRow label="Cabin name" error={errors?.name?.message}>
           <Input type="text" id="name" disabled={isCreating} 
           {...register("name",{required:"This field not be empty"}
        )} />
        </FromRow>

      <FromRow label="Maximum capacity" error={errors?.maxCapacity?.message} >
        <Input type="number" id="maxCapacity" disabled={isCreating} 
        {...register("maxCapacity", { required: "this field cannot be empty", 
        min:{value:1,message:"The capacity of cabin atleast 1"
          }, })} />
      </FromRow>

      <FromRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" disabled={isCreating}
         {...register("regularPrice", 
          { required: "this field cannot be empty" })} />
      </FromRow>

      <FromRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} disabled={isCreating}
         {...register("discount", { 
          required: "this field cannot be empty",
          validate: (value) => value <=  getValues().regularPrice || 
          'Discount should be less than regular price',
        })} />
      </FromRow>

      <FromRow label="Description for website" error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" disabled={isCreating}
         {...register("description",{ required: "this field cannot be empty" })} />
      </FromRow>

      <FromRow label="Cabin photo" >
        <FileInput disabled={isCreating} id="image" 
        accept="image/*"  {...register("image",{ required: "this field cannot be empty" })}/>
      </FromRow>

      <FromRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FromRow>
    </Form>
  );
}

export default CreateCabinForm;
