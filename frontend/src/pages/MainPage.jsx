/*
import React, { useState } from "react";
import { Button } from "@mui/material";
import { getHelloWorld } from "../queries/query";

export default function MainPage() {
  const [msg, setMsg] = useState("");

  const onClick = async () => {
    getHelloWorld().then((response) => setMsg(response.message));
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}>
      <Button onClick={onClick}>Hello World Request</Button>
      <div>{msg}</div>
    </div>
  );
}

*/

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function MyApp() {
  const [city, setCity] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCity(event.target.value as string);
  };

  return <List
  sx={{
    width: '100%',
    //maxWidth: 360, <Item>xs=6 md=8</Item>
    bgcolor: 'background.paper',
  }}
  >
  
  <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={2}>
      <Grid xs={4} xl={4}>
        <Typography variant="h4" paddingX={3} paddingY={7}>
          Travel-RS
        </Typography> 
      </Grid>
      <Grid xs={8} xl={8}>
        <Typography variant="subtitle1" paddingY={7}>
          We offer you the best recommendations for your traveling in major european cities.
        </Typography>
      </Grid>
      
    </Grid>
  </Box>

  <Divider>
  </Divider>

 {/* Travel Express beginns here*/}
  <Box sx={{ flexGrow: 1 }}>
    {/* 2 containers: 1 for the right part and 1 for left */}
    <Grid container spacing={2}>
      <Grid xs={4} xl={4}>
        <Typography variant="h5" paddingX={3} paddingY={10}>
          Travel Express
        </Typography> 
      </Grid>
      <Grid xs={8} xl={8}>
        <Typography variant="h6" padding={4}>
          Where to go?
        </Typography>
        <Typography variant="subtitle1" padding={1}>
          Select the city you want to visit in order to get recommendations for exiting POIs
        </Typography>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '30ch' },
          }}
          noValidate
          autoComplete="off"
        >
           {/* drop-down menu starts here */}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select your city</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={city}
              label="city"
              onChange={handleChange}
            >
              <MenuItem value={1}>Amsterdam</MenuItem>
              <MenuItem value={2}>Berlin</MenuItem>
              <MenuItem value={3}>Frankfurt</MenuItem>
              <MenuItem value={4}>Hamburg</MenuItem>
              <MenuItem value={5}>Istanbul</MenuItem>
              <MenuItem value={6}>London</MenuItem>
              <MenuItem value={7}>Madrid</MenuItem>
              <MenuItem value={8}>Munich</MenuItem>
              <MenuItem value={9}>Paris</MenuItem>
              <MenuItem value={10}>Rome</MenuItem>
              <MenuItem value={11}>Vienna</MenuItem>

            </Select>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  </Box>

  <Divider>
  </Divider>


  {/* personal preferences beginn here*/}
  <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={2}>
      <Grid xs={4} xl={4}>
        <Typography variant="h5" paddingX={3} paddingY={10}>
          Personal Preferences
        </Typography> 
      </Grid>
      <Grid xs={8} xl={8}>
        <Typography variant="h6" padding={4}>
          What are you looking for?
        </Typography>
        <Typography variant="h7" paddingy={4}>
          Please write 3-5 sentences what sights you would like to visit and
          what you are generally interested in.
        </Typography>
        
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 5, width: '45ch' },
          }}
          noValidate
          autoComplete="off"
        >
<div>

        <TextField
          id="filled-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          defaultValue="e.g. I want to see the Eiffel tower and antigue buildings in general. I am also into classic 
          architecture and art. Regarding food, I prefer french 
          classic food."
          variant="filled"
        />
    
    </div>


        </Box>
      </Grid>
      
    </Grid>
  </Box>

  </List>;
  )

}