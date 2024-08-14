import { useState } from "react";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";
import SpinnerMini from "../../ui/SpinnerMini";
import { useNavigate } from "react-router-dom";

const Form = styled.form`
  background-color: var(--color-grey-0);
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-shadow: var(--shadow-md);
  border-radius: 5px;
  /* width: 50%; */
`;
const FormRowVertical = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 3rem; */
`;
const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  border-radius: 3px;
  padding: 5px;
  outline: none;
`;
const Label = styled.label``;

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading: isLogingIn } = useMutation({
    mutationFn: ({ email, password }) => login(email, password),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard");
    },
    onError: () => toast.error("invalid email or password..."),
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!password || !email) return;
    mutate(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical>
        <Label htmlFor="email">Email address</Label>
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">{isLogingIn ? <SpinnerMini /> : `Login`}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
