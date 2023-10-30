import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TestComponent from './pages/TestComponent';

import RequireAuth from './jwtAuthServices/RequireAuth';
import Unauthorized from './pages/Unauthorized';
import Missing from './pages/Missing';
import Layout from './components/Layout';

import Register from './pages/Register';
import Login from './pages/Login';
import PersistLogin from './components/PersistLogin';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';

import Patient from './pages/Patient/Patient';
import Admin from './pages/Admin/Admin';
import Doctor from './pages/Doctor/Doctor';
import HLC from './pages/HLC/HLC';

import DirectChatPage from './components/Chat';
import Conference from './components/Conference/Conference';

// import AddHLC from './pages/Admin/AddHLC';
import ManageUser from "./pages/Admin/ManageUser";
import SearchDoctor from './pages/SearchDoctor';
import PatientProfile from "./pages/PatientProfile";
import DoctorProfile from "./pages/DoctorProfile";
import FindHLC from "./pages/FindHLC";
import AddPrescription from "./pages/AddPrescription";
import HLCProfile from "./pages/HLCProfile";
import LifestyleQuiz from "./pages/LifestyleMonitoring/LifestyleMonitorQuiz";
import AddLifestyle from "./pages/LifestyleMonitoring/AddLifestyle";
import LifestyleDashboard from "./pages/LifestyleMonitoring/LifestyleDashboard";
import AddExamination from "./pages/AddExamination";
import AddExaminationHLC from "./pages/AddExamination";
import FindHLCAdmin from "./pages/Admin/FindHLC";
import FindHLCPatient from "./pages/Patient/FindHLC";
import SearchDoctorPatient from "./pages/Patient/SearchDoctor";
import ManagePatient from "./pages/Doctor/ManagePatient";
import ManagePatientHLC from "./pages/HLC/ManagePatient";
import ManageDoctor from "./pages/HLC/ManageDoctor";
import AddLifestyleHLC from "./pages/LifestyleMonitoring/AddLifestyle";
import PatientProfileHLC from "./pages/HLC/PatientProfile";


import ListSelfAssessmentComponent from './components/Patient/ListSelfAssessmentComponent';
import CreateSelfAssessmentComponent from './components/Patient/CreateSelfAssessmentComponent';
import ViewSelfAssessmentComponent from './components/Patient/ViewSelfAssessmentComponent';

import PatientMeetings from './pages/Patient/PatientMeetings';
import PatientSettings from './pages/Patient/PatientSettings'
import MeetingExpired from './pages/MeetingExpired';
import Availability from './pages/Availability';
import MeetingSchedule from './pages/Patient/MeetingSchedule';

import AddDoctor from './pages/HLC/AddDoctor';
import HLCPatients from './pages/HLC/HLCPatients';
import HLCSettings from './pages/HLC/HLCSettings';
// import HLCProfile from './pages/HLC/HLCProfile';

import AddHLC from './pages/Admin/AddHLC';
import AdminDoctor from './pages/Admin/AdminDoctor';
import AdminPatient from './pages/Admin/AdminPatient';
import AdminSetting from './pages/Admin/AdminSettings';
import AdminProfile from './pages/Admin/AdminProfile';

import DoctorMeetings from './pages/Doctor/DoctorMeetings';
import DoctorSetting from './pages/Doctor/DoctorSetting';
// import DoctorProfile from './pages/Doctor/DoctorProfile';


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

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />


          {/* protected routes  */}
          <Route element={<PersistLogin />}>
            {/* made these public routes persisting as well */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/test-components" element={<TestComponent />} />
            {/* <Route path="/message" element={<DirectChatPage />} /> */}
            <Route path="/findHLC" element={<FindHLC />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />

            <Route element={<RequireAuth allowedRoles={[ROLES[1], ROLES[2], ROLES[3], ROLES[4]]} />} >
              {/* routes allowed for all authenticated users */}
              <Route path="/SearchDoctor" element={<SearchDoctor />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES[1], ROLES[2], ROLES[3]]} />} >
              {/* routes only for PATIENT,HLC, DOCTOR*/}
              <Route path="/message" element={<DirectChatPage />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES[1]]} />}>
              {/* routes only for PATIENT */}
              <Route path="/LifestyleQuiz" element={<LifestyleQuiz />} />
              <Route path="/LifestyleDashboard" element={<LifestyleDashboard />} />
              <Route path="/Patient" element={<Patient />} />
              <Route path="/PatientMeetings" element={<PatientMeetings />} />
              <Route path='/link-expired' element={<MeetingExpired />} />
              <Route path='/ScheduleMeeting' element={<MeetingSchedule />} />
              <Route path="/PatientSettings" element={<PatientSettings />} />
              <Route path="/PatientProfile" element={<PatientProfile />} />
              <Route path="/patient" element={<Patient />} />
              <Route path="/AddExamination/:id" element={<AddExamination />} />
              <Route path="/FindHLCPatient" element={<FindHLCPatient />} />
              <Route path="/HLCProfile" element={<HLCProfile />} />
              <Route path="/DoctorProfile" element={<DoctorProfile />} />
              <Route path="/SearchDoctorPatient" element={<SearchDoctorPatient />} />
              <Route path="/SelfAssessments" element={<ListSelfAssessmentComponent />} />
              <Route path="/CreateSelfAssessment" element={<CreateSelfAssessmentComponent />} />
              <Route path="/view-SelfAssessment/:id" element={<ViewSelfAssessmentComponent />} />
            </Route >

            <Route element={<RequireAuth allowedRoles={[ROLES[2], ROLES[3]]} />} >
              {/* routes only for HLC and DOCTOR */}
              <Route path="/DoctorAvailability" element={<Availability />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES[4], ROLES[3]]} />} >
              {/* routes only for HLC and DOCTOR */}
              <Route path="/FindHLCAdmin" element={<FindHLCAdmin />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES[1], ROLES[3]]} />} >
              {/* routes only for PATIENT and DOCTOR */}
              <Route path="/meeting/:id/:user/:time" element={<Conference />} />
              <Route path='/link-expired' element={<MeetingExpired />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES[2]]} />}>
              {/* routes only for HLC */}
              <Route path="/DoctorProfileHLC" element={<DoctorProfile />} />
              <Route path="/HLCSettings" element={<HLCSettings />} />
              <Route path="/PatientProfileHLC/:id" element={<PatientProfileHLC />} />
              <Route path="/AddExaminationHLC/:id" element={<AddExaminationHLC />} />
              <Route path="/HLC" element={<HLC />} />
              <Route path="/ManagePatientHLC" element={<ManagePatientHLC />} />
              <Route path="/ManageDoctor" element={<ManageDoctor />} />
              <Route path="/AddDoctor" element={<AddDoctor />} />
              <Route path="/HLCPatients" element={<HLCPatients />} />
              <Route path="/HLCProfile" element={<HLCProfile />} />
              <Route path="/AddLifestyleHLC" element={<AddLifestyleHLC />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES[3]]} />}>
              {/* routes only for DOCTOR */}
              <Route path="/DoctorSetting" element={<DoctorSetting />} />
              <Route path="/AddPrescription" element={<AddPrescription />} />
              <Route path="/doctor" element={<Doctor />} />
              <Route path="/AddLifestyle" element={<AddLifestyle />} />
              <Route path="/DoctorMeetings" element={<DoctorMeetings />} />
              <Route path="/ManagePatient" element={<ManagePatient />} />
              <Route path="/DoctorProfile" element={<DoctorProfile />} />

            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES[4]]} />}>
              {/* routes only for ADMIN */}
              <Route path="/admin" element={<Admin />} />
              <Route path="/AddHLC" element={<AddHLC />} />

              <Route path="/AdminDoctor" element={<AdminDoctor />} />
              <Route path="/AdminPatient" element={<AdminPatient />} />
              <Route path="/AdminSetting" element={<AdminSetting />} />
              <Route path="/AdminProfile" element={<AdminProfile />} />
              <Route path="/ManageUser" element={<ManageUser />} />

            </Route>

          </Route >
          {/* 404 routes */}
          < Route path="*" element={< Missing />} />
        </Route >
      </Routes >
    </Router >
  );
}

export default App;