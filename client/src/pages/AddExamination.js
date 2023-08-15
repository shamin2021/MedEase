import {useState,React} from 'react'

const AddExamination = () => {

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

     const saveExam = async (e) => {
       console.log("weight");
     };

    function InputBox(props) {
      return (
        <div className=" flex flex-col m-2">
          <label className="form-label mb-1">{props.name}</label>
          <input
            name={props.name}
            className="form-input p-2"
            onChange={(event) => props.handle(event.value)}
            value={props.value}
          />
        </div>
      );
    }

    function CalculateBox(props) {
      return (
        <div className=" flex flex-col m-2">
          <label className="form-label mb-1">{props.name}</label>
          <div className="flex">
            <div className="text-[22px] bg-[#c4fd8e] p-2 rounded-md">X</div>
          </div>
        </div>
      );
    }

    const handleChangeCondition = (setCondition, event) => {
      setCondition(event.target.value);
    };



  return (
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
                  <InputBox name="Weight" handle={setWeight} value={weight} />
                  <InputBox name="Height" handle={setHeight} value={height} />
                  <CalculateBox name="BMI" />
                </div>
                <div className="flex">
                  <InputBox name="Waist" handle={setWaist} value={waist} />
                  <CalculateBox name="Waist - Height Ratio" />
                </div>
                <div className="flex">
                  <InputBox
                    name="Hearing Right"
                    handle={setHearingRight}
                    value={hearingRight}
                  />
                  <InputBox
                    name="Hearing Left"
                    handle={setHearingLeft}
                    value={hearingLeft}
                  />
                  <CalculateBox name="Type" />
                </div>
                <div className="flex">
                  <InputBox
                    name="Vision Right"
                    handle={setVisionRight}
                    value={visionRight}
                  />
                  <InputBox
                    name="Vision Left"
                    handle={setVisionLeft}
                    value={hearingLeft}
                  />
                  <CalculateBox name="Type" />
                </div>
                <div className="w-3/4">
                  <InputBox
                    name="Oral Examination"
                    handle={setOralExam}
                    value={oralExam}
                  />
                </div>
              </div>
              <hr className="mx-auto mt-5" />
              <div className="general">
                <div className="flex text-[22px] font-light text-[#797878] m-2 mb-0 mt-4 ">
                  Examination Data
                </div>
                <div className="flex">
                  <InputBox
                    name="Fasting Blood Sugar"
                    handle={setBloodSugarFasting}
                    value={bloodSugarFasting}
                  />
                  <CalculateBox name="Range" />
                  <InputBox
                    name="Random Blood Sugar"
                    handle={setBloodSugarRandom}
                    value={bloodSugarRandom}
                  />
                  <CalculateBox name="Range" />
                </div>
                <div className="flex">
                  <InputBox
                    name="Serum Creatinin"
                    handle={setSerumCreatinin}
                    value={serumCreatinin}
                  />
                  <CalculateBox name="Range" />
                </div>
                <div className="flex">
                  <InputBox
                    name="Lipid Profile TG"
                    handle={setLipidProfileTG}
                    value={lipidProfileTG}
                  />
                  <InputBox
                    name="Lipid Profile TC"
                    handle={setLipidProfileTC}
                    value={lipidProfileTC}
                  />
                </div>
                <div className="flex">
                  <InputBox
                    name="Lipid Profile TCHL"
                    handle={setLipidProfileTCHL}
                    value={lipidProfileTCHL}
                  />
                </div>
                <div className="flex">
                  <InputBox
                    name="Lipid Profile LDL"
                    handle={setLipidProfileLDL}
                    value={lipidProfileLDL}
                  />
                  <InputBox
                    name="Lipid Profile HDL"
                    handle={setlipidProfileHDL}
                    value={lipidProfileHDL}
                  />
                </div>
              </div>
              <div className="flex text-[22px] m-9">
                <button className="bg-[#ff0000] w-1/4 mx-auto rounded-2xl p-2 text-[#ffffff] font-semibold mt-3">
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
  );
}

export default AddExamination