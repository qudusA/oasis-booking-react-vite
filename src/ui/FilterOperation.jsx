import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { useSearchParams } from "react-router-dom";

const FilterUl = styled.ul`
  display: flex;
  gap: 0.5rem;
  background-color: var(--color-grey-0);
  padding: 0.2rem 0.3rem;
  border-radius: 5px;
  box-shadow: var(--shadow-sm);
  font-weight: 600;

  & > button {
    padding: 0.3rem 1rem;
    cursor: pointer;
  }
`;

const FilterBtn = styled.button`
  border-radius: 5px;
  border: none;
  display: inline-block;
  background-color: var(--color-grey-0);
  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  &:disabled {
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: var(--color-brand-500);
    color: var(--color-brand-50);
  }
`;

export default function FilterOperation({ field, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSelected = searchParams.get(field) || options.at(0).query;
  function handleClick(label) {
    searchParams.set(field, label);
    setSearchParams(searchParams);
  }

  return (
    <FilterUl>
      {options.map((option) => (
        <FilterBtn
          active={currentSelected === option.query ? 1 : null}
          key={option.query}
          onClick={() => handleClick(option.query)}
          disabled={currentSelected === option.query}
        >
          {option.label}
        </FilterBtn>
      ))}
    </FilterUl>
  );
}

FilterOperation.propTypes = {
  options: PropTypes.any,
  field: PropTypes.any,
  value: PropTypes.any,
};
