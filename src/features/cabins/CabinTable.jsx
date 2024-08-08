import { useQuery } from "@tanstack/react-query";
import { getAllCabin } from "../../services/cabin";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import ErrorFallback from "../../ui/ErrorFallback";
import ContextMenuModal from "../../ui/ContextMenuModal";
import { useSearchParams } from "react-router-dom";
import TableContext from "../../ui/TableContext";
// import { useState } from "react";

function CarbinTable() {
  const {
    data: carbinData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getAllCabin,
  });

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "all";
  const sortedBy = searchParams.get("sortBy") || "cabin-asc";

  let queryData;

  if (query === "all") queryData = carbinData;
  if (query === "no-discount")
    queryData = carbinData?.filter((data) => data.discount === 0);
  if (query === "with-discount")
    queryData = carbinData?.filter((data) => data.discount !== 0);

  const [field, direction] = sortedBy.split("-");

  const modifier = direction === "asc" ? 1 : -1;
  const sortedData = queryData?.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  if (isLoading) return <Spinner />;
  if (error) return <ErrorFallback>{error.message}</ErrorFallback>;
  return (
    <ContextMenuModal>
      <TableContext columns={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"}>
        <TableContext.TableHeader>
          <div></div>
          <div>carbin</div>
          <div>capacity</div>
          <div>price</div>
          <div>discount</div>
          <div></div>
        </TableContext.TableHeader>
        <TableContext.TableBody
          data={sortedData}
          render={(data) => <CabinRow data={data} key={data.id} />}
        />
      </TableContext>
    </ContextMenuModal>
  );
}

export default CarbinTable;
