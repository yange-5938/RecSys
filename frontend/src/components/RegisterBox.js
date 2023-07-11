import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useState } from "react";
import { Select, MenuItem, FormHelperText, FormControl } from "@mui/material";
import { registerUser } from "../queries/query";
import { useNavigate } from "react-router-dom";

export default function LoginBox() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPass) {
      alert("Passwords do not match");
      return;
    }
    registerUser(firstName, lastName, email, password, age, gender);
    alert("Account created successfully");
    // TODO: Redirect to login page
    return navigate("/login", { replace: true }); // <-- issue imperative redirect
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

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
        <TextField
          margin="normal"
          required
          fullWidth
          label="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Age"
          onChange={(e) => setAge(e.target.value)}
        />
        <FormControl margin="normal" required fullWidth label="Gender">
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            //value={gender}
            onChange={handleGenderChange}
          >
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
            <MenuItem value={"other"}>Other</MenuItem>
          </Select>
          <FormHelperText required>Gender</FormHelperText>
        </FormControl>

        <TextField
          margin="normal"
          required
          fullWidth
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Confirm Password"
          onChange={(e) => setConfirmPass(e.target.value)}
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
