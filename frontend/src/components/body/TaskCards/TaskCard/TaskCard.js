import { NewTask } from "./NewTask/NewTask";
import { Task } from "./Task/Task";
import { TaskCardHeader } from "./TaskCardHeader/TaskCardHeader";
import styled from "styled-components";
import {Droppable} from "react-beautiful-dnd";

const Container = styled.div`
  background-color: white;
  width: 15vw;
  height: 70vh;
`;

const DroppableContainer = styled.div`
  background-color: gray;
  height: 70vh;
  overflow-y: auto;
`;

export function TaskCard({taskIdList,setTaskCardList,taskCardId,taskCardList,taskCardIndex,setOpenDrawer,
  taskList,setTaskList,setSelectedTaskIDByOpenDrawer}) {

  return (
    <Container>
      <TaskCardHeader taskCardList={taskCardList} setTaskCardList={setTaskCardList} taskCardId={taskCardId} 
        taskCardIndex={taskCardIndex} taskList={taskList} setTaskList={setTaskList}/>
      <NewTask taskIdList={taskIdList} setTaskCardList={setTaskCardList} taskCardId={taskCardId} 
        taskCardList={taskCardList} taskList={taskList} setTaskList={setTaskList}/>
      <Droppable droppableId={taskCardId}>
        {(provided) => {
          return (
            <DroppableContainer
              data-testid="DroppableContainerInTaskCard"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {taskIdList.map((id,index) => {

                const task = taskList.find(task => task.id === id);
                const parentTaskName = task.parentTaskId === "" ? "" : 
                  taskList.find(taskItem => taskItem.id === task.parentTaskId).name;

                return (
                  <Task key={task.id} task={task} taskIdList={taskIdList} 
                    setTaskCardList={setTaskCardList} index={index} taskCardList={taskCardList}
                    taskCardId={taskCardId} setOpenDrawer={setOpenDrawer} taskList={taskList} setTaskList={setTaskList}
                    setSelectedTaskIDByOpenDrawer={setSelectedTaskIDByOpenDrawer} parentTaskName={parentTaskName}
                  />
                );
              })}
              {provided.placeholder}
            </DroppableContainer>   
          );
        }}
      </Droppable>
    </Container>
  );
}