import { DeleteTaskButton } from "./DeleteTaskButton/DeleteTaskButton";
import styled from "styled-components";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  display: flex;
  box-shadow: 1px 1px 1px 1px rgb(75,75,75);
  background-color: white;
  min-height: 7vh;
  border-radius: 2%;
  position: relative;
`;

const TaskContainer = styled.p`
  margin-left: 1vw;
  margin-top: 1vh;
  width: 12vw;
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

export function Task({task,taskList,setTaskCardList,index,taskCardList,taskCardId}) {
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
        return {id: task.id, name: event.target.value};
      }
      return taskItem;
    });

    const newTaskCardList = Array.from(taskCardList);

    for (let i=0; i<taskCardList.length; i++) {
      if (taskCardList[i].id === taskCardId) {
        newTaskCardList[i] = {id: taskCardId, title: newTaskCardList[i].title, taskList: newTaskList}
      }
    }

    setTaskCardList(newTaskCardList);
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
            <DeleteTaskButton taskCardList={taskCardList} setTaskCardList={setTaskCardList} 
              taskCardId={taskCardId} taskList={taskList} index={index}/>
          </Container>
        );
      }}
    </Draggable>
  );
}