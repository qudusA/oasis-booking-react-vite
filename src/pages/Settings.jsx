// import Heading from "../ui/Heading";

import styled from "styled-components";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";

const SettingDiv = styled.div`
  font-weight: 700;
  font-size: 3rem;
  &::first-letter {
    text-transform: capitalize;
  }
`;

function Settings() {
  // return <Heading as="h1">Update hotel settings</Heading>;
  return (
    <>
      <SettingDiv>update hotel settings</SettingDiv>
      <UpdateSettingsForm />
    </>
  );
}

export default Settings;
