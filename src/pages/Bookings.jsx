import styled from "styled-components";
import CarbinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import FilterAndSortOperations from "../ui/FilterAndSortOperations";

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
        <FilterAndSortOperations />
      </TableDiv>
      <CarbinTable />
      <AddCabin />
    </>
  );
}

export default Bookings;
