"use client";
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import NavTabs from './components/tabs'
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';

const styles = {
  paperContainer: {
    alignSelf: 'center',
      backgroundImage: `url("https://dummyimage.com/900x450/000/fff")`,
      backgroundSize: "cover",
      // height: "100%",
      width:"inherit",
      paddingBottom:"56.25%",
      display:"block",
      objectFit: "cover"

  },
  TabPanel :{
    padding:0
  }
};


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <main sx={{display:'flex'}}>
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height:"100vh",minWidth:"fit-content" }}
    >
      <Tabs
        orientation="vertical"

        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider',minWidth:"max-content" }}
      >

        <Tab icon={<PhoneMissedIcon />} iconPosition="start" label="親子繪本" {...a11yProps(0)} />
        <Tab icon={<PhoneMissedIcon />} iconPosition="start" label="家長學習" {...a11yProps(1)} />
        <Tab icon={<PhoneMissedIcon />} iconPosition="start" label="兒童學習" {...a11yProps(2)} />
        <Tab icon={<PhoneMissedIcon />} iconPosition="start" label="智能工具" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}  sx={{minWidth:"fit-content"}}>
        <NavTabs tabs={[
          {
            id : 0,
            label : "作品",
            href : "asdf",
            api : {
              uri : "/api/family",
              type : "image"
            }
          },
          {
            id : 1,
            label : "框架",
            href : "asdf",
            api : {
              uri : "/api/frame",
              type : "frame"
            }
          },
          {
            id : 2,
            label : "模式",
            href : "asdf",
            api : {
              uri : "/api/mode",
              type : "image"
            }
          }
        ]}></NavTabs>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <NavTabs tabs={[
          {
            id : 0,
            label : "asd",
            href : "asdf",
            api : {
              uri : "/api/family",
              type : "image"
            }
          },
          {
            id : 1,
            label : "asdasd",
            href : "asdf",
            api : {
              uri : "/api/family",
              type : "image"
            }
          }
        ]}
        ></NavTabs>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <NavTabs tabs={[
          {
            id : 0,
            label : "asd",
            href : "asdf",
            api : {
              uri : "/api/family",
              type : "image"
            }
          },
          {
            id : 1,
            label : "asdasd",
            href : "asdf",
            api : {
              uri : "/api/family",
              type : "image"
            }
          }
        ]}></NavTabs>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <NavTabs tabs={[
          {
            id : 0,
            label : "asd",
            href : "asdf",
            api : {
              uri : "/api/family",
              type : "image"
            }
          },
          {
            id : 1,
            label : "asdasd",
            href : "asdf",
            api : {
              uri : "/api/family",
              type : "image"
            }
          },
          {
            id : 2,
            label : "asdasd",
            href : "asdf",
            api : {
              uri : "/api/family",
              type : "image"
            }
          }
        ]}></NavTabs>
      </TabPanel>
      <Container sx={{display:'flex'}}>
      <Paper style={styles.paperContainer}></Paper>
      </Container>
    </Box>

    </main>
  );
}
