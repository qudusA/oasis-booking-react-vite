import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuth";
import toast from "react-hot-toast";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, handleSubmit, getValues, reset } = useForm();
  const { errors } = formState;

  const { mutate, isPending } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signUp(email, fullName, password),
    onSuccess: () => toast.success("user signup successful"),
    onError: (error) => toast.error(error.message),
  });

  // console.log(isPending);
  function onSubmit({ fullName, email, password }) {
    // console.log(data);
    mutate({ fullName, email, password }, { onSettled: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "full name is required..." })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "email is required...",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "password is required...",
            minLength: {
              value: 8,
              message: "password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "passwordConfirm is required...",
            validate: (value) =>
              value === getValues().password || "password need to macth",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={reset}>
          Cancel
        </Button>
        <Button disabled={isPending}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
