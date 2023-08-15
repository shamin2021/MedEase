import "../../styles/Table.css";
import Doc from "../../assets/Doc.jpg";
import { Link } from "react-router-dom";
const Table = ({ data , status }) => {
  return (
    <>
      <div className="">
        <div className=" flex text-[15px] font-medium sticky top-3 p-1">
          <div className="w-1/4 m-1">Username</div>
          <div className="w-1/4 m-1">Email</div>
          <div className="w-1/4 m-1">User Role</div>
          <div className="w-1/4 m-1">Action</div>
        </div>
        <hr className="w-7/8 mx-auto mt-1 mb-0" />
        <div>
          <div className="h-52 overflow-y-scroll mb-2">
            {data.map((item) => (
              <>
                <div className=" flex mt-1 text-[15px] font-medium p-1 rounded-lg hover:">
                  <div className="w-1/4 m-1 flex ">
                    <img
                      className="rounded-[100px] mx-auto h-[40px] w-[40px] bg-black"
                      src={Doc}
                    />
                    <div className="w-3/4 ml-3">{item.last_name}</div>
                  </div>
                  <div className="w-1/4 m-1">{item.email}</div>
                  <div className="w-1/4 m-1">{item.last_name}</div>
                  <div className="w-1/4 m-1">
                    {status == true ? (
                      <button className="p-1 bg-[#eb5a5a] text-white rounded-md">
                        Disable
                      </button>
                    ) : (
                      <button className="p-1 bg-[#5aeb7e] text-white rounded-md">
                        Enable
                      </button>
                    )}
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
