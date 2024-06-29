import { ListItem, ListItemText, TextField } from "@mui/material";
import styled from "styled-components";
import { DeleteSubTaskButton } from "./DeleteSubTaskButton/DeleteSubTaskButton";
import { useState } from "react";

const StyledListItem = styled(ListItem).attrs({
    divider: true
})`
    &:hover {
        background-color: #f0f0f0;
    };
`;


export function SubTaskModule({subTask,subTaskID,taskList,setTaskList,taskCardList,setTaskCardList,setDeleteTarget,setIsDeleteModalOpen}) {
    const [changeStatus, setChangeStatus] = useState(false);

    const handleSubmit = (event) => {

        event.preventDefault();

        const newTaskList = taskList.map((taskItem) => {
            if (taskItem.id === subTaskID) {
                return {id: taskItem.id, name: event.target.value, parentTaskId: taskItem.parentTaskId, 
                    childrenTaskIdList: taskItem.childrenTaskIdList, color: taskItem.color};
            }
            return taskItem;
        });

        setTaskList(newTaskList);
        setChangeStatus(false);
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSubmit(event);
        }
    }

    return (
        <div>
            {changeStatus ?
                <TextField onBlur={handleSubmit}
                    defaultValue={subTask.name} 
                    autoFocus onKeyDown={handleKeyDown}/>
                :
                <StyledListItem>
                    <ListItemText primary={subTask.name} onClick={() => setChangeStatus(true)}/>
                    <DeleteSubTaskButton subTaskID={subTask.id} taskList={taskList} setTaskList={setTaskList}
                        taskCardList={taskCardList} setTaskCardList={setTaskCardList} 
                        setDeleteTarget={setDeleteTarget} setIsDeleteModalOpen={setIsDeleteModalOpen}
                    />
                </StyledListItem>
                }
        </div>
        
    );
}