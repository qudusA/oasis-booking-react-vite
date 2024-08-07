import styled from "styled-components";
import PropTypes from "prop-types";
const StyledContextMenu = styled.div`
  padding: 2rem;
  position: fixed;
  top: ${(props) => props.position.y + "px"};
  right: ${(props) => props.position.x + "px"};

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-delete-lg);
`;

export default function ContextMenu({ position }) {
  return (
    <StyledContextMenu position={position}>
      <p>Duplicate</p>
      <p>Edit</p>
      <p>Delete</p>
    </StyledContextMenu>
  );
}

ContextMenu.propTypes = {
  position: PropTypes.any,
};
