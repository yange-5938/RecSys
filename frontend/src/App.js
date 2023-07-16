import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react"; 
import MainPage from "./pages/MainPage";
import Login from "./pages/loginPage";
import TestPage from "./pages/testPage";
import Logi from "./components/Login_Authen_Components/Login/Login";
import Regi from "./components/Login_Authen_Components/Register/Register";
import Profi from "./components/Login_Authen_Components/Profile/Profile";
import Registrer from "./pages/RegistrationPage";
import TripPlanViewerPage from "./pages/TripPlanViewerPage";
import TripPlanningPage from "./pages/TripPlanningPage";
import NavigationBar from "./components/NavigationBar";
import LoginErrorPage from "./pages/LoginErrorPage";


function setToken(userToken) {
  sessionStorage.setItem("token", JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.storageArea === localStorage && event.key === key) {
        setValue(JSON.parse(event.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}


function App() {
  const token = getToken();
  

  // TODO: check if the token is valid, if not, redirect to login page
  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));

  // const [isLoggedIn, setIsLoggedIn] = useLocalStorage(
  //   "isLoggedIn",
  //   !(localStorage.getItem("user_first_name") === null || localStorage.getItem("user_last_name") === null)
  // );

  // useEffect(() => {

  //   setIsLoggedIn(!(localStorage.getItem("user_first_name") === null || localStorage.getItem("user_last_name") === null))

  // },[])

  const updateIsLoggedIn = (bool) => {
    setIsLoggedIn(bool);
  }

  console.log(localStorage.getItem("user_first_name"));
  console.log(localStorage.getItem("user_last_name"));
  console.log(localStorage.getItem("isLoggedIn"));
  console.log(localStorage);
  console.log(isLoggedIn);


  return (
    <BrowserRouter>
    <NavigationBar loginStateUpdateFunc={updateIsLoggedIn}/>
      <Routes>
        <Route path="/" element={isLoggedIn? <MainPage /> : <LoginErrorPage />} />
        <Route path="/login" element={<Login loginStateUpdateFunc={updateIsLoggedIn} />} />
        <Route path="/register" element={<Registrer />} />
        <Route path="/test" element={<TestPage />} />
        {/* <Route path="/logi" element={<Logi />} />
        <Route path="/regi" element={<Regi />} />
        <Route path="/profi" element={<Profi />} /> */}
        <Route path="/trip-planning-page" element={isLoggedIn? <TripPlanningPage />: <LoginErrorPage/>} />
        <Route path="/trip-plan-view-page/:tripPlanId" element={isLoggedIn? <TripPlanViewerPage />: <LoginErrorPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
