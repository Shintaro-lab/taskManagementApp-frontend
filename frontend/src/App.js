import React from 'react';
import Header from './components/header/Header';
import Body from './components/body/Body';
import {Reset} from 'styled-reset';
import image from './images/backgroundWinter.webp';

import styled from 'styled-components';

const Container = styled.div`
    background: url(${image});
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-y: ${window.innerHeight < 600 ? "hidden" : "auto"};
    overflow-x: hidden;
`;

export default function App() {
  return (
    <Container>
      <Reset />
      <Header />
      <Body />
    </Container>
  );
}