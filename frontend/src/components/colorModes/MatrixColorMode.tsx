import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import StyledSlider, { BlueSlider, GreenSlider } from '../StyledSlider';
import { SubmitButton } from '../SubmitButton';
import { styled } from '@mui/material/styles';
import { API_URL } from '../../constants';

import { ColorValues, toColorString } from './utils';
import { RedSlider } from '../StyledSlider';

interface MatrixParams {
    trailSpeed: number;
    averageTrailLength: number;
}

const submitMatrixColor = async (
    colorValues: ColorValues,
    matrixParams: MatrixParams
): Promise<void> => {
    await fetch(API_URL + '/update', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            mode: 'matrix',
            params: {
                color: toColorString(colorValues),
                ...matrixParams,
            },
        }),
    });
};

export function MatrixColorMode() {
    const [colorValues, setColorValues] = useState<ColorValues>({
        red: 127,
        green: 127,
        blue: 127,
    });
    const [matrixParams, setMatrixParams] = useState<MatrixParams>({
        trailSpeed: 3,
        averageTrailLength: 3,
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
    const handleTrailSpeedChange = (_event: unknown, newValue: number) => {
        setMatrixParams({ ...matrixParams, trailSpeed: newValue });
    };
    const handleAverageTrailLengthChange = (_event: unknown, newValue: number) => {
        setMatrixParams({ ...matrixParams, averageTrailLength: newValue });
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
                Speed
                <StyledSlider
                    value={matrixParams.trailSpeed}
                    onChange={handleTrailSpeedChange}
                    min={1}
                    max={10}
                    scale={(value) => value * value}
                    step={1}
                />
                Length
                <StyledSlider
                    value={matrixParams.averageTrailLength}
                    onChange={handleAverageTrailLengthChange}
                    min={2}
                    max={20}
                    scale={(value) => value * value}
                    step={1}
                />
            </Box>
            <SubmitButton
                onClick={() => submitMatrixColor(colorValues, matrixParams)}
                backgroundColor={toColorString(colorValues)}
                iconSxProps={{ color: '#000000' }}
            />
        </Grid>
    );
}
