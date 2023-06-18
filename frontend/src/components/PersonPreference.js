import React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default class PersonPreference extends React.Component {
  constructor(props) {
    super(props);
    //this.log_something = this.log_something.bind(this);
  }

  render() {
    return (
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
                "& .MuiTextField-root": { m: 1, width: "35ch" },
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
    );
  }
}
