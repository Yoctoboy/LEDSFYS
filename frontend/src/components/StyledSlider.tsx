import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import * as React from 'react'

const boxShadow = '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const StyledSlider = (props: { color: string, onClick: unknown }) => {
    const Yeye = styled(Slider)(() => ({
        color: props.color,
        height: 20,
        padding: '15px 0',
        marginTop: "3px",
        marginBottom: "3px",
        '& .MuiSlider-thumb': {
            height: 35,
            width: 35,
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
    }))

    return (
        <Yeye defaultValue={50} onClick={props.onClick} />
    )
};

export default StyledSlider;
