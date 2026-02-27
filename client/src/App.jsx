import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateCampaign from "./pages/CreateCampaign";
import FetchCampaign from "./pages/FetchCampaign";
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
      </Routes>
    </Router>
  );
}

export default App;