/*
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

*/

import React from "react";

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';


// components
import PersonPreference from "../components/PersonPreference";
import ExpressRecommendation from "../components/ExpressRec";
import Greeting from "../components/Greeting";


const test_item = {
  name : "John",
  age : 20,
  sex : "male",
}


export default function MainPage() {

  return (
    <List
      sx={{
        width: '100%',
        //maxWidth: 360, <Item>xs=6 md=8</Item>
        bgcolor: 'background.paper',
      }}
    >

      < Greeting />
      <Divider>
      </Divider>

      <ExpressRecommendation />

      <Divider>
      </Divider>

      <PersonPreference item={test_item}/>

    </List>
  )

}



