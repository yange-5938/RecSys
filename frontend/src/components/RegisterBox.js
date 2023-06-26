import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import { useState } from "react";
import {
  Slider,
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
} from "@mui/material";
import { loginUser } from "../queries/query";

export default function LoginBox() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const marks = [
    {
      value: 0,
      label: "Not Fit",
    },
    {
      value: 30,
      label: "Slightly Fit",
    },
    {
      value: 70,
      label: "Fit",
    },
    {
      value: 100,
      label: "Athlete",
    },
  ];

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
      <Typography component="h1" variant="h5">
        Create Your Account
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        {/*
        <TextField
          margin="normal"
          required
          fullWidth
          id="ID"
          label="Your ID"
          name="ID"
          autoComplete="ID"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
    */}
        <TextField margin="normal" required fullWidth label="First Name" />
        <TextField margin="normal" required fullWidth label="Last Name" />
        <TextField margin="normal" required fullWidth label="Age" />
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={age}
            onChange={handleChange}
            label="Age"
          >
            <MenuItem value={0}>Male</MenuItem>
            <MenuItem value={1}>Female</MenuItem>
            <MenuItem value={2}>prefer not to say</MenuItem>
          </Select>
          <FormHelperText>Gender</FormHelperText>
        </FormControl>

        <Typography gutterBottom>Fitness Level</Typography>
        <Slider
          // aria-label="Custom marks"
          defaultValue={30}
          step={10}
          valueLabelDisplay={true}
          marks={marks}
        />

        <TextField margin="normal" fullWidth label="Email" />
        <TextField margin="normal" required fullWidth label="Password" />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Confirm Password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </Button>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </Box>
  );
}

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://github.com/RecSys-SS-2023/Travel_RS_team1"
      >
        Travel RS
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
