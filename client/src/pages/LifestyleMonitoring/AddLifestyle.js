import { React, useEffect, useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import Modal from "react-modal";
import { GridItem } from "@chakra-ui/react";
import useAxiosMethods from '../../hooks/useAxiosMethods';

const AddLifestyle = () => {

  const initial = {
    frequency: 'Daily',
    type: 'Diet',
    recommendation: ''
  }

  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  const [frequency, setFrequency] = useState(initial.frequency);
  const [type, setType] = useState(initial.type);
  const [recommendation, setRecommendation] = useState(initial.recommendation);

  const { get, post } = useAxiosMethods();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const changeFrequency = (event) => {
    setFrequency(event.target.value);
  }

  const changeType = (event) => {
    setType(event.target.value);
  }

  const changeRecommendation = (event) => {
    setRecommendation(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (recommendation === '') {
      setState('Please enter a recommendation')
    } else {
      // Handle form submission logic here
      const formData = {
        frequency, type, recommendation
      }

      try {
        post('/recommendation', formData, setState)
      } catch (err) {
        console.error(err);
      }

      setRecommendation(initial.recommendation);
      setFrequency(initial.frequency);
      setType(initial.type);

      closeModal();
    }
  };

  const getRecommendations = async () => {
    try {
      get('/recommendation', setRecommendations);
    } catch (err) {
      console.error(err);
    }
  }

  const handleAssignRecommendation = async (recommendation_id) => {
    const assign = {
      assignedRecommendationId: recommendation_id,
      assigenedUserId: 52
    }

    try {
      post('/assignedRecommendation/assignhandle', assign, setState)
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    if (!isOpen)
      getRecommendations();
  }, [isOpen])

  const customStyles = {
    content: {
      width: "40%", // Set your desired width
      height: "60%", // Set your desired height
      margin: "auto",
      borderRadius: "12px",// Center the modal
    },
  };

  return (
    <GridItem colSpan={6} mx={4} mt={2}>
      <div className="pt-10 pb-1 bg-primary">
        <div className="flex h-screen mx-auto">
          <div className="h-3/4 w-3/4 m-3 bg-white mx-auto mt-5 rounded-md py-5 ">
            <div className="container horizontal justify-center text-md py-1">
              <div className="flex justify-center text-lg font-medium m-3 mb-0">
                Lifestyle Modification Recommendations
              </div>
              <div className="flex justify-center font-light text-[22px] text-[#797878]">
                Add new Recommendations here
              </div>
              <hr className="w-2/3 mt-3 mb-0" />

              <div className="w-3/4 mx-auto text-[22px] mt-6">
                <div className="flex">
                  <div className="md:w-2/4 ">
                    <div className="text-[#797878]">Patient</div>
                    <div className="flex">
                      <div className=" p-1">
                        <FaUserCircle size="28px" />
                      </div>
                      <div className="w-3/4 p-1 rounded-md">
                        {" "}
                        Shamin Fernando{" "}
                      </div>
                    </div>
                  </div>
                  <div className=" flex flex-col md:w-1/4">
                    <div className="text-[#797878]">Recent Risk</div>
                    <div className="p-1 pl-0 text-[#f85353] font-semibold">
                      High
                    </div>
                  </div>
                  <div className=" flex flex-col md:w-1/4">
                    <div className="text-[#797878]">HLC</div>
                    <div className="p-1 pl-0 ">Lunawa</div>
                  </div>
                </div>
                <div>
                  <div>
                    <div className="flex text-md mt-9 font-medium">
                      Active Recommendations
                    </div>
                    <hr className="mt-2 mb-0" />
                  </div>
                  <div className="text-[#797878] text-md mt-3 h-32 overflow-y-scroll">
                    {recommendations.map((r) => {
                      return (
                        <div className="m-1 flex" key={r.recommendation_id}>
                          <div className="w-2/5">{r.recommendation}</div>
                          <div className="w-1/5">{r.frequency}</div>
                          <div className="w-1/5">{r.type}</div>
                          <div className="w-1/5">
                            {/* input type = check box. id = 'recommendation' + r.recommendation_id */}
                            <input type="checkbox" id={'recommendation' + r.recommendation_id} onClick={handleAssignRecommendation(r.recommendation_id)} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div>
                  <div className="text-center mt-7">
                    <button
                      className="bg-secondary rounded-md p-2 text-[#ffffff] font-semibold "
                      onClick={openModal}
                    >
                      Add More Reccomendations
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Modal
              isOpen={isOpen}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
              style={customStyles}
            >
              <div className="flex justify-center text-[22px] mt-7">
                Add new Recommendation
              </div>
              <hr className="w-2/3 mx-auto mt-3 mb-7" />

              <form onSubmit={handleSubmit} className="w-3/4 mx-auto">
                {/* Form fields */}

                <div className="formInput">
                  <label className="form-label" htmlFor="licenseNumber">
                    Frequency
                  </label>
                  <select className="form-input" id="recommendationFrequency" onChange={changeFrequency}>
                    <option value="Daily" default>Daily</option>
                    <option value="Weekly">Weekly</option>
                  </select>
                </div>

                <div className="formInput">
                  <label className="form-label" htmlFor="licenseNumber">
                    Type of Reccomendation
                  </label>
                  <select className="form-input" id="recommendationType" onChange={changeType}>
                    <option value="Diet">Diet</option>
                    <option value="Excercise">Excercise</option>
                    <option value="CheckUp">CheckUp</option>
                  </select>
                </div>

                <div className="formInput">
                  <label className="form-label" htmlFor="licenseNumber">
                    Reccomendation
                  </label>
                  <textarea className=" border" onChange={changeRecommendation}></textarea>
                </div>
                <div className="text-center">
                  <button className="bg-secondary w-1/4 rounded-2xl p-1 text-[#ffffff] font-semibold mt-3 ">
                    Submit
                  </button>
                  <button
                    onClick={closeModal}
                    className=" bg-[#ff4d4d] w-1/4 ml-3 rounded-2xl p-1 text-[#ffffff] font-semibold mt-3 "
                  >
                    Close
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </GridItem>
  );
}

export default AddLifestyle