import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 200px;
`;

const Selected = styled.div`
  border: 1px solid red;
  background-color: var(--color-grey-0);
  border-radius: 5px;
  padding: 0 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const Options = styled.div`
  display: ${({ open }) => (open ? "block" : "none")};
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: var(--color-grey-0);
  border: 1px solid red;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
`;

const Option = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;

  &:hover {
    background-color: #ddd;
  }

  &.selected::after {
    content: "✔️";
    position: absolute;
    right: 10px;
    color: green;
  }
`;

const CustomSelect = ({ options, onSelect }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  const toggleDropdown = () => setOpen(!open);

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
    onSelect(option);
  };

  return (
    <SelectContainer>
      <Selected onClick={toggleDropdown}>
        {selected}
        <span>{open ? "▲" : "▼"}</span>
      </Selected>
      <Options open={open}>
        {options.map((option, index) => (
          <Option
            key={index}
            className={option === selected ? "selected" : ""}
            onClick={() => handleSelect(option)}
          >
            {option}
          </Option>
        ))}
      </Options>
    </SelectContainer>
  );
};

export default CustomSelect;

CustomSelect.propTypes = {
  options: PropTypes.any,
  onSelect: PropTypes.any,
};
