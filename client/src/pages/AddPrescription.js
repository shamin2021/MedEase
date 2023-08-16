import React, { useState } from "react";
import "../styles/FormInput.css";
import ButtonImage from "../components/Button";
import { GridItem } from "@chakra-ui/react";

const AddDoc = props => {
  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    props.handleFile(fileUploaded);
  };
  return (
    <GridItem colSpan={6} mx={4} mt={2}>
      <div className="h-screen py-1 bg-primary">
        <div className="md:w-1/2 h-3/4 mx-auto shadow-xl rounded-2xl pb-2 py-1 bg-white mt-[4%]  ">
          <div className="container horizontal justify-center text-xs py-1 mt-[7%] mb-[5%]">
            <div className="flex justify-center text-lg font-medium m-3 mb-0">
              Add Prescription
            </div>
            <div className="flex justify-center font-light text-stone-800- text-[14px] text-[#797878]">
              Add the prescription as an image or text
            </div>
            <hr className="w-2/3 mx-auto mt-3 mb-0" />
          </div>
          <div className="container horizontal mx-auto mb-0 w-96 justify-left text-xs py-1">
            <form className="mt-0">
              <div className="container flex">
                <div className="container w-3/4">
                  <div className="formInput">
                    <label className="form-label">
                      Patient Name <text className="text-[#ff2727]">*</text>
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="form-input"
                      placeholder="Saman Silva"
                    />
                    <span></span>
                  </div>
                  <div className="formInput">
                    <label className="form-label">
                      Treated For<text className="text-[#ff2727]">*</text>
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="form-input"
                      placeholder="Diabetes"
                    />
                    <span></span>
                  </div>
                </div>
                <div className="container ml-3 pt-5 justify-right w-1/4">
                  <ButtonImage name="Add Prescription" />
                </div>
              </div>

              {/* <div className="container flex">
              <div className="container">
                  <label className="form-label">
                    Prescription <text className="text-[#ff2727]">*</text>
                  </label>
              </div>
              <div className="container">
                <div className="formInput">
                  <label className="form-label">
                    Mobile Number <text className="text-[#ff2727]">*</text>
                  </label>
                  <input type="text" id="username" className="form-input" />
                  <span></span>
                </div>
              </div>
              <div className="container ml-3 justify-right">
                <div className="formInput" id="right">
                  <label className="form-label">
                    Email <text className="text-[#ff2727]">*</text>
                  </label>
                  <input type="text" id="username" className="form-input" />
                  <span></span>
                </div>
              </div>
            </div>
            <div className="formInput">
              <label className="form-label">
                Speciality <text className="text-[#ff2727]">*</text>
              </label>
              <select className="form-input">
                <option value="one">One</option>
                <option value="Two">Two</option>
                <option value="Three">Three</option>
                <option value="Four">Four</option>
              </select>
              <span></span>
            </div>
            <div className="formInput">
              <label className="form-label">License Number</label>
              <input type="text" id="username" className="form-input" />
              <span></span>
            </div> */}
              <div className=" text-center">
                <button className="bg-secondary w-1/4 rounded-2xl p-1 text-[#ffffff] font-semibold mt-3 ">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </GridItem>
  );
};

export default AddDoc;
