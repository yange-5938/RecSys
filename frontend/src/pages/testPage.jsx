import React, { useState, useEffect } from "react";

import { useNavigate, NavLink } from "react-router-dom";
import { listUsers, registerUser } from "../queries/query";

import { Button, TextField } from "@mui/material";


export default function Test() {


  const [email, setEmail] = useState("")

  const hanndleClick = () => {
    const firstname = "bbb"
    const lastname = "ban"
    // const email = "bbban@gmail.com"
    const password = "123"
    const age = 20
    const gender = "male"
    registerUser(firstname,lastname, email,  password,age, gender);
  }

  const hanndleListUser = () => {
      alert("list users")
      listUsers();
    }

    return (
      <div>
      <h1>Test</h1>
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
      <Button onClick={hanndleListUser}>List Users</Button>
      <Button onClick={hanndleClick}>Register User</Button>
    </div>
  )
}


/*
const Login = ({ setUserState }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };
  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "Please enter a valid email address";
    }
    if (!values.password) {
      error.password = "Password is required";
    }
    return error;
  };

  const loginHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
    // if (!formErrors) {

    // }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(user);
      axios.post("http://localhost:9002/login", user).then((res) => {
        alert(res.data.message);
        setUserState(res.data.user);
        navigate("/", { replace: true });
      });
    }
  }, [formErrors]);
  return (
    <div >
      <form>
        <h1>Login</h1>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={changeHandler}
          value={user.email}
        />
        <p>{formErrors.email}</p>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={changeHandler}
          value={user.password}
        />
        <p >{formErrors.password}</p>
        <button onClick={loginHandler}>
          Login
        </button>
      </form>
      <NavLink to="/signup">Not yet registered? Register Now</NavLink>
    </div>
  );
};
export default Login;
*/