import { styled } from '@mui/material/styles';
import { withStyles } from '@mui/styles';
import Slider from '@mui/material/Slider';
import * as React from 'react';

const boxShadow = '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const StyledSlider = styled(Slider)(() => ({
    height: 70,
    padding: '15px 0',
    marginTop: '0px',
    marginBottom: '80px',
    '& .MuiSlider-thumb': {
        height: 110,
        width: 110,
        backgroundColor: '#fff',
        boxShadow,
        '&:focus, &:hover, &.Mui-active': {
            boxShadow:
                '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
                boxShadow,
            },
        },
    },
}));

export const RedSlider = styled(StyledSlider)(() => ({
    color: '#FF0000',
}));
export const GreenSlider = styled(StyledSlider)(() => ({
    color: '#00FF00',
}));
export const BlueSlider = styled(StyledSlider)(() => ({
    color: '#0000FF',
}));

export default StyledSlider;
