import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import TableContext from "../../ui/TableContext";

import PropTypes from "prop-types";
import ContextMenuModal from "../../ui/ContextMenuModal";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

import useDeleteBooking from "./useDeleteBooking";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({ booking = {} }) {
  const navigate = useNavigate();
  const {
    id: bookingId,
    // created_at,
    startDate,
    endDate,
    numNights,
    // numGuests,
    totalPrice,
    // isPaid,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  } = booking;

  const { bookingDelete, isDeleting } = useDeleteBooking(bookingId);
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <TableContext.TableRow>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>
        <ContextMenuModal.OpenAndCloseContextMenu id={bookingId} />
        <ContextMenuModal.ContextBody id={bookingId}>
          <ContextMenuModal.ContextItem
            onClick={() => navigate(`/booking/${bookingId}`)}
            icon={<HiEye />}
          >
            see booking
          </ContextMenuModal.ContextItem>
          {status === "unconfirmed" && (
            <ContextMenuModal.ContextItem
              onClick={() => navigate(`/check-in/${bookingId}`)}
              icon={<HiArrowDownOnSquare />}
            >
              check in
            </ContextMenuModal.ContextItem>
          )}

          {status === "checked-in" && (
            <ContextMenuModal.ContextItem
              onClick={() => navigate(`/check-in/${bookingId}`)}
              icon={<HiArrowUpOnSquare />}
            >
              check out
            </ContextMenuModal.ContextItem>
          )}

          {/* {!isPaid && ( */}
          <Modal.OpenAndClose openAndCloseBtnName={"confirm-delete"}>
            <ContextMenuModal.ContextItem icon={<HiTrash />}>
              Delete
            </ContextMenuModal.ContextItem>
          </Modal.OpenAndClose>
          {/* )} */}
        </ContextMenuModal.ContextBody>
        <Modal.Window windowName="confirm-delete">
          <ConfirmDelete
            disabled={isDeleting}
            feature="booking"
            onConfirm={() => bookingDelete(bookingId)}
          />
        </Modal.Window>
      </Modal>
    </TableContext.TableRow>
  );
}

export default BookingRow;

BookingRow.propTypes = {
  booking: PropTypes.any,
};
