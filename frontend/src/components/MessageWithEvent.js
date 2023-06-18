import React from "react";

import { Button } from "@mui/material";

export default class MessageWithEvent extends React.Component {
  constructor(props) {
    super(props);
    this.logEventToConsole = this.logEventToConsole.bind(this);
  }
  logEventToConsole(e) {
    console.log("hello " + this.props.name);
  }

  render() {
    return (
      <Button onClick={this.logEventToConsole}>
        <p>hello {this.props.name}</p>
      </Button>
    );
  }
}
