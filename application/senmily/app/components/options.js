
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react'
import React, { useContext } from 'react';
import { StateContext } from '../context';
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
  const handleStateChange = (event) => {

  };
    useEffect(() => {
    //   fetch(api)
        fetch(api.uri)
        .then((res) => res.json())
        .then((data) => {
          setData(data)
          setLoading(false)
        })
    }, [])

    const handleClick = (e, uri ,path) => {
      console.log(uri);
      setSharedState(uri);
    };

  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2} sx={{overflow:"scroll",height:'80vh'}}>
            {data.map(function(d){return (<Item
              onClick={(e) => handleClick(e, d.content, "/about")}>
                <img
                  src={d.content}
                  alt=""
                  style={styles.images}
                  loading="lazy"
                />
              </Item>)})}
      </Stack>
    </Box>
  );
}
