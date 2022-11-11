import '@mui/lab/themeAugmentation';
import { createTheme, ThemeOptions } from '@mui/material';

export const muiThemeObject: ThemeOptions = {
    typography: {
        fontFamily: 'Roboto',
    },
    spacing: 8,
    palette: {
        info: { main: '#888888', light: '#EAEAEA' },
        background: {
            default: '#282828',
        },
        mode: 'dark',
        text: {
            primary: '#000000',
        },
        primary: { main: '#6A6AFF' },
        secondary: { main: '#EAEAEA' },
    },
};

const muiTheme = createTheme(muiThemeObject);

export default muiTheme;
