import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledSelect = styled.select`
  border: none;
  background-color: var(--color-grey-0);
  border-radius: 5px;
  padding: 0 1rem;
  cursor: pointer;
  position: relative;

  & > option {
    cursor: pointer;
  }

  &::after {
    content: "✔️";
    width: 10px;
    height: 10px;
    background-color: red;
    top: 0;
    left: 0;
    position: absolute;
  }
  /* outline */
`;

export default function SortOperation({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = searchParams.get("sortBy") || "";

  function handleSort(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <StyledSelect value={value} onChange={handleSort} id="">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

SortOperation.propTypes = {
  options: PropTypes.any,
};
