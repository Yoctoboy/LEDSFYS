import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import { RedSlider, GreenSlider, BlueSlider } from '../StyledSlider';
import { SubmitButton } from '../SubmitButton';
import { styled } from '@mui/material/styles';
import { API_URL } from '../../constants';
import { ColorValues, toColorString } from './utils';

const submitPlainColor = async (colorValues: ColorValues): Promise<void> => {
    await fetch(API_URL + '/update', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ mode: 'static', params: { color: toColorString(colorValues) } }),
    });
};

export function PlainColorMode() {
    const [colorValues, setColorValues] = useState<ColorValues>({
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

    const sliderProps = {
        min: 0,
        max: 255,
        step: 1,
    };

    return (
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
            <Box sx={{ width: '78%', marginBottom: '50px', marginTop: '60px' }}>
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
