import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { PlainColorMode } from './components/colorModes';
import { Typography } from '@mui/material';

const ColorModesData = [
    { label: "STATIC", value: "1", component: PlainColorMode, disabled: false },
    { label: "RAINBOW", value: "2", component: PlainColorMode, disabled: true },
]

export default function BasicTabs() {
    const [value, setValue] = React.useState('1');

    const handleChange = (_event: any, newValue: React.SetStateAction<string>) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Typography fontFamily={"Roboto"}></Typography>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} sx={{ backgroundColor: "#3E3E3E" }} indicatorColor="secondary" textColor='secondary'>
                        {ColorModesData.map(mode =>
                            <Tab key={mode.value} label={mode.label} value={mode.value} disabled={mode.disabled} />
                        )}
                    </TabList>
                </Box>
                {ColorModesData.map(mode =>
                    <TabPanel key={mode.value} value={mode.value}>{mode.component()}</TabPanel>
                )}
            </TabContext>
        </Box>
    );
}
