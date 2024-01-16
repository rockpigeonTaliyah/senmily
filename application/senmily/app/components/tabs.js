import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';
import BasicStack from  './options';
import Typography from '@mui/material/Typography';
function CustomTabPanel(props) {
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
            {children}
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
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
export default function NavTab(props) {
    const {tabs} = props;
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs  value={value} onChange={handleChange} aria-label="basic tabs example" sx={{minWidth:"300px"}}>
            {tabs.map((tab, index) => (
                <Tab label={tab.label} key={tab.id} {...a11yProps(index)}/>
            ))}
          </Tabs>
        </Box>
        {tabs.map((tab, index) => (
          <CustomTabPanel value={value} index={index} key={tab.id}>

            if (1==2) {
              <div></div>
            }
            <BasicStack api={tab.api}/>
          </CustomTabPanel>
        ))}

      </Box>
    );
  }