import styled from "styled-components";
import Button from "../../ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBooking, updateBooking } from "../../services/apiBookings";
import Spinner from "../../ui/Spinner";
import BookingDataBox from "../bookings/BookingDataBox";
import { formatCurrency } from "../../utils/helpers";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledBookingDetail = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div {
    display: flex;
    gap: 3rem;
    align-items: center;

    & > span {
      background-color: ${(props) =>
        props.status === "unconfirmed"
          ? `var(--color-blue-100)`
          : props.status === "checked-in"
          ? "var(--color-green-100)"
          : "var(--color-brand-200)"};
      border-radius: 100px;
      padding: 0.1rem 1rem;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      /* display: flex;
      justify-content: center; */
    }
  }
`;

const StyledLower = styled.div`
  display: flex;
  justify-content: end;
  & > button:first-child {
    margin-right: 2rem;
  }
`;

const StyledBtn = styled.button`
  background-color: var(--color-grey-200);
  border: none;
`;

const StyledCheckBox = styled.p`
  display: flex;
  gap: 1rem;
  align-items: center;
  background-color: var(--color-grey-0);
  padding: 1.5rem;
  border-radius: 5px;
  & > input {
    cursor: pointer;
  }
`;

export default function CheckinBooking() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const queryClient = useQueryClient();

  const moveBack = () => navigate(-1, { replace: true });

  const { data: booking = {}, isLoading } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
  });

  const { mutate } = useMutation({
    mutationFn: (id) =>
      updateBooking(id, { isPaid: true, status: "checked-in" }),
    onSuccess: (bookingId) => {
      queryClient.invalidateQueries({ active: true });
      toast.success(`updated booking with id #${bookingId}`);
      navigate("/");
    },
    onError: () => toast.error("error occur while updating..."),
  });

  useEffect(() => setChecked(booking?.isPaid || false), [booking]);

  if (isLoading) return <Spinner />;

  return (
    <StyledContainer>
      <StyledBookingDetail status={booking.status}>
        <div>
          <h3>checkout #{bookingId}</h3>
          <span>{booking.status.replace("-", " ")}</span>
        </div>
        <StyledBtn onClick={moveBack}>&larr; Back</StyledBtn>
      </StyledBookingDetail>
      <BookingDataBox isLoading={isLoading} booking={booking} />
      <StyledCheckBox>
        {" "}
        <input
          checked={checked}
          onClick={() => setChecked((checked) => !checked)}
          id={bookingId}
          type="checkbox"
          disabled={booking?.isPaid}
        />{" "}
        <label htmlFor={bookingId}>
          i confirm that {booking?.guests.fullName} has paid the total amount of{" "}
          {formatCurrency(booking.totalPrice)}
        </label>
      </StyledCheckBox>
      <StyledLower>
        <Button
          disabled={!checked}
          onClick={() => {
            if (!checked) return;
            mutate(bookingId);
          }}
        >
          Check in #{bookingId}
        </Button>
        <Button variation="secondary" size="small" onClick={moveBack}>
          Back
        </Button>
      </StyledLower>
    </StyledContainer>
  );
}

CheckinBooking.propTypes = {
  bookingId: PropTypes.any,
};
