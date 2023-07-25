import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { LoginUser } from '../services/AuthService';
import '../styles/Register.css';


const Login = () => {

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/patientdash';

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const roles = await LoginUser(user, pwd);
            console.log(roles);
            setAuth({ user, pwd, roles });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            setErrMsg(err.message);
            errRef.current.focus();
        }
    }

    return (
        <div className='login'>
            
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
                        aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            <Link to="/register">Sign Up</Link>
                        </span>
                    </p>
                </section>

        </div>
    )
}

export default Login
