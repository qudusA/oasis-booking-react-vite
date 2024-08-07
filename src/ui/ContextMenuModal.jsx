import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { HiEllipsisVertical } from "react-icons/hi2";
// import { createPortal } from "react-dom";
import styled from "styled-components";
// import { createPortal } from "react-dom";
import useModal from "../hooks/useDetectClickOutsideOfModal";

const Menu = styled.div`
  padding: 0.5px;
`;

const MenuBtn = styled.button`
  background-color: var(--color-grey-0);
  border: none;
  /* outline: none; */
`;

const StyledContextBody = styled.div`
  padding: 1rem;
  position: fixed;
  display: grid;
  border-radius: 5px;
  gap: 5px;
  top: ${(props) => props.position.y + "px"};
  right: ${(props) => props.position.x + "px"};

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-delete-lg);
`;

const StyledContextMenu = styled.div`
  cursor: pointer;
  /* display: block; */
  /* width: 100%; */
  /* text-align: start; */
  display: flex;
  gap: 1rem;
  align-items: center;
  outline: none;
  border: none;
  padding: 3px 1.5rem;
  border-radius: 2px;
  background-color: var(--color-grey-0);

  &:hover {
    background-color: var(--color-grey-300);
  }
`;

const contextMenu = createContext();

export default function ContextMenuModal({ children }) {
  const [isOpenId, setIsOpenId] = useState("");
  const [position, setPosition] = useState({});

  const close = () => setIsOpenId?.("");
  const toggleContextMenu = setIsOpenId;

  return (
    <contextMenu.Provider
      value={{ close, position, setPosition, isOpenId, toggleContextMenu }}
    >
      {children}
    </contextMenu.Provider>
  );
}

function OpenAndCloseContextMenu({ id }) {
  const { toggleContextMenu, setPosition, isOpenId, close } =
    useContext(contextMenu);
  function handleClick(e) {
    const rect = e.target.closest("button").getBoundingClientRect();
    isOpenId === "" || isOpenId !== id ? toggleContextMenu(id) : close();
    setPosition({
      x: window.innerWidth - rect.x - rect.width,
      y: rect.bottom + 10,
    });
  }
  return (
    <MenuBtn onClick={handleClick}>
      <HiEllipsisVertical />
    </MenuBtn>
  );
}

function ContextBody({ children, id }) {
  const { isOpenId, position, close } = useContext(contextMenu);
  const ref = useModal({ close });
  if (isOpenId !== id) return null;
  return (
    <StyledContextBody position={position} ref={ref}>
      {/* {createPortal(children, document.body)} */}
      {children}
    </StyledContextBody>
  );
}

function ContextItem({ children, onClick, icon, cabin }) {
  const { close } = useContext(contextMenu);

  function handleClick() {
    onClick?.(cabin);
    close();
  }
  return (
    <StyledContextMenu onClick={handleClick}>
      {icon}
      <span> {children}</span>
    </StyledContextMenu>
  );
}

ContextItem.propTypes = {
  position: PropTypes.any,
  children: PropTypes.any,
  icon: PropTypes.any,
  onClick: PropTypes.any,
  cabin: PropTypes.any,
};

ContextMenuModal.Menu = Menu;

ContextMenuModal.OpenAndCloseContextMenu = OpenAndCloseContextMenu;
ContextMenuModal.ContextBody = ContextBody;
ContextMenuModal.ContextItem = ContextItem;

ContextMenuModal.propTypes = {
  children: PropTypes.any,
};

OpenAndCloseContextMenu.propTypes = {
  children: PropTypes.any,
  id: PropTypes.any,
  ref: PropTypes.any,
};

ContextBody.propTypes = {
  children: PropTypes.any,
  id: PropTypes.any,
};
