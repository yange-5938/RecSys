import "./App.css";
import { Route, Routes, BrowserRouter} from 'react-router-dom';
import MainPage from './pages/MainPage';
import TripPlanViewerPage from "./pages/TripPlanViewerPage";
import TripPlanningPage from "./pages/TripPlanningPage";

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/trip-planning-page" element={<TripPlanningPage />} />
        <Route path="/trip-plan-view-page" element={<TripPlanViewerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
