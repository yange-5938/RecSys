import { Button } from "@mui/material";
import React from "react";

import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Perform logout actions here
    localStorage.removeItem("user_first_name");
    localStorage.removeItem("user_last_name");
    localStorage.removeItem("user_age");
    localStorage.removeItem("user_gender");
    localStorage.removeItem("user_email");
    navigate("/login", { replace: true });
  };
  return <Button onClick={handleLogout}>LOGOUT</Button>;
}
