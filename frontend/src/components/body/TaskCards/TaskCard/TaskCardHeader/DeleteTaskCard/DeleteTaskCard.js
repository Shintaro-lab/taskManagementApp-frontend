import styled from "styled-components";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

export function DeleteTaskCard({taskCardList, taskCardIndex, 
  setDeleteTarget, setIsDeleteModalOpen, setDeleteTaskCard}) {

  const handleDeleteTaskCard = () => {
    let bufferList = [];

    const newTaskCardList = [
      ...taskCardList
    ]

    const deleteCard = newTaskCardList.splice(taskCardIndex, 1);
    bufferList = [...bufferList,...deleteCard[0].taskIdList];

    setDeleteTarget(bufferList);
    setIsDeleteModalOpen(true);

    setDeleteTaskCard([...newTaskCardList])

  }

  return (
    <Container>
      <IconButton aria-label="delete" color="error" onClick={handleDeleteTaskCard}>
        <DeleteIcon />
      </IconButton>
    </Container>
  );
}