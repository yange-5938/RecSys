import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default class ExpressRecommendation extends React.Component {
  render() {
    return (
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
              Type in the city you want to visit in order to get recommendations
              for exiting POIs
            </Typography>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "30ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                inputProps={{ "aria-label": "description" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }
}
