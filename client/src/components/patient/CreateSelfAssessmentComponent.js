import React, { useState, useEffect } from "react";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/FormInput.css";

const CreateSelfAssessmentComponent = () => {
  const [res, setRes] = useState("");

  const { post } = useAxiosMethods();
  const navigate = useNavigate();
  const location = useLocation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setemailId] = useState("");

  const [physicalActivity, setphysicalActivity] = useState("");
  const [tobaccoSmoking, settobaccoSmoking] = useState("");
  const [beetlechewing, setbeetlechewing] = useState("");
  const [alcoholConsumption, setalcoholConsumption] = useState("");
  const [otherSubstance, setotherSubstance] = useState("");
  const [snackIntake, setsnackIntake] = useState("");
  const [heartDisease, setheartDisease] = useState("");
  const [HighBloodPressure, setHighBloodPressure] = useState("");
  const [Stroke, setStroke] = useState("");
  const [Diabetes, setDiabetes] = useState("");
  const [Cancer, setCancer] = useState("");
  const [COPD, setCOPD] = useState("");
  const [Asthma, setAsthma] = useState("");
  const [kidneyDiseases, setkidneyDiseases] = useState("");
  const [suddenDeath, setsuddenDeath] = useState("");
  const [otherDiseases, setotherDiseases] = useState("");

  const saveOrUpdateSelfAssessment = async (e) => {
    e.preventDefault();

    try {
      post(
        "CreateSelfAssessment",
        {
          firstName,
          lastName,
          emailId,
          physicalActivity,
          tobaccoSmoking,
          beetlechewing,
          alcoholConsumption,
          otherSubstance,
          snackIntake,
          heartDisease,
          HighBloodPressure,
          Stroke,
          Diabetes,
          Cancer,
          COPD,
          Asthma,
          kidneyDiseases,
          suddenDeath,
          otherDiseases,
        },
        setRes
      );

      setFirstName("");
      setLastName("");
      setemailId("");
      setphysicalActivity("");
      settobaccoSmoking("");
      setbeetlechewing("");
      setalcoholConsumption("");
      setotherSubstance("");
      setsnackIntake("");
      setheartDisease("");
      setHighBloodPressure("");
      setStroke("");
      setDiabetes("");
      setCancer("");
      setCOPD("");
      setAsthma("");
      setkidneyDiseases("");
      setsuddenDeath("");
      setotherDiseases("");
    } catch (err) {
      console.error(err);
      navigate("/login", { state: { from: location }, replace: true });
    }
    console.log('HighBloodPressure');
    console.log(HighBloodPressure);
    console.log('physicalActivity');
    console.log(physicalActivity);
    console.log('tobaccoSmoking');
    console.log(tobaccoSmoking);
    console.log('beetlechewing');
    console.log(beetlechewing);
    console.log('alcoholConsumption');
    console.log(alcoholConsumption);
    console.log('otherSubstance');
    console.log(otherSubstance);
    console.log("heartDisease");
    console.log(heartDisease);
    console.log(Stroke);
    console.log(firstName);
  };

  useEffect(() => {
    console.log(res);
  }, [res]);

  const changeFirstNameHandler = (event) => {
    setFirstName(event.target.value);
  };

  const changeLastNameHandler = (event) => {
    setLastName(event.target.value);
  };

  const changeEmailHandler = (event) => {
    setemailId(event.target.value);
  };

  const changephysicalActivityHandler = (event) => {
    const physicalActivity = event.target.checked ? "true" : "false";
    setphysicalActivity(physicalActivity);
  };

  const changetobaccoSmokingHandler = (event) => {
    const tobaccoSmoking = event.target.checked ? "true" : "false";
    settobaccoSmoking(tobaccoSmoking);
  };

  const changebeetlechewingHandler = (event) => {
    const beetlechewing = event.target.checked ? "true" : "false";
    setbeetlechewing(beetlechewing);
  };

  const changealcoholConsumptionHandler = (event) => {
    const alcoholConsumption = event.target.checked ? "true" : "false";
    setalcoholConsumption(alcoholConsumption);
  };

  const changeotherSubstanceHandler = (event) => {
    const otherSubstance = event.target.checked ? "true" : "false";
    setotherSubstance(otherSubstance);
  };

  //snack intake
  const changeSnackNonConsumer = (event) => {
    if (!event.target.checked) {
      // Exit the function if the checkbox is not checked
      return;
    }

    const snackIntake = "NO_CONSUMPTION";
    setsnackIntake(snackIntake);
  };

  const changeSnackLessThan5 = (event) => {
    if (!event.target.checked) {
      return;
    }

    const snackIntake = "LESS_THAN_5";
    setsnackIntake(snackIntake);
  };

  const changeSnackMoreThan5 = (event) => {
    if (!event.target.checked) {
      return;
    }

    const snackIntake = "MORE_THAN_5";
    setsnackIntake(snackIntake);
  };

  const changeheartDiseaseHandler = (event) => {
    setheartDisease(event.target.value);
  };

  const changeHighBloodPressureHandler = (event) => {
    const HighBloodPressure = event.target.checked ? "true" : "false";
    setHighBloodPressure(HighBloodPressure);
  };

  const changeStrokeHandler = (event) => {
    const Stroke = event.target.checked ? "true" : "false";
    setStroke(Stroke);
  };

  const changeDiabetesHandler = (event) => {
    const Diabetes = event.target.checked ? "true" : "false";
    setDiabetes(Diabetes);
  };

  const changeCancerHandler = (event) => {
    const Cancer = event.target.checked ? "true" : "false";
    setCancer(Cancer);
  };

  const changeCOPDHandler = (event) => {
    const COPD = event.target.checked ? "true" : "false";
    setCOPD(COPD);
  };

  const changeAsthmaHandler = (event) => {
    const Asthma = event.target.checked ? "true" : "false";
    setAsthma(Asthma);
  };

  const changekidneyDiseasesHandler = (event) => {
    const kidneyDiseases = event.target.checked ? "true" : "false";
    setkidneyDiseases(kidneyDiseases);
  };

  const changesuddenDeathHandler = (event) => {
    const suddenDeath = event.target.checked ? "true" : "false";
    setsuddenDeath(suddenDeath);
  };

  const changeotherDiseasesHandler = (event) => {
    setotherDiseases(event.target.value);
  };

  const cancel = () => {
    // Navigate back to the SelfAssessments list
    window.location.href = "/SelfAssessments";
  };

  const setOption = (functionChange, value) => {
    functionChange(value);
  };

  function InputRow(props) {
    return (
      <div className="mt-2">
        <div className="flex mb-1">
          <div className="w-3/4 text-[15px]  ">{props.name}</div>

          <div className="w-1/4 flex float-right text-[#797878]">
            <div>
              <input
                type="radio"
                name={props.nameOptions}
                value={props.radioName}
                className="form-radio-btn"
                id={props.nameOptions + "Y"}
                onChange={props.handle}
                checked={props.radioName == "true" ? true : false}
              />
              <label for={props.nameOptions + "Y"} className="form-radio-label">
                Yes
              </label>
              <input
                type="radio"
                name={props.nameOptions}
                className="form-radio-btn"
                value={props.radioName}
                checked={props.radioName == "false" ? true : false}
                onChange={props.handle}
                id={props.nameOptions + "N"}
              />
              <label for={props.nameOptions + "N"} className="form-radio-label">
                No
              </label>
            </div>
          </div>
        </div>
        <hr className=""></hr>
      </div>
    );
  }

  return (
    <div className=" bg-primary py-1">
      <div className="md:w-1/2 mx-auto mt-6 shadow-xl rounded-2xl pb-2 py-1 bg-white ">
        <div className="container horizontal justify-center text-xs py-1">
          <div className="flex justify-center text-lg font-medium m-3 mb-0">
            Risk Assessment
          </div>
          <div className="flex justify-center font-light text-stone-800- text-[14px] text-[#797878]">
            Add the relevant details and diagnose the risk
          </div>
          <hr className="w-2/3 mx-auto mt-1 mb-0" />
          <div className="w-3/4 mx-auto mt-1">
            <form>
              <div className="general">
                <div className="flex">
                  <div className=" flex flex-col md:w-[48%]">
                    <label className="form-label">First Name</label>
                    <input
                      placeholder="First Name"
                      name="firstName"
                      className="form-input"
                      value={firstName}
                      onChange={(event) => {
                        setFirstName(event.target.value);
                      }}
                    />
                  </div>
                  <div className=" flex flex-col ml-[4%] md:w-[48%]">
                    <label className="form-label"> Last Name: </label>
                    <input
                      placeholder="Last Name"
                      name="lastName"
                      className="form-input"
                      value={lastName}
                      onChange={changeLastNameHandler}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="form-label"> Email Id: </label>
                  <input
                    placeholder="Email Address"
                    name="emailId"
                    className="form-input"
                    value={emailId}
                    onChange={changeEmailHandler}
                  />
                </div>
              </div>

              <div className="habits mb-3">
                <div className="flex font-light text-[#797878] mt-3">
                  Do you have the following Habits?
                </div>
                <hr className="mx-auto mt-1 mb-5" />
                <InputRow
                  name="Do you actively engage in physical activities?"
                  nameOptions="physicalActivity"
                  radioName={physicalActivity}
                  handle={changephysicalActivityHandler}
                />
                <InputRow
                  name=" Do you consume tobacco?"
                  nameOptions="tobaccoSmoking"
                  radioName={tobaccoSmoking}
                  handle={changetobaccoSmokingHandler}
                />
                <InputRow
                  name=" Do you consume beetle?"
                  nameOptions="beetlechewing"
                  radioName={beetlechewing}
                  handle={changebeetlechewingHandler}
                />
                <InputRow
                  name=" Do you consume alcohol?"
                  nameOptions="alcoholConsumption"
                  radioName={alcoholConsumption}
                  handle={changealcoholConsumptionHandler}
                />
                <InputRow
                  name="Do you consume any other substances?"
                  nameOptions="otherSubstance"
                  radioName={otherSubstance}
                  handle={changeotherSubstanceHandler}
                />

                <div className="mt-2">
                  <div className="flex mb-1">
                    <div className="w-3/4 text-[15px]  ">
                      How often do you eat snacks in a week?
                    </div>
                    <div className="w-1/4 flex float-right text-[#797878]">
                      <div>
                        <input
                          type="radio"
                          name="Snack"
                          className="form-radio-btn"
                          id="SnackLess"
                          onChange={changeSnackLessThan5}
                        />
                        <label for="SnackLess" className="form-radio-label">
                          &lt;5
                        </label>
                        <input
                          type="radio"
                          name="Snack"
                          className="form-radio-btn"
                          id="SnackNo"
                          onChange={changeSnackNonConsumer}
                        />
                        <label for="SnackNo" className="form-radio-label">
                          No
                        </label>
                        <input
                          type="radio"
                          name="Snack"
                          className="form-radio-btn"
                          id="SnackMore"
                          onChange={changeSnackNonConsumer}
                        />
                        <label for="SnackMore" className="form-radio-label">
                          &gt;5
                        </label>
                      </div>
                    </div>
                  </div>
                  <hr className=""></hr>
                </div>
              </div>

              <div className="habits mb-3">
                <div className="flex font-light text-[#797878] mt-3">
                  Did your family members suffer from following diseases?
                </div>
                <hr className="mx-auto mt-1 mb-5" />

                <InputRow
                  name="Heart Disease"
                  nameOptions="heartDisease"
                  radioName={heartDisease}
                  handle={changeheartDiseaseHandler}
                />

                <InputRow
                  name="High Blood Pressure"
                  nameOptions="HighBloodPressure"
                  radioName={HighBloodPressure}
                  handle={changeHighBloodPressureHandler}
                />

                <InputRow
                  name="Stroke"
                  nameOptions="Stroke"
                  radioName={Stroke}
                  handle={changeStrokeHandler}
                />
                <InputRow
                  name="Diabetes"
                  nameOptions={Diabetes}
                  radioName="Diabetes"
                  handle={changeDiabetesHandler}
                />

                <InputRow
                  name="Cancer"
                  nameOptions="Cancer"
                  radioName={Cancer}
                  handle={changeCancerHandler}
                />

                <InputRow
                  name="COPD"
                  nameOptions="COPD"
                  radioName={COPD}
                  handle={changeCOPDHandler}
                />

                <InputRow
                  name="Asthma"
                  radioName="Asthma"
                  nameOptions={Asthma}
                  handle={changeAsthmaHandler}
                />

                <InputRow
                  name="Kidney Diseases"
                  nameOptions="kidneyDiseases"
                  radioName={kidneyDiseases}
                  handle={changekidneyDiseasesHandler}
                />
                <InputRow
                  name="Sudden Death"
                  nameOptions="suddenDeath"
                  radioName={suddenDeath}
                  handle={changesuddenDeathHandler}
                />

                <div className="flex flex-col">
                  <label className="form-label"> Other Diseases: </label>
                  <input
                    placeholder="Name any other diseases"
                    name="otherDiseases"
                    className="form-input"
                    value={otherDiseases}
                    onChange={changeotherDiseasesHandler}
                  />
                </div>
              </div>

              <div className="flex">
                <button
                  className="bg-[#ff0000] w-1/4 mx-auto rounded-2xl p-1 text-[#ffffff] font-semibold mt-3"
                  onClick={cancel.bind(this)}
                >
                  Cancel
                </button>
                <button
                  className="bg-secondary w-1/4 mx-auto rounded-2xl p-1 text-[#ffffff] font-semibold mt-3"
                  onClick={saveOrUpdateSelfAssessment}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="card col-md-8 offset-md-3 offset-md-2">
            <div className="card-body"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSelfAssessmentComponent;
