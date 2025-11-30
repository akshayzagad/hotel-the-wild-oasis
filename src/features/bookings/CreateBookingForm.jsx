/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";

import FromRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import { useCabins } from "../cabins/useCabins";
import FormRow from "../../ui/FormRow";
import { useCreateBooking } from "./useCreateBooking";
import { useCreateGuest } from "../guests/useCreateGuest";
import Button from "../../ui/Button";
import { useEffect } from "react";

export default function CreateBookingForm({ onCloseModal }) {
  const { register, formState, watch, setValue, handleSubmit } = useForm();

  const { getDataOfCabins } = useCabins();

  const { isCreatingBooking, createNewBooking } = useCreateBooking();

  const { isCreateGuest, createNewGuest } = useCreateGuest();

  const selectedCabinId = watch("cabinId");

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  // ⬇️ Auto-calc number of nights
  useEffect(() => {
    if (!startDate || !endDate) return;

    const nights =
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);

    setValue("numNight", nights > 0 ? nights : 1);
  }, [startDate, endDate, setValue]);

  // Auto-update total price whenever cabin changes
  const selectedCabin = getDataOfCabins?.find(
    (cabin) => cabin.id === Number(selectedCabinId)
  );

  useEffect(() => {
    if (selectedCabin) {
      setValue("totalPrice", selectedCabin?.regularPrice || 0);
      setValue("cabinPrice", selectedCabin?.regularPrice || 0);
    }
  }, [selectedCabin, setValue]);

  function onSubmit(data) {
    const guestData = {
      fullName: data.fullName,
      email: data.email,
      nationality: data.nationality,
      nationalId: data.nationalID,
      countryFlag: data.countryFlag || null, // <-- FIX
    };

    const bookingData = {
      cabinId: data.cabinId,
      startDate: data.startDate,
      endDate: data.endDate,
      totalPrice: data.totalPrice,
      isPaid: data.isPaid,
      status: "unconfirmed",
      observations: data.observations,
      hasBreakfast: data.hasBreakfast,
      cabinPrice: data.cabinPrice,
      numGuest: Number(data.numGuest),
      numNight:Number(data.numNight)
    };

    createNewGuest(guestData, {
      onSuccess: (guest) => {
        // 2️⃣ Create booking with new guestId
        createNewBooking(
          { ...bookingData, guestId: guest.id },
          {
            onSuccess: () => onCloseModal?.(),
          }
        );
      },
    });
  }

  const { errors } = formState;

  function onError(error) {
    console.log(error);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Guest name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="startDate"
          disabled={isCreateGuest}
          {...register("fullName", { required: "Guest name required" })}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="startDate"
          disabled={isCreateGuest}
          {...register("email", { required: "Email is required" })}
        />
      </FormRow>

      <FormRow label="Nationality">
        <Input
          type="text"
          id="startDate"
          disabled={isCreateGuest}
          {...register("nationality")}
        />
      </FormRow>

      <FormRow label="National ID">
        <Input
          type="text"
          id="startDate"
          disabled={isCreateGuest}
          {...register("nationalID")}
        />
      </FormRow>
      <FromRow label="Number of guest" error={errors?.name?.message}>
        <Input
          type="Number"
          id="numGuest"
          disabled={isCreatingBooking}
          {...register("numGuest", { required: "This field not be empty" })}
        />
      </FromRow>
      <FromRow label="Start Date" error={errors?.name?.message}>
        <Input
          type="date"
          id="startDate"
          disabled={isCreatingBooking}
          {...register("startDate", { required: "This field not be empty" })}
        />
      </FromRow>
      <FromRow label="End Date" error={errors?.name?.message}>
        <Input
          type="date"
          id="endDate"
          disabled={isCreatingBooking}
          {...register("endDate", { required: "This field not be empty" })}
        />
      </FromRow>
      <FormRow label="Select cabin" error={errors?.cabinId?.message}>
        <select
          id="cabinId"
          {...register("cabinId", { required: "Please select a cabin" })}
        >
          <option value="">Select cabin</option>
          {getDataOfCabins?.map((cabin) => (
            <option key={cabin.id} value={cabin.id}>
              {cabin.name}
            </option>
          ))}
        </select>
      </FormRow>
      <FormRow label="Status">
        <select disabled {...register("status")} defaultValue="unconfirmed">
          <option value="unconfirmed">Unconfirmed</option>
          <option value="confirmed">Confirmed</option>
          <option value="checked-in">Checked in</option>
          <option value="checked-out">Checked out</option>
        </select>
      </FormRow>
      <FormRow label="hasBreakfast?">
        <input type="checkbox" id="hasBreakfast" {...register("hasBreakfast")} />
      </FormRow>
      <FormRow label="Is Paid?">
        <input type="checkbox" id="isPaid" {...register("isPaid")} />
      </FormRow>
      <FormRow label="Observations">
        <textarea
          id="observations"
          disabled={isCreatingBooking}
          {...register("observations")}
          placeholder="Write any notes about this booking..."
        />
      </FormRow>
      <FromRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="button" // <-- Change from "reset" to "button"
          onClick={() => onCloseModal?.()} // <-- Call directly
        >
          Cancel
        </Button>
        <Button disabled={isCreatingBooking}>
          {isCreateGuest || isCreatingBooking
            ? "Edit cabin"
            : "Create new Booking"}
        </Button>
      </FromRow>
    </Form>
  );
}
