import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
    /* width: 14rem; */
    /* word-break: keep-all; */
    /* overflow-wrap: normal; */
    /* white-space: nowrap; */
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 0.8rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    display: flex;
    align-items: center;
    gap: 1rem;

    &:not(:disabled):hover {
      background-color: var(--color-brand-500);
      color: var(--color-brand-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const StyledButton = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  text-transform: uppercase;
  cursor: pointer;

  ${(props) => sizes[props.size]};
  ${(props) => variations[props.variation]};
  ${(props) =>
    props.disabled &&
    css`
      cursor: not-allowed;
    `};

  /* display: flex; */
  /* align-items: center; */
  /* justify-content: space-between; */
  /* gap: 3 */
`;

export default function Button({
  onClick,
  children,
  variation,
  size,
  disabled,
}) {
  return (
    <StyledButton
      variation={variation}
      sizes={size}
      onClick={() => onClick?.()}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
}

StyledButton.defaultProps = {
  variation: "primary",
  size: "medium",
};

Button.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.any,
  variation: PropTypes.any,
  size: PropTypes.any,
  disabled: PropTypes.any,
};
