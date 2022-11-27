import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import StyledSlider from '../StyledSlider';
import { SubmitButton } from '../SubmitButton';
import { styled } from '@mui/material/styles';
import { API_URL } from '../../constants';

import { ColorValues, toColorString } from './utils';

interface MatrixParams {
    trailSpeedSliderPosition?: number;
    trailSpeed: number;
    averageTrailLengthSliderPosition: number;
    averageTrailLength: number;
}

const submitMatrixColor = async (
    colorValues: ColorValues,
    matrixParams: MatrixParams
): Promise<void> => {
    await fetch(API_URL + 'update', {
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
        trailSpeedSliderPosition: 6,
        trailSpeed: 36,
        averageTrailLengthSliderPosition: 8,
        averageTrailLength: 64,
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
        setMatrixParams({
            ...matrixParams,
            trailSpeedSliderPosition: newValue,
            trailSpeed: newValue * newValue,
        });
    };
    const handleAverageTrailLengthChange = (_event: unknown, newValue: number) => {
        setMatrixParams({
            ...matrixParams,
            averageTrailLengthSliderPosition: newValue,
            averageTrailLength: newValue * newValue,
        });
    };

    const sliderProps = {
        min: 0,
        max: 255,
        step: 1,
    };

    return (
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
            <Box sx={{ width: '78%', marginBottom: '50px', marginTop: '60px' }}>
                <StyledSlider
                    value={colorValues.red}
                    onChange={handleRedChange}
                    {...sliderProps}
                    sx={{ color: '#FF0000' }}
                />
                <StyledSlider
                    value={colorValues.green}
                    onChange={handleGreenChange}
                    {...sliderProps}
                    sx={{ color: '#00FF00' }}
                />
                <StyledSlider
                    value={colorValues.blue}
                    onChange={handleBlueChange}
                    {...sliderProps}
                    sx={{ color: '#0000FF' }}
                />
                <Box
                    display="flex"
                    flexDirection="row"
                    maxWidth="100%"
                    justifyContent="space-between"
                    sx={{ marginTop: 1, marginBottom: 0, color: '#FFFFFF', fontSize: 40 }}
                >
                    <div>Slow</div>
                    <div>Fast</div>
                </Box>
                <StyledSlider
                    value={matrixParams.trailSpeedSliderPosition}
                    onChange={handleTrailSpeedChange}
                    min={2}
                    step={1}
                    max={15}
                    sx={{ color: toColorString(colorValues) }}
                />
                <Box
                    display="flex"
                    flexDirection="row"
                    maxWidth="100%"
                    justifyContent="space-between"
                    sx={{ marginTop: 1, marginBottom: 0, color: '#FFFFFF', fontSize: 40 }}
                >
                    <div>Short</div>
                    <div>Long</div>
                </Box>
                <StyledSlider
                    value={matrixParams.averageTrailLengthSliderPosition}
                    onChange={handleAverageTrailLengthChange}
                    min={2}
                    step={1}
                    max={20}
                    sx={{ color: toColorString(colorValues) }}
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
