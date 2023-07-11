import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { PRIMARY_COLOR } from "../common/constants";

const logo = require("../assets/TripPlanner.png");
export default function NavigationBar() {
  const navigate = useNavigate();
  const navigateToMainPage = () => {
    navigate(`/`);
  };

  const onLogout = () => {
    localStorage.removeItem("user_first_name");
    localStorage.removeItem("user_last_name");
    localStorage.removeItem("user_age");
    localStorage.removeItem("user_gender");
    localStorage.removeItem("user_email");
    navigate("/login", { replace: true });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ bgcolor: PRIMARY_COLOR }} position="fixed">
        <Toolbar
          sx={{
            justifyContent: "space-between",
          }}>
          <Box display="flex" flexGrow={1} alignItems="center">
            <img src={logo} width={50} height={50} alt="" />
          </Box>
          <Box display="flex" flexGrow={1} alignItems="center">
            <Typography
              variant="h4"
              color="#FFFFFF"
              sx={{
                fontFamily: "sans-serif",
              }}>
              Trip Planner
            </Typography>
          </Box>

          <IconButton size="large" color="inherit" onClick={navigateToMainPage}>
            <HomeIcon />
          </IconButton>
          <IconButton size="large" color="inherit" onClick={onLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
