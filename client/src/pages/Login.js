import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from "react-router-dom";
import '../styles/Register.css';

import useAuth from "../hooks/useAuth";
import axios from '../constants/axios';


const Login = () => {

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        setErrorMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post('/auth/authenticate',
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    // withCredentials: true
                }
            );
            const roles = response?.data?.role;
            setAuth({ email, password, roles });
            setEmail('');
            setPassword('');

            const from = location.state?.from || { pathname: '/patientdash'};
            navigate(from, { replace: true });

        } catch (err) {
            if (!err?.response) {
                setErrorMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrorMsg('Missing Username or Password');
            } else if (err.response?.status === 403) {
                setErrorMsg('Unauthorized');
            } else {
                setErrorMsg('Login Failed');
            }
        }
    }

    return (

        <div className='login'>

            <section>
                <p className={errorMsg ? "errorMsg" : "offscreen"} aria-live="assertive">{errorMsg}</p>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Username:</label>
                    <input
                        type="text"
                        id="email"
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <button>Sign In</button>
                </form>
                <p>
                    Need an Account?<br />
                    <span className="line">
                        <Link to={"/register"}>Sign Up</Link>
                    </span>
                </p>
            </section>

        </div>

    )

}

export default Login
