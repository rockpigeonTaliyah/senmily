
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react'
import React, { useContext } from 'react';
import { StateContext , FrameContext } from '../context';
import DraggableIcons from './draggable';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const styles = {
  images : {
    maxWidth:"200px",
  },
};


export default function BasicStack(props) {
  const {api} = props;
  const [value, setValue] = React.useState(0);
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)
  const { sharedState, setSharedState } = useContext(StateContext);
  const { sharedFrame, setSharedFrame } = useContext(FrameContext);

    useEffect(() => {
    //   fetch(api)
        fetch(api.uri)
        .then((res) => res.json())
        .then((data) => {
          console.log(api);
          setData(data)
          setLoading(false)
        })
    }, [])

    const handleImageClick = (e, uri ,path) => {
      console.log(uri);
      setSharedState(uri);
    };
    const handleFrameClick = (e, opt) => {
      console.log(opt);
      setSharedFrame(opt);
    };


  return (
    <Box sx={{ width: '100%' }}>
      {api.type =="image" &&
      <Stack spacing={2} sx={{overflow:"scroll",height:'80vh'}}>
      {data.map(function(d,i){return (<Item
      key={i}
        onClick={(e) => handleImageClick(e, d.content, "/about")}>
          <img
            src={d.content}
            alt=""
            style={styles.images}
            loading="lazy"
          />
        </Item>)})}
      </Stack>}
      {api.type =="frame" &&
      <Stack spacing={2} sx={{overflow:"scroll",height:'80vh'}}>
        <Item onClick={(e) => handleFrameClick(e,0)} sx={{backgroundColor:"black",display:"block",paddingBottom:"56.25%",position:"relative"}}>
          <div style={{
                display: "block",
                position: "absolute",
                background: "grey",
                zindex: 2,
                top: 0,
                left: 0,
                width: "30px",
                height: "100%",
          }}>
            <div style={
              {
                display:"block",
                content:"",
                zIndex:3,
                position:"absolute",
                background:"white",
                borderRadius:"50%",
                width:"20px",
                height:"20px",
                left:"5px",
                top:"15px"
              }
            }></div>
            <div style={
              {
                display:"block",
                content:"",
                zIndex:3,
                position:"absolute",
                background:"white",
                borderRadius:"50%",
                width:"20px",
                height:"20px",
                left:"5px",
                top:"45px"
              }
            }></div>
            <div style={
              {
                display:"block",
                content:"",
                zIndex:3,
                position:"absolute",
                background:"white",
                borderRadius:"50%",
                width:"20px",
                height:"20px",
                left:"5px",
                top:"75px"
              }
            }></div>
            <div style={
              {
                display:"block",
                content:"",
                zIndex:3,
                position:"absolute",
                background:"white",
                borderRadius:"50%",
                width:"20px",
                height:"20px",
                left:"5px",
                top:"105px"
              }
              // 15px top
            }></div>

          </div>
        </Item>
        <Item onClick={(e) => handleFrameClick(e)} sx={{backgroundColor:"black",display:"block",paddingBottom:"56.25%",position:"relative"}}>
          <div style={{
                display: "block",
                position: "absolute",
                background: "grey",
                zindex: 2,
                bottom: 0,
                right: 0,
                width: "30px",
                height: "100%",
          }}></div>
        </Item>
        <Item onClick={(e) => handleFrameClick(e)} sx={{backgroundColor:"black",display:"block",paddingBottom:"56.25%",position:"relative"}}>
          <div style={{
                display: "block",
                position: "absolute",
                background: "grey",
                zindex: 2,
                top: 0,
                left: 0,
                width: "100%",
                height: "30px",
          }}></div>
        </Item>
        <Item onClick={(e) => handleFrameClick(e)} sx={{backgroundColor:"black",display:"block",paddingBottom:"56.25%",position:"relative"}}>
          <div style={{
                display: "block",
                position: "absolute",
                background: "grey",
                zindex: 2,
                bottom: 0,
                left: 0,
                width: "100%",
                height: "30px",
          }}></div>
        </Item>


      </Stack>}
      {api.type == "draggable" &&
      <Stack spacing={2} sx={{overflow:"scroll",height:'80vh'}}>
      {data.map(function(d,i){return (<Item
      key={i}
        onClick={(e) => handleImageClick(e, d.content, "/about")}>
          <DraggableIcons/>
        </Item>)})}
      </Stack>}

    </Box>
  );
}
