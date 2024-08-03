import style from "styled-components";
import CarbinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

const TableDiv = style.div``;

// const Table = style.section`
//   display: grid;
//   grid-template-columns: 2fr 0.5fr 2fr 1fr 1fr 0.5fr
// `;

// const TableRows = style.article`
//   background-color: var( --color-grey-0)
// `;

function Cabins() {
  const [isCabinFormOpen, setIsCabinFormOpen] = useState(false);

  return (
    <>
      <TableDiv>All cabins</TableDiv>
      <CarbinTable />
      <Button onClick={() => setIsCabinFormOpen((isOpen) => !isOpen)}>
        add
      </Button>
      {isCabinFormOpen && <CreateCabinForm />}
    </>
  );
}

export default Cabins;
