import BookingRow from "./BookingRow";
import TableContext from "../../ui/TableContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import { PAGE_SIZE } from "../../utils/global";
import ContextMenuModal from "../../ui/ContextMenuModal";
// import Modal from "../../ui/Modal";
// import Menus from "../../ui/Menus";

function BookingTable() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const filterValue = searchParams.get("status");
  const status = !filterValue || filterValue === "all" ? null : filterValue; //filterValue can be {field, filterValue} where filed = status to make it flesible.

  const sort = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sort.split("-");
  const sortBy = { field, direction };

  let currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const {
    data: { bookings: bookingData, count } = {},
    isLoading,
    // isPending,
    // error,
  } = useQuery({
    queryKey: ["bookings", status, sortBy, currentPage],
    queryFn: () => getAllBookings(status, sortBy, currentPage),
  });

  const totalPageNumber = Math.ceil(count / PAGE_SIZE);

  if (currentPage + 1 <= totalPageNumber)
    queryClient.prefetchQuery({
      queryKey: ["bookings", status, sortBy, currentPage + 1],
      queryFn: () => getAllBookings(status, sortBy, currentPage + 1),
    });

  if (currentPage > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", status, sortBy, currentPage - 1],
      queryFn: () => getAllBookings(status, sortBy, currentPage - 1),
    });

  if (isLoading) return <Spinner />;
  return (
    // <Modal>
    <ContextMenuModal>
      <TableContext columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <TableContext.TableHeader>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </TableContext.TableHeader>

        <TableContext.TableBody
          data={bookingData}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Pagination count={count} />
      </TableContext>
    </ContextMenuModal>
    // </Modal>
  );
}

export default BookingTable;
