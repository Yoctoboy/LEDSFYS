import React from 'react';
import { Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

interface Props {
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
    backgroundColor: string;
    backgroundHoverColor: string;
    iconSxProps: object;
    [x: string]: unknown;
}

export function SubmitButton({
    onClick,
    backgroundColor = '#7F7F7F',
    backgroundHoverColor = '#FFFFFF',
    iconSxProps,
}: Props) {
    return (
        <Button
            variant="outlined"
            color="info"
            sx={{
                height: '100px',
                width: '78%',
                marginY: '45px',
                backgroundColor,
                '&:hover': {
                    backgroundColor: backgroundHoverColor,
                    color: '#3c52b2',
                },
            }}
            onClick={onClick}
        >
            <CheckIcon sx={{ fontSize: 65, ...iconSxProps }} />
        </Button>
    );
}
