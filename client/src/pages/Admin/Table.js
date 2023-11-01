import "../../styles/Table.css";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Avatar } from '@chakra-ui/react';

const UserTable = ({ data, status, clicked }) => {

  const [res, setRes] = useState('');

  const { put } = useAxiosMethods();
  const navigate = useNavigate();
  const location = useLocation();


  const handleUser = (id, disable) => {
    if (disable === true) {
      try {
        put(`/admin/manageUser/${id}`, { enabled:false }, setRes);

      } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
    }
    else {
      try {
        put(`/admin/manageUser/${id}`, { enabled: true }, setRes);

      } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
    }
  }

  useEffect(() => {
    if (res.status === 200) {
      clicked(true);
    }
  }, [res]);

  return (
    <>
      <div className="">
        <div className=" flex text-[17px] font-medium sticky top-3 p-1">
          <div className="w-1/4 m-1">Username</div>
          <div className="w-1/4 m-1">Email</div>
          <div className="w-1/4 m-1">User Role</div>
          <div className="w-1/4 m-1">Action</div>
        </div>
        <hr className="w-7/8 mx-auto mt-1 mb-0" />
        <div>
          <div className="h-96 overflow-y-scroll mb-2">
            {data.map((item) => (
              
              <>
                <div className=" flex mt-1 text-[17px] font-medium p-1 rounded-lg hover:">
                  <div className="w-1/4 m-1 flex ">
                    <Avatar size="sm" name={item.firstname ?? item.hlc_name} src={item.image ? `data:image/png;base64, ${item.image}` : null} bg='teal.400' />
                    <div className="w-3/4 ml-3">
                      {item.role === "HLC" ? item.hlc_name : item.firstname + " " + item.lastname}
                    </div>
                  </div>
                  <div className="w-1/4 m-1">{item.email}</div>
                  <div className="w-1/4 m-1">{item.role}</div>
                  <div className="w-1/4 m-1">
                    {status === true ? (
                      <button className="p-1 bg-[#eb5a5a] text-white rounded-md hover:bg-red-600" onClick={() => handleUser(item.id, true)}>
                        Disable
                      </button>
                    ) : (
                      <button className="p-1 bg-[#5aeb7e] text-white rounded-md hover:bg-green-600" onClick={() => handleUser(item.id, false)}>
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

export default UserTable;
