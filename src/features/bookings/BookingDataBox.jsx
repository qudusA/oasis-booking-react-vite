import { HiClock, HiCurrencyDollar, HiHomeModern } from "react-icons/hi2";
import styled from "styled-components";
import PropTypes from "prop-types";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { format, isToday } from "date-fns";
import Spinner from "../../ui/Spinner";
import { Flag } from "../../ui/Flag";

const StyledContainer = styled.div`
  /* margin-bottom: 30px; */
  /* width: 90%; */
  color: var(--color-grey-300);
`;

const StyledHead = styled.p`
  background-color: var(--color-brand-500);
  padding: 20px 30px;
  border-radius: 5px 5px 0 0;
  display: flex;
  justify-content: space-between;

  & > span:first-child {
    display: flex;
    gap: 2rem;
    align-items: center;
  }
`;

const StyledBody = styled.div`
  padding: 20px 30px;
  background-color: var(--color-grey-0);
  color: #000;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  border-radius: 0 0 5px 5px;

  & > p:nth-child(2) {
    display: flex;
    align-items: center;
    gap: 1rem;

    & > span:first-child {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
`;

const About = styled.p`
  display: flex;
  gap: 1rem;
  & > span:first-child {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
`;

const StyledStatus = styled.div`
  background-color: ${(props) =>
    props.ispaid === "true"
      ? "var(--color-green-100)"
      : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.ispaid === "true"
      ? "var(--color-green-700)"
      : "var(--color-yellow-700)"};
  padding: 20px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;

  & > p:first-child {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  & > p:first-child > span:first-child {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const Dot = styled.span`
  font-weight: 900;
  border-radius: 100px;
`;

const Footer = styled.p`
  text-align: end;
`;

export default function BookingDataBox({ booking = {}, isLoading }) {
  const {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    hasBreakfast,
    totalPrice,
    extrasPrice,
    cabinPrice,
    isPaid,
    // status,
    guests: { fullName: guestName, email, nationalID, countryFlag },
    cabins: { name: cabinName },
  } = booking;

  if (isLoading) return <Spinner />;
  return (
    <StyledContainer>
      <StyledHead>
        <span>
          <HiHomeModern />
          <span>
            #{numNights} nights in cabin {cabinName}
          </span>
        </span>
        <span>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </span>
      </StyledHead>
      <StyledBody>
        <About>
          <span>
            <span>
              <Flag src={countryFlag} alt={bookingId} />
            </span>
            {guestName} + {numGuests} guest
          </span>
          <Dot>&middot;</Dot>
          <span>{email}</span>
          <Dot>&middot;</Dot>
          <span>National ID {nationalID}</span>
        </About>
        <p>
          <span>
            <HiClock />
            <span>Breakfast included?</span>
          </span>
          <span>{hasBreakfast ? "yes" : "no"}</span>
        </p>
        {/* last */}
        <StyledStatus ispaid={isPaid.toString()}>
          <p>
            <span>
              <HiCurrencyDollar />
              <span>total price</span>
            </span>
            <span>
              {formatCurrency(totalPrice)}{" "}
              {hasBreakfast &&
                ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                  extrasPrice
                )} breakfast)`}
            </span>
          </p>
          <p>{isPaid ? "Paid" : "Will pay at property"}</p>
        </StyledStatus>
        <Footer>
          booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
        </Footer>
      </StyledBody>
    </StyledContainer>
  );
}

BookingDataBox.propTypes = {
  booking: PropTypes.any,
  isLoading: PropTypes.any,
};
