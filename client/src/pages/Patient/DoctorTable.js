import "../../styles/Table.css";
import { Link } from "react-router-dom";
import { Avatar } from '@chakra-ui/react';
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const DoctorTable = ({ data }) => {

  const { get } = useAxiosMethods();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [selfassessments, setSelfAssessments] = useState([]);

  useEffect(() => {
    try {
      get(`/SelfAssessments`, setSelfAssessments);

    } catch (err) {
      console.error(err);
      navigate('/login', { state: { from: location }, replace: true });
    }
  }, []);

  const filteredSelfAssessments = selfassessments.length > 0 ? selfassessments.filter(selfassessment => selfassessment.patient === auth.user_id).sort((a, b) => b.id - a.id) : null;

  const filteredDoctors = data.filter(item => item.doctor_speciality === "Endocrinologist" || item.doctor_speciality === "Cardiology")

  return (
    <>
      <div className=" h-3/4 m-1 ml-9">
        <div className=" flex mt-4 text-[18px] font-medium sticky top-3 p-1">
          <div className="w-1/5 m-1">Name</div>
          <div className="w-1/5 m-1">Surname</div>
          <div className="w-2/5 m-1">Email</div>
          <div className="w-1/5 m-1">Speciality</div>
          <div className="w-1/5 m-1"></div>
        </div>
        <hr className="w-7/8 mx-auto mt-1 mb-0" />
        <div>
          <div className=" h-96 overflow-y-scroll mb-2">
            {filteredSelfAssessments != null ? filteredDoctors.map((item) => (
              <>
                <Link to={`/DoctorProfile/${item.doctor_user_id}`}>
                  <div className=" flex mt-4 text-[18px] font-medium hover:bg-primary p-1 rounded-lg hover:">
                    <div className="w-1/5 m-1 flex ">
                      <Avatar size="sm" name={item.firstname} src={item.profile_image ? `data:image/png;base64, ${item.profile_image}` : null} bg='teal.400' />
                      <div className="w-3/4 ml-6">{item.firstname}</div>
                    </div>
                    <div className="w-1/5 m-1">{item.lastname}</div>
                    <div className="w-2/5 m-1">{item.email}</div>

                    <div className="w-1/5 m-1">
                      {item.doctor_speciality}
                    </div>
                    <div className="w-1/5 m-1 text-center">
                      <Link to={`/ScheduleMeeting/${item.doctor_user_id}`}>
                        <button className="p-2 m-0 bg-primary hover:bg-[#7ebcef] hover:text-white rounded-md border-4 border-white">
                          Schedule
                        </button>
                      </Link>
                    </div>

                  </div>
                </Link>
              </>
            )) : <div className="mt-5 text-center text-sm">Please perform a risk assessment to get assigned to doctors</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorTable;
