import React from 'react';
import { Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';


export function SubmitButton(onClick: React.MouseEventHandler<HTMLButtonElement> | undefined) {
    return (<Button variant="outlined" color='info' sx={{ height: "45px", width: "78%", marginY: '20px' }} onClick={onClick}>
        <CheckIcon />
    </Button>)
}
