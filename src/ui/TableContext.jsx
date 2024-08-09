import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  /* position: relative; */

  font-size: 1.4rem;
  border-radius: 7px;
  overflow: hidden;
`;

const CommonStyle = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
`;

const StyledHeader = styled(CommonStyle)`
  background-color: var(--color-grey-100);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
  text-transform: uppercase;
`;

const StyledTableRow = styled(CommonStyle)`
  /* 
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center; */
  padding: 1.4rem 2.4rem;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.div`
  background-color: var(--color-grey-0);
  margin-bottom: 1rem;
`;

const TableCreateContext = createContext();

export default function TableContext({ children, columns }) {
  return (
    <TableCreateContext.Provider value={{ columns }}>
      <Table role="table">{children}</Table>
    </TableCreateContext.Provider>
  );
}

function TableHeader({ children }) {
  const { columns } = useContext(TableCreateContext);
  return (
    <StyledHeader role="row" columns={columns}>
      {children}
    </StyledHeader>
  );
}

function TableBody({ render, data = [] }) {
  return <StyledBody>{data.map(render)}</StyledBody>;
}

function TableRow({ children }) {
  const { columns } = useContext(TableCreateContext);
  return (
    <StyledTableRow role="row" columns={columns}>
      {children}
    </StyledTableRow>
  );
}

TableContext.TableHeader = TableHeader;
TableContext.TableBody = TableBody;
TableContext.TableRow = TableRow;

TableContext.propTypes = {
  children: PropTypes.any,
  columns: PropTypes.any,
};

TableHeader.propTypes = {
  children: PropTypes.any,
};

TableBody.propTypes = {
  render: PropTypes.any,
  data: PropTypes.any,
  children: PropTypes.any,
};

TableRow.propTypes = {
  children: PropTypes.any,
  data: PropTypes.any,
};
