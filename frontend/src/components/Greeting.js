import React from "react";
import { Box, Grid, Typography } from "@mui/material";

export default class Greeting extends React.Component {
  render() {
    return (
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
    );
  }
}
