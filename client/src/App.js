import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestComponent from './pages/TestComponent';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Patient from './pages/Patient/Patient';
import Admin from './pages/Admin/Admin';
import RequireAuth from './jwtAuthServices/RequireAuth';
import Unauthorized from './pages/Unauthorized';
import Missing from './pages/Missing';
import Layout from './components/Layout';
import PersistLogin from './components/PersistLogin';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import AddDoctor from './pages/HLC/AddDoctor';
import AddHLC from './pages/Admin/AddHLC';
import SearchDoctor from './pages/SearchDoctor';
import PatientProfile from "./pages/PatientProfile";
import DoctorProfile from "./pages/DoctorProfile";
import FindHLC from "./pages/FindHLC";
import AddPrescription from "./pages/AddPrescription";


function App() {

  const ROLES = {
    1: "PATIENT",
    2: "HLC",
    3: "DOCTOR",
    4: "ADMIN"
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="SearchDoctor" element={<SearchDoctor />} />
          <Route path="FindHLC" element={<FindHLC />} />
          <Route path="AddDoctor" element={<AddDoctor />} />
          <Route path="AddHLC" element={<AddHLC />} />
          <Route path="AddPrescription" element={<AddPrescription />} />
          <Route path="PatientProfile/:id" element={<PatientProfile />} />
          <Route path="DoctorProfile" element={<DoctorProfile />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/test-components" element={<TestComponent />} />
          {/* protected routes  */}
          <Route element={<PersistLogin />}>
            <Route
              element={
                <RequireAuth
                  allowedRoles={[ROLES[1], ROLES[2], ROLES[3], ROLES[4]]}
                />
              }
            >
              {/* routes allowed for all authenticated users */}
              <Route path="/SearchDoctor" element={<SearchDoctor />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES[1]]} />}>
              {/* routes only for PATIENT */}
              <Route path="/patient" element={<Patient />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES[2]]} />}>
              {/* routes only for HLC */}
              <Route path="/AddDoctor" element={<AddDoctor />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES[3]]} />}>
              {/* routes only for DOCTOR */}
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES[4]]} />}>
              {/* routes only for ADMIN */}
              <Route path="/admin" element={<Admin />} />
              <Route path="/AddHLC" element={<AddHLC />} />
            </Route>
          </Route>
          {/* 404 routes */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
