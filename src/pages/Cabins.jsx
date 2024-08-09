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

function Cabins() {
  return (
    <>
      <TableDiv>
        <div>All cabins</div>
        <FilterAndSortOperations
          field={"query"}
          filterOptions={[
            { query: "all", label: "All" },
            { query: "with-discount", label: "With discount" },
            { query: "no-discount", label: "No discount" },
          ]}
          sortOptions={[
            { value: "name-asc", label: "sort by: name (A-Z)" },
            { value: "name-desc", label: "sort by: name (Z-A)" },
            {
              value: "maxCapacity-asc",
              label: "sort by: capacity (low first)",
            },
            {
              value: "maxCapacity-desc",
              label: "sort by: capacity (high first)",
            },
            { value: "regularPrice-asc", label: "sort by: price (low first)" },
            {
              value: "regularPrice-desc",
              label: "sort by: price (high first)",
            },
          ]}
        />
      </TableDiv>
      <CarbinTable />
      <AddCabin />
    </>
  );
}

export default Cabins;
