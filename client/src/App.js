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
import DoctorProfile from "./pages/HLC/DoctorProfile";
import FindHLC from "./pages/FindHLC";
import AddPrescription from "./pages/AddPrescription";
import HLCProfile from "./pages/Admin/HLCProfile";
import LifestyleQuiz from "./pages/LifestyleMonitoring/LifestyleMonitorQuiz";
import AddLifestyle from "./pages/LifestyleMonitoring/AddLifestyle";
import LifestyleDashboard from "./pages/LifestyleMonitoring/LifestyleDashboard";
import AddExamination from "./components/Patient/AddExamination";
// import AddExaminationHLC from "./pages/AddExamination";
import FindHLCAdmin from "./pages/Admin/FindHLCAdmin";
import SearchDoctorPatient from "./pages/Patient/SearchDoctor";
import ManagePatient from "./pages/Doctor/ManagePatient";
import ManagePatientHLC from "./pages/HLC/ManagePatient";
import ManageDoctor from "./pages/HLC/ManageDoctor";
import PatientProfileHLC from "./pages/HLC/PatientProfile";
import PatientProfileDoctor from "./pages/Doctor/PatientProfile";
import TransferPatient from './pages/HLC/TransferPatient';
import DoctorAvailability from './pages/HLC/DoctorAvailability';
import DoctorMeetingsHLC from './pages/HLC/DoctorMeetings'


import ListSelfAssessmentComponent from './components/Patient/ListSelfAssessmentComponent';
import CreateSelfAssessmentComponent from './components/Patient/CreateSelfAssessmentComponent';
import ViewSelfAssessmentComponent from './components/Patient/ViewSelfAssessmentComponent';
import PatientPrescriptions from './components/Patient/PatientPrescriptions'

import PatientMeetings from './pages/Patient/PatientMeetings';
import PatientSettings from './pages/Patient/PatientSettings'
import MeetingExpired from './pages/MeetingExpired';
import Availability from './pages/Availability';
import MeetingSchedule from './pages/Patient/MeetingSchedule';

import PatientReport from './pages/Reports/PatientReport';

import AddDoctor from './pages/HLC/AddDoctor';
import HLCPatients from './pages/HLC/HLCPatients';
import HLCSettings from './pages/HLC/HLCSettings';

import AddHLC from './pages/Admin/AddHLC';

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

            <Route element={<RequireAuth allowedRoles={[ROLES[1], ROLES[2], ROLES[3], ROLES[4]]} />} >
              {/* routes allowed for all authenticated users */}
              <Route path="/SearchDoctor" element={<SearchDoctor />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES[1], ROLES[2], ROLES[3]]} />} >
              {/* routes only for PATIENT,HLC, DOCTOR*/}
              <Route path="/message" element={<DirectChatPage />} />
              <Route path="/AddExamination/:id" element={<AddExamination />} />
              <Route path="/view-SelfAssessment/:id" element={<ViewSelfAssessmentComponent />} />
              <Route path="/PatientPrescriptions/:id" element={<PatientPrescriptions />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES[1]]} />}>
              {/* routes only for PATIENT */}
              <Route path="/LifestyleQuiz" element={<LifestyleQuiz />} />
              <Route path="/LifestyleDashboard" element={<LifestyleDashboard />} />
              <Route path="/Patient" element={<Patient />} />
              <Route path="/PatientMeetings" element={<PatientMeetings />} />
              <Route path='/ScheduleMeeting/:id' element={<MeetingSchedule />} />
              <Route path="/PatientSettings" element={<PatientSettings />} />
              <Route path="/PatientProfile" element={<PatientProfile />} />
              <Route path="/patient" element={<Patient />} />
              <Route path="/DoctorProfile/:id" element={<DoctorProfile />} />
              <Route path="/SearchDoctorPatient" element={<SearchDoctorPatient />} />
              <Route path="/SelfAssessments" element={<ListSelfAssessmentComponent />} />
              <Route path="/CreateSelfAssessment" element={<CreateSelfAssessmentComponent />} />
              <Route path="/PatientReport/:id" element={<PatientReport />} />

            </Route >

            <Route element={<RequireAuth allowedRoles={[ROLES[2], ROLES[3]]} />} >
              {/* routes only for HLC and DOCTOR */}
              <Route path="/DoctorAvailability" element={<Availability />} />
              <Route path="/ManagePatient" element={<ManagePatient />} />
              <Route path="/AddLifestyle/:userId" element={<AddLifestyle />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES[4], ROLES[3]]} />} >
              {/* routes only for HLC and DOCTOR */}
              <Route path="/FindHLCAdmin" element={<FindHLCAdmin />} />
            </Route>



            <Route element={<RequireAuth allowedRoles={[ROLES[2]]} />}>
              {/* routes only for HLC */}
              <Route path="/DoctorProfileHLC/:id" element={<DoctorProfile />} />
              <Route path="/HLCSettings" element={<HLCSettings />} />
              <Route path="/PatientProfileHLC/:id" element={<PatientProfileHLC />} />
              {/* <Route path="/AddExaminationHLC/:id" element={<AddExaminationHLC />} /> */}
              <Route path="/HLC" element={<HLC />} />
              <Route path="/ManageDoctor" element={<ManageDoctor />} />
              <Route path="/ManagePatientHLC" element={<ManagePatientHLC />} />
              <Route path="/AddDoctor" element={<AddDoctor />} />
              <Route path="/HLCPatients" element={<HLCPatients />} />
              <Route path="/TransferPatient" element={<TransferPatient />} />
              <Route path="/ManageDoctor/:id" element={<DoctorAvailability />} />
              <Route path="/ViewMeetings/:id" element={<DoctorMeetingsHLC />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES[3]]} />}>
              {/* routes only for DOCTOR */}
              <Route path="/DoctorSetting" element={<DoctorSetting />} />
              <Route path="/AddPrescription/:id" element={<AddPrescription />} />
              <Route path="/doctor" element={<Doctor />} />
              <Route path="/DoctorMeetings" element={<DoctorMeetings />} />
              <Route path="/DoctorProfile" element={<DoctorProfile />} />
              <Route path="/PatientProfileDoctor/:id" element={<PatientProfileDoctor />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES[1], ROLES[3]]} />} >
              {/* routes only for PATIENT and DOCTOR */}
              <Route path="/meeting/:id/:user/:time" element={<Conference />} />
              <Route path='/link-expired' element={<MeetingExpired />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES[4]]} />}>
              {/* routes only for ADMIN */}
              <Route path="/admin" element={<Admin />} />
              <Route path="/AddHLC" element={<AddHLC />} />
              <Route path="/ManageUser" element={<ManageUser />} />
              <Route path="/HLCProfile/:id" element={<HLCProfile />} />

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