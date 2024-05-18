import {TaskCard} from "./TaskCard/TaskCard"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 5vw;
  height: 100%;
`;

export function TaskCards({taskCardList, setTaskCardList,setOpenDrawer,taskList,setTaskList,setSelectedTaskIDByOpenDrawer}) {

  const handleOnDragEnd = (result) => {

    if (result.destination === null) {
      return;
    }

    if (result.type !== "taskCards") {
  
      if (result.destination.droppableId === result.source.droppableId) {

        const newTaskCard = taskCardList.find((taskCard) => taskCard.id === result.source.droppableId);
        const newTaskIdList = Array.from(newTaskCard.taskIdList);
  
        const targetTaskId = newTaskIdList.splice(result.source.index, 1);
        newTaskIdList.splice(result.destination.index,0,targetTaskId[0]);

        
  
        const newTaskCardList = [
          ...taskCardList
        ]
  
        for (let i=0; i<newTaskCardList.length; i++) {
          if (newTaskCardList[i].id === result.source.droppableId) {
            newTaskCardList[i] = {id: result.source.droppableId,title: newTaskCardList[i].title,taskIdList: newTaskIdList}
          }
        }

        setTaskCardList(newTaskCardList);
  
      } else {
  
        const sourceTaskCard = taskCardList.find((taskCard) => taskCard.id === result.source.droppableId);
        const sourceTaskIdList = Array.from(sourceTaskCard.taskIdList);
        const targetTaskId = sourceTaskIdList.splice(result.source.index, 1);
  
        const destinationTaskCard = taskCardList.find((taskCard) => taskCard.id === result.destination.droppableId);
        const destinationTaskIdList = Array.from(destinationTaskCard.taskIdList);
        destinationTaskIdList.splice(result.destination.index,0,targetTaskId[0]);
  
        const newTaskCardList = [
          ...taskCardList
        ]
  
        for (let i=0; i<newTaskCardList.length; i++) {
          if (newTaskCardList[i].id === result.source.droppableId) {
            newTaskCardList[i] = {id: result.source.droppableId, title: newTaskCardList[i].title,taskIdList: sourceTaskIdList}
          }

          if (newTaskCardList[i].id === result.destination.droppableId) {
            newTaskCardList[i] = {id: result.destination.droppableId, title: newTaskCardList[i].title, taskIdList: destinationTaskIdList}
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
                            taskIdList={taskCard.taskIdList} setTaskCardList={setTaskCardList} taskCardList={taskCardList} 
                            taskCardIndex={index} setOpenDrawer={setOpenDrawer} taskList={taskList} setTaskList={setTaskList}
                            setSelectedTaskIDByOpenDrawer={setSelectedTaskIDByOpenDrawer}
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