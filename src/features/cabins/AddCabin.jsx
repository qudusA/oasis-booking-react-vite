import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

export default function AddCabin() {
  return (
    <Modal>
      <Modal.OpenAndClose openAndCloseBtnName="cabin">
        <Button>add new cabin</Button>
      </Modal.OpenAndClose>
      <Modal.Window windowName="cabin">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}
