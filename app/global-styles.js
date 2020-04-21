import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    position: absolute;
  }

  * {
    -ms-touch-action: manipulation;
    touch-action: manipulation;
  }

  html,
  body {
    background: black;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
  }

  #app {
    display: flex;
    flex-flow: column;
    justify-content: start;
    height: 100%;
  }

  @media screen and (min-height: 780px) {
    #app {
      justify-content: center;
    }
  }

  p,
  label {
    line-height: 1.5em;
  }
`;

export default GlobalStyle;
