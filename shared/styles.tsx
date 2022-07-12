import { css, Global } from '@emotion/react';

export const media = {
  maxMobile: '@media(max-width:800px)',
  minlaptop: '@media(min-width: 800px)',
  laptop: '@media(min-width: 1000px)',
  desktop: '@media(min-width: 1400px)',
  large: '@media(min-width: 1600px)',
  tablet: '@media(min-width:768px)',
  maxLarge: '@media(max-width:2560px)',
};

export const globalStyles = (
  <Global
    styles={css`
      * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
      }
      @media (max-width: 1080px) {
        html {
          font-size: 93.75%;
        }
      }
      @media (max-width: 720px) {
        html {
          font-size: 87.5%;
        }
      }

      body {
        background: #ffffff;
        overflow-x: hidden;
      }
      body,
      input,
      button {
        font-size: 14px;
        font-family: 'Inter', sans-serif;
      }
      button {
        cursor: pointer;
      }

      *::-webkit-scrollbar {
        width: 4px;
      }

      *::-webkit-scrollbar-track {
        background: #222222;
      }

      *::-webkit-scrollbar-thumb {
        background-color: #7e7e7e;
        border-radius: 20px;
      }
    `}
  />
);
