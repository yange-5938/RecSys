import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { getCityList, getRecommendedPoiList } from "../queries/query";

export default function MainPage() {
  const navigate = useNavigate();
  const [cityList, setCityList] = useState([]);
  const [city, setCity] = useState("");
  const [userText, setUserText] = useState("");
  const userTextRef = useRef(null);

  useEffect(() => {
    getCityList().then((data) => setCityList(data));
  }, []);

  const handleOptionChange = (event, value) => {
    setCity(value);
  };

  const onComplete = () => {
    const body = {
      city: city,
      user_text: userText,
      user_age: 2, // TODO get this from user object
      user_gender: 1, // TODO get this from user object
    };
    getRecommendedPoiList(body).then((response) => {
      navigate("/trip-planning-page", {
        state: { recommendedPoiList: response, city: city },
      });
    });
  };

  const onUserTextChange = (e) => {
    setUserText(e.target.value);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        marginTop: 50,
      }}>
      <List
        sx={{
          width: "100%",
          //maxWidth: 360, <Item>xs=6 md=8</Item>
          bgcolor: "background.paper",
          marginLeft: 20,
        }}>
        {/* Travel Express beginns here*/}
        <Box sx={{ flexGrow: 1 }}>
          {/* 2 containers: 1 for the right part and 1 for left */}
          <Grid container spacing={1}>
            <Grid xs={4} xl={4}>
              <Typography variant="h5" paddingX={3} paddingY={10}>
                Trip Planner
              </Typography>
            </Grid>
            <Grid xs={8} xl={8}>
              <Typography variant="h6" padding={4}>
                Where to go?
              </Typography>
              <Typography variant="subtitle1" padding={1}>
                Select the city you want to visit in order to get
                recommendations for exiting POIs
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

        <br />

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
                Please write 3-5 sentences what sights you would like to visit
                and what you are generally interested in.
              </Typography>

              <br />
              <Typography variant="body" color="gray" paddingy={4}>
                Example: I want to see the Eiffel tower and antigue buildings in
                general. I am also into classic architecture and art. Regarding
                food, I prefer french classic food.
              </Typography>
              <Box
                component="form"
                style={{
                  padding: 10,
                  width: "100%",
                }}>
                <TextField
                  label="Your dream trip summary"
                  rows={4}
                  multiline
                  fullWidth
                  defaultValue=""
                  inputRef={userTextRef}
                  onChange={onUserTextChange}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: 20,
          }}>
          <Button onClick={onComplete}>Complete</Button>
        </div>
      </List>
    </div>
  );
}
