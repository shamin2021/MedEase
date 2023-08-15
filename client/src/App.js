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

import DirectChatPage from './components/Chat';

import PersistLogin from './components/PersistLogin';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import AddDoctor from './pages/HLC/AddDoctor';

// import AddHLC from './pages/Admin/AddHLC';
import ManageUser from "./pages/Admin/ManageUser";
import SearchDoctor from './pages/SearchDoctor';
import PatientProfile from "./pages/PatientProfile";
import DoctorProfile from "./pages/DoctorProfile";
import FindHLC from "./pages/FindHLC";
import AddPrescription from "./pages/AddPrescription";
import HLCProfile from "./pages/HLCProfile";
import PatientProf from "./pages/Patient/PatientProfile";
import LifestyleQuiz from "./pages/LifestyleMonitoring/LifestyleMonitorQuiz";
import AddLifestyle from "./pages/LifestyleMonitoring/AddLifestyle";
import AddExamination from "./pages/AddExamination";
import FindHLCAdmin from "./pages/Admin/FindHLC";
import FindHLCPatient from "./pages/Patient/FindHLC";



import ListSelfAssessmentComponent from './components/patient/ListSelfAssessmentComponent';
import CreateSelfAssessmentComponent from './components/patient/CreateSelfAssessmentComponent';
import ViewSelfAssessmentComponent from './components/patient/ViewSelfAssessmentComponent';

import PatientMeetings from './pages/Patient/PatientMeetings';
import PatientSettings from './pages/Patient/PatientSettings'
import MeetingExpired from './pages/MeetingExpired';
import Conference from './components/Conference/Conference';
import Availability from './pages/Availability';
import MeetingSchedule from './pages/Patient/MeetingSchedule';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';

import HLCPatients from './pages/HLC/HLCPatients';
import HLCSettings from './pages/HLC/HLCSettings';
// import HLCProfile from './pages/HLC/HLCProfile';

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
          {/* <Route path="SearchDoctor" element={<SearchDoctor />} />
          <Route path="FindHLC" element={<FindHLC />} />
          <Route path="AddDoctor" element={<AddDoctor />} />
          <Route path="AddHLC" element={<AddHLC />} /> */}
          {/* <Route path="PatientProfile/:id" element={<PatientProfile />} />

          <Route path="AddPrescription" element={<AddPrescription />} />
          <Route path="HLCProfile" element={<HLCProfile />} />
          <Route path="PatientProfile/:id" element={<PatientProfile />} />
          <Route path="DoctorProfile" element={<DoctorProfile />} />

          <Route path="PatientProf" element={<PatientProf />} />
          <Route path="LifestyleQuiz" element={<LifestyleQuiz />} />
          <Route path="AddLifestyle" element={<AddLifestyle />} />
          <Route path="AddExamination" element={<AddExamination />} /> */}

          {/* <Route
            path="/SelfAssessments"
            element={<ListSelfAssessmentComponent />}
          />
          <Route
            path="/CreateSelfAssessment"
            element={<CreateSelfAssessmentComponent />}
          />
          <Route
            path="/view-SelfAssessment"
            element={<ViewSelfAssessmentComponent />}
          /> */}

          <Route path="/DoctorSetting" element={<DoctorSetting />} />
          <Route path="/PatientSettings" element={<PatientSettings />} />
          <Route path="/HLCSettings" element={<HLCSettings />} />



          {/* <Route path="/ManageUser" element={<ManageUser />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />


          {/* protected routes  */}
          <Route element={<PersistLogin />}>
            {/* made these public routes persisting as well */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/test-components" element={<TestComponent />} />
            <Route path="/message" element={<DirectChatPage />} />

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

              <Route path="/Patient" element={<Patient />} />
              <Route path="/PatientMeetings" element={<PatientMeetings />} />
              <Route path='/link-expired' element={<MeetingExpired />} />
              <Route path='/ScheduleMeeting' element={<MeetingSchedule />} />
              {/* <Route path="/PatientSettings" element={<PatientSettings />} /> */}
              <Route path="/PatientProfile" element={<PatientProfile />} />
              <Route path="/patient" element={<Patient />} />
              <Route path="AddExamination" element={<AddExamination />} />
              <Route path="FindHLCPatient" element={<FindHLCPatient />} />
              <Route path="HLCProfile" element={<HLCProfile />} />
              <Route path="DoctorProfile" element={<DoctorProfile />} />
              <Route
                path="/SelfAssessments"
                element={<ListSelfAssessmentComponent />}
              />
              <Route
                path="/CreateSelfAssessment"
                element={<CreateSelfAssessmentComponent />}
              />
              <Route
                path="/view-SelfAssessment/:id"
                element={<ViewSelfAssessmentComponent />}
              />
              <Route path="/PatientMeetings" element={<PatientMeetings />} />
              <Route path="/link-expired" element={<MeetingExpired />} />
              <Route path="/ScheduleMeeting" element={<MeetingSchedule />} />
            </Route >

            <Route
              element={<RequireAuth allowedRoles={[ROLES[2], ROLES[3]]} />}
            >
              {/* routes only for HLC and DOCTOR */}
              <Route path="/DoctorAvailability" element={<Availability />} />
            </Route>

            <Route
              element={<RequireAuth allowedRoles={[ROLES[1], ROLES[3]]} />}
            >
              {/* routes only for PATIENT and DOCTOR */}
              <Route path="/meeting/:id/:user/:time" element={<Conference />} />
              <Route path='/link-expired' element={<MeetingExpired />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES[2]]} />}>
              {/* routes only for HLC */}
              <Route path="/HLC" element={<HLC />} />
              <Route path="/AddDoctor" element={<AddDoctor />} />
              <Route path="/HLCPatients" element={<HLCPatients />} />
              {/* <Route path="/HLCSettings" element={<HLCSettings />} /> */}
              <Route path="/HLCProfile" element={<HLCProfile />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES[3]]} />}>
              {/* routes only for DOCTOR */}
              <Route path="/doctor" element={<Doctor />} />
              <Route path="/DoctorMeetings" element={<DoctorMeetings />} />
              <Route path="/DoctorHLC" element={<DoctorHLC />} />
              <Route path="/DoctorPatient" element={<DoctorPatient />} />
              {/* <Route path="/DoctorSetting" element={<DoctorSetting />} /> */}

              <Route path="/DoctorProfile" element={<DoctorProfile />} />

              <Route path="/findHLC" element={<FindHLC />} />

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

              <Route path="/ManageUser" element={<ManageUser />} />

              <Route path="/FindHLCAdmin" element={<FindHLCAdmin />} />
            </Route>


            <Route
              element={
                <RequireAuth allowedRoles={[ROLES[2], ROLES[3], ROLES[4]]} />
              }
            >
              {/* routes only for PATIENT,HLC, DOCTOR*/}
              {/* <Route path="components/Chat" element={<DirectChatPage />} /> */}
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
