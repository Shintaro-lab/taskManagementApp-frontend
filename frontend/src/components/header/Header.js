import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90px;
    background-color: #A2B9C8;
`;

const H1 = styled.h1`
    color: white;
    white-space: nowrap;
    font-size: 45px;
`;

export default function Header() {
  return (
    <Container>
      <H1>Task Management App</H1>
    </Container>
  );
}