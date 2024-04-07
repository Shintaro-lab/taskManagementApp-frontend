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
`;

export function TaskCard({taskList,setTaskCardList,taskCardId,taskCardList,taskCardIndex}) {

  return (
    <Container>
      <TaskCardHeader taskCardList={taskCardList} setTaskCardList={setTaskCardList} taskCardId={taskCardId} taskCardIndex={taskCardIndex}/>
      <NewTask taskList={taskList} setTaskCardList={setTaskCardList} taskCardId={taskCardId} taskCardList={taskCardList}/>
      <Droppable droppableId={taskCardId}>
        {(provided) => {
          return (
            <DroppableContainer
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {taskList.map((task,index) => {
                return (
                  <Task key={task.id} task={task} taskList={taskList} 
                  setTaskCardList={setTaskCardList} index={index} taskCardList={taskCardList} taskCardId={taskCardId}/>
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