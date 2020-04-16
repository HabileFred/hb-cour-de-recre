import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    transform: rotate(-90deg);
    transform-origin: left top;
    width: 100vh;
    height: 100vw;
    overflow-x: hidden;
    position: absolute;
    top: 100%;
    left: 0;
  }

  * {
    -ms-touch-action: manipulation;
    touch-action: manipulation;
  }

  html,
  body {
    height: 100%;
    width: 100%;
    background: black;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
  }

  #app {
  }

  p,
  label {
    line-height: 1.5em;
  }
`;

export default GlobalStyle;
