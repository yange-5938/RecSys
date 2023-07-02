import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
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


function setToken(userToken) {
  sessionStorage.setItem("token", JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}

function App() {
  const token = getToken();

  // TODO: check if the token is valid, if not, redirect to login page
  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }

  return (
    <BrowserRouter>
    <NavigationBar/>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registrer />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/logi" element={<Logi />} />
        <Route path="/regi" element={<Regi />} />
        <Route path="/profi" element={<Profi />} />
        <Route path="/trip-planning-page" element={<TripPlanningPage />} />
        <Route path="/trip-plan-view-page/:tripPlanId" element={<TripPlanViewerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
