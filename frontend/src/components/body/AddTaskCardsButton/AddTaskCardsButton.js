import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';
import {v4 as uuid} from 'uuid';

export function AddTaskCardsButton({taskCardList, setTaskCardList}) {
  const handleOnClcik = () => {
    const newId = "card-" + uuid();

    const newTaskCardList = [
      ...taskCardList,
      {
        id: newId,
        title: "title",
        taskList: []
      }
    ];

    setTaskCardList(newTaskCardList);
  }

  return (
    <div>
      <IconButton aria-label="add" color="warning" onClick={handleOnClcik}>
        <AddBoxIcon />
      </IconButton>
    </div>
  );
}