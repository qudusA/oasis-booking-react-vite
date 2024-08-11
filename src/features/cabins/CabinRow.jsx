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
import TableContext from "../../ui/TableContext";

// const TableRow = styled.div`

// `;

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

function CabinRow({ data }) {
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

  function handleDuplicateCabin(data) {
    createCabin({
      maxCapacity: data.maxCapacity,
      regularPrice: data.regularPrice,
      discount: data.discount,
      image: data.image,
      name: `copy of ${data.name}`,
      description: data.description,
    });
  }

  return (
    <TableContext.TableRow>
      <Img src={data.image} />
      <Cabin>{data.name}</Cabin>
      <div>fill up to {data.maxCapacity} guest</div>
      <Price>{data.regularPrice}</Price>
      <Discount>
        {data.discount ? data.discount : <span>&mdash;</span>}
      </Discount>
      <div>
        <Modal>
          <ContextMenuModal.Menu>
            <ContextMenuModal.OpenAndCloseContextMenu id={data.id} />

            <ContextMenuModal.ContextBody id={data.id}>
              <ContextMenuModal.ContextItem
                icon={<HiSquare2Stack />}
                onClick={handleDuplicateCabin}
                cabin={data}
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
              <CreateCabinForm cabin={data} />
            </Modal.Window>

            <Modal.Window windowName={"confirm-delete"}>
              <ConfirmDelete
                disabled={isDeleting}
                feature="carbin"
                onConfirm={() => mutate(data.id)}
              />
            </Modal.Window>
          </ContextMenuModal.Menu>
        </Modal>
      </div>
    </TableContext.TableRow>
  );
}

export default CabinRow;

CabinRow.propTypes = {
  data: PropTypes.any,
  handleClick: PropTypes.any,
  isOpen: PropTypes.any,
};
