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
        <Route path="/" element={<Layout />} >

          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/test-components" element={<TestComponent />} />

          {/* protected routes  */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES[1], ROLES[2], ROLES[3], ROLES[4]]} />}>
              {/* routes allowed for all authenticated users */}
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES[1]]} />}>
              {/* routes only for PATIENT */}
              <Route path="/patient" element={<Patient />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES[2]]} />}>
              {/* routes only for HLC */}
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES[3]]} />}>
              {/* routes only for DOCTOR */}
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES[4]]} />}>
              {/* routes only for ADMIN */}
              <Route path="/admin" element={<Admin />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES[2], ROLES[3], ROLES[4]]} />}>
              {/* routes only for PATIENT,HLC, DOCTOR*/}
              <Route path="components/Chat" element={<DirectChatPage />} />
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
