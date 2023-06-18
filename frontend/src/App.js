import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/loginPage";
import { useState } from "react";

function App() {
  const [token, setToken] = useState();

  // TODO: check if the token is valid, if not, redirect to login page
  //
  //if (!token) {
  //  return <Login setToken={setToken} />;
  //}

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
