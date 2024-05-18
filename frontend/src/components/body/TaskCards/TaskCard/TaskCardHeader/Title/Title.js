import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  margin-bottom: 5vh;
  margin-left: 1vw;
  margin-top: 1vh;
`;

const Input = styled.input`
  width: 200px;
  border: none;
  outline: none;
`;

export function Title({taskCardList, setTaskCardList, taskCardId,taskCardIndex}) {
  const [changeStatus, setChangeStatus] = useState(false);

  const changeTitle = (event) => {
    const newTaskCardList = [
      ...taskCardList
    ]

    newTaskCardList[taskCardIndex] = {id: taskCardId, title: event.target.value, taskIdList: taskCardList[taskCardIndex].taskIdList}
    setTaskCardList(newTaskCardList);
  }

  const handleTitleChange = () => {
    setChangeStatus(true);
  }

  const finishTitleChange = () => {
    setChangeStatus(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    finishTitleChange();
  }

  return (
    <Container >
      {changeStatus ? (
        <form onSubmit={handleSubmit}>
          <Input 
            type="text"
            autoFocus
            onChange={changeTitle}
            onBlur={finishTitleChange}
            value={taskCardList[taskCardIndex].title}
            maxLength="10"
          />
        </form>) : 
        <p onClick={handleTitleChange}>{taskCardList[taskCardIndex].title}</p>
      }
    </Container>
  );
}