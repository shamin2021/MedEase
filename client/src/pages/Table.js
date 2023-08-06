import "../styles/Table.css";
import Doc from "../assets/Doc.jpg";

const Table = ({ data }) => {
  return (
    <>
      <div className=" h-72 m-1 ml-9 mt-3">
        <div className=" flex font-nunito mt-4 text-[18px] font-medium sticky top-3">
          <div className="w-1/3 m-1  ">Name</div>
          <div className="w-1/3 m-1 ">Surname</div>
          <div className="w-1/3 m-1">Email</div>
        </div>
        <hr className="w-7/8 mx-auto mt-3 mb-0" />
        <div>
          <div className=" h-56 overflow-y-scroll mb-2">
            {data.map((item) => (
              <>
                <div className=" flex font-nunito mt-4 text-[18px] font-medium">
                  <div className="w-1/3 m-1 flex ">
                    <img
                      className="rounded-[100px] mx-auto h-[40px] w-[40px] bg-black"
                      src={Doc}
                    />
                    <div className="w-3/4 ml-6">{item.first_name}</div>
                  </div>
                  <div className="w-1/3 m-1 ">{item.last_name}</div>
                  <div className="w-1/3 m-1 ">{item.email}</div>
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
