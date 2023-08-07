import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "../../styles/FormInput.css";
import ButtonImage from "../../components/Button";

import useAxiosMethods from "../../hooks/useAxiosMethods";

const EMAIL_REGEX = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;
const MOBILE_REGEX = /^(?:\+94|0)?[0-9]{9,10}$/;

const AddDoc = props => {

  const hiddenFileInput = React.useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { get, post } = useAxiosMethods();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [mobileNumber, setMobileNumber] = useState("");
  const [validMobile, setValidMobile] = useState(false);

  const [speciality, setSpeciality] = useState("");
  const [specialities, setSpecialities] = useState([]);

  const [licenseNumber, setLicenseNumber] = useState("");

  // to get the response from the server
  const [state, setState] = useState(null)

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    props.handleFile(fileUploaded);
  };


  // to populate select field
  const fetchSpecialities = async () => {
    try {
      get('/register-user/get-specialities', setSpecialities);

    } catch (err) {
      console.error(err);
      navigate('/login', { state: { from: location }, replace: true });
    }
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

  // to make sure it will run when the page is loaded
  useEffect(() => {
    fetchSpecialities();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidMobile(MOBILE_REGEX.test(mobileNumber));
  }, [mobileNumber]);


  // submit form
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!validEmail) {
      setState({ message: "Please enter valid email address" });
    }
    else if (!validMobile) {
      setState({ message: "Please enter valid mobile number" });
    }
    else { 

      try {
        post('/register-user/register-doctor',
          { firstname: firstName, lastname: lastName, email: email, mobileNumber: mobileNumber, speciality: speciality, licenseNumber: licenseNumber },
          setState);
        
        setEmail('');
        setFirstName('');
        setLastName('');
        setLicenseNumber('');
        setMobileNumber('');
        setSpeciality('');
        
      } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
    }
  }

  // change text tag to span for * displaying fields (react wont supprt text tag)
  return (
    <div className="h-screen py-1 bg-primary">
      <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 py-1 bg-white mt-9 ">
        <div className="container horizontal justify-center text-xs py-1">
          <div className="flex justify-center text-lg font-medium m-3 mb-0">
            Doctor Registration
          </div>
          <div className="flex justify-center font-light text-stone-800- text-[14px] text-[#797878]">
            Register the doctor here with the relevant details
          </div>
          <hr className="w-2/3 mx-auto mt-3 mb-0" />
        </div>
        <div className="container horizontal mx-auto mb-0 w-96 justify-left text-xs py-1">
          {/* just to display state after form submit */}
          <p display={state ? "block" : "none"} aria-live="assertive">{state && state.message}</p>
          <form className="mt-0" onSubmit={handleFormSubmit}>
            <div className="container flex">
              <div className="container">
                <div className="formInput">
                  <label className="form-label" htmlFor="firstName">
                    First Name <span className="text-[#ff2727]">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="form-input"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    maxLength={150}
                    minLength={2}
                    required
                  />
                  <span></span>
                </div>
                <div className="formInput" id="right">
                  <label className="form-label" htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    className="form-input"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    maxLength={150}
                    minLength={2}
                  />
                  <span></span>
                </div>
              </div>
              <div className="container ml-3 pt-5 justify-right">
                <ButtonImage />
              </div>
            </div>
            <div className="container flex">
              <div className="container">
                <div className="formInput">
                  <label className="form-label" htmlFor="mobileNumber">
                    Mobile Number <span className="text-[#ff2727]">*</span>
                  </label>
                  <input
                    type="text"
                    id="mobileNumber"
                    className="form-input"
                    onChange={(e) => setMobileNumber(e.target.value)}
                    value={mobileNumber}
                    maxLength={12}
                    minLength={10}
                    required
                  />
                  <span></span>
                </div>
              </div>
              <div className="container ml-3 justify-right">
                <div className="formInput" id="right">
                  <label className="form-label" htmlFor="email">
                    Email <span className="text-[#ff2727]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                  <span></span>
                </div>
              </div>
            </div>
            <div className="formInput">
              <label className="form-label" htmlFor="speciality">
                Speciality <span className="text-[#ff2727]">*</span>
              </label>
              <select
                className="form-input"
                id="speciality"
                onChange={(e) => setSpeciality(e.target.value)}
              >
                <option value="">Select a speciality</option>
                {specialities.map(speciality => (
                  <option key={speciality.speciality_id} value={speciality.speciality_id}>
                    {speciality.speciality_name}
                  </option>
                ))}
              </select>
              <span></span>
            </div>
            <div className="formInput">
              <label className="form-label" htmlFor="licenseNumber">
                License Number <span className="text-[#ff2727]">*</span>
              </label>
              <input
                type="text"
                id="licenseNumber"
                className="form-input"
                onChange={(e) => setLicenseNumber(e.target.value)}
                value={licenseNumber}
                required
                maxLength={50}
              />
              <span></span>
            </div>
            <button className="bg-secondary w-1/4 mx-auto rounded-2xl p-1 text-[#ffffff] font-semibold ">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoc;
