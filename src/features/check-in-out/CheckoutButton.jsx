import Button from "../../ui/Button";
import useCheckOut from "./useCheckOut";
import PropTypes from "prop-types";

function CheckoutButton({ bookingId }) {
  const { checkOut, isCheckingOut } = useCheckOut();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkOut(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;

CheckoutButton.propTypes = {
  bookingId: PropTypes.any,
};
