import styled from "styled-components";
import Form from "../../ui/Form";
// import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useUpdateSetting from "./useUpdateSetting";
import { useForm } from "react-hook-form";
import useGetSetting from "./useGetSetting";
import ErrorFallback from "../../ui/ErrorFallback";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function UpdateSettingsForm() {
  const { isLoadingSetting, error, settingData = {} } = useGetSetting();
  const { isUpdatingSetting, updateSetting } = useUpdateSetting();
  const { register, formState } = useForm();
  const { errors } = formState;

  const {
    minBookingLength,
    maxBookingLength,
    breakfastPrice,
    maxGuestPerBooking,
  } = settingData;

  function handleSettingUpdate(e, field) {
    const { value } = e.target;
    // console.log(value);
    if (!value) return;
    updateSetting({ [field]: value });
  }

  if (error) return <ErrorFallback>{error.message}</ErrorFallback>;

  return (
    <Form>
      <FormRow>
        <label htmlFor="min-nights"> Minimum nights/booking</label>
        <Input
          disabled={isLoadingSetting || isUpdatingSetting}
          type="number"
          id="min-nights"
          tabIndex={0}
          defaultValue={minBookingLength}
          {...register("minBookingLength", {
            required: "this field is required...",
            min: {
              value: 6,
              message: "minimum value for this field is 6",
            },
          })}
          onBlur={(e) => handleSettingUpdate(e, "minBookingLength")}
        />
        {errors?.minBookingLength?.message && (
          <Error>{errors.minBookingLength.message}</Error>
        )}
      </FormRow>
      <FormRow>
        <label htmlFor="max-nights"> Maximum nights/booking</label>
        <Input
          disabled={isLoadingSetting || isUpdatingSetting}
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          {...register("maxBookingLength", {
            required: "this field is required...",
            max: {
              value: 120,
              message: "maximum value for this field is 120",
            },
          })}
          onBlur={(e) => handleSettingUpdate(e, "maxBookingLength")}
        />
        {errors?.maxBookingLength?.message && (
          <Error>{errors.maxBookingLength.message}</Error>
        )}
      </FormRow>
      <FormRow>
        <label htmlFor="max-guests"> Maximum guests/booking</label>

        <Input
          type="number"
          id="max-guests"
          disabled={isLoadingSetting || isUpdatingSetting}
          defaultValue={maxGuestPerBooking}
          {...register("maxGuestPerBooking", {
            required: "this field is required...",
            max: {
              value: 15,
              message: "maximum value for this field is 15",
            },
          })}
          onBlur={(e) => handleSettingUpdate(e, "maxGuestPerBooking")}
        />
        {errors?.maxGuestPerBooking?.message && (
          <Error>{errors.maxGuestPerBooking.message}</Error>
        )}
      </FormRow>
      <FormRow>
        <label htmlFor="breakfast-price"> Breakfast price</label>

        <Input
          type="number"
          id="breakfast-price"
          disabled={isLoadingSetting || isUpdatingSetting}
          defaultValue={breakfastPrice}
          {...register("breakfastPrice", {
            required: "this field is required...",
            min: {
              value: 15,
              message: "minimum value for this field is 15",
            },
          })}
          onBlur={(e) => handleSettingUpdate(e, "breakfastPrice")}
        />
        {errors?.breakfastPrice?.message && (
          <Error>{errors.breakfastPrice.message}</Error>
        )}
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
