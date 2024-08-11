import styled from "styled-components";
// import AddCabin from "../features/cabins/AddCabin";
import FilterAndSortOperations from "../ui/FilterAndSortOperations";
import BookingTable from "../features/bookings/BookingTable";
// import BookingTableOperations from "../features/bookings/BookingTableOperations";

const TableDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div:first-child {
    font-weight: 600;
    font-size: 2rem;
    letter-spacing: 0.5px;
  }
`;

function Bookings() {
  return (
    <>
      <TableDiv>
        <div>booking</div>
        <FilterAndSortOperations
          field="status"
          filterOptions={[
            { query: "all", label: "All" },
            { query: "checked-out", label: "Checked out" },
            { query: "checked-in", label: "Checked in" },
            { query: "unconfirmed", label: "Unconfirmed" },
          ]}
          sortOptions={[
            { value: "startDate-desc", label: "Sort by date (recent first)" },
            { value: "startDate-asc", label: "Sort by date (earlier first)" },
            {
              value: "totalPrice-desc",
              label: "Sort by amount (high first)",
            },
            { value: "totalPrice-asc", label: "Sort by amount (low first)" },
          ]}
        />
      </TableDiv>
      <BookingTable />
      {/* <AddCabin /> */}
    </>
  );
}

export default Bookings;
