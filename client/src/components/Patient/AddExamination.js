import { useState, React, useEffect } from "react";
import { GridItem } from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const AddExamination = () => {

  
  const { auth } = useAuth();
  const { post } = useAxiosMethods();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [waist, setWaist] = useState("");
  const [hearingRight, setHearingRight] = useState("");
  const [hearingLeft, setHearingLeft] = useState("");
  const [visionRight, setVisionRight] = useState("");
  const [visionLeft, setVisionLeft] = useState("");
  const [oralExam, setOralExam] = useState("");
  const [bloodSugarRandom, setBloodSugarRandom] = useState("");
  const [bloodSugarFasting, setBloodSugarFasting] = useState("");
  const [serumCreatinin, setSerumCreatinin] = useState("");
  const [lipidProfileTG, setLipidProfileTG] = useState("");
  const [lipidProfileTC, setLipidProfileTC] = useState("");
  const [lipidProfileTCHL, setLipidProfileTCHL] = useState("");
  const [lipidProfileLDL, setLipidProfileLDL] = useState("");
  const [lipidProfileHDL, setlipidProfileHDL] = useState("");
  const [cholesterolLvl, setCholesterolLvl] = useState("");
  const [sbp, setSbp] = useState("");
  const [bmi, setBmi] = useState(0);
  const [waistHeightRatio, setWaistHeightRatio] = useState(0);

  const [res, setRes] = useState("");

  const saveExam = async (e) => {
    e.preventDefault();

    try {
      post(
        `/CreateMedicalTest/${id}`,
        {
          weight,
          height,
          waistCircumference: waist,
          waistHeightRatio,
          bmi,
          hearingRight,
          hearingLeft,
          visionRight,
          visionLeft,
          oralExamination: oralExam,
          randombloodSugar: bloodSugarRandom,
          fastingbloodSugar: bloodSugarFasting,
          serumCreatinin: serumCreatinin,
          lipidTg: lipidProfileTG,
          lipidTC: lipidProfileTC,
          lipidTCHL: lipidProfileTCHL,
          lipidLDL: lipidProfileLDL,
          lipidHDL: lipidProfileHDL,
          sbp,
          cholesterolLvl,
          patient: auth.user_id,
        },
        setRes
      );

      setWeight("");
      setHeight("");
      setWaist("");
      setHearingLeft("");
      setHearingRight("");
      setVisionLeft("");
      setVisionRight("");
      setOralExam("");
      setBloodSugarFasting("");
      setBloodSugarRandom("");
      setSerumCreatinin("");
      setLipidProfileLDL("");
      setLipidProfileTG("");
      setLipidProfileTC("");
      setLipidProfileTCHL("");
      setlipidProfileHDL("");
      setCholesterolLvl("");
      setSbp("");
      setBmi("");
      setWaistHeightRatio("");
      navigate(`/view-SelfAssessment/${id}`);
    } catch (err) {
      console.error(err);
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  useEffect(() => {
    console.log(res);
  }, [res]);

  useEffect(() => {
    calculateBmi();
  }, [weight, height]);

  useEffect(() => {
    calculateWaistHeightRatio();
  }, [waist, height]);

  function CalculateBox(props) {
    return (
      <div className=" flex flex-col m-2">
        <label className="form-label mb-1">{props.name}</label>
        <div className="flex">
          <div className="text-[22px] bg-[#c4fd8e] p-2 rounded-md">
            {" "}
            {props.name === "BMI" ? bmi : waistHeightRatio}
          </div>
        </div>
      </div>
    );
  }

  const calculateBmi = () => {
    if (weight && height) {
      const weightInKg = parseFloat(weight);
      const heightInM = parseFloat(height) / 100;
      const bmiValue = weightInKg / (heightInM * heightInM);
      setBmi(bmiValue.toFixed(2));
    }
  };

  const calculateWaistHeightRatio = () => {
    if (waist && height) {
      const waistInCm = parseFloat(waist);
      const heightInCm = parseFloat(height);
      const waistHeightRatioValue = waistInCm / heightInCm;
      setWaistHeightRatio(waistHeightRatioValue.toFixed(2));
    }
  };

  const backPage = () => navigate(`/view-SelfAssessment/${id}`);

  return (
    <GridItem colSpan={6} mx={4} mt={2}>
      <div className=" bg-primary py-1">
        <div className="md:w-1/2 h-auto mx-auto mt-6 shadow-xl rounded-2xl pb-2 py-1 bg-white mb-6">
          <div className="container horizontal justify-center text-xs py-1">
            <div className="flex justify-center text-2xl font-medium m-3 mt-7 mb-0">
              Examination Data
            </div>
            <div className="flex justify-center font-light text-stone-800- text-[22px] text-[#797878]">
              Add the relevant Examination details to diagnose the risk
            </div>
            <hr className="w-2/3 mx-auto mt-3 mb-0" />
            <div className="w-3/4 mx-auto mt-4">
              <form>
                <div className="general">
                  <div className="flex text-[22px] font-light text-[#797878] m-2 mb-0 ">
                    Physiological Data
                  </div>
                  <div className="flex">
                    <div className=" flex flex-col m-2">
                      <label className="form-label mb-1">Weight (Kg)</label>
                      <input
                        placeholder="70"
                        name="weight"
                        className="form-input p-2"
                        onChange={(event) => setWeight(event.target.value)}
                        value={weight}
                        required={true}
                      />
                    </div>

                    <div className=" flex flex-col m-2">
                      <label className="form-label mb-1">Height (cm)</label>
                      <input
                      placeholder="175"
                        name="height"
                        className="form-input p-2"
                        onChange={(event) => setHeight(event.target.value)}
                        value={height}
                        required={true}
                      />
                    </div>
                    <CalculateBox name="BMI" />
                  </div>
                  <div className="flex">
                    <div className=" flex flex-col m-2">
                      <label className="form-label mb-1">Waist (cm)</label>
                      <input
                        placeholder="80"
                        name="waist"
                        className="form-input p-2"
                        onChange={(event) => setWaist(event.target.value)}
                        value={waist}
                        required={true}
                      />
                    </div>
                    <CalculateBox name="Waist - Height Ratio" />
                  </div>
                  <div className="flex">
                    <div className=" flex flex-col m-2">
                      <label className="form-label mb-1">
                        Cholesterol Level (4 - 8)
                      </label>
                      <input
                        placeholder="4"
                        name="cholesterolLvl"
                        className="form-input p-2"
                        onChange={(event) =>
                          setCholesterolLvl(event.target.value)
                        }
                        value={cholesterolLvl}
                        required={true}
                      />
                    </div>
                    <div className=" flex flex-col m-2">
                      <label className="form-label mb-1">SBP</label>
                      <input
                        placeholder="120"
                        name="sbp"
                        className="form-input p-2"
                        onChange={(event) => setSbp(event.target.value)}
                        value={sbp}
                        required={true}
                      />
                    </div>
                    {/* <CalculateBox name="Type" /> */}
                  </div>
                  <div className="flex">
                    <div className=" flex flex-col m-2">
                      <label className="form-label mb-1">Hearing Right (1 - 6)</label>
                      <input
                        placeholder="1"
                        name="hearingRight"
                        className="form-input p-2"
                        onChange={(event) =>
                          setHearingRight(event.target.value)
                        }
                        value={hearingRight}
                        required={true}
                      />
                    </div>
                    <div className=" flex flex-col m-2">
                      <label className="form-label mb-1">Hearing Left (1 - 6)</label>
                      <input
                        placeholder="1"
                        name="hearingLeft"
                        className="form-input p-2"
                        onChange={(event) => setHearingLeft(event.target.value)}
                        value={hearingLeft}
                        required={true}
                      />
                    </div>
                    {/* <CalculateBox name="Type" /> */}
                  </div>
                  <div className="flex">
                    <div className=" flex flex-col m-2">
                      <label className="form-label mb-1">Vision Right (1 - 10)</label>
                      <input
                        placeholder="10"
                        name="visionRight"
                        className="form-input p-2"
                        onChange={(event) => setVisionRight(event.target.value)}
                        value={visionRight}
                        required={true}
                      />
                    </div>
                    <div className=" flex flex-col m-2">
                      <label className="form-label mb-1">Vision Left (1 - 10)</label>
                      <input
                        placeholder="10"
                        name="visionLeft"
                        className="form-input p-2"
                        onChange={(event) => setVisionLeft(event.target.value)}
                        value={visionLeft}
                        required={true}
                      />
                    </div>
                    {/* <CalculateBox name="Type" /> */}
                  </div>
                  <div className="w-3/4">
                    <div className=" flex flex-col m-2">
                      <label className="form-label mb-1">
                        Oral Examination
                      </label>
                      <input
                        placeholder="No cavities, good oral hygiene"
                        name="oralExam"
                        className="form-input p-2"
                        onChange={(event) => setOralExam(event.target.value)}
                        value={oralExam}
                        required={true}
                      />
                    </div>
                  </div>
                </div>
                <hr className="mx-auto mt-5" />
                <div className="general">
                  <div className="flex text-[22px] font-light text-[#797878] m-2 mb-0 mt-4 ">
                    Examination Data
                  </div>
                  <div className="flex">
                    <div className=" flex flex-col m-2">
                      <label className="form-label mb-1">
                        Fasting Blood Sugar (mg/dl)
                      </label>
                      <input
                        placeholder="90"
                        name="bloodSugarFasting"
                        className="form-input p-2"
                        onChange={(event) =>
                          setBloodSugarFasting(event.target.value)
                        }
                        value={bloodSugarFasting}
                        required={true}
                      />
                    </div>
                    {/* <CalculateBox name="Range" /> */}

                    <div className=" flex flex-col m-2">
                      <label className="form-label mb-1">
                        Random Blood Sugar (mg/dl)
                      </label>
                      <input
                        placeholder="140"
                        name="bloodSugarRandom"
                        className="form-input p-2"
                        onChange={(event) =>
                          setBloodSugarRandom(event.target.value)
                        }
                        value={bloodSugarRandom}
                        required={true}
                      />
                    </div>
                    {/* <CalculateBox name="Range" /> */}
                  </div>
                  <div className="flex">
                    <div className=" flex flex-col m-2">
                      <label className="form-label mb-1">
                        Serum Creatinin (mg/dl)
                      </label>
                      <input
                        placeholder="0.8"
                        name="serumCreatinin"
                        className="form-input p-2"
                        onChange={(event) =>
                          setSerumCreatinin(event.target.value)
                        }
                        value={serumCreatinin}
                        required={true}
                      />
                    </div>
                    {/* <CalculateBox name="Range" /> */}
                  </div>
                  <div className="flex">
                    <div className=" flex flex-col m-2">
                      <label className="form-label mb-1">
                        Lipid Profile TG
                      </label>
                      <input
                        placeholder="150"
                        name="lipidProfileTG"
                        className="form-input p-2"
                        onChange={(event) =>
                          setLipidProfileTG(event.target.value)
                        }
                        value={lipidProfileTG}
                        required={true}
                      />
                    </div>
                    <div className=" flex flex-col m-2">
                      <label className="form-label mb-1">
                        Lipid Profile TC
                      </label>
                      <input
                        placeholder="200"
                        name="lipidProfileTC"
                        className="form-input p-2"
                        onChange={(event) =>
                          setLipidProfileTC(event.target.value)
                        }
                        value={lipidProfileTC}
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="flex">
                    <div className=" flex flex-col m-2">
                      <label className="form-label mb-1">
                        Lipid Profile TCHL
                      </label>
                      <input
                        placeholder="4.0"
                        name="lipidProfileTCHL"
                        className="form-input p-2"
                        onChange={(event) =>
                          setLipidProfileTCHL(event.target.value)
                        }
                        value={lipidProfileTCHL}
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="flex">
                    <div className=" flex flex-col m-2">
                      <label className="form-label mb-1">
                        Lipid Profile LDL
                      </label>
                      <input
                        placeholder="120"
                        name="lipidProfileLDL"
                        className="form-input p-2"
                        onChange={(event) =>
                          setLipidProfileLDL(event.target.value)
                        }
                        value={lipidProfileLDL}
                        required={true}
                      />
                    </div>
                    <div className=" flex flex-col m-2">
                      <label className="form-label mb-1">
                        Lipid Profile HDL
                      </label>
                      <input
                        placeholder="50"
                        name="lipidProfileHDL"
                        className="form-input p-2"
                        onChange={(event) =>
                          setlipidProfileHDL(event.target.value)
                        }
                        value={lipidProfileHDL}
                        required={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex text-[22px] m-9">
                  <button
                    className="bg-[#ff0000] w-1/4 mx-auto rounded-2xl p-2 text-[#ffffff] font-semibold mt-3"
                    onClick={backPage}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveExam}
                    className="bg-secondary w-1/4 mx-auto rounded-2xl p-2 text-[#ffffff] font-semibold mt-3"
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

export default AddExamination;
