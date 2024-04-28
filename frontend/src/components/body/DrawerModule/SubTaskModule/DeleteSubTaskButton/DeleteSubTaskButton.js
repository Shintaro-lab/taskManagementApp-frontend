import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteFromTaskCardList, DeleteFromTaskList } from "../../../../common/DeleteTaskUtil/DeleteTaskUtil";

export function DeleteSubTaskButton({subTaskID,taskList,setTaskList,
    taskCardList,setTaskCardList}) {

    const deleteSubTask = () => {

        let bufferList = [];
        let deletedList = [];

        bufferList = [...bufferList,subTaskID];

        while (bufferList.length > 0) {

            deletedList = [...deletedList,...bufferList];
            [bufferList,taskList] = DeleteFromTaskList(setTaskList,taskList,bufferList);
        }
      
        DeleteFromTaskCardList(setTaskCardList,taskCardList,deletedList);

    }

    return (
        <div>
            <IconButton aria-label="delete" onClick={deleteSubTask}>
                <DeleteIcon />
            </IconButton>
        </div>
    );
}