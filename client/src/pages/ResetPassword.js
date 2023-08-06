import React, { useRef, useState, useEffect } from 'react'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/Register.css';
import { Link, useParams } from 'react-router-dom';
import axios from '../constants/axios';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const ResetPassword = () => {

  const { token } = useParams();

  const errRef = useRef();

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState(null);


  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword])

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (!PWD_REGEX.test(password)) {
      setErrMsg("Invalid Email");
      return;
    }

    try {
      const response = await axios.post(`/auth/reset-password/${token}`,
        JSON.stringify({ password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      console.log(response.data.message);
      setErrMsg(response?.data?.message);
      setPassword('');
      setMatchPassword('');

    } catch (err) {
      if (!err?.response) {
        console.log(err.response?.data?.message);
        setErrMsg('No Server Response');
      } else {
        setErrMsg(err.response?.data?.message);
      }
    }
  }

  return (
    <div className='resetpw'>

      <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg !== null && errMsg}</p>
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="password">New Password:
            <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
            <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
          </label>
          <input
            type="password"
            id="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            aria-invalid={validPassword ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />

          <p id="pwdnote" className={pwdFocus && !validPassword ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters.<br />
            Must include uppercase and lowercase letters, a number and a special character.<br />
            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
          </p>

          <label htmlFor="confirm_pw">Cofirm New Password:
            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPassword ? "valid" : "hide"} />
            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPassword ? "hide" : "invalid"} />
          </label>
          <input
            type="password"
            id="confirm_pw"
            autoComplete="off"
            onChange={(e) => setMatchPassword(e.target.value)}
            value={matchPassword}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first password input field.
          </p>


          <button disabled={!validPassword || !validMatch ? true : false}> Reset Password </button>

        </form>
        <br />
        <Link to="/login">Sign In</Link>
      </section>

    </div>
  )
}

export default ResetPassword
