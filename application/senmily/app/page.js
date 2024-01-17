"use client";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import NavTabs from './components/tabs'
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ReviewPaper from './components/reviewpaper';

import React, { useContext } from 'react';
import { StateContext, FrameContext } from './context';

import { StateProvider, FrameProvider } from './context';


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
      <StateProvider>
      <FrameProvider>


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

        <Tab icon={<PaletteIcon />} iconPosition="start" label="親子繪本" {...a11yProps(0)} />
        <Tab icon={<EscalatorWarningIcon />} iconPosition="start" label="家長學習" {...a11yProps(1)} />
        <Tab icon={<ChildCareIcon />} iconPosition="start" label="兒童學習" {...a11yProps(2)} />
        <Tab icon={<TipsAndUpdatesIcon />} iconPosition="start" label="智能工具" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}  sx={{width:"300px",maxWidth: "320px"}}>

        <NavTabs

        tabs={[
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
            label : "模型",
            href : "asdf",
            api : {
              uri : "/api/family",
              type : "image"
            }
          },
          {
            id : 1,
            label : "元素",
            href : "asdf",
            api : {
              uri : "/api/family",
              type : "draggable"
            }
          }
        ]}
        ></NavTabs>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <NavTabs tabs={[
          {
            id : 0,
            label : "模型",
            href : "asdf",
            api : {
              uri : "/api/family",
              type : "image"
            }
          },
          {
            id : 1,
            label : "元素",
            href : "asdf",
            api : {
              uri : "/api/family",
              type : "draggable"
            }
          }
        ]}></NavTabs>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <NavTabs tabs={[
          {
            id : 0,
            label : "工具",
            href : "asdf",
            api : {
              uri : "/api/family",
              type : "image"
            }
          },
          {
            id : 1,
            label : "步驟",
            href : "asdf",
            api : {
              uri : "/api/family",
              type : "image"
            }
          }
        ]}></NavTabs>
      </TabPanel>
      <ReviewPaper />
    </Box>
    </FrameProvider>
    </StateProvider>
    </main>
  );
}
