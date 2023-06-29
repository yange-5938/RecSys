import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { getCityList } from "../queries/query";

export default function MainPage() {
  const [cityList, setCityList] = useState([]);
  const [city, setCity] = useState("");

  useEffect(() => {
    getCityList().then((data) => setCityList(data));
  }, []);

  const handleOptionChange = (event, value) => {
    setCity(value);
  };

  console.log(cityList, city);

  return (
    <List
      sx={{
        width: "100%",
        //maxWidth: 360, <Item>xs=6 md=8</Item>
        bgcolor: "background.paper",
      }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={4} xl={4}>
            <Typography variant="h4" paddingX={3} paddingY={7}>
              Travel-RS
            </Typography>
          </Grid>
          <Grid xs={8} xl={8}>
            <Typography variant="subtitle1" paddingY={7}>
              We offer you the best recommendations for your traveling in major
              european cities.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider></Divider>

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
              Select the city you want to visit in order to get recommendations
              for exiting POIs
            </Typography>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "30ch" },
              }}
              noValidate
              autoComplete="off">
              {/* drop-down menu starts here */}
              <Stack spacing={2} sx={{ width: 300 }}>
                <Autocomplete
                  id="free-solo-demo"
                  freeSolo
                  options={cityList?.map((option) => option.name)}
                  onChange={handleOptionChange}
                  renderInput={(params) => (
                    <TextField {...params} label="Search City" />
                  )}
                />
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Divider></Divider>

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
                "& .MuiTextField-root": { m: 5, width: "45ch" },
              }}
              noValidate
              autoComplete="off">
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
    </List>
  );
}

// import React from "react";

// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';

// // components
// import PersonPreference from "../components/PersonPreference";
// import ExpressRecommendation from "../components/ExpressRec";
// import Greeting from "../components/Greeting";

// const test_item = {
//   name : "John",
//   age : 20,
//   sex : "male",
// }

// export default function MainPage() {

//   return (
//     <List
//       sx={{
//         width: '100%',
//         //maxWidth: 360, <Item>xs=6 md=8</Item>
//         bgcolor: 'background.paper',
//       }}
//     >

//       < Greeting />
//       <Divider>
//       </Divider>

//       <ExpressRecommendation />

//       <Divider>
//       </Divider>

//       <PersonPreference item={test_item}/>

//     </List>
//   )

// }
