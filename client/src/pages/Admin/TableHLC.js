import "../../styles/Table.css";
import { Link } from "react-router-dom";
import { Avatar } from '@chakra-ui/react';


const Table = ({ data }) => {
  return (
    <>
      <div className=" h-full m-1 font-poppins">
        <div className=" flex mt-2 text-[17px] font-medium sticky top-3 p-1 pb-0">
          <div className="w-2/5 m-1">Name</div>
          <div className="w-1/5 m-1">Email</div>
          <div className="w-1/5 m-1">Mobile Number</div>
          <div className="w-1/5 m-1">In Charge</div>
        </div>
        <hr className="w-7/8 mx-auto mt-1 mb-0" />
        <div>
          <div className="h-96 overflow-y-scroll mb-2">
            {data.map((item) => (
              <>
                <Link to={`/HLCProfile/${item.user_id}`}>
                  <div className=" flex mt-1 font-medium hover:bg-primary p-1 rounded-md hover:">
                    <div className="w-1/3 m-1 flex ">
                      <Avatar size="sm" name={item.hlc_name} src={item.image ? `data:image/png;base64, ${item.image}` : null} bg='teal.400'/>
                      <div className="w-3/4 ml-3 mt-1 text-xs">{item.hlc_name}</div>
                    </div>
                    <div className="w-2/5 m-2 text-xs">{item.email}</div>
                    <div className="w-1/5 m-2 text-xs">{item.mobileNumber}</div>
                    <div className="w-1/5 m-2 text-xs">{item.in_charge}</div>
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

export default Table;
