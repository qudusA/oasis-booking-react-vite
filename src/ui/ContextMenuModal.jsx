import { createContext, useContext, useRef, useState } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
// import styled from "styled-components";

const contextMenu = createContext();

export default function ContextMenuModal({ children }) {
  const [toggleContextMenu, setToggleContextMenu] = useState();
  const close = () => setToggleContextMenu("");
  const open = setToggleContextMenu;

  return (
    <contextMenu.Provider value={{ close, open, toggleContextMenu }}>
      {children}
    </contextMenu.Provider>
  );
}

function OpenContextMenu({ children, openId }) {
  const ref = useRef();
  const { open } = useContext(contextMenu);
  function handleClick(e) {
    open(openId);
    console.log("event", e.target, "ref", ref.current);
    // console.log("rect", ref.current.getBoundingClientRect());
  }

  return (
    <button ref={ref} onClick={handleClick}>
      {children}
    </button>
  );

  // return cloneElement(children, { onClick: () => open(openId) });
}

function ContextBody({ children, verifyId }) {
  const { openId } = useContext(contextMenu);
  console.log(verifyId);
  if (verifyId !== openId) return null;

  return createPortal(<div>{children}</div>, document.body);
}

ContextMenuModal.OpenContextMenu = OpenContextMenu;
ContextMenuModal.ContextBody = ContextBody;

ContextMenuModal.propTypes = {
  children: PropTypes.any,
};

OpenContextMenu.propTypes = {
  children: PropTypes.any,
  openId: PropTypes.any,
  ref: PropTypes.any,
};

ContextBody.propTypes = {
  children: PropTypes.any,
  verifyId: PropTypes.any,
};
