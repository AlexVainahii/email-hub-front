import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

import { css } from '@emotion/react';
const override = css`
  display: block;
  margin: 0 auto;
`;
const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const moveAnimation = keyframes`
0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-20vh); 
  }
`;
const moveAnimation1 = keyframes`
0% {
    transform: translateX(-50vh);
  }
20%{
    transform: translateX(40vh);
}
  100% {
    transform: translateX(70vh); 
  }
`;
const ContainerR = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-size: cover;
  background-position: center;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
`;
const Img = styled.img`
  width: 120vw;
  height: 100vh;
  position: absolute;
  left: -20;
  animation: ${moveAnimation} 3s linear infinite;
`;
const Img1 = styled.img`
  max-width: 30%;
  max-height: 30vh;
  position: absolute;

  animation: ${moveAnimation1} 3s linear forwards;
`;

const TransparentBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: none; /* Прозорий чорний фон */
`;

export { ContainerR, Img, Img1, TransparentBackground, override };
