import styled from "styled-components";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteACabinItemById } from "../../services/cabin";
import toast from "react-hot-toast";
import { HiPencil, HiTrash, HiSquare2Stack } from "react-icons/hi2";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";

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
  const [showForm, setShowForm] = useState(false);

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

  return (
    <>
      <TableRow>
        <Img src={cabin.image} />
        <Cabin>{cabin.name}</Cabin>
        <div>fill up to {cabin.maxCapacity} guest</div>
        <Price>{cabin.regularPrice}</Price>
        <Discount>{cabin.discount}</Discount>
        <div>
          <button>
            <HiSquare2Stack />
          </button>
          <button onClick={() => setShowForm((show) => !show)}>
            <HiPencil />
          </button>
          <button disabled={isDeleting} onClick={() => mutate(cabin.id)}>
            <HiTrash />
          </button>
        </div>
      </TableRow>
      <div>{showForm && <CreateCabinForm cabin={cabin} />}</div>
    </>
  );
}

export default CabinRow;

CabinRow.propTypes = {
  cabin: PropTypes.any,
};
