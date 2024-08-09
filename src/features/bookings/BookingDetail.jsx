import styled from "styled-components";
import Button from "../../ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import BookingDataBox from "./BookingDataBox";
import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import Spinner from "../../ui/Spinner";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
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
`;

const StyledBtn = styled.button`
  background-color: var(--color-grey-200);
  border: none;
`;

export default function BookingDetail() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const { data: booking = {}, isLoading } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
  });

  if (isLoading) return <Spinner />;

  return (
    <StyledContainer>
      <StyledBookingDetail status={booking.status}>
        <div>
          <h3>Booking #{bookingId}</h3>
          <span>{booking.status.replace("-", " ")}</span>
        </div>
        <StyledBtn onClick={() => navigate(-1, { replace: true })}>
          &larr; Back
        </StyledBtn>
      </StyledBookingDetail>
      <BookingDataBox isLoading={isLoading} booking={booking} />
      <StyledLower>
        <Button
          variation="secondary"
          size="small"
          onClick={() => navigate(-1, { replace: true })}
        >
          Back
        </Button>
      </StyledLower>
    </StyledContainer>
  );
}

BookingDetail.propTypes = {
  bookingId: PropTypes.any,
};
