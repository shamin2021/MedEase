import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestComponent from './pages/TestComponent';
import Register from './pages/Register';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Patient from './pages/Patient';
import RequireAuth from './jwtAuthServices/RequireAuth';
import Unauthorized from './pages/Unauthorized';
import Missing from './pages/Missing';
import Layout from './components/Layout';
import Users from './pages/Users';
import ViewWeeklyTasks from './pages/LifestyleMonitor/Patient/ViewWeeklyTasks';
import AddWeeklyTasks from './pages/LifestyleMonitor/Staff/AddWeeklyTasks/AddWeeklyTasks';

function App() {

  const ROLES = {
    1: "VISITOR",
    2: "PATIENT",
    3: "HLC",
    4: "DOCTOR",
    5: "ADMIN"
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<Landing />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/test-components" element={<TestComponent />} />

          {/* protected routes  */}
          <Route element={<RequireAuth allowedRoles={[ROLES[2]]} />}>
            <Route path="/patient" element={<Patient />} />
            <Route path="/users" element={<Users />} />
          </Route>

          {/* 404 routes */}
          <Route path="*" element={<Missing />} />

          <Route path="/lifestyle" element={<ViewWeeklyTasks />} />
          <Route path="/lifestyle/staff/addWeeklyTasks" element={<AddWeeklyTasks />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
