import styled from "styled-components";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteFromTaskCardList, DeleteFromTaskList } from "../../../../../common/DeleteTaskUtil/DeleteTaskUtil";

const Container = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
`;

export function DeleteTaskButton({taskCardList,setTaskCardList,taskIdList,index,taskList,setTaskList}) {

  const deleteTask = () => {

    let bufferList = [];
    let deletedList = [];

    const newTaskIdList = Array.from(taskIdList);
    const deleteTaskID = newTaskIdList.splice(index,1);

    bufferList = [...bufferList,...deleteTaskID];

    while (bufferList.length > 0) {

      deletedList = [...deletedList,...bufferList];
      [bufferList,taskList] = DeleteFromTaskList(setTaskList,taskList,bufferList);
    }

    DeleteFromTaskCardList(setTaskCardList,taskCardList,deletedList);

  }

  return (
    <Container>
      <IconButton aria-label="delete" onClick={deleteTask} size="small">
        <DeleteIcon />
      </IconButton>
    </Container>
  );
}