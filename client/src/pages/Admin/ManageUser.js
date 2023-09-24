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
  const [users, setUsers] = useState([]);
  const [enabledUsers, setEnabledUsers] = useState([]);
  const [disabledUsers, setDisabledUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [initializedSearch, setInitializedSearch] = useState(false);
  const [stateChaged, setStateChanged] = useState(false);

  const { get } = useAxiosMethods();
  const navigate = useNavigate();
  const location = useLocation();

  const search = () => {

    setSearchedUsers(users.filter((item) => {
      if (item.role === "HLC") {
        return (
          item.hlc_name.toLowerCase().includes(query) ||
          item.email.toLowerCase().includes(query)
        );
      }
      else {
        return (
          item.firstname.toLowerCase().includes(query) ||
          item.lastname.toLowerCase().includes(query) ||
          item.email.toLowerCase().includes(query)
        );
      }
    }));
  };

  useEffect(() => {
    try {
      get("/admin/getUserList", setUsers)

    } catch (err) {
      console.error(err);
      navigate('/login', { state: { from: location }, replace: true });
    }
  }, [stateChaged]);


  useEffect(() => {
    if (users.length > 0) {
      console.log(users);
      if (searchedUsers.length === 0 && !initializedSearch) {
        setSearchedUsers(users)
        setInitializedSearch(true)
      }
      console.log(searchedUsers);
      setEnabledUsers(searchedUsers.filter((item) => item.enabled === true))
      setDisabledUsers(searchedUsers.filter((item) => item.enabled === false))
    }
  }, [users, searchedUsers]);

  useEffect(() => {
    search();
    setStateChanged(false);
  }, [users]);

  useEffect(() => {
    if (query !== "") {
      search();
      console.log(query);
    } else {
      setSearchedUsers(users);
    }
  }, [query]);

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
                  onChange={(e) => setQuery(e.target.value.toLowerCase())}
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
                  <div>{<Table data={enabledUsers} status={true} clicked={setStateChanged} />}</div>
                </TabPanel>
                <TabPanel padding={2}>
                  <div>{<Table data={disabledUsers} status={false} clicked={setStateChanged} />}</div>
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