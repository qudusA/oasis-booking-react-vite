import PropTypes from "prop-types";
import styled from "styled-components";
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";
import useModal from "../hooks/useDetectClickOutsideOfModal";

const Overlayed = styled.div`
  background-color: var(--backdrop-color);
  position: absolute;
  top: 0;
  left: 0;
  padding: 3rem 0;
  height: 100vh;
  width: 100vw;
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.5s;
`;

const Model = styled.div`
  /* width: 70%; */
  position: relative;
  background-color: var(--color-grey-0);
`;

const CloseModel = styled.span`
  position: absolute;
  right: 3px;
  top: 3px;
  font-weight: 500;
  font-size: 3rem;
  cursor: pointer;
  background-color: var(--color-grey-200);
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
  border-radius: 50%;

  transform: translate(-20%, 20%);
`;

const ModalContext = createContext();

export default function Modal({ children }) {
  const [showForm, setShowForm] = useState("");
  const close = () => setShowForm("");
  const open = setShowForm;

  return (
    <ModalContext.Provider value={{ showForm, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, openAndCloseBtnName }) {
  const { open } = useContext(ModalContext);

  return (
    <div>
      {cloneElement(children, { onClick: () => open(openAndCloseBtnName) })}
    </div>
  );
}

function Window({ children, windowName }) {
  const { showForm, close } = useContext(ModalContext);
  const { ref } = useModal({ close });

  if (windowName !== showForm) return null;
  return createPortal(
    <Overlayed>
      <Model ref={ref}>
        <CloseModel>
          <span onClick={close}>&times;</span>
        </CloseModel>
        {cloneElement(children, { onClose: close })}
      </Model>
    </Overlayed>,
    document.body
  );
}

Modal.OpenAndClose = Open;
Modal.Window = Window;

Modal.propTypes = {
  children: PropTypes.any,
  closeModal: PropTypes.any,
};

Window.propTypes = {
  children: PropTypes.any,
  windowName: PropTypes.any,
};

Open.propTypes = {
  children: PropTypes.any,
  openAndCloseBtnName: PropTypes.any,
};
