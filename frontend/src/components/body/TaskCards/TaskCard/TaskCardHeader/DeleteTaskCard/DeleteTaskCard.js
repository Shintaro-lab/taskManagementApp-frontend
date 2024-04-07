import styled from "styled-components";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

export function DeleteTaskCard({taskCardList, setTaskCardList, taskCardIndex}) {

  const handleDeleteTaskCard = () => {
    const newTaskCardList = [
      ...taskCardList
    ]

    newTaskCardList.splice(taskCardIndex, 1);
    setTaskCardList(newTaskCardList);
  }

  return (
    <Container>
      <IconButton aria-label="delete" color="error" onClick={handleDeleteTaskCard}>
        <DeleteIcon />
      </IconButton>
    </Container>
  );
}