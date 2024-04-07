import {Title} from "./Title/Title";
import {DeleteTaskCard} from "./DeleteTaskCard/DeleteTaskCard";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  position: relative;
`;

export function TaskCardHeader({taskCardList, setTaskCardList, taskCardId, taskCardIndex}) {
  return (
    <Container>
      <Title taskCardList={taskCardList} setTaskCardList={setTaskCardList} taskCardId={taskCardId} taskCardIndex={taskCardIndex}/>
      <DeleteTaskCard taskCardList={taskCardList} setTaskCardList={setTaskCardList} taskCardIndex={taskCardIndex}/>
    </Container>
  );
}