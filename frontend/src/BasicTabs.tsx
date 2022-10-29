import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { PlainColorMode } from './components/colorModes';

const ColorModesData = [
    { label: "STATIC", value: "1", component: PlainColorMode },
    { label: "RAINBOW", value: "2", component: PlainColorMode },
]

export default function BasicTabs() {
    const [value, setValue] = React.useState('1');

    const handleChange = (_event: any, newValue: React.SetStateAction<string>) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange}>
                        {ColorModesData.map(mode =>
                            <Tab label={mode.label} value={mode.value} />
                        )}
                    </TabList>
                </Box>
                {ColorModesData.map(mode =>
                    <TabPanel value={mode.value}>{mode.component()}</TabPanel>
                )}
            </TabContext>
        </Box>
    );
}
