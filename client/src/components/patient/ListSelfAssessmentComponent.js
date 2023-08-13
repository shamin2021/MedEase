import React, { useEffect, useState } from "react";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import { useNavigate, useLocation } from "react-router-dom";

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

  const addSelfAssessment = () => {
    navigate("/CreateSelfAssessment");
  };

  return (
    <div className="py-1 bg-primary">
      <div className="parent md:w-3/4 mx-auto h-full shadow-xl rounded-md bg-white m-3 mt-9 p-5">
        <div className="flex">
          <h2 className="text-left ml-5 w-3/4">Risk Assessments </h2>
          <div className="w-1/4">
            <button
              className="btn btn-primary text-[15px] bg-primary p-2 font-semibold"
              onClick={addSelfAssessment}
            >
              Add Risk Assessment
            </button>
          </div>
        </div>

        <hr className="m-3 mt-2"></hr>
        <div className="flex">
          <br></br>
          <div className="md:w-3/4 shadow-xl rounded-md h-full m-3 mb-1">
            <div className="text-left text-sm pb-2  ml-5">
              Previous Assessments
            </div>
            <div className="w-full h-60">
              <div className=" flex text-[16px] text-[#797878] font-medium sticky p-1 ml-5 text-left">
                <div className="w-1/3 m-1 ">Assessment ID</div>
                <div className="w-1/3 m-1 ">Assessment Created</div>
                <div className="w-1/3 m-1 ">Actions</div>
              </div>
              <hr className=" md:w-4/5  ml-5" />

              <div className=" flex text-[15px] font-medium sticky p-1 text-left ml-5  ">
                <div className="w-1/3 m-1"> #A1234</div>
                <div className="w-1/3 m-1">01st July</div>
                <div className="w-1/3 m-1">
                  <div className="w-1/3 bg-primary pl-1 pr-1 rounded-lg">
                    View
                  </div>
                </div>
              </div>
              <hr className=" md:w-4/5 ml-5" />

              <div className=" flex text-[15px] font-medium sticky p-1 text-left ml-5  ">
                <div className="w-1/3 m-1"> #A1234</div>
                <div className="w-1/3 m-1">01st July</div>
                <div className="w-1/3 m-1">
                  <div className="w-1/3 bg-primary pl-1 pr-1 rounded-lg">
                    View
                  </div>
                </div>
              </div>
              <hr className=" md:w-4/5 ml-5" />

              <table className="table-auto">
                {/* <thead className=" text-sm">
                    <tr className=" text-sm">
                      <th className=" text-sm"> Assessment ID</th>

                      <th> Assessment Created</th>

                      <th> Actions</th>
                    </tr>
                  </thead> */}
                <tbody>
                  {selfassessments.map((selfassessment) => (
                    <tr key={selfassessment.id}>
                      <td> {selfassessment.id} </td>
                      <td> {selfassessment.date} </td>

                      <td>
                        <button
                          style={{ marginLeft: "10px" }}
                          onClick={() =>
                            navigate(
                              `/view-SelfAssessment/${selfassessment.id}`
                            )
                          }
                          className="btn btn-info"
                        >
                          View{" "}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="md:w-1/4 shadow-xl h-60 m-3 mb-1 rounded-md">
            <div className="mt-3">
              <div className="w-3/4 mx-auto mt-3 rounded-md text-[15px] bg-[#fdc9c9] p-2 font-semibold">
                High
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListSelfAssessmentComponent;