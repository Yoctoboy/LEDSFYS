import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import StyledSlider from '../StyledSlider';
import { SubmitButton } from '../SubmitButton';
import { styled } from '@mui/material/styles';
import { color } from '@mui/system';

const submitPlainColor = (colors): void => {
    console.log(colors);
};

const RedSlider = styled(StyledSlider)(() => ({
    color: '#FF0000',
}));
const GreenSlider = styled(StyledSlider)(() => ({
    color: '#00FF00',
}));
const BlueSlider = styled(StyledSlider)(() => ({
    color: '#0000FF',
}));

export function PlainColorMode() {
    const [colorValues, setColorValues] = useState({
        red: 127,
        green: 127,
        blue: 127,
    });
    const handleRedChange = (_event: unknown, newValue: number) => {
        setColorValues({ ...colorValues, red: newValue });
    };
    const handleGreenChange = (_event: unknown, newValue: number) => {
        setColorValues({ ...colorValues, green: newValue });
    };
    const handleBlueChange = (_event: unknown, newValue: number) => {
        setColorValues({ ...colorValues, blue: newValue });
    };
    const toColorString = (colorValues) => {
        return (
            '#' +
            colorValues.red.toString(16).padStart(2, '0') +
            colorValues.green.toString(16).padStart(2, '0') +
            colorValues.blue.toString(16).padStart(2, '0')
        ).toLocaleUpperCase();
    };

    const sliderProps = {
        min: 0,
        max: 255,
        step: 1,
    };

    return (
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
            <Box sx={{ width: '78%', marginBottom: '50px' }}>
                <RedSlider value={colorValues.red} onChange={handleRedChange} {...sliderProps} />
                <GreenSlider
                    value={colorValues.green}
                    onChange={handleGreenChange}
                    {...sliderProps}
                />
                <BlueSlider value={colorValues.blue} onChange={handleBlueChange} {...sliderProps} />
            </Box>
            <SubmitButton
                onClick={() => submitPlainColor(colorValues)}
                backgroundColor={toColorString(colorValues)}
                iconSxProps={{ color: '#000000' }}
            />
        </Grid>
    );
}
