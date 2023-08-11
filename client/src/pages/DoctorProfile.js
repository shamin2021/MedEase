import React from 'react'
import logo from "../assets/patient.jpg";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";

const PatientProfile = () => {
  return (
    <div className=" py-1 bg-primary">
      <div className="md:w-3/4 mx-auto flex rounded-2xl py-1 p-5">
        <div className="parent flex md:w-7/12 shadow-xl rounded-2xl pb-2 py-1 bg-white m-3 mt-9 p-5">
          <div className="md:w-1/2 mt-4 mb-4">
            <div className=" mx-auto">
              <img
                htmlFor="select-image"
                src={logo}
                className="mx-auto p-1 h-[100px] w-[100px] rounded-[100px] "
              />
            </div>
            <div className="container horizontal justify-center py-1">
              <div className="flex justify-center text-[18px] font-semibold mb-0">
                Dr.Shamin Fernando
              </div>
              <div className="flex justify-center font-light text-stone-800- text-[13px] text-[#797878]">
                #P890725
              </div>
              <div className="flex mt-3 justify-center font-light text-stone-800- text-[14px] font-semibold">
                Engagement
              </div>
              <div className="parent flex m-3">
                <div className="md:w-1/2 ">
                  <div className=" mx-auto text-center">5</div>
                  <div className=" mx-auto text-center text-[11px] text-[#797878]">
                    Appointments
                  </div>
                </div>
                <div className="child md:w-[1px] bg-[#bebebe]"></div>
                <div className="md:w-1/2 ">
                  <div className="mx-auto text-center">6</div>
                  <div className="mx-auto text-center text-[11px] text-[#797878]">
                    Assessments
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 flex mx-auto justify-center p-1 rounded-md mt-3  font-light text-stone-800- text-[14px] font-semibold bg-primary">
                Message
              </div>
            </div>
          </div>
          <div className="child mt-3 mb-3 md:w-[1px] bg-[#bebebe]"></div>
          <div className="md:w-1/2 mt-4 ml-4">
            <div className="container horizontal justify-center py-1">
              <div className="parent m-3 mt-1">
                <div className="">
                  <div className="text-[14px] text-[#797878]">Name</div>
                  <div className="text-[14px]">Shamin Fernando</div>
                  <hr className=""></hr>
                </div>
                <div className="mt-2">
                  <div className="text-[14px] text-[#797878]">Age</div>
                  <div className="text-[14px]">23</div>
                  <hr className=""></hr>
                </div>
                <div className="mt-2">
                  <div className="text-[14px] text-[#797878]">Gender</div>
                  <div className="text-[14px]">Female</div>
                  <hr className=""></hr>
                </div>
                <div className="mt-2">
                  <div className="text-[14px] text-[#797878]">Allergies</div>
                  <div className="text-[14px]">Peanuts, Prawns</div>
                  <hr className=""></hr>
                </div>
                <div className="mt-3">
                  <div className="text-[14px] text-[#797878]">
                    History of Prescriptions
                  </div>
                  <div className="text-[14px]">ZiproFloc</div>
                  <div className="text-[14px]">Panadol</div>
                  <hr className=""></hr>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientProfile