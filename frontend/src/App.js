import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/loginPage";

function App() {
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
