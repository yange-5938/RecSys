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
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function MyApp() {
  return(
    <List
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

    {/* <Divider component="li" />
    <li>
      <Typography
        sx={{ mt: 0.5, ml: 2 }}
        color="text.secondary"
        display="block"
        variant="caption"
      >
        Divider
      </Typography>
    </li> */}

    <Divider>
    </Divider>

    <Box sx={{ flexGrow: 1 }}>
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
            Type in the city you want to visit in order to get recommendations for exiting POIs
          </Typography>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '30ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="outlined-basic" label="Try major cities like Paris, Munich ..." variant="outlined" />
          
          </Box>
        </Grid>
      </Grid>
    </Box>

    <Divider>
    </Divider>

    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={4} xl={4}>
          <Typography variant="h5" paddingX={3} paddingY={10}>
            personal preferences
          </Typography> 
        </Grid>
        <Grid xs={8} xl={8}>
          <Typography variant="h6" padding={4}>
            What are you looking for?
          </Typography>
          
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '35ch' },
            }}
            noValidate
            autoComplete="off"
          >
<div>

        
        <TextField
          id="outlined-multiline-static"
          label="e.g. I would like to visit Paris. I want to visit 
          the Eiffel Tower for sure and other classical buildings."
          multiline
          rows={7}
          defaultValue=""
        />
      </div>


          </Box>
        </Grid>
        
      </Grid>
    </Box>

    </List>
  )

}

ReactDOM.createRoot(document.querySelector("#app")).render(
  <React.StrictMode>
    <MyApp />
  </React.StrictMode>
);