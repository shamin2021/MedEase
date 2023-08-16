import React from "react";
import logo from "../assets/patient.jpg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Calendar.css";
import { GridItem } from '@chakra-ui/react';
import { useNavigate, useLocation } from "react-router-dom";

const DoctorProfile = () => {

  const navigate = useNavigate();
  return (
    <GridItem colSpan={6} mx={4} mt={2}>
      <div className="h-screen bg-primary py-1">
        <div className=" md:w-3/4 h-3/4 flex py-1 mx-auto bg-white m-5 mt-[5%] p-5">
          <div className="md:w-3/4 mx-auto h-3/4 flex rounded-2xl py-1 p-5 mt-[5%]">
            <div className="parent md:w-full flex rounded-md pb-2 py-1 bg-white m-3 mt-0 h-full p-5">
              <div className="md:w-1/2 mt-4 mb-4">
                <div className=" mx-auto">
                  <img
                    htmlFor="select-image"
                    src={logo}
                    className="mx-auto p-1 h-[300px] w-[250px]  rounded-[20px] "
                  />
                </div>
                <div className="container horizontal justify-center py-1">
                  <div className="flex justify-center text-[18px] font-semibold mb-0">
                    Dr.Shamin Fernando
                  </div>
                  <div className="flex justify-center font-light text-stone-800- text-[18px] text-[#797878]">
                    Lunawa Hospital
                  </div>
                  <button
                    // style={{ marginLeft: "5px" }}
                    onClick={() =>
                      // navigate(`/message?doctor=${item.first_name}`)
                      navigate(`/message?doctor=${'Shamin'}`)
                    }
                    className="md:w-1/2 flex mx-auto justify-center p-1 rounded-md mt-3 text-stone-800- text-[18px] font-semibold bg-primary"
                  >
                    Message
                  </button>
                  <div className="md:w-1/2 flex mx-auto justify-center p-1 rounded-md mt-3 text-stone-800- text-[18px] font-semibold bg-primary">
                    Schedule
                  </div>
                </div>
              </div>
              <div className="child h-full mt-3 mb-3 md:w-[1px] bg-[#bebebe]"></div>
              <div className="md:w-1/2 mt-4 ml-4">
                <div className="container horizontal justify-center py-1 mt-[5%]">
                  <div className="text-[24px] mb-[9%]">Doctor Details</div>
                  <div className="parent mx-auto">
                    <div className="h-[70px]">
                      <div className="text-[18px] text-[#797878]">Speciality</div>
                      <div className="text-[18px] font-semibold">
                        Heart Disease
                      </div>
                      <hr className=""></hr>
                    </div>
                    <div className="mt-2 h-[70px] ">
                      <div className="text-[18px] text-[#797878]">Mobile</div>
                      <div className="text-[18px]">0762008919</div>
                      <hr className=""></hr>
                    </div>
                    <div className="mt-2 h-[70px]">
                      <div className="text-[18px] text-[#797878]">Email</div>
                      <div className="text-[18px]">hhshaminf@gmail.com</div>
                      <hr className=""></hr>
                    </div>
                    <div className="mt-2 h-[70px]">
                      <div className="text-[18px] text-[#797878]">License</div>
                      <div className="text-[18px]">8927891</div>
                      <hr className=""></hr>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="md:w-2/5 mx-auto h-3/4 flex rounded-2xl py-1 p-5">
            <Calendar />
          </div> */}
        </div>
      </div>
    </GridItem>
  );
};

export default DoctorProfile;
