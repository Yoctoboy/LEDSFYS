import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { PlainColorMode, MatrixColorMode } from './components/colorModes';
import { Typography } from '@mui/material';

const ColorModesData = [
    { label: 'STATIC', value: '1', component: PlainColorMode, disabled: false },
    { label: 'MATRIX', value: '2', component: MatrixColorMode, disabled: false },
];

export default function BasicTabs() {
    const [value, setValue] = React.useState('1');

    const handleChange = (_event: any, newValue: React.SetStateAction<string>) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Typography fontFamily={'Roboto'}></Typography>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', height: '160px' }}>
                    <TabList
                        onChange={handleChange}
                        sx={{
                            backgroundColor: '#3E3E3E',
                            fontSize: '42px',
                            height: '160px',
                        }}
                        indicatorColor="secondary"
                        textColor="secondary"
                    >
                        {ColorModesData.map((mode) => (
                            <Tab
                                key={mode.value}
                                label={mode.label}
                                value={mode.value}
                                disabled={mode.disabled}
                                sx={{
                                    height: '160px',
                                    fontSize: '80px',
                                    marginX: 5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            />
                        ))}
                    </TabList>
                </Box>
                {ColorModesData.map((mode) => (
                    <TabPanel key={mode.value} value={mode.value}>
                        {mode.component()}
                    </TabPanel>
                ))}
            </TabContext>
        </Box>
    );
}
