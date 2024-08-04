import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getAllCabin } from "../../services/cabin";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import ErrorFallback from "../../ui/ErrorFallback";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-100);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

const TableHead = styled.div`
  text-transform: uppercase;
`;

function CarbinTable() {
  const {
    data: carbinData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getAllCabin,
  });

  if (isLoading) return <Spinner />;
  if (error) return <ErrorFallback>{error.message}</ErrorFallback>;
  return (
    <Table role="table">
      <TableHeader>
        <TableHead></TableHead>
        <TableHead>carbin</TableHead>
        <TableHead>capacity</TableHead>
        <TableHead>price</TableHead>
        <TableHead>discount</TableHead>
        <TableHead></TableHead>
      </TableHeader>
      {carbinData.map((data) => (
        <CabinRow key={data.id} cabin={data} />
      ))}
    </Table>
  );
}

export default CarbinTable;
