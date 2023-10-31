import React, { useState, useEffect } from "react";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { GridItem, Image } from '@chakra-ui/react';

const HLCProfile = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { get } = useAxiosMethods();
  const { id } = useParams();

  const [user, setUser] = useState([]);

  useEffect(() => {
    try {
      get(`/hlc/getHlcProfile/${parseInt(id)}`, setUser);

    } catch (err) {
      console.error(err);
      navigate('/login', { state: { from: location }, replace: true });
    }
  }, []);



  return (
    <GridItem colSpan={6} mx={4} mt={2}>
      <div className=" h-screen bg-primary py-1">
        <div className=" md:w-3/4 h-3/4 flex py-1 mx-auto bg-white m-5 mt-[7%] p-5">
          <div className="md:w-3/4 mx-auto flex rounded-2xl py-1 p-5">
            <div className="parent md:w-full h-3/4 flex rounded-md pb-2 py-1 bg-white m-3 mt-[7%] p-5">
              <div className="md:w-1/2 mt-2 mb-4 mr-3">
                <div className=" mx-auto">
                  <Image src={user.image ? `data:image/png;base64, ${user.image}` : null} fallbackSrc={`https://placehold.co/600x400?text=${user.hlc_name}`} className="mx-auto p-1 h-[300px] w-[250px] rounded-xl" />
                </div>
                <div className="container horizontal justify-center py-1">
                  <div className="flex justify-center text-md font-semibold mb-0">
                    {user.hlc_name}
                  </div>
                </div>
              </div>
              <div className="child h-full mt-3 mb-3 md:w-[1px] bg-[#bebebe]"></div>
              <div className="md:w-1/2 mt-2 ml-4">
                <div className="container horizontal justify-center py-1">
                  <div className="parent mx-auto">
                    <div className="">
                      <div className="text-[17px] text-[#797878]">MOH Area</div>
                      <div className="text-[17px]">{user.moh_area ?? "Not Provided"}</div>
                      <hr className=""></hr>
                    </div>
                    <div className="mt-2">
                      <div className="text-[17px] text-[#797878]">PHM Area</div>
                      <div className="text-[17px]">{user.phm_area ?? "Not Provided"}</div>
                      <hr className=""></hr>
                    </div>
                    <div className="mt-2">
                      <div className="text-[17px] text-[#797878]">PHI Area</div>
                      <div className="text-[17px]">{user.phi_area ?? "Not Provided"}</div>
                      <hr className=""></hr>
                    </div>
                    <div className="mt-2">
                      <div className="text-[17px] text-[#797878]">GN Divison</div>
                      <div className="text-[17px]">{user.gn_division ?? "Not Provided"}</div>
                      <hr className=""></hr>
                    </div>
                    <div className="mt-9"></div>
                    <div className="mt-2">
                      <div className="text-[17px] text-[#797878]">Incharge</div>
                      <div className="text-[17px]">{user.in_charge ?? "Not Provided"}</div>
                      <hr className=""></hr>
                    </div>
                    <div className="mt-2">
                      <div className="text-[17px] text-[#797878]">Incharge Email</div>
                      <div className="text-[17px]">{user.in_charge_email ?? "Not Provided"}</div>
                      <hr className=""></hr>
                    </div>
                    <div className="mt-2">
                      <div className="text-[17px] text-[#797878]">Incharge Contact Number</div>
                      <div className="text-[17px]">{user.in_charge_mobile ?? "Not Provided"}</div>
                      <hr className=""></hr>
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

export default HLCProfile;
