import {TaskCard} from "./TaskCard/TaskCard"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 5vw;
`;

export function TaskCards({taskCardList, setTaskCardList}) {

  const handleOnDragEnd = (result) => {

    if (result.destination === null) {
      return;
    }

    if (result.type !== "taskCards") {
  
      if (result.destination.droppableId === result.source.droppableId) {
  
        const newTaskCard = taskCardList.find((taskCard) => taskCard.id === result.source.droppableId);
        const newTaskList = Array.from(newTaskCard.taskList);
  
        const targetTask = newTaskList.splice(result.source.index, 1);
        newTaskList.splice(result.destination.index,0,targetTask[0]);
  
        const newTaskCardList = [
          ...taskCardList
        ]
  
        for (let i=0; i<newTaskCardList.length; i++) {
          if (newTaskCardList[i].id === result.source.droppableId) {
            newTaskCardList[i] = {id: result.source.droppableId,title: newTaskCardList[i].title,taskList: newTaskList}
          }
        }
        setTaskCardList(newTaskCardList);
  
      } else {
  
        const sourceTaskCard = taskCardList.find((taskCard) => taskCard.id === result.source.droppableId);
        const sourceTaskList = Array.from(sourceTaskCard.taskList);
        const targetTask = sourceTaskList.splice(result.source.index, 1);
  
        const destinationTaskCard = taskCardList.find((taskCard) => taskCard.id === result.destination.droppableId);
        const destinationTaskList = Array.from(destinationTaskCard.taskList);
        destinationTaskList.splice(result.destination.index,0,targetTask[0]);
  
        const newTaskCardList = [
          ...taskCardList
        ]
  
        for (let i=0; i<newTaskCardList.length; i++) {
          if (newTaskCardList[i].id === result.source.droppableId) {
            newTaskCardList[i] = {id: result.source.droppableId, title: newTaskCardList[i].title,taskList: sourceTaskList}
          }

          if (newTaskCardList[i].id === result.destination.droppableId) {
            newTaskCardList[i] = {id: result.destination.droppableId, title: newTaskCardList[i].title, taskList: destinationTaskList}
          }
        }
  
        setTaskCardList(newTaskCardList);
  
      }
    } else {
      const newTaskCardList = Array.from(taskCardList);
      const targetTaskCard = newTaskCardList.splice(result.source.index, 1);
      newTaskCardList.splice(result.destination.index,0,targetTaskCard[0]);
      setTaskCardList(newTaskCardList);
    }

  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="first-lane" direction="horizontal" type="taskCards">
        {(provided) => {
          return(
            <Container
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {taskCardList.map((taskCard,index) => {
                return (
                  <Draggable draggableId={taskCard.id} index={index} key={taskCard.id}>
                    {(provided) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}                    
                        >
                          <TaskCard
                            key={taskCard.id} taskCardId={taskCard.id} 
                            taskList={taskCard.taskList} setTaskCardList={setTaskCardList} taskCardList={taskCardList} taskCardIndex={index}
                          />
                        </div>
                      );
                    }}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </Container>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
}