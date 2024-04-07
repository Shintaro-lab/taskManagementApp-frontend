import styled from 'styled-components';

const Container = styled.div`
    text-align: center;
    height: 10vh;
    background-color: #A2B9C8;
`;

const H1 = styled.h1`
    color: white;
    padding-top: 4vh;
    font-size: 4vh;
`;

export default function Header() {
  return (
    <Container>
      <H1>Task Management App</H1>
    </Container>
  );
}