import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "../../styles/FormInput.css";
import ButtonImage from "../../components/Button";
import useAxiosMethods from "../../hooks/useAxiosMethods";

import {

  ButtonGroup,
  Button,
  Flex,
  GridItem,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";

const steps = [
  { title: "General", description: "Contact Info" },
  { title: "PHI Area", description: "Date & Time" },
  { title: "Incharge", description: "Select Rooms" },
];

const EMAIL_REGEX = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;
const MOBILE_REGEX = /^(?:\+94|0)?[0-9]{9,10}$/;

const form1Data = [];
const form2Data = [];
const form3Data = [];

// better to remove the functions from this page and make components and import them here
const Form1 = ({ formData, setFormData }) => {

  const { name, mobileNumber, email, mohArea, longitude, latitude, image } = formData;
  const [tempImgHolder, setTempImageHolder] = useState(null);

  useEffect(() => {
    if (tempImgHolder != null) {
      setFormData({ ...formData, image: tempImgHolder })
    }
  }, [tempImgHolder]);

  return (
    <>
      <form className="mt-0">
        <div className="container flex">
          <div className="container w-3/4">
            <div className="formInput">
              <label className="form-label" htmlFor="username">
                HLC Name <span className="text-[#ff2727]">*</span>
              </label>

              <input
                type="text"
                id="username"
                className="form-input"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                value={name}
                required
              />
              <span className="AddHLC"></span>
            </div>
            <div className="formInput">
              <label className="form-label" htmlFor="mobileNumber">
                Mobile Number <span className="text-[#ff2727]">*</span>
              </label>
              <input
                type="text"
                id="mobileNumber"
                className="form-input"
                onChange={(e) =>
                  setFormData({ ...formData, mobileNumber: e.target.value })
                }
                value={mobileNumber}
                required
              />
              <span></span>
            </div>
          </div>
          <div className="container ml-3 pt-5 justify-right w-1/4">
            <ButtonImage name="Add Image" setImage={setTempImageHolder} image={image} />
          </div>
        </div>
        <div className="container flex">
          <div className="container justify-right">
            <div className="formInput" id="right">
              <label className="form-label" htmlFor="email">
                Email <span className="text-[#ff2727]">*</span>
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                value={email}
                required
              />
              <span></span>
            </div>
          </div>
        </div>
        <div className="formInput">
          <label className="form-label" htmlFor="mohArea">
            MOH Area <span className="text-[#ff2727]">*</span>
          </label>
          <input
            type="text"
            id="mohArea"
            className="form-input"
            onChange={(e) =>
              setFormData({ ...formData, mohArea: e.target.value })
            }
            value={mohArea}
            required
          />
          <span></span>
        </div>
        <div className="container flex gap-5">
          <div className="container w-1/2 formInput">
            <label className="form-label" htmlFor="longitude">
              Longitude <span className="text-[#ff2727]">*</span>
            </label>

            <input
              type="text"
              id="longitude"
              className="form-input"
              onChange={(e) =>
                setFormData({ ...formData, longitude: e.target.value })
              }
              value={longitude}
              required
            />
            <span></span>
          </div>
          <div className="container w-1/2 formInput">
            <label className="form-label" htmlFor="latitude">
              Latitude <span className="text-[#ff2727]">*</span>
            </label>
            <input
              type="text"
              id="latitude"
              className="form-input"
              onChange={(e) =>
                setFormData({ ...formData, latitude: e.target.value })
              }
              value={latitude}
              required
            />
            <span></span>
          </div>
        </div>
      </form>
    </>
  );
};

const Form2 = ({ formData, setFormData }) => {

  const { phmArea, phiArea, gnDivision, dsDivision, gnNumber } = formData;

  return (
    <>
      <form className="mt-0">
        <div className="container flex">
          <div className="container w-[49%]">
            <div className="formInput">
              <label className="form-label" htmlFor="phmArea">
                PHM Area <span className="text-[#ff2727]">*</span>
              </label>
              <input
                type="text"
                id="phmArea"
                className="form-input"
                onChange={(e) => setFormData({ ...formData, phmArea: e.target.value })}
                value={phmArea}
                required
              />
              <span></span>
            </div>
          </div>
          <div className="container ml-[2%] justify-right w-[49%]">
            <div className="formInput" id="right">
              <label className="form-label" htmlFor="phiArea">
                PHI Area <span className="text-[#ff2727]">*</span>
              </label>
              <input
                type="text"
                id="phiArea"
                className="form-input"
                onChange={(e) => setFormData({ ...formData, phiArea: e.target.value })}
                value={phiArea}
                required
              />
              <span></span>
            </div>
          </div>
        </div>
        <div className="formInput">
          <label className="form-label" htmlFor="gnDivision">
            GN Division <span className="text-[#ff2727]">*</span>
          </label>
          <input
            type="text"
            id="gnDivision"
            className="form-input"
            onChange={(e) => setFormData({ ...formData, gnDivision: e.target.value })}
            value={gnDivision}
            required
          />
          <span></span>
        </div>
        <div className="formInput" id="right">
          <label className="form-label" htmlFor="dsDivision">
            DS Division <span className="text-[#ff2727]">*</span>
          </label>
          <input
            type="text"
            id="dsDivision"
            className="form-input"
            onChange={(e) => setFormData({ ...formData, dsDivision: e.target.value })}
            value={dsDivision}
            required
          />
          <span></span>
        </div>
        <div className="formInput">
          <label className="form-label" htmlFor="gnNumber">
            GN Number <span className="text-[#ff2727]">*</span>
          </label>
          <input
            type="text"
            id="gnNumber"
            className="form-input"
            onChange={(e) => setFormData({ ...formData, gnNumber: e.target.value })}
            value={gnNumber}
            required
          />
          <span></span>
        </div>
      </form>
    </>
  );
};

const Form3 = ({ formData, setFormData }) => {

  const { incharge, designation, inchargeEmail, inchargeMobile } = formData;

  return (
    <>
      <form className="mt-0">
        <div className="container flex">
          <div className="container">
            <div className="formInput">
              <label className="form-label" htmlFor="incharge">
                Name of Incharge <span className="text-[#ff2727]">*</span>
              </label>
              <input
                type="text"
                id="incharge"
                className="form-input"
                required
                onChange={(e) => setFormData({ ...formData, incharge: e.target.value })}
                value={incharge}
              />
              <span></span>
            </div>
            <div className="formInput">
              <label className="form-label" htmlFor="designation">
                Designation <span className="text-[#ff2727]">*</span>
              </label>
              <input
                type="text"
                id="designation"
                className="form-input"
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                value={designation}
                required
              />
              <span></span>
            </div>
          </div>
        </div>
        <div className="container flex">
          <div className="container justify-right">
            <div className="formInput" id="right">
              <label className="form-label" htmlFor="inchargeEmail">
                Email <span className="text-[#ff2727]">*</span>
              </label>
              <input
                type="email"
                id="inchargeEmail"
                className="form-input"
                onChange={(e) => setFormData({ ...formData, inchargeEmail: e.target.value })}
                value={inchargeEmail}
                required
              />
              <span></span>
            </div>
          </div>
        </div>
        <div className="formInput">
          <label className="form-label" htmlFor="inchargeMobile">
            Mobile Number <span className="text-[#ff2727]">*</span>
          </label>
          <input
            type="text"
            id="inchargeMobile"
            className="form-input"
            onChange={(e) => setFormData({ ...formData, inchargeMobile: e.target.value })}
            value={inchargeMobile}
            required
          />
          <span></span>
        </div>
      </form>
    </>
  );
};


const AddHLC = (props) => {


  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(33.33);

  const { post } = useAxiosMethods();

  const navigate = useNavigate();
  const location = useLocation();

  const [form1State, setForm1State] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    mohArea: "",
    latitude: "",
    longitude: "",
    image: null
  });

  const [form2State, setForm2State] = useState({
    phmArea: "",
    phiArea: "",
    gnDivision: "",
    dsDivision: "",
    gnNumber: "",
  });

  const [form3State, setForm3State] = useState({
    incharge: "",
    designation: "",
    inchargeEmail: "",
    inchargeMobile: "",
  });

  const [state, setState] = useState(null)

  const { activeStep } = useSteps({
    index: 0,
    count: step,
  });


  const handleSubmit = (formData) => {
    console.log(formData);
    console.log(MOBILE_REGEX.test(formData.mobileNumber), EMAIL_REGEX.test(formData.email), MOBILE_REGEX.test(formData.in_charge_mobile), EMAIL_REGEX.test(formData.in_charge_email));

    if (!MOBILE_REGEX.test(formData.mobileNumber)) {
      setState({ message: "Invalid HLC Mobile Number" });
      return;
    }

    if (!EMAIL_REGEX.test(formData.email)) {
      setState({ message: "Invalid HLC Email" });
      return;
    }

    if (!MOBILE_REGEX.test(formData.in_charge_mobile)) {
      setState({ message: "Invalid Incharge Mobile Number" });
      return;
    }

    if (!EMAIL_REGEX.test(formData.in_charge_email)) {
      setState({ message: "Invalid Incharge Email" });
      return;
    }

    try {
      post('/register-user/register-hlc', formData, setState, true);

      // setForm1State({
      //   name: "",
      //   mobileNumber: "",
      //   email: "",
      //   mohArea: "",
      //   latitude: "",
      //   longitude: "",
      //   image: null
      // });
      // setForm2State({
      //   phmArea: "",
      //   phiArea: "",
      //   gnDivision: "",
      //   dsDivision: "",
      //   gnNumber: "",
      // });
      // setForm3State({
      //   incharge: "",
      //   designation: "",
      //   inchargeEmail: "",
      //   inchargeMobile: "",
      // });

    } catch (err) {
      console.error(err);
      navigate('/login', { state: { from: location }, replace: true });
    }

  };


  // added form data to global arrays to ease ease of accessing
  const AddFormData = (formStep) => {

    if (formStep === 0) {
      form1Data.push(
        form1State.name,
        form1State.mobileNumber,
        form1State.email,
        form1State.mohArea,
        form1State.longitude,
        form1State.latitude,
        form1State.image
      );
    } else if (formStep === 1) {
      form2Data.push(
        form2State.phmArea,
        form2State.phiArea,
        form2State.gnDivision,
        form2State.dsDivision,
        form2State.gnNumber
      );
    } else {
      form3Data.push(
        form3State.incharge,
        form3State.designation,
        form3State.inchargeEmail,
        form3State.inchargeMobile
      );
    }

    if (formStep === 2) {

      const formData = {
        hlc_name: form1Data[0],
        mobileNumber: form1Data[1],
        email: form1Data[2],
        moh_area: form1Data[3],
        longitude: form1Data[4],
        latitude: form1Data[5],
        image: form1Data[6],
        phm_area: form2Data[0],
        phi_area: form2Data[1],
        gn_division: form2Data[2],
        ds_division: form2Data[3],
        gn_number: form2Data[4],
        in_charge: form3Data[0],
        in_charge_designation: form3Data[1],
        in_charge_email: form3Data[2],
        in_charge_mobile: form3Data[3],
      };

      console.log("Submitted Form Data:", formData);

      handleSubmit(formData);
    }
  }


  return (
    <GridItem colSpan={6} >
      <div className="h-screen bg-primary">
        <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 py-1 bg-white mt-[5%] ">
          <div className="container horizontal justify-center py-1">
            <div className="flex justify-center text-xl font-medium m-3 mb-0">
              HLC Registration
            </div>
            <div className="flex justify-center font-light text-stone-800- text-[17px] text-[#797878]">
              Register the HLC here with the relevant details
            </div>
            <hr className="w-2/3 mx-auto mt-2 mb-0" />
          </div>
          <div className="container horizontal mx-auto mb-0 w-96 justify-left text-[17px] py-1">

            {/* just to display state after form submit */}
            <p display={state ? "block" : "none"} aria-live="assertive">{state && state.message}</p>
            <Stepper index={step} className="w-3/4 mx-auto mt-3 mb-5">

              {steps.map((step, index) => (
                <Step key={index}>
                  <div>
                    <StepStatus
                      complete={
                        <>
                          <StepIndicator
                            className="bg-[#c9c9c9] border-none"
                            height={6}
                            width={6}
                          >
                            <StepIcon
                              fontSize={15}
                              className="text-white text-sm"
                            />
                          </StepIndicator>
                        </>
                      }
                      incomplete={
                        <StepIndicator
                          className="bg-[#c9c9c9] w-10 border-none"
                          height={6}
                          width={6}
                        >
                          <StepNumber
                            fontSize={15}
                            className="text-white text-sm"
                          />
                        </StepIndicator>
                      }
                      active={
                        <StepIndicator
                          className="w-10 border-red-200"
                          height={6}
                          width={6}
                        >
                          <StepNumber
                            fontSize={15}
                            className="text-white text-sm"
                            color={"#645bee"}
                          />
                        </StepIndicator>
                      }
                    />
                    <div className="mx-auto">
                      <StepTitle
                        className="mx-auto"
                        fontSize={12}
                        color={"#b3b3b3"}
                      >
                        {step.title}
                      </StepTitle>
                    </div>
                  </div>
                  <StepSeparator className="mb-3" />
                </Step>
              ))}
            </Stepper>

            {step === 0 ? (
              <Form1 formData={form1State} setFormData={setForm1State} />
            ) : step === 1 ? (
              <Form2 formData={form2State} setFormData={setForm2State} />
            ) : (
              <Form3 formData={form3State} setFormData={setForm3State} />
            )}

            <ButtonGroup w="100%" mb="5%" mt="9%">
              <Flex w="100%" justifyContent="space-between">
                <Flex className="mx-auto">

                  <Button
                    onClick={() => {
                      setStep(step - 1);
                      setProgress(progress - 33.33);
                    }}
                    isDisabled={step === 0}
                    variant="solid"
                    w="4rem"
                    mr="5%"
                    mt="0%"
                    backgroundColor="#645bee"
                    color={"white"}
                    h="1.5rem"
                    borderRadius={20}
                    fontSize={16}
                  >
                    Back
                  </Button>

                  {step === 2 ? (
                    <div className="w-40 text-center">
                      <Button
                        w="6rem"
                        h="1.5rem"
                        id="submitBtn"
                        type="submit"
                        float={"center"}
                        mt="0%"
                        fontSize={16}
                        colorScheme="red"
                        borderRadius={20}
                        onClick={(e) => {
                          e.preventDefault();
                          setStep(step + 1);
                          setProgress(progress - 33.33);
                          AddFormData(step);
                        }}
                      >
                        Submit
                      </Button>
                    </div>
                  ) : (
                    // change the btn layout to not show next in last page
                    <Button
                      w="4rem"
                      h="1.5rem"
                      id="nextbtn"
                      type="submit"
                      borderRadius={20}
                      backgroundColor="#645bee"
                      isDisabled={step === 3}
                      fontSize={16}
                      mt="0%"
                      color={"white"}
                      _hover={"red"}
                      onClick={() => {
                        setStep(step + 1);
                        if (step === 3) {
                          setProgress(100);
                        } else {
                          setProgress(progress + 33.33);
                        }
                        AddFormData(step);
                      }}
                    >
                      Next
                    </Button>
                  )}

                </Flex>
              </Flex>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </GridItem>
  );
};

export default AddHLC;
