import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { StrictMode } from 'react';
import React from 'react';
import ReactDOM from 'react-dom/client';
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

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
