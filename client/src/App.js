import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from './jwtAuthServices/AuthContext';
import TestComponent from './pages/TestComponent';
import Register from './pages/Register';
import Login from './pages/Login';
import Landing from './pages/Landing';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test-components" element={<TestComponent />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
