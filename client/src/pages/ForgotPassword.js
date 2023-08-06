import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import '../styles/Register.css';

import axios from '../constants/axios';

const EMAIL_REGEX = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;

const ForgotPassword = () => {


  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false)
  const [state, setState] = useState(null);


  const backPage = () => navigate(-1);


  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email])



  const handleSubmit = async (e) => {

    e.preventDefault()

    if (!EMAIL_REGEX.test(email)) {
      setState("Invalid Email");
      return;
    }

    try {
      const response = await axios.post('/auth/forgot-password',
        JSON.stringify({ email }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      console.log(response.data.message);
      setState(response.data.message);
      setEmail('')
      setValidEmail(false);

    } catch (err) {
      if (!err?.response) {
        setState('No Server Response');
      } else if (err.response?.status === 403) {
        setState("User Not Found");
      }
      else {
        setState(err.response?.data?.message);
      }
    }
  }

  return (
    <div className='forgotpw'>
      <section>
        <p className={state ? "state" : "offscreen"} aria-live="assertive">{state !== null && state}</p>
        <h1>Forgot Password</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

          <button disabled={!validEmail ? true : false}> Submit </button>

        </form>
        <button onClick={backPage}> Go Back </button>
      </section>

    </div>
  )
}

export default ForgotPassword
