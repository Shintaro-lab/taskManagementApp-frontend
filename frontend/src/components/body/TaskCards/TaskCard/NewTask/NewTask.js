import styled from "styled-components";
import { useState } from "react";

import {v4 as uuid} from "uuid";

const Container = styled.div`
  box-shadow: 1px 1px 1px 1px rgb(75,75,75);
  background-color: #D3D3D3;
  height: 7vh;
  border-radius: 2%;
  margin-bottom: 2vh;
`;

const Input = styled.input`
  width: 10vw;
  border: none;
  outline: none;
  margin-left: 1vw;
  margin-top: 1vh;
`;

export function NewTask({taskList, setTaskCardList, taskCardId, taskCardList}) {

  const [newTaskName, setNewTaskName] = useState("");

  function addTask(event) {

    const newTaskList = [
      ...taskList,
      {id: uuid(), name: event.target.children[0].value}
    ];

    const newTaskCardList = Array.from(taskCardList);
    for (let i=0; i<taskCardList.length; i++) {
      if (taskCardList[i].id === taskCardId) {
        newTaskCardList[i] = {id: taskCardId, title: newTaskCardList[i].title,taskList: newTaskList}
      }
    }

    setTaskCardList(newTaskCardList);
    setNewTaskName("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    addTask(event);
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Input 
          type="text"
          placeholder="Add a new task"
          value={newTaskName}
          onChange={(event) => setNewTaskName(event.target.value)}
        />
      </form>
    </Container>
  );
}