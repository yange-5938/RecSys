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
import { useNavigate, NavLink } from "react-router-dom";

import { loginUser } from "../queries/query";
import { Link as Link2 } from "react-router-dom";

export default function LoginBox() {
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();

  const handleSubmit = (event) => {
    alert("Login Successful!");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("Email"),
      password: data.get("password"),
    });
    setEmail(data.get("Email"));
    setPassword(data.get("password"));

    console.log(Email);
    console.log(Password);
  };

  const navigate = useNavigate();
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
        Sign in
      </Typography>

      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="Email"
          label="Your Email"
          name="Email"
          autoComplete="Email"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
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
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          component={Link2}
          to={"/"}
        >
          Sign In
        </Button>

        <NavLink to="/register" variant="body2">
          Don't have an account? Sign Up
        </NavLink>

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
