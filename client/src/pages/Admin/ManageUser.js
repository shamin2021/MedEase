import React, { useState, useEffect } from "react";
import Table from "./Table";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  GridItem
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import { useNavigate, useLocation } from "react-router-dom";

const ManageUser = () => {

  const [query, setQuery] = useState("");
  const keys = ["firstname", "lastname", "email"];
  const [users, setUsers] = useState([]);
  const [enabledUsers, setEnabledUsers] = useState([]);
  const [disabledUsers, setDisabledUsers] = useState([]);

  const { get } = useAxiosMethods();
  const navigate = useNavigate();
  const location = useLocation();

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };

  // const search = (searchString) => {
  //   return users.filter((item) =>
  //     item.firstname.toLowerCase().includes(searchString) ||
  //     item.lastname.toLowerCase().includes(searchString) ||
  //     item.email.toLowerCase().includes(searchString)
  //   );
  // };

  const handleSearch = (value) => {
    setQuery(value);
    console.log(query)
    // search(enabledUsers)
  }

  const getUsers = async () => {
    try {
      get("/admin/getUserList", setUsers)

      setEnabledUsers(users.filter((item) => item.enabled === true))
      setDisabledUsers(users.filter((item) => item.enabled === false))
      console.log(enabledUsers)

    } catch (err) {
      console.error(err);
      navigate('/login', { state: { from: location }, replace: true });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUsers();
    };

    fetchData();
  }, [users]);

  return (
    <GridItem colSpan={6} >
      <div className="h-screen py-1 bg-primary">
        <div className="md:w-3/4 mx-auto shadow-xl rounded-2xl pb-2 py-1 bg-white mt-[5%] p-5">
          <div className="ml-6 flex w-full">
            <div className="w-2/4 m-2 mt-4">User Management</div>
            <div className=" w-2/4 m-2 mt-3 float-right">
              <div className="flex ">
                <div className="w-1/12 h-[40px] mr-1 rounded-md bg-[#f5f5f5]">
                  <FaSearch className="h-[40px] mx-auto" />
                </div>
                <input
                  className="w-full h-[40px] text-[17px] rounded-md bg-[#f5f5f5] p-3 mr-3 border-none"
                  placeholder="Search..."
                  onChange={(e) => handleSearch(e.target.value.toLowerCase())}
                />
              </div>
            </div>
          </div>
          <div className="ml-9 mx-auto">
            <Tabs
              position="relative"
              fontSize={1}
              fontFamily={("Poppins", "sans-serif")}
            >
              <TabList>
                <Tab fontSize={17} borderBottom={0} paddingLeft={0}>
                  Active Users
                </Tab>
                <Tab fontSize={17} borderBottom={0}>
                  Disabled Users
                </Tab>
              </TabList>
              <TabIndicator
                mt="-1.5px"
                height="2px"
                bg="blue.500"
                borderRadius="1px"
                w={14}
              />
              <TabPanels>
                {/* should send either enabled or disable user arrays */}
                <TabPanel padding={2}>
                  <div>{<Table data={enabledUsers} status={true} />}</div>
                </TabPanel>
                <TabPanel padding={2}>
                  <div>{<Table data={disabledUsers} status={false} />}</div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </div>
    </GridItem >
  );
}

export default ManageUser