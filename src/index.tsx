import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ThemeOptions,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const customBreakpointValues = {
  values: {
    xs: 0,
    sm: 600,
    md: 905,
    lg: 1240,
    xl: 1440,
  },
};

const baseThemeConfigs: ThemeOptions = {
  breakpoints: {
    ...customBreakpointValues,
  }
};

const baseTheme = createTheme(baseThemeConfigs);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={baseTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
