import styled from "styled-components";

import SortOperation from "../ui/SortOperation";
import FilterOperation from "../ui/FilterOperation";
import PropTypes from "prop-types";

const StyledDiv = styled.div`
  display: flex;
  gap: 1.5rem;
`;

export default function FilterAndSortOperations({
  filterOptions,
  field,
  sortOptions,
}) {
  return (
    <StyledDiv>
      <FilterOperation field={field} options={filterOptions} />
      <SortOperation options={sortOptions} />
    </StyledDiv>
  );
}

FilterAndSortOperations.propTypes = {
  filterOptions: PropTypes.any,
  field: PropTypes.any,
  sortOptions: PropTypes.any,
};
