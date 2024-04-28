import styled from "styled-components";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteFromTaskCardList, DeleteFromTaskList} from "../../../../../common/DeleteTaskUtil/DeleteTaskUtil";

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

export function DeleteTaskCard({taskCardList, setTaskCardList, taskCardIndex, setTaskList, taskList}) {

  const handleDeleteTaskCard = () => {
    let bufferList = [];
    let deletedList = [];

    const newTaskCardList = [
      ...taskCardList
    ]

    const deleteCard = newTaskCardList.splice(taskCardIndex, 1);
    bufferList = [...bufferList,...deleteCard[0].taskIdList];

    while (bufferList.length > 0) {

      deletedList = [...deletedList,...bufferList];
      [bufferList,taskList] = DeleteFromTaskList(setTaskList,taskList,bufferList);
    }

    DeleteFromTaskCardList(setTaskCardList,newTaskCardList,deletedList);

  }

  return (
    <Container>
      <IconButton aria-label="delete" color="error" onClick={handleDeleteTaskCard}>
        <DeleteIcon />
      </IconButton>
    </Container>
  );
}