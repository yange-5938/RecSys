import React from "react";


class Login extends React.Component{
    render(){
        return(
            <div>
                <h1>Hello world</h1>
                <p>and the time is {getCurrentTime()}</p>
            </div>
        )
    }
}


function getCurrentTime(){
    return new Date().toDateString();
}

export default Login;