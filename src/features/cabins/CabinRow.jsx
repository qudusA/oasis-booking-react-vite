import styled from "styled-components";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteACabinItemById } from "../../services/cabin";
import toast from "react-hot-toast";
import { HiPencil, HiTrash, HiSquare2Stack } from "react-icons/hi2";
import CreateCabinForm from "./CreateCabinForm";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import ContextMenuModal from "../../ui/ContextMenuModal";
// import ContextMenu from "../../ui/ContextMenu";

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
  const { createCabin } = useCreateCabin();

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
        <Modal>
          <ContextMenuModal.Menu>
            <ContextMenuModal.OpenAndCloseContextMenu id={cabin.id} />

            <ContextMenuModal.ContextBody id={cabin.id}>
              <ContextMenuModal.ContextItem
                icon={<HiSquare2Stack />}
                onClick={handleDuplicateCabin}
                cabin={cabin}
              >
                Duplicate
              </ContextMenuModal.ContextItem>

              <Modal.OpenAndClose openAndCloseBtnName={"confirm-edit"}>
                <ContextMenuModal.ContextItem icon={<HiPencil />}>
                  Edit
                </ContextMenuModal.ContextItem>
              </Modal.OpenAndClose>

              <Modal.OpenAndClose openAndCloseBtnName={"confirm-delete"}>
                <ContextMenuModal.ContextItem icon={<HiTrash />}>
                  Delete
                </ContextMenuModal.ContextItem>
              </Modal.OpenAndClose>
            </ContextMenuModal.ContextBody>

            <Modal.Window windowName={"confirm-edit"}>
              <CreateCabinForm cabin={cabin} />
            </Modal.Window>

            <Modal.Window windowName={"confirm-delete"}>
              <ConfirmDelete
                disabled={isDeleting}
                onConfirm={() => mutate(cabin.id)}
              />
            </Modal.Window>
          </ContextMenuModal.Menu>
        </Modal>
      </div>
    </TableRow>
  );
}

export default CabinRow;

CabinRow.propTypes = {
  cabin: PropTypes.any,
  handleClick: PropTypes.any,
  isOpen: PropTypes.any,
};
