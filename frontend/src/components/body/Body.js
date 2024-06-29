import {TaskCards} from "./TaskCards/TaskCards";
import {AddTaskCardsButton} from "./AddTaskCardsButton/AddTaskCardsButton";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { DrawerModule } from "./DrawerModule/DrawerModule";
import { DeleteModal } from "./DeleteModal/DeleteModal";
import { DeleteFromTaskCardList, DeleteFromTaskList } from "../common/DeleteTaskUtil/DeleteTaskUtil";

const Container = styled.div`
    display: flex;
    gap: 5vw;
    padding-left: 60px;
    padding-top: 20px;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    overflow-x: auto;
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
      childrenTaskIdList: ["1"],
      color: "white"
    },
    {
      id: "1",
      name: "Task2",
      parentTaskId: "0",
      childrenTaskIdList: [],
      color: "white"
    }
  ]);
  */

  const [openDrawer,setOpenDrawer] = useState(false);
  const [selectedTaskIDByOpenDrawer,setSelectedTaskIDByOpenDrawer] = useState("");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState([]);
  const [deleteTaskCard, setDeleteTaskCard] = useState([]);

  async function getLatestData() {

    const responseForTask = await fetch('http://localhost:8080/tm/getLatestTaskData');
    const dataForTask = await responseForTask.json();

    setTaskList(dataForTask);

    const responseForTaskCard = await fetch('http://localhost:8080/tm/getLatestTaskCardData');
    const dataForTaskCard = await responseForTaskCard.json();

    // for test
    /* 
    const dataForTaskCard = [
      {
        id: "card-1",
        title: "TODO",
        taskIdList: ["0","1"]
      }
    ];
    */

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
  
  const confirmDelete = () => {

    let bufferList = [];
    let deletedList = [];

    bufferList = [...bufferList,...deleteTarget];
    let bufferTaskList = [...taskList];

    while (bufferList.length > 0) {

      deletedList = [...deletedList,...bufferList];
      [bufferList,bufferTaskList] = DeleteFromTaskList(setTaskList,bufferTaskList,bufferList);
    
    }

    if (deleteTaskCard.length > 0) {
      DeleteFromTaskCardList(setTaskCardList,deleteTaskCard,deletedList);
    } else {
      DeleteFromTaskCardList(setTaskCardList,taskCardList,deletedList);
    }

    setDeleteTarget([]);
    setIsDeleteModalOpen(false);
    setDeleteTaskCard([]);
  }

  const confirmClose = () => {
    setIsDeleteModalOpen(false);
    setDeleteTarget([]);
    setDeleteTaskCard([]);
  }

  return (
    <div style={{position: 'relative',flexGrow: '1'}}>
      <Container>
          <TaskCards taskCardList={taskCardList} setTaskCardList={setTaskCardList} 
            taskList={taskList} setTaskList={setTaskList} 
            setOpenDrawer={setOpenDrawer} setSelectedTaskIDByOpenDrawer={setSelectedTaskIDByOpenDrawer} 
            setDeleteTarget={setDeleteTarget} setIsDeleteModalOpen={setIsDeleteModalOpen} setDeleteTaskCard={setDeleteTaskCard}/>
          <AddTaskCardsButton taskCardList={taskCardList} setTaskCardList={setTaskCardList}/>
      </Container>
      <DrawerModule openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} 
        taskList={taskList} setTaskList={setTaskList} 
        taskCardList={taskCardList} setTaskCardList={setTaskCardList} 
        selectedTaskIDByOpenDrawer={selectedTaskIDByOpenDrawer} setSelectedTaskIDByOpenDrawer={setSelectedTaskIDByOpenDrawer}
        setDeleteTarget={setDeleteTarget} setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
      <DeleteModal isOpen={isDeleteModalOpen} onClose={confirmClose} onDelete={confirmDelete}/>
    </div>
  );
}