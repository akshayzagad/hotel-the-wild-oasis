/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FromRow from "../../ui/FormRow";


function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;

  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  // console.log(errors);

  const { createCabin, isCreating } = useCreateCabin();

  const { editCabin, isEditing } = useEditCabin();

  const isWorking = isCreating || isEditing;

  function onsubmit(data) {
    console.log(data);
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        { onSuccess: (data) => reset() }
      );
    } else {
      createCabin({ ...data, image: image },{ onSuccess: (data) => reset() });
    }
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <Form onSubmit={handleSubmit(onsubmit, onError)}>
      <FromRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field not be empty" })}
        />
      </FromRow>

      <FromRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "this field cannot be empty",
            min: { value: 1, message: "The capacity of cabin atleast 1" },
          })}
        />
      </FromRow>

      <FromRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "this field cannot be empty",
          })}
        />
      </FromRow>

      <FromRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "this field cannot be empty",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FromRow>

      <FromRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", {
            required: "this field cannot be empty",
          })}
        />
      </FromRow>

      <FromRow label="Cabin photo">
        <FileInput
          disabled={isWorking}
          id="image"
          accept="image/*"
          {...register(
            "image",
            isEditSession ? false : { required: "this field cannot be empty" }
          )}
        />
      </FromRow>

      <FromRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FromRow>
    </Form>
  );
}

export default CreateCabinForm;
