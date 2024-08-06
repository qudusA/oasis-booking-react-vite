import styled from "styled-components";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteACabinItemById } from "../../services/cabin";
import toast from "react-hot-toast";
import { HiPencil, HiTrash, HiSquare2Stack } from "react-icons/hi2";
import { BiDotsVerticalRounded } from "react-icons/bi";
import CreateCabinForm from "./CreateCabinForm";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
// import ContextMenuModal from "../../ui/ContextMenuModal";
import ContextMenu from "../../ui/ContextMenu";
import { useRef, useState } from "react";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const queryClient = useQueryClient();
  const { createCabin, isCreating } = useCreateCabin();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  const [position, setPosition] = useState({});

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteACabinItemById,
    onSuccess: () => {
      toast.success(`carbin deleted successfully`);
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: () => {
      toast.error("error occur");
    },
  });

  function handleDuplicateCabin(cabin) {
    createCabin({
      maxCapacity: cabin.maxCapacity,
      regularPrice: cabin.regularPrice,
      discount: cabin.discount,
      image: cabin.image,
      name: `copy of ${cabin.name}`,
      description: cabin.description,
    });
  }

  function handleClick() {
    setIsOpen((open) => !open);
    console.log(ref.current.getBoundingClientRect());
    setPosition(ref.current.getBoundingClientRect());
  }

  return (
    <TableRow>
      <Img src={cabin.image} />
      <Cabin>{cabin.name}</Cabin>
      <div>fill up to {cabin.maxCapacity} guest</div>
      <Price>{cabin.regularPrice}</Price>
      <Discount>
        {cabin.discount ? cabin.discount : <span>&mdash;</span>}
      </Discount>
      <div>
        <button
          disabled={isCreating}
          onClick={() => handleDuplicateCabin(cabin)}
        >
          <HiSquare2Stack />
        </button>
        <Modal>
          <Modal.OpenAndClose>
            <button>
              <HiPencil />
            </button>
          </Modal.OpenAndClose>
          <Modal.Window>
            <CreateCabinForm cabin={cabin} />
          </Modal.Window>

          <Modal.OpenAndClose openAndCloseBtnName={"confirm-delete"}>
            <button>
              <HiTrash />
            </button>
          </Modal.OpenAndClose>

          <Modal.Window windowName={"confirm-delete"}>
            <ConfirmDelete
              disabled={isDeleting}
              onConfirm={() => mutate(cabin.id)}
            />
          </Modal.Window>
        </Modal>
        {/* <ContextMenuModal>
          <ContextMenuModal.OpenContextMenu openId={cabin.id}> */}
        <button onClick={handleClick} ref={ref}>
          <BiDotsVerticalRounded />
        </button>
        {/* <ContextMenu /> */}
        {isOpen && <ContextMenu position={position} />}
        {/* </ContextMenuModal.OpenContextMenu>
          <ContextMenuModal.ContextBody verifyId={cabin.id}>
          </ContextMenuModal.ContextBody>
        </ContextMenuModal> */}
      </div>
    </TableRow>
  );
}

export default CabinRow;

CabinRow.propTypes = {
  cabin: PropTypes.any,
};
