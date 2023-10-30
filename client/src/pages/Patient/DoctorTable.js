import "../../styles/Table.css";
import Doc from "../../assets/Doc.jpg";
import { Link } from "react-router-dom";
const DoctorTable = ({ data }) => {
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
            {data.map((item) => (
              <>
                <Link to={`/DoctorProfile`}>
                  <div className=" flex mt-4 text-[18px] font-medium hover:bg-primary p-1 rounded-lg hover:">
                    <div className="w-1/5 m-1 flex ">
                      <img
                        className="rounded-[100px] mx-auto h-[40px] w-[40px] bg-black"
                        src={Doc}
                        alt="Doctor img"
                      />
                      <div className="w-3/4 ml-6">{item.firstname}</div>
                    </div>
                    <div className="w-1/5 m-1">{item.lastname}</div>
                    <div className="w-2/5 m-1">{item.email}</div>
                    <div className="w-1/5 m-1">{item.doctor_speciality}</div>
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorTable;
