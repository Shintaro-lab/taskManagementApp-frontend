import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export function DeleteSubTaskButton({subTaskID,setDeleteTarget,setIsDeleteModalOpen}) {

    const deleteSubTask = () => {

        let bufferList = [];

        bufferList = [...bufferList,subTaskID];

        setDeleteTarget(bufferList);
        setIsDeleteModalOpen(true);

    }

    return (
        <div>
            <IconButton aria-label="delete" onClick={deleteSubTask}>
                <DeleteIcon />
            </IconButton>
        </div>
    );
}