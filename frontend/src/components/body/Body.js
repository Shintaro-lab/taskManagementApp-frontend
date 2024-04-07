import {TaskCards} from "./TaskCards/TaskCards";
import {AddTaskCardsButton} from "./AddTaskCardsButton/AddTaskCardsButton";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Container = styled.div`
    display: flex;
    gap: 5vw;
    margin-left: 5vw;
    margin-top: 2vh;
`;

export default function Body() {

  const [taskCardList,setTaskCardList] = useState([]);

  async function getLatestData() {
    const response = await fetch('http://localhost:8080/demo/getLatestData');
    const data = await response.json();
    return setTaskCardList(data);
  }  

  useEffect(() => {
    getLatestData();
  },[]);

  useEffect(() => {

    if (taskCardList.length !== 0) {

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskCardList)
      };

      fetch('http://localhost:8080/demo/updateData', requestOptions)
    }
    
  },[taskCardList]);

  return (
    <Container>
        <TaskCards taskCardList={taskCardList} setTaskCardList={setTaskCardList} />
        <AddTaskCardsButton taskCardList={taskCardList} setTaskCardList={setTaskCardList}/>
    </Container>
  );
}