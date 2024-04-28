import {TaskCards} from "./TaskCards/TaskCards";
import {AddTaskCardsButton} from "./AddTaskCardsButton/AddTaskCardsButton";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { DrawerModule } from "./DrawerModule/DrawerModule";

const Container = styled.div`
    display: flex;
    gap: 5vw;
    margin-left: 5vw;
    margin-top: 2vh;
`;

export default function Body() {

  const [taskCardList,setTaskCardList] = useState([]);
  const [taskList,setTaskList] = useState([]);
  const [firstDone, setFirstDone] = useState(false);

  /* for test
  const [taskList,setTaskList] = useState([
    {
      id: "0",
      name: "Task1",
      parentTaskId: "",
      childrenTaskIdList: ["1"]
    },
    {
      id: "1",
      name: "Task2",
      parentTaskId: "0",
      childrenTaskIdList: []
    }
  ]);
  */

  const [openDrawer,setOpenDrawer] = useState(false);
  const [selectedTaskIDByOpenDrawer,setSelectedTaskIDByOpenDrawer] = useState("");

  async function getLatestData() {

    const responseForTask = await fetch('http://localhost:8080/tm/getLatestTaskData');
    const dataForTask = await responseForTask.json();

    // for test
    /*
    const data = [
      {
        id: "card-1",
        title: "TODO",
        taskIDList: ["0","1"]
      }
    ];
    */
    setTaskList(dataForTask);

    const responseForTaskCard = await fetch('http://localhost:8080/tm/getLatestTaskCardData');
    const dataForTaskCard = await responseForTaskCard.json();

    setTaskCardList(dataForTaskCard);
    setFirstDone(true);

  }  

  useEffect(() => {

    getLatestData();
  },[]);

  useEffect(() => {

    if (firstDone === false) {
      return;
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskCardList)
    };

    fetch('http://localhost:8080/tm/updateTaskCardData', requestOptions);

  },[taskCardList]);

  useEffect(() => {

    if (firstDone === false) {
      return;
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskList)
    };

    fetch('http://localhost:8080/tm/updateTaskData', requestOptions);
      
    },[taskList]);

  return (
    <div>
      <Container>
          <TaskCards taskCardList={taskCardList} setTaskCardList={setTaskCardList} 
            taskList={taskList} setTaskList={setTaskList} 
            setOpenDrawer={setOpenDrawer} setSelectedTaskIDByOpenDrawer={setSelectedTaskIDByOpenDrawer}/>
          <AddTaskCardsButton taskCardList={taskCardList} setTaskCardList={setTaskCardList}/>
      </Container>
      <DrawerModule openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} 
        taskList={taskList} setTaskList={setTaskList} 
        taskCardList={taskCardList} setTaskCardList={setTaskCardList} 
        selectedTaskIDByOpenDrawer={selectedTaskIDByOpenDrawer} setSelectedTaskIDByOpenDrawer={setSelectedTaskIDByOpenDrawer}
      />
    </div>
  );
}