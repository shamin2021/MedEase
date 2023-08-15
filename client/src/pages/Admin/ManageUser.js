import React, { useState } from "react";
import { Docs } from '../Docs'
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


const SearchDoc = () => {
  const [query, setQuery] = useState("");
  const keys = ["first_name", "last_name", "email"];
  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };
  return (
    <GridItem colSpan={6} >
      <div className="h-screen py-1 bg-primary">
        <div className="md:w-3/4 mx-auto shadow-xl rounded-2xl pb-2 py-1 bg-white mt-9 p-5">
          <div className="ml-6 flex w-full">
            <div className="w-2/4 m-2 mt-4">User Management</div>
            <div className=" w-2/4 m-2 mt-3 float-right">
              <div className="flex ">
                <div className="w-1/12 h-[40px] mr-1 rounded-md bg-[#f5f5f5]">
                  <FaSearch className="h-[40px] mx-auto" />
                </div>
                <input
                  className="w-full h-[40px] text-[15px] rounded-md bg-[#f5f5f5] p-3 mr-3 border-none"
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
                <Tab fontSize={15} borderBottom={0} paddingLeft={0}>
                  Active Users
                </Tab>
                <Tab fontSize={15} borderBottom={0}>
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
                <TabPanel padding={2}>
                  <div>{<Table data={search(Docs)} status={true} />}</div>
                </TabPanel>
                <TabPanel padding={2}>
                  <div>{<Table data={search(Docs)} status={false} />}</div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </div>
    </GridItem >
  );
}

export default SearchDoc