import style from "styled-components";
import CarbinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";

const TableDiv = style.div``;

// const Table = style.section`
//   display: grid;
//   grid-template-columns: 2fr 0.5fr 2fr 1fr 1fr 0.5fr
// `;

// const TableRows = style.article`
//   background-color: var( --color-grey-0)
// `;

function Cabins() {
  return (
    <>
      <TableDiv>All cabins</TableDiv>
      <CarbinTable />
      <AddCabin />
    </>
  );
}

export default Cabins;
