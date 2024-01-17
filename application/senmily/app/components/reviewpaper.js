
import PropTypes from 'prop-types';
import DraggableIcons from './draggable';

import { Container ,Typography, Paper, Box} from '@mui/material';
import { useState, useEffect } from 'react'
import React, { useContext } from 'react';
import { StateContext ,FrameContext} from '../context';

const styles = {
    paperContainer: {
      alignSelf: 'center',
        // backgroundImage: `url("https://dummyimage.com/900x450/000/fff")`,
        backgroundSize: "cover",
        // height: "100%",
        width:"850px",
        maxWidth:"850px",
        // paddingBottom:"56.25%",
        display:"block",
        objectFit: "cover",
        minHeight: "490px",
        height: "490px",
        maxHeight: "490px"

    },
    overlayFrame : {
        display: "block",
        position: "absolute",
        background: "rgba(255,255,255,0.5)",
        zindex: 2,
        top: 0,
        left: 0,
        width: "150px",
        height: "100%"
    },
    circlefirst:{
        display:"block",
        content:"",
        zIndex:3,
        position:"absolute",
        background:"white",
        borderRadius:"50%",
        width:"110px",
        height:"110px",
        border: "1px dashed",
        left: "calc((150px - 110px) / 2)",
        top:"10px"
    },
    circlesecond:{
        display:"block",
        content:"",
        zIndex:3,
        position:"absolute",
        background:"white",
        borderRadius:"50%",
        width:"110px",
        height:"110px",
        border: "1px dashed",
        left: "calc((150px - 110px) / 2)",
        top:"calc(110px * 1 + 20px)"
    },
    circlethird:{
        display:"block",
        content:"",
        zIndex:3,
        position:"absolute",
        background:"white",
        borderRadius:"50%",
        width:"110px",
        height:"110px",
        border: "1px dashed",
        left: "calc((150px - 110px) / 2)",
        // top:"75px"
        top:"calc(110px * 2 + 30px)"
    },
    circleforth:{
        display:"block",
        content:"",
        zIndex:3,
        position:"absolute",
        background:"white",
        borderRadius:"50%",
        width:"110px",
        height:"110px",
        border: "1px dashed",
        left: "calc((150px - 110px) / 2)",
        // top:"75px"
        top:"calc(110px * 3 + 40px)"
    },


}


export default function ReviewPaper(props) {
    const { sharedState, setSharedState } = useContext(StateContext);
    const { sharedFrame, setSharedFrame } = useContext(FrameContext);


    return (
        <Container sx={{display:'flex'}}>
            <Paper style={styles.paperContainer} sx={{backgroundImage: `url(${sharedState})`,position:"relative",}}>
            <div style={styles.overlayFrame}>
                <div style={styles.circlefirst}></div>
                <div style={styles.circlesecond}></div>
                <div style={styles.circlethird}></div>
                <div style={styles.circleforth}></div>
            </div>
            <DraggableIcons sx={{background:"orange"}}/>
            </Paper>

        </Container>
    );
  }

