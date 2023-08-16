import "../styles/Table.css";
import Doc from "../assets/HLC.jpg";
import { Link } from "react-router-dom";


const Table = ({ data }) => {
  return (
    <>
      <div className=" h-full m-1 font-poppins">
        <div className=" flex mt-2 text-[18px] font-medium sticky top-3 p-1 pb-0">
          <div className="w-1/2 m-1">Name</div>
          <div className="w-1/2 m-1">Area</div>
        </div>
        <hr className="w-7/8 mx-auto mt-1 mb-0" />
        <div>
          <div className=" h-full overflow-y-scroll mb-2 text-[18px] font-poppins">
            <>
              <Link to={`/HLCProfile`}>
                <div className=" flex mt-1 font-medium hover:bg-primary p-1 rounded-md hover:">
                  <div className="w-1/2 m-1 flex ">
                    <img
                      className="rounded-[100px] mx-auto h-[40px] w-[40px] bg-black"
                      src={Doc}
                    />
                    <div className="w-3/4 ml-3 mt-1">Lunawa</div>
                  </div>
                  <div className="w-1/2 m-2">Panadura</div>
                </div>
              </Link>
            </>
            <>
              <Link to={`/PatientProfile/2`}>
                <div className=" flex mt-1  font-medium hover:bg-primary p-1 rounded-lg hover:">
                  <div className="w-1/2 m-1 flex ">
                    <img
                      className="rounded-[100px] mx-auto h-[40px] w-[40px] bg-black"
                      src={Doc}
                    />
                    <div className="w-3/4 ml-3 mt-1">Lunawa</div>
                  </div>
                  <div className="w-1/2 m-2 ">Panadura</div>
                </div>
              </Link>
            </>
            <>
              <Link to={`/PatientProfile/2`}>
                <div className=" flex mt-1 font-medium hover:bg-primary p-1 rounded-lg hover:">
                  <div className="w-1/2 m-1 flex ">
                    <img
                      className="rounded-[100px] mx-auto h-[40px] w-[40px] bg-black"
                      src={Doc}
                    />
                    <div className="w-3/4 ml-3 mt-1">Lunawa</div>
                  </div>
                  <div className="w-1/2 m-2">Panadura</div>
                </div>
              </Link>
            </>
            <>
              <Link to={`/PatientProfile/2`}>
                <div className=" flex mt-1 font-medium hover:bg-primary p-1 rounded-lg hover:">
                  <div className="w-1/2 m-1 flex ">
                    <img
                      className="rounded-[100px] mx-auto h-[40px] w-[40px] bg-black"
                      src={Doc}
                    />
                    <div className="w-3/4 ml-3 mt-1">Lunawa</div>
                  </div>
                  <div className="w-1/2 m-2">Panadura</div>
                </div>
              </Link>
            </>
            <>
              <Link to={`/PatientProfile/2`}>
                <div className=" flex mt-1  font-medium hover:bg-primary p-1 rounded-lg hover:">
                  <div className="w-1/2 m-1 flex ">
                    <img
                      className="rounded-[100px] mx-auto h-[40px] w-[40px] bg-black"
                      src={Doc}
                    />
                    <div className="w-3/4 ml-3 mt-1 ">Lunawa</div>
                  </div>
                  <div className="w-1/2 m-2 ">Panadura</div>
                </div>
              </Link>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
