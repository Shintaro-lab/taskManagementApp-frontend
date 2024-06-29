import { Button, Modal, Typography } from "@mui/material";
import styled from 'styled-components';

const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: white;
  box-shadow: 24px;
  padding: 20px;
  border-radius: 4px;
  outline: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const CancelButton = styled(Button)`
  background-color: grey !important;
  color: white !important;
`;

const DeleteButton = styled(Button)`
  background-color: red !important;
  color: white !important;
`;

export function DeleteModal({isOpen,onClose,onDelete}) {

    return (
        <Modal open={isOpen} onClose={onClose}>
        <ModalBox>
          <Typography variant="h6">本当に削除しますか?</Typography>
          <ButtonContainer>
            <CancelButton onClick={onClose}>キャンセル</CancelButton>
            <DeleteButton onClick={onDelete}>削除する</DeleteButton>
          </ButtonContainer>
        </ModalBox>
      </Modal>
    );
}