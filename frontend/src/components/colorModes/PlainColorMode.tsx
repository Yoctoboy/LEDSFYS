import React, { useState } from 'react'
import { Box, Grid } from '@mui/material';
import StyledSlider from '../StyledSlider';
import { SubmitButton } from '../SubmitButton';

const submitPlainColor = (red: number, green: number, blue: number): void => {
    console.log(red, green, blue);
}

export function PlainColorMode() {

    const [redValue, setRedValue] = useState(0);
    const [greenValue, setGreenValue] = useState(0);
    const [blueValue, setBlueValue] = useState(0);

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <Box sx={{ width: "78%" }}>
                <StyledSlider color='#FF6666' onClick={(_event: unknown, newValue: number) => { return setRedValue(newValue) }} />
                <StyledSlider color='#66FF66' onClick={(_event: unknown, newValue: number) => { return setGreenValue(newValue) }} />
                <StyledSlider color='#6666FF' onClick={(_event: unknown, newValue: number) => { return setBlueValue(newValue) }} />
            </Box>
            {/* <SubmitButton onClick={() => submitPlainColor(redValue, greenValue, blueValue)} /> */}
        </Grid >
    )
}
