import styled from "styled-components";
import Button from "./Button";
import PropTypes from "prop-types";

const Container = styled.div`
  width: 40rem;
  height: 20rem;
  padding: 3rem;
  border-radius: 5px;
  box-shadow: var(--shadow-delete-lg);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  /* background-color: red; */
`;

const BtnContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

export default function ConfirmDelete({
  onClose,
  onConfirm,
  disabled,
  feature,
}) {
  return (
    <Container>
      <p>
        <strong> Delete {feature}</strong>
      </p>
      <div>
        Are you sure you want to <strong> delete</strong> this {feature}{" "}
        permanently? This action cannot be undo.
      </div>
      <BtnContainer>
        <Button onClick={onClose} variation="secondary" type="reset">
          cancel
        </Button>
        <Button
          disabled={disabled}
          onClick={() => {
            onConfirm();
            onClose();
          }}
          variation="danger"
        >
          delete
        </Button>
      </BtnContainer>
    </Container>
  );
}

ConfirmDelete.propTypes = {
  onClose: PropTypes.any,
  onConfirm: PropTypes.any,
  disabled: PropTypes.any,
  feature: PropTypes.any,
};
