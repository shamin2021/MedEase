import React from 'react';
import useAuth from "../../hooks/useAuth";

import NavItem from '../NavItem';
import { Flex, IconButton, Avatar, Heading, Divider } from "@chakra-ui/react";
import { FiUsers, FiSettings } from "react-icons/fi";

import { FiMenu, FiHome, FiVideo, FiCalendar, FiLogOut, FiMessageSquare } from "react-icons/fi";

const DoctorSideBar = () => {
    const [navSize, changeNavSize] = React.useState("large");
    const { auth } = useAuth();

    // const toggleNavbar = () => {
    //     setIsNavbarOpen(!isNavbarOpen);
    // };

    // const [isNavbarExpanded, setIsNavbarExpanded] = React.useState(true);
    // React.useEffect(() => {
    //     function handleResize() {
    //         if (window.innerWidth < 768) {
    //             changeNavSize("small");
    //         } else {
    //             changeNavSize("large");
    //         }
    //     }

    //     handleResize();
    //     window.addEventListener("resize", handleResize);
    //     return () => window.removeEventListener("resize", handleResize);
    // }, []);



    return (

        <Flex
        // pos="fixed"
        // // top="83"
        // bottom="0"
        // h="100vh"
        // boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
        // borderRadius={navSize === "small" ? "15px" : "30px"}
        // w={navSize === "small" ? "75px" : "300px"}
        // flexDir="column"
        // justifyContent="space-between"
        // backgroundColor="#EDEDED"
        >
            <Flex>
                <nav class="fixed top-0 z-50 w-full bg-blue dark:bg-blue-300 ">
                    <div class="px-3 py-3 lg:px-5 lg:pl-3">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center justify-start">
                                <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-blue-100 dark:focus:ring-gray-600">
                                    <span class="sr-only">Open sidebar</span>
                                    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                    </svg>
                                </button>
                                <a href="" class="flex ml-2 md:mr-24">
                                    <img src="../client/public/12.png" class="h-8 mr-3" alt="FlowBite Logo" />
                                </a>
                            </div>
                            <div class="flex items-center">
                                <div class="flex items-center ml-3">
                                    <div class="pr-4">
                                        {/* <Avatar size="sm" src="" name={auth.first_name} /> */}
                                        <Flex flexDir="column" ml={4} display={navSize === "small" ? "none" : "flex"}>
                                            <Heading as="h3" size="sm">
                                                {auth.first_name.toUpperCase() + " " + auth.last_name.toUpperCase()}
                                            </Heading>
                                        </Flex>
                                    </div>
                                    <div>
                                        <button type="button" class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                            <span class="sr-only">Open user menu</span>
                                            <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo"></img>
                                        </button>
                                    </div>
                                    {/* <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                                        <div class="px-4 py-3" role="none">
                                            <p class="text-sm text-gray-900 dark:text-black" role="none">
                                                Neil Sims
                                            </p>
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                                neil.sims@flowbite.com
                                            </p>
                                        </div>
                                        <ul class="py-1" role="none">
                                            <li>
                                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-black" role="menuitem">Dashboard</a>
                                            </li>
                                            <li>
                                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-black" role="menuitem">Settings</a>
                                            </li>
                                            <li>
                                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-black" role="menuitem">Earnings</a>
                                            </li>
                                            <li>
                                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-black" role="menuitem">Sign out</a>
                                            </li>
                                        </ul>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white sm:translate-x-0 dark:bg-blue-50 " aria-label="Sidebar">
                    <div class="h-full flex flex-col justify-between pt-6 px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-0">
                        <ul class="space-y-2 font-medium">
                            <li>
                                <a href="/HLC" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:bg-gray-100 dark:hover:bg-blue-100 group">
                                    <svg class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                                    </svg>
                                    <span class="ml-3">Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <a href="/ManageDoctor" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:bg-gray-100 dark:hover:bg-blue-100 group">
                                    <svg class="h-6 w-6 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />  <circle cx="12" cy="7" r="4" /></svg>
                                    <span class="flex-1 ml-3 whitespace-nowrap">Doctors</span>
                                    {/* <span class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span> */}
                                </a>
                            </li>
                            <li>
                                <a href="/ManagePatientHLC" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:bg-gray-100 dark:hover:bg-blue-100 group">
                                    <svg class="h-6 w-6 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <polygon points="23 7 16 12 23 17 23 7" />  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>
                                    <span class="flex-1 ml-3 whitespace-nowrap">Patients</span>
                                    {/* <span class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span> */}
                                </a>
                            </li>
                            {/* <li>
                                <a href="DoctorAvailability" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:bg-gray-100 dark:hover:bg-blue-100 group">
                                    <svg class="h-6 w-6 text-gray-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <rect x="4" y="5" width="16" height="16" rx="2" />  <line x1="16" y1="3" x2="16" y2="7" />  <line x1="8" y1="3" x2="8" y2="7" />  <line x1="4" y1="11" x2="20" y2="11" />  <rect x="8" y="15" width="2" height="2" /></svg>

                                    <span class="flex-1 ml-3 whitespace-nowrap">Availability</span>
                                </a>
                            </li> */}
                            {/* <li>
                                <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:bg-gray-100 dark:hover:bg-blue-100 group">
                                    <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                        <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                                    </svg>
                                    <span class="flex-1 ml-3 whitespace-nowrap">Settings</span>
                                </a>
                            </li> */}
                        </ul>
                        <ul class="mt-auto">
                            <li>
                                <a href="HLCSettings" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:bg-gray-100 dark:hover:bg-blue-100 group">
                                    <svg class="h-6 w-6 text-gray-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />  <circle cx="12" cy="12" r="3" /></svg>
                                    <span class="flex-1 ml-3 whitespace-nowrap">Settings</span>
                                </a>
                            </li>
                            <li>
                                <a href="/login" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:bg-gray-100 dark:hover:bg-blue-100 group">
                                    <svg class="h-6 w-6 text-gray-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg>
                                    <span class="flex-1 ml-3 whitespace-nowrap">Logout</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </aside>


            </Flex>

            {/* <Flex p="5%" flexDir="column" as="nav" alignItems={navSize === "small" ? "center" : "flex-start"}>
                <IconButton
                    background="none"
                    mt={5}
                    _hover={{ background: "none" }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize === "small") changeNavSize("large");
                        else changeNavSize("small");
                    }}
                />

                <NavItem navSize={navSize} icon={FiHome} title="Dashboard" href={  "/Doctor" } />
                <NavItem navSize={navSize} icon={FiHome} title="Patients" href={"/ManagePatient"} />
                <NavItem navSize={navSize} icon={FiVideo} title="Meetings" href={"/DoctorMeetings"} />
                <NavItem navSize={navSize} icon={FiMessageSquare} title="Messaging" href={"/message"} />
                <NavItem navSize={navSize} icon={FiCalendar} title="Availability" href={"/DoctorAvailability"} />
                <NavItem navSize={navSize} icon={FiUsers} title="Patients" href={"/ManagePatient"} />
                <NavItem navSize={navSize} icon={FiSettings} title="Settings" href={"/DoctorSetting"} />
            </Flex>

            <Flex p="5%" flexDir="column" w="100%" alignItems={navSize === "small" ? "center" : "flex-start"} mb={4}>
                <Divider display={navSize === "small" ? "none" : "flex"} />

                <Flex mt={4} align="center">
                    <Avatar size="sm" name={auth.first_name} src={auth.profile_image ? `data:image/png;base64, ${auth.profile_image}` : null} />
                    <Flex flexDir="column" ml={4} display={navSize === "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">
                            {auth.first_name.toUpperCase() + " " + auth.last_name.toUpperCase()}
                        </Heading>
                    </Flex>
                </Flex>
                <NavItem navSize={navSize} icon={FiLogOut} title="Logout" />
            </Flex> */}
        </Flex >
    );
};

export default DoctorSideBar;
