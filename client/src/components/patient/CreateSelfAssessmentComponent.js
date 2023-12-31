import React, { useState, useEffect } from "react";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/FormInput.css";
import { GridItem } from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";

const CreateSelfAssessmentComponent = () => {
  const [res, setRes] = useState("");

  const { auth } = useAuth();
  const { post } = useAxiosMethods();
  const navigate = useNavigate();
  const location = useLocation();

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
        "/CreateSelfAssessment",
        {
          firstName: auth.first_name,
          lastName: auth.last_name,
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
          patient: auth.user_id,
        },
        setRes
      );

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
      navigate('/SelfAssessments')
    } catch (err) {
      console.error(err);
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  useEffect(() => {
    console.log(res);
  }, [res]);

  const changephysicalActivityHandler = (event) => {
    setphysicalActivity(event.target.value)
  };

  const changetobaccoSmokingHandler = (event) => {
    settobaccoSmoking(event.target.value);
  };

  const changebeetlechewingHandler = (event) => {
    setbeetlechewing(event.target.value);
  };

  const changealcoholConsumptionHandler = (event) => {
    setalcoholConsumption(event.target.value);
  };

  const changeotherSubstanceHandler = (event) => {
    setotherSubstance(event.target.value);
  };

  const changeSnackHandler = (event) => {
    setsnackIntake(event.target.value);
  };

  const changeheartDiseaseHandler = (event) => {
    setheartDisease(event.target.value);
  };

  const changeHighBloodPressureHandler = (event) => {
    setHighBloodPressure(event.target.value);
  };

  const changeStrokeHandler = (event) => {
    setStroke(event.target.value);
  };

  const changeDiabetesHandler = (event) => {
    setDiabetes(event.target.value);
  };

  const changeCancerHandler = (event) => {
    setCancer(event.target.value);
  };

  const changeCOPDHandler = (event) => {
    setCOPD(event.target.value);
  };

  const changeAsthmaHandler = (event) => {
    setAsthma(event.target.value);
  };

  const changekidneyDiseasesHandler = (event) => {
    setkidneyDiseases(event.target.value);
  };

  const changesuddenDeathHandler = (event) => {
    setsuddenDeath(event.target.value);
  };

  const changeotherDiseasesHandler = (event) => {
    setotherDiseases(event.target.value);
  };

  const backPage = () => navigate('/SelfAssessments');

  function InputRow(props) {
    return (
      <div className="mt-2">
        <div className="flex mb-1 m-3">
          <div className="w-3/4 text-[18px]  ">{props.name}</div>

          <div className="w-1/4 flex float-right text-[#797878]">
            <div>
              <input
                type="radio"
                name={props.nameOptions}
                value="true"
                className="form-radio-btn"
                id={props.nameOptions + "Y"}
                onChange={props.handle}
                checked={props.radioName === "true" ? true : false}
              />
              <label for={props.nameOptions + "Y"} className="form-radio-label">
                Yes
              </label>
              <input
                type="radio"
                name={props.nameOptions}
                className="form-radio-btn"
                value="false"
                checked={props.radioName === "false" ? true : false}
                onChange={props.handle}
                id={props.nameOptions + "N"}
              />
              <label for={props.nameOptions + "N"} className="form-radio-label">
                No
              </label>
            </div>
          </div>
        </div>
        <hr className="mt-2"></hr>
      </div>
    );
  }

  return (
    <GridItem colSpan={6}>
      <div className=" py-1 bg-primary mt-[5%]">
        <div className="md:w-3/4 mx-auto mt-6 shadow-xl rounded-2xl pb-2 py-1 bg-white mb-9">
          <div className="container horizontal justify-center text-xs py-1">
            <div className="flex justify-center text-lg font-medium m-3 mb-0">
              Risk Assessment
            </div>
            <div className="flex justify-center font-light text-stone-800- text-[17px] text-[#797878]">
              Add the relevant details and diagnose the risk
            </div>
            <hr className="w-2/3 mx-auto mt-1 mb-0" />
            <div className="w-3/4 mx-auto mt-1">
              <form>
                <div className="habits mb-3">
                  <div className="flex font-light text-[#797878] mt-7 text-[18px]">
                    Do you have any of the following Habits?
                  </div>
                  <hr className="mx-auto mt-1 mb-6" />
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
                    <div className="flex mb-1  m-3">
                      <div className="w-3/4 text-[18px]  ">
                        How often do you eat snacks in a week?
                      </div>
                      <div className="w-1/4 flex float-right text-[#797878]">
                        <div>
                          <input
                            type="radio"
                            name="Snack"
                            value="LESS_THAN_5"
                            className="form-radio-btn"
                            id="SnackLess"
                            onChange={changeSnackHandler}
                          />
                          <label for="SnackLess" className="form-radio-label">
                            &lt;5
                          </label>
                          <input
                            type="radio"
                            name="Snack"
                            value="NO_CONSUMPTION"
                            className="form-radio-btn"
                            id="SnackNo"
                            onChange={changeSnackHandler}
                          />
                          <label for="SnackNo" className="form-radio-label">
                            No
                          </label>
                          <input
                            type="radio"
                            name="Snack"
                            className="form-radio-btn"
                            id="SnackMore"
                            value="MORE_THAN_5"
                            onChange={changeSnackHandler}
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
                  <div className="flex font-light text-[#797878] mt-7 text-[18px]">
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
                    nameOptions="Diabetes"
                    radioName={Diabetes}
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
                    nameOptions="Asthma"
                    radioName={Asthma}
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

                  <div className="flex flex-col mt-7">
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

                <div className="flex mt-7">
                  <button
                    className="bg-[#ff0000] w-1/4 mx-auto rounded-2xl p-3 text-[#ffffff] font-semibold mt-3"
                    onClick={backPage}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-secondary w-1/4 mx-auto rounded-2xl p-3 text-[#ffffff] font-semibold mt-3"
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
    </GridItem>
  );
};

export default CreateSelfAssessmentComponent;
