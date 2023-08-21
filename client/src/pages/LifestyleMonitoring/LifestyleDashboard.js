import React from 'react'
import { GridItem } from "@chakra-ui/react";
import {
  Progress,
} from "@chakra-ui/react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

      const data = {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
      };
      const percentage = 66;
const LifestyleDashboard = () => {



  return (
    <GridItem colSpan={6}>
      <div className="py-1 h-screen bg-primary">
        <div className="parent md:w-3/4 mx-auto h-3/4 shadow-xl rounded-md bg-white m-3 mt-[5%] p-5">
          <div className="flex">
            <h2 className="text-left ml-5 w-3/4">Lifestyle Tracker </h2>
            <div className="w-1/4">
              <button className="w-3/4 btn btn-primary text-[15px] bg-primary p-2 font-semibold rounded-md">
                Attempt Quiz
              </button>
            </div>
          </div>

          <hr className="m-3 mt-2"></hr>
          <div className="flex">
            <br></br>
            <div className="md:w-3/4 shadow-xl rounded-md h-full m-3 mb-1">
              <div className="text-left text-sm pb-2  ml-5">
                Previous Monitorings
              </div>
              <div className="w-full h-60">
                <div className=" flex text-[16px] text-[#797878] font-medium sticky p-1 ml-5 text-left">
                  <div className="w-1/4 m-1 ">Quiz ID</div>
                  <div className="w-1/4 m-1 ">Quiz Week</div>
                  <div className="w-1/4 m-1 ">Progress</div>
                  <div className="w-1/4 m-1 ">Actions</div>
                </div>
                <hr className=" ml-5 mr-5" />

                <table className="table-auto">
                  <tbody>
                    <>
                      <tr className="flex text-[16px] font-medium sticky p-1 text-left ml-5">
                        <div className="w-1/4 m-1">X</div>
                        <div className="w-1/4 m-1">X</div>
                        <div className="w-1/4 m-1">X</div>
                        <div className="w-1/4 m-1">
                          <button className="btn w-1/2 bg-primary  rounded-lg">
                            View{" "}
                          </button>
                        </div>
                      </tr>
                      <hr className=" ml-5 mr-5" />
                    </>
                  </tbody>
                </table>
              </div>
            </div>

            {/* <div className="md:w-1/4 shadow-xl h-60 m-3 mb-1 rounded-md">
              <div className="mt-3">
                <div className="w-3/4 mx-auto mt-3 rounded-md text-[15px] bg-[#fdc9c9] p-2 font-semibold">
                  <p>Not Submitted</p>
                  <div className=" text-[#797878] text-[13px] font-medium">
                    Recent Risk
                  </div>
                </div>
                <div className="w-3/4 mx-auto mt-3 rounded-md text-[15px] bg-primary p-2 font-semibold">
                  2
                  <div className=" text-[#797878] text-[13px] font-medium">
                    Assessments
                  </div>
                </div>
              </div>
            </div> */}
            <div className="md:w-1/4 shadow-xl rounded-md h-full m-3 mb-1">
              <div className="m-3 mt-3 rounded-md p-5 pt-0 ">
                <div className="text-[1rem] m-2 text-center font-medium font-poppins">
                  Progress
                </div>
                <div className="h-3/4 m-3">
                  <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                  />
                  <div className="text-[16px] text-center m-2 font-medium font-poppins">
                    Week <br /> Jun 1 - Jun 7
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GridItem>
  );
}

export default LifestyleDashboard