import { Outlet } from "react-router-dom";
import Heading from "./Heading";
import SideBar from "./SideBar";
import styled from "styled-components";

const AppLayoutStyled = styled.section`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const MainStyle = styled.main`
  background-color: var(--color-grey-200);
`;

export default function AppLayout() {
  return (
    <AppLayoutStyled>
      <Heading />
      <SideBar />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </AppLayoutStyled>
  );
}
