import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";

const SidebarStyle = styled.aside`
  background-color: var(--color-gray-0);
  grid-row: 1/-1;
  border-right: 1px solid var(--color-grey-100);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  /* gap: 3rem; */
  /* align-items: center; */
`;

export default function SideBar() {
  return (
    <SidebarStyle>
      <Logo />
      <MainNav />
      <Uploader />
    </SidebarStyle>
  );
}
