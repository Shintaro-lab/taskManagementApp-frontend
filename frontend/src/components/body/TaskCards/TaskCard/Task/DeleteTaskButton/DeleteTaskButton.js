import styled from "styled-components";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Container = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
`;

export function DeleteTaskButton({taskCardList,setTaskCardList,taskCardId,taskList,index}) {

  const deleteTask = () => {

    const newTaskList = Array.from(taskList);
    newTaskList.splice(index,1);

    const newTaskCardList = Array.from(taskCardList);

    for (let i=0; i<taskCardList.length; i++) {
      if (taskCardList[i].id === taskCardId) {
        
        newTaskCardList[i] = {id: taskCardId, title: newTaskCardList[i].title, taskList: newTaskList};
        setTaskCardList(newTaskCardList);
      }
    }
  }

  return (
    <Container>
      <IconButton aria-label="delete" onClick={deleteTask}>
        <DeleteIcon />
      </IconButton>
    </Container>
  );
}