import { useState } from "react";

import {v4 as uuid} from "uuid";
import { TextField } from "@mui/material";

export function NewTask({taskIdList, setTaskCardList, taskCardId, taskCardList, taskList, setTaskList}) {

  const [newTaskName, setNewTaskName] = useState("");

  function addTask(event) {

    const id = uuid();

    const newTaskIdList = [
      ...taskIdList,
      id
    ];

    const newTaskList = [
      ...taskList,
      {id: id, name: event.target.value, parentTaskId: "", childrenTaskIdList: [], color: "white"}
    ];

    const newTaskCardList = Array.from(taskCardList);
    for (let i=0; i<taskCardList.length; i++) {
      if (taskCardList[i].id === taskCardId) {
        newTaskCardList[i] = {id: taskCardId, title: newTaskCardList[i].title,taskIdList: newTaskIdList}
      }
    }

    setTaskCardList(newTaskCardList);
    setTaskList(newTaskList);
    setNewTaskName("");
  }

  function handleSubmit(event) {
    if ((event.key === "Enter" && event.target.value !== "") || (event.type === "blur" && event.target.value !== "")) {
      event.preventDefault();
      addTask(event);
    }
  }

  return (
    <TextField label="Add a new Task" variant="outlined"
        margin="normal" fullWidth
        value={newTaskName}
        onChange={(event) => setNewTaskName(event.target.value)}
        onKeyDown={handleSubmit}
        onBlur={handleSubmit}
        sx={{backgroundColor: "white"}}
      />
  );
}