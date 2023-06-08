import React, { useState } from "react";
import { Button } from "@mui/material";
import { getHelloWorld } from "../queries/query";

export default function MainPage() {
  const [msg, setMsg] = useState("");

  const onClick = async () => {
    getHelloWorld().then((response) => setMsg(response.message));
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}>
      <Button onClick={onClick}>Hello World Request</Button>
      <div>{msg}</div>
    </div>
  );
}
