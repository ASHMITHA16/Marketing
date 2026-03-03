import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateCampaign from "./pages/CreateCampaign";
import FetchCampaign from "./pages/FetchCampaign";
import ResearchResult from "./pages/ResearchResult";
import StrategyResult from "./pages/StrategyResult";
import ContentResult from "./pages/ContentResult";
import "./styles/theme.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* Main Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/campaigns" element={<CreateCampaign />} />
        <Route path="/fetch" element={<FetchCampaign />} />
        <Route path="/research-result" element={<ResearchResult />} />
       <Route path="/strategy-result" element={<StrategyResult />} />
       <Route path="/content-result" element={<ContentResult />} />
      </Routes>
    </Router>
  );
}

export default App;