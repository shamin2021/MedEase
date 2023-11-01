import "../../styles/Table.css";
import Doc from "../../assets/Doc.jpg";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import { useNavigate, useLocation } from "react-router-dom";

const RequestTable = ({ data, actionState, filterRequest }) => {

  const { post } = useAxiosMethods();
  const navigate = useNavigate();
  const location = useLocation();

  const acceptRequest = (requestId) => {
    try {
      post("/hlc/acceptRequest", { request_id: requestId }, actionState);
      filterRequest(data.filter(item => item.request_id !== requestId));
    } catch (err) {
      console.error(err);
      navigate('/login', { state: { from: location }, replace: true });
    }
  }

  const declineRequest = (requestId) => {
    try {
      post("/hlc/rejectRequest", { request_id: requestId }, actionState);
      filterRequest(data.filter(item => item.request_id !== requestId));
    } catch (err) {
      console.error(err);
      navigate('/login', { state: { from: location }, replace: true });
    }
  }

  return (
    <>
      <div className=" h-3/4 m-1 ml-9">
        <div className=" flex mt-4 text-[18px] font-medium sticky top-3 p-1">
          <div className="w-1/5 m-1">Name</div>
          <div className="w-1/5 m-1">Reason</div>
          <div className="w-1/5 m-1"></div>
        </div>
        <hr className="w-7/8 mx-auto mt-1 mb-0" />
        <div>
          <div className=" h-96 overflow-y-scroll mb-2">
            {data.length > 0 ? data.map((item) => (
              <>
                <div className=" flex mt-4 text-[18px] font-medium hover:bg-primary p-1 rounded-lg hover:">
                  <div className="w-1/5 m-1 flex ">
                    <img
                      className="rounded-[100px] mx-auto h-[40px] w-[40px] bg-black"
                      src={Doc}
                      alt="Doctor img"
                    />
                    <div className="w-3/4 ml-6">{item.firstname + " " + item.lastname}</div>
                  </div>
                  <div className="w-3/5 m-1">{item.reason}</div>

                  <div className="w-1/5 m-1 text-center">
                    <button
                      onClick={() => acceptRequest(item.request_id)}
                      className="p-2 bg-primary hover:bg-[#7ebcef] hover:text-white rounded-md border-4 border-white"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => declineRequest(item.request_id)}
                      className="p-2 ml-3 bg-primary hover:bg-[#7ebcef] hover:text-white rounded-md border-4 border-white"
                    >
                      Decline
                    </button>
                  </div>

                </div>
              </>
            )) :
              <div className="mt-5 text-center text-sm">No Requests To Display</div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestTable;
