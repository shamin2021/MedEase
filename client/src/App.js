import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestComponent from './pages/TestComponent';
import Register from './pages/Register';
import Login from './pages/Login';
import Landing from './pages/Landing';
import PatientDash from './pages/PatientDash';
import RequireAuth from './jwtAuthServices/RequireAuth';
import Unauthorized from './pages/Unauthorized';

function App() {

  const ROLES = { 1: "VISITOR", 2:"PATIENT", 3:"HLC", 4:"DOCTOR", 5:"ADMIN"};

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route element={<RequireAuth  allowedRoles={ROLES[2]}/>}>
          <Route path="/patientdash" element={<PatientDash />} />
          <Route path="/test-components" element={<TestComponent />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
