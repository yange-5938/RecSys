import "./App.css";
import { Route, Routes, BrowserRouter} from 'react-router-dom';
import MainPage from './pages/MainPage';
import TripPlanViewerPage from "./pages/TripPlanViewerPage";

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/trip-plan-view-page" element={<TripPlanViewerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
