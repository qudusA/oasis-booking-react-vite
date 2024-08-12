import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

const H3 = styled.h3`
  text-align: center;
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <H3>Log in to your account</H3>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
