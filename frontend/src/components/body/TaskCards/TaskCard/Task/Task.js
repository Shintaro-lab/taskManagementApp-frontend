import { DeleteTaskButton } from "./DeleteTaskButton/DeleteTaskButton";
import styled from "styled-components";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { OpenDrawerButton } from "./OpenDrawerButton/OpenDrawerButton";
import { Typography } from "@mui/material";

const Container = styled.div`
  display: flex;
  box-shadow: 1px 1px 1px 1px rgb(75,75,75);
  background-color: white;
  min-height: 10vh;
  border-radius: 2%;
  position: relative;
  margin-bottom: 0.5vh;
`;

const TaskContainer = styled.p`
  margin-left: 1vw;
  margin-top: 1vh;
  width: 11vw;
  overflow-wrap: anywhere;
`;

const Input = styled.input`
  margin-left: 1vw;
  margin-top: 1vh;
  width: 12vw;
  overflow-wrap: anywhere;
  border: none;
  outline: none;
`;

const StyledTypography = styled(Typography)`
  color: gray;
  position: absolute;
  bottom: 1vh;
  left: 1vw;
  width: 11vw;
  overflow-wrap: anywhere;
`;

export function Task({task,taskIdList,setTaskCardList,index,taskCardList,taskCardId,setOpenDrawer,
  taskList,setTaskList,setSelectedTaskIDByOpenDrawer,parentTaskName}) {
  const [changeStatus, setChangeStatus] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    finishTaskNameChange();
  }

  const handleTaskNameChange = () => {
    setChangeStatus(true);
  }

  const changeTaskName = (event) => {
    const newTaskList = taskList.map((taskItem) => {
      if (taskItem.id === task.id) {
        return {
          id: task.id, 
          name: event.target.value, 
          parentTaskId: task.parentTaskId, 
          childrenTaskIdList: task.childrenTaskIdList
        };
      }
      return taskItem;
    });

    setTaskList(newTaskList);
  }

  const finishTaskNameChange = () => {
    setChangeStatus(false);
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => {
        return (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {changeStatus ? (
              <form onSubmit={handleSubmit}>
                <Input 
                  type="text"
                  autoFocus
                  onChange={changeTaskName}
                  onBlur={finishTaskNameChange}
                  value={task.name}
                />
              </form>
            ): 
            <TaskContainer onClick={handleTaskNameChange}>{task.name}</TaskContainer>}
            <OpenDrawerButton setOpenDrawer={setOpenDrawer} setSelectedTaskIDByOpenDrawer={setSelectedTaskIDByOpenDrawer}
              taskID={task.id}
            />
            <DeleteTaskButton taskCardList={taskCardList} setTaskCardList={setTaskCardList} 
              taskCardId={taskCardId} taskIdList={taskIdList} index={index} taskList={taskList} setTaskList={setTaskList}/>
            {parentTaskName !== "" ? (
              <StyledTypography variant="string" component="p">
                {parentTaskName}
              </StyledTypography>
            ): null
            }
          </Container>
        );
      }}
    </Draggable>
  );
}