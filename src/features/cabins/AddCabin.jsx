// import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
// import styled from "styled-components";

// const CloseModel = styled.span`
//   position: absolute;
//   right: 3px;
//   top: 3px;
//   font-weight: 500;
//   font-size: 3rem;
//   cursor: pointer;
//   background-color: var(--color-grey-200);
//   width: 3rem;
//   height: 3rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   text-align: center;
//   border-radius: 50%;

//   transform: translate(-20%, 20%);
// `;

export default function AddCabin() {
  //   const [isCabinFormOpen, setIsCabinFormOpen] = useState(false);

  return (
    <>
      {/* <div> */}
      {/* <Button> */}
      {/* <Modal.OpenAndClose label={<Button>add new cabin</Button>} /> */}

      {/* add new cabin */}
      {/* </Button> */}
      {/* </div> */}

      <Modal>
        <Modal.OpenAndClose
          openAndCloseBtnName="cabin"
          label={<Button>add new cabin</Button>}
        />
        <Modal.Window windowName="cabin">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </>
  );
}
