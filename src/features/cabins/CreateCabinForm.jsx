import styled from "styled-components";
import PropTypes from "prop-types";

import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import useCreateCabin from "./useCreateCabin";
import useUpdateCabin from "./useUpdateCabin";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabin = {}, onClose }) {
  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: cabin,
  });
  const { createCabin, isCreating } = useCreateCabin();
  const { updateCabin, isUpdating } = useUpdateCabin();

  const { id: editId } = cabin;
  const { errors } = formState;
  const isEdit = Boolean(editId);

  const isCreatingOrUpdating = isCreating || isUpdating;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEdit) {
      updateCabin(
        { cabinObj: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onClose?.();
          },
        }
      );
    } else
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onClose?.();
          },
        }
      );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "this field is required",
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "this field is required...",
            min: {
              value: 1,
              message: "minimum value for this entry is 1",
            },
          })}
        />
        {errors?.maxCapacity?.message && (
          <Error>{errors.maxCapacity.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "this field is required...",
            min: {
              value: 50,
              message: "minimum value for this field is 50",
            },
          })}
        />
        {errors?.regularPrice?.message && (
          <Error>{errors.regularPrice.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "this field is required...",
            min: {
              value: 0,
              message: "discount can't be negative",
            },
            validate: (value) =>
              value <= getValues().regularPrice ||
              "discount can't be higher than regular price",
          })}
        />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "description is required...",
          })}
        />
        {errors?.description?.message && (
          <Error>{errors.description.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEdit ? false : "cabin image is required...",
          })}
        />
        {errors?.image?.message && <Error>{errors.image.message}</Error>}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button onClick={() => onClose?.()} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreatingOrUpdating}>
          {isEdit ? "Edit cabin" : "create cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

CreateCabinForm.propTypes = {
  cabin: PropTypes.any,
  onClose: PropTypes.any,
};
