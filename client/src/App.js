import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestComponent from './pages/TestComponent';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Patient from './pages/Patient/Patient';
import Admin from './pages/Admin/Admin';
import Doctor from './pages/Doctor/Doctor';
import HLC from './pages/HLC/HLC';

import RequireAuth from './jwtAuthServices/RequireAuth';
import Unauthorized from './pages/Unauthorized';
import Missing from './pages/Missing';
import Layout from './components/Layout';
import PersistLogin from './components/PersistLogin';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import AddDoctor from './pages/HLC/AddDoctor';

import SearchDoctor from './pages/SearchDoctor';
import PatientProfile from "./pages/Patient/PatientProfile";
import PatientMeetings from './pages/Patient/PatientMeetings';
import PatientSettings from './pages/Patient/PatientSettings'
import MeetingExpired from './pages/MeetingExpired';
import Conference from './components/Conference/Conference';
import Availability from './pages/Availability';
import MeetingSchedule from './pages/Patient/MeetingSchedule';

import HLCPatients from './pages/HLC/HLCPatients';
import HLCSettings from './pages/HLC/HLCSettings';
import HLCProfile from './pages/HLC/HLCProfile';

import AdminAdd from './pages/Admin/AdminAdd';
import AddHLC from './pages/Admin/AddHLC';
import AdminDoctor from './pages/Admin/AdminDoctor';
import AdminPatient from './pages/Admin/AdminPatient';
import AdminSetting from './pages/Admin/AdminSettings';
import AdminProfile from './pages/Admin/AdminProfile';

import DoctorHLC from './pages/Doctor/DoctorHLC';
import DoctorMeetings from './pages/Doctor/DoctorMeetings';
import DoctorPatient from './pages/Doctor/DoctorPatients';
import DoctorSetting from './pages/Doctor/DoctorSetting';
import DoctorProfile from './pages/Doctor/DoctorProfile';


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

        {/* <Route path="/admin" element={<Admin />} />
        <Route path="/Doctor" element={<Doctor />} />

        <Route path="/HLC" element={<HLC />} /> */}

        <Route path="/" element={<Layout />}>
{/*           
          <Route path="SearchDoctor" element={<SearchDoctor />} />
          <Route path="AddDoctor" element={<AddDoctor />} />
          <Route path="AddHLC" element={<AddHLC />} />
          <Route path="PatientProfile/:id" element={<PatientProfile />} /> */}

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

            <Route element={<RequireAuth allowedRoles={[ROLES[1], ROLES[2], ROLES[3], ROLES[4]]} />}>
              {/* routes allowed for all authenticated users */}
              <Route path="/SearchDoctor" element={<SearchDoctor />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES[1]]} />}>
              {/* routes only for PATIENT */}

              <Route path="/Patient" element={<Patient />} />
              <Route path="/PatientMeetings" element={<PatientMeetings />} />
              <Route path='/link-expired' element={<MeetingExpired />} />
              <Route path='/ScheduleMeeting' element={<MeetingSchedule />} /> 
              <Route path="/PatientSettings" element={<PatientSettings />} />
              <Route path="/PatientProfile" element={<PatientProfile />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES[2], ROLES[3]]} />}>
              {/* routes only for HLC and DOCTOR */}
              <Route path="/DoctorAvailability" element={<Availability />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES[1], ROLES[3]]} />}>
              {/* routes only for PATIENT and DOCTOR */}
              <Route path="/meeting/:id/:user/:time" element={<Conference />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES[2]]} />}>
              {/* routes only for HLC */}
              <Route path="/HLC" element={<HLC />} />
              <Route path="/AddDoctor" element={<AddDoctor />} />
              <Route path="/HLCPatients" element={<HLCPatients />} />
              <Route path="/HLCSettings" element={<HLCSettings />} /> 
              <Route path="/HLCProfile" element={<HLCProfile />} /> 
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES[3]]} />}>
              {/* routes only for DOCTOR */}
              <Route path="/doctor" element={<Doctor />} />
              <Route path="/DoctorMeetings" element={<DoctorMeetings />} />
              <Route path="/DoctorHLC" element={<DoctorHLC />} />
              <Route path="/DoctorPatient" element={<DoctorPatient />} />
              <Route path="/DoctorSetting" element={<DoctorSetting />} />
              <Route path="/DoctorProfile" element={<DoctorProfile />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES[4]]} />}>
              {/* routes only for ADMIN */}
              <Route path="/admin" element={<Admin />} />
              <Route path="/AddHLC" element={<AddHLC />} />
              <Route path="/AdminAdd" element={<AdminAdd />} />
              <Route path="/AdminDoctor" element={<AdminDoctor />} />
              <Route path="/AdminPatient" element={<AdminPatient />} />
              <Route path="/AdminSetting" element={<AdminSetting />} />
              <Route path="/AdminProfile" element={<AdminProfile />} />

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
