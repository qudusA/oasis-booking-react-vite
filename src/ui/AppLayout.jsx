import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import styled from "styled-components";
import Header from "./Header";

const AppLayoutStyled = styled.section`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  overflow: hidden;
`;

const MainStyle = styled.main`
  background-color: var(--color-grey-200);
  padding: 3rem;
  overflow-y: scroll;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export default function AppLayout() {
  return (
    <AppLayoutStyled>
      <Header />
      <SideBar />
      <MainStyle>
        <StyledDiv>
          <Outlet />
        </StyledDiv>
      </MainStyle>
    </AppLayoutStyled>
  );
}
