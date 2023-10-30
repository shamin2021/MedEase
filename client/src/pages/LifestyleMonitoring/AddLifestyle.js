import { React, useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import Modal from "react-modal";
import { GridItem } from "@chakra-ui/react";

const AddLifestyle = () => {

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    closeModal();
  };

  const customStyles = {
    content: {
      width: "40%", // Set your desired width
      height: "60%", // Set your desired height
      margin: "auto",
      borderRadius: "12px",// Center the modal
    },
  };
  return (
    <GridItem >
      <div class="p-4 sm:ml-64">
        <div class="p-4 rounded-lg mt-14 ">
          <div class="flex items-center justify-center h-88 mb-4 rounded background-color: #DCECF8;">


            <div
              // className="h-3/4 w-3/4 m-3 bg-white mx-auto mt-5 rounded-md p-5 "
              // class="min-w-1/4 md:min-w-3/4 bg-white mr-5 ml-5 mt-5 rounded-md p-5"
              class="min-w-1/4 w-3/4 bg-white mr-5 ml-5 mt-5 rounded-md p-5"
            >
              <div className="container horizontal justify-center text-md py-1">
                <div className="flex justify-center text-lg font-medium m-3 mb-0">
                  Lifestyle Modification Recommendations
                </div>
                <div className="flex justify-center font-light text-[18px] text-[#797878]">
                  Add new Recommendations here
                </div>
                <hr className="w-2/3 mx-auto mt-3 mb-0" />

                <div className="w-3/4 mx-auto text-[18px] mt-6">
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
                      <div className="m-1 flex">
                        <div className="w-2/4">20g Sugar </div>
                        <div className="w-1/4">Daily</div>
                        <div className="w-1/4">Diet</div>
                      </div>
                      <div className="m-1 flex">
                        <div className="w-2/4">20g Sugar Daily </div>
                        <div className="w-1/4">Daily</div>
                        <div className="w-1/4">Diet</div>
                      </div>
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
                <div className="flex justify-center text-[18px] mt-7">
                  Add new Recommendation
                </div>
                <hr className="w-2/3 mx-auto mt-3 mb-3" />

                <form onSubmit={handleSubmit} className="w-3/4 mx-auto">
                  {/* Form fields */}

                  <div className="formInput">
                    <label className="form-label" htmlFor="licenseNumber">
                      Frequency
                    </label>
                    <select className="form-input" id="speciality">
                      <option value="">Daily</option>
                      <option value="">Weekly</option>
                    </select>
                  </div>

                  <div className="formInput">
                    <label className="form-label" htmlFor="licenseNumber">
                      Type of Reccomendation
                    </label>
                    <select className="form-input" id="speciality">
                      <option value="">Diet</option>
                      <option value="">Excercise</option>
                      <option value="">CheckUp</option>
                    </select>
                  </div>

                  <div className="formInput">
                    <label className="form-label" htmlFor="licenseNumber">
                      Reccomendation
                    </label>
                    <textarea className=" border"></textarea>
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
      </div>


    </GridItem >
  );
}

export default AddLifestyle