import styled from "styled-components";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Container = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
`;

export function DeleteTaskButton({taskIdList,index,setDeleteTarget,setIsDeleteModalOpen}) {

  const deleteTask = () => {

    let bufferList = [];

    const newTaskIdList = Array.from(taskIdList);
    const deleteTaskID = newTaskIdList.splice(index,1);

    bufferList = [...bufferList,...deleteTaskID];
    setDeleteTarget(bufferList);

    setIsDeleteModalOpen(true);

  }

  return (
    <Container>
      <IconButton aria-label="delete" onClick={deleteTask} size="small">
        <DeleteIcon />
      </IconButton>
    </Container>
  );
}