import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import React from 'react';
import ReactDOM from 'react-dom';
import BasicTabs from './BasicTabs';
import muiTheme from './muiTheme';


const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <BasicTabs />
    </ThemeProvider>
  );
};

export default App;


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
