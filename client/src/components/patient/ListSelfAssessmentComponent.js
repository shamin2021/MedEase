import React, { useEffect, useState } from "react";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import { useNavigate, useLocation } from "react-router-dom";
import { GridItem } from "@chakra-ui/react";

const ListSelfAssessmentComponent = () => {
  const [res, setRes] = useState("");

  const { get } = useAxiosMethods();
  const navigate = useNavigate();
  const location = useLocation();

  const [selfassessments, setSelfAssessments] = useState([]);

  useEffect(() => {
    try {
      get(`/SelfAssessments`, setSelfAssessments);
    } catch (err) {
      console.error(err);
      navigate("/login", { state: { from: location }, replace: true });
    }
  }, []);

  useEffect(() => {
    console.log(res);
  }, [res]);

  useEffect(() => {
    console.log(selfassessments);
  }, []);

  const addSelfAssessment = () => {
    navigate("/CreateSelfAssessment");
  };

  return (
    <GridItem >
      {/* <div class="p-4 sm:ml-64">
        <div class="p-4 rounded-lg mt-1 ">
          <div class="flex items-center justify-center h-88 mb-4 rounded background-color: #DCECF8;">

          <div className="h-screen py-1 bg-primary mt-[5%] w-full">
            <div className="parent h-3/4 mx-auto shadow-xl rounded-md bg-white m-3 mt-9 p-5 ">

              <div className="flex">
                <h2 className="text-left ml-5 w-3/4">Risk Assessments </h2>
                <div className="w-1/4">
                  <button
                    className="btn btn-primary text-[18px] bg-primary p-2 font-semibold"
                    onClick={addSelfAssessment}
                  >
                    Add Risk Assessment
                  </button>
                </div>
              </div>

              <hr className="m-3 mt-2"></hr>
              <div className="flex h-3/4 ">
                <br></br>
                <div className="md:w-3/4 h-full shadow-xl rounded-md  m-3 mb-1">
                  <div className="text-left text-[20px] pb-2  ml-5">
                    Previous Assessments
                  </div>
                  <div className="w-full  ">
                    <div className=" flex text-[18px] text-[#797878] font-medium sticky p-1 ml-5 text-left">
                      <div className="w-1/3 m-1 ">Assessment ID</div>
                      <div className="w-1/3 m-1 ">Assessment Created</div>
                      <div className="w-1/3 m-1 ">Actions</div>
                    </div>
                    <hr className=" md:w-4/5  ml-5" />

                    <table className="table-auto">
                      <tbody>
                        {selfassessments.map((selfassessment) => (
                          <>
                            <tr key={selfassessment.id} className="flex text-[18px]  font-medium sticky p-1 text-left ml-5">
                              <div className="w-1/3 m-1"><td> {selfassessment.id} </td></div>
                              <div className="w-1/3 m-1"><td> {selfassessment.date} </td></div>
                              <div className="w-1/3 m-1">
                                <td>
                                  <button
                                    onClick={() =>
                                      navigate(
                                        `/view-SelfAssessment/${selfassessment.id}`
                                      )
                                    }
                                    className="btn w-1/3 bg-primary pl-1 pr-1 rounded-lg"
                                  >
                                    View{" "}
                                  </button>
                                </td>
                              </div>
                            </tr>
                            <hr className=" md:w-4/5 ml-5" />
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="md:w-1/4 shadow-xl h-full m-3 mb-1 rounded-md">
                  <div className="mt-3">
                    <div className="w-3/4 mx-auto mt-3 rounded-md text-[18px]  bg-[#fdc9c9] p-2 font-semibold">
                      {selfassessments.length > 0 ? (
                        selfassessments[selfassessments.length - 1].risk
                      ) : (
                        <p>Not Submitted</p>
                      )}
                      <div className=" text-[#797878] text-[16px]  font-medium">
                        Recent Risk
                      </div>
                    </div>
                    <div className="w-3/4 mx-auto mt-3 rounded-md text-[17px] bg-primary p-2 font-semibold">
                      {selfassessments.length > 0 ? selfassessments.length : 0}
                      <div className=" text-[#797878] text-[16px]  font-medium">
                        Assessments
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div> */}






      <div class="p-4 sm:ml-64">
        <div class="p-4 rounded-lg mt-1 ">
          <div class="flex items-center justify-center h-88 mb-4 rounded background-color: #DCECF8;">
            <div className="w-full h-screen py-1 bg-primary mt-[5%]">
              <div className="parent w-full h-3/4 mx-auto shadow-xl rounded-md bg-white m-3 mt-9 p-5 ">



                <div className="flex">
                  <h2 className="text-left ml-5 w-3/4">Risk Assessments </h2>
                  <div className="w-1/4">
                    <button
                      className="btn btn-primary text-[18px] bg-primary p-2 font-semibold"
                      onClick={addSelfAssessment}
                    >
                      Add Risk Assessment
                    </button>
                  </div>
                </div>

                <div className="flex h-3/4 ">
                  <br></br>
                  <div className="w-full h-full shadow-xl rounded-md  m-3 mb-1">
                    <div className="text-left text-[20px] pb-2  ml-5">
                      Previous Assessments
                    </div>
                    <div className="w-full  ">
                      <div className=" flex text-[18px] text-[#797878] font-medium sticky p-1 ml-5 text-left">
                        <div className="w-1/3 m-1 " style={{ width: '10rem' }}>Assessment ID</div>
                        <div className="w-1/3 m-1 " style={{ width: '10rem' }}>Assessment Created</div>
                        <div className="w-1/3 m-1 " style={{ width: '10rem' }}>Actions</div>
                      </div>
                      <hr className=" md:w-4/5  ml-5" />

                      <table className="table-auto">
                        <tbody>
                          {selfassessments.map((selfassessment) => (
                            <>
                              <tr key={selfassessment.id} className="flex text-[18px]  font-medium sticky p-1 text-left ml-5">
                                <div className="w-1/3 m-1" style={{ width: '10rem' }}><td> {selfassessment.id} </td></div>
                                <div className="w-1/3 m-1" style={{ width: '10rem' }}><td> {selfassessment.date} </td></div>
                                <div className="w-1/3 m-1" style={{ width: '10rem' }}>
                                  <td>
                                    <button
                                      onClick={() =>
                                        navigate(
                                          `/view-SelfAssessment/${selfassessment.id}`
                                        )
                                      }
                                      className="btn w-1/3 bg-primary pl-1 pr-1 rounded-lg"
                                    >
                                      View{" "}
                                    </button>
                                  </td>
                                </div>
                              </tr>
                              <hr className=" md:w-4/5 ml-5" />
                            </>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="md:w-1/4 shadow-xl h-full m-3 mb-1 rounded-md" style={{ width: '15rem' }}>
                    <div className="mt-3">
                      <div className="w-3/4 mx-auto mt-3 rounded-md text-[18px]  bg-[#fdc9c9] p-2 font-semibold">
                        {selfassessments.length > 0 ? (
                          selfassessments[selfassessments.length - 1].risk
                        ) : (
                          <p>Not Submitted</p>
                        )}
                        <div className=" text-[#797878] text-[16px]  font-medium">
                          Recent Risk
                        </div>
                      </div>
                      <div className="w-3/4 mx-auto mt-3 rounded-md text-[17px] bg-primary p-2 font-semibold">
                        {selfassessments.length > 0 ? selfassessments.length : 0}
                        <div className=" text-[#797878] text-[16px]  font-medium">
                          Assessments
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </GridItem>
  );
};

export default ListSelfAssessmentComponent;
