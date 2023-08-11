import React, { useState } from 'react';

import { IoPawOutline } from 'react-icons/io5'
import NavItem from '../NavItem';
import DocActiveNavItem from './DocActiveNavItem';
import { Flex, IconButton, Avatar, Heading, Text, Divider } from "@chakra-ui/react";
import { FiMenu, FiHome, FiVideo, FiSettings, FiCalendar } from "react-icons/fi";

const DoctorSideBar = () => {
    const [navSize, changeNavSize] = React.useState("large");

    const [activeNavItem, setActiveNavItem] = useState('Dashboard'); 

    const handleNavItemClick = (title) => {
        setActiveNavItem(title);
    };

    React.useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 768) {
                changeNavSize("small");
            } else {
                changeNavSize("large");
            }
        }

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Flex
            pos="static"
            left="5"
            h="100vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize === "small" ? "15px" : "30px"}
            w={navSize === "small" ? "75px" : "300px"}
            flexDir="column"
            justifyContent="space-between"
            backgroundColor="#EDEDED"
        >
            <Flex p="5%" flexDir="column" as="nav" alignItems={navSize === "small" ? "center" : "flex-start"}>
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
                <NavItem navSize={navSize} icon={FiHome} title="Dashboard" href={"/Doctor"} active={activeNavItem === 'Dashboard'} onClick={() => handleNavItemClick('Dashboard')}/>
                <NavItem navSize={navSize} icon={FiHome} title="HLC" href={"/DoctorHLC"} active={activeNavItem === 'DoctorHLC'} onClick={() => handleNavItemClick('DoctorHLC')} />
                <NavItem navSize={navSize} icon={FiHome} title="Patients" href={"/DoctorPatient"} active={activeNavItem === 'DoctorPatient'} onClick={() => handleNavItemClick('DoctorPatient')} />
                <NavItem navSize={navSize} icon={FiVideo} title="Meetings" href={"/DoctorMeetings"} active={activeNavItem === 'DoctorMeetings'} onClick={() => handleNavItemClick('DoctorMeetings')}/>
                <NavItem navSize={navSize} icon={FiCalendar} title="Availability" href={"/DoctorAvailability"} active={activeNavItem === 'DoctorAvailability'} onClick={() => handleNavItemClick('DoctorAvailability')}/>
                <NavItem navSize={navSize} icon={FiSettings} title="Settings" href={"/DoctorSetting"} active={activeNavItem === 'DoctorSetting'} onClick={() => handleNavItemClick('DoctorSetting')}/>
            </Flex>

            <Flex p="5%" flexDir="column" w="100%" alignItems={navSize === "small" ? "center" : "flex-start"} mb={4}>
                <Divider display={navSize === "small" ? "none" : "flex"} />

                <Flex mt={4} align="center">
                    <Avatar size="sm" src="" />
                    <Flex flexDir="column" ml={4} display={navSize === "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">
                            Asith Amarasekara
                        </Heading>
                        <Text color="gray"></Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default DoctorSideBar;
