import '@mui/lab/themeAugmentation';
import { createTheme, ThemeOptions } from '@mui/material';

export const muiThemeObject: ThemeOptions = {
    typography: {
        fontFamily: 'Sora-CH',
    },
    spacing: 8,
    palette: {
        text: {
            primary: '#000000',
        },
        primary: { main: '#6A6AFF' },
        secondary: { main: '#9A9AFF' },
    },
    components: {
    },
};

const muiTheme = createTheme(muiThemeObject);

export default muiTheme;
