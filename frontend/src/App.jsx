import * as React from 'react';
import './App.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StaticPlainColor from './colorModeComponents/staticPlainColor.component';
import StaticGradient from './colorModeComponents/StaticGradient.component';

// const availableModes = [
//   { name: 'Couleur Unie', component: StaticPlainColor },
//   { name: 'LOL', component: LolComponent },
// ];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {
  const [selectedTab, changeSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    changeSelectedTab(newValue);
    console.log('');
  };

  return (
    <div className="App">
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={selectedTab} onChange={handleTabChange} aria-label="basic tabs example">
            {/* {availableModes.forEach((mode, index) => (
              <Tab label={mode.name} {...a11yProps(index)} />
            ))} */}
            <Tab label={'Couleur Unie'} {...a11yProps(0)} />
            <Tab label={'Gradient'} {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel class="tabContent" value={selectedTab} index={0}>
          <StaticPlainColor />
        </TabPanel>
        <TabPanel class="tabContent" value={selectedTab} index={1}>
          <StaticGradient />
        </TabPanel>
      </Box>
    </div>
  );
}

export default App;
