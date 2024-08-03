import styled from "styled-components";

const HeadingStyle = styled.header`
  background-color: var(--color-gray-200);
  border-bottom: 1px solid var(--color-grey-300);
`;

export default function Heading() {
  return <HeadingStyle>heading</HeadingStyle>;
}
