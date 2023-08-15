import React from 'react'
import useAuth from "../../hooks/useAuth";

import { Flex, IconButton, Divider, Avatar, Heading, Text } from "@chakra-ui/react";
import { FiMenu, FiHome, FiUser, FiVideo, FiCalendar, FiFileText, FiMessageSquare, FiSettings } from "react-icons/fi";
import NavItem from '../NavItem';

const PatientSidebar = () => {
    const [navSize, changeNavSize] = React.useState("large");
    const { auth } = useAuth();

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
            pos="fixed"
            // left="5"
            bottom="0"
            h="92vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize === "small" ? "15px" : "30px"}
            w={navSize === "small" ? "75px" : "300px"}
            flexDir="column"
            justifyContent="space-between"
            backgroundColor="#EDEDED"

        >
            <Flex top="30px" p="5%" flexDir="column" as="nav" alignItems={navSize === "small" ? "center" : "flex-start"}>
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
                <NavItem navSize={navSize} icon={FiHome} title="Dashboard" href={"/patient"} />
                <NavItem navSize={navSize} icon={FiHome} title="HLC" href={"/FindHLCPatient"} />
                <NavItem navSize={navSize} icon={FiUser} title="Doctor" href={"/SearchDoctor"} />
                <NavItem navSize={navSize} icon={FiFileText} title="Risk Assessment" href={"/SelfAssessments"} />
                <NavItem navSize={navSize} icon={FiMessageSquare} title="Messaging" href={"/message"} />
                <NavItem navSize={navSize} icon={FiVideo} title="Meetings" href={"/PatientMeetings"} />
                <NavItem navSize={navSize} icon={FiCalendar} title="Schedule" href={"/ScheduleMeeting"} />
                <NavItem navSize={navSize} icon={FiSettings} title="Settings" href={"/PatientSettings"} />
            </Flex>

            <Flex p="5%" flexDir="column" w="100%" alignItems={navSize === "small" ? "center" : "flex-start"} mb={4}>
                <Divider display={navSize === "small" ? "none" : "flex"} />

                <Flex mt={4} align="center">
                    <Avatar size="sm" src="" />
                    <Flex flexDir="column" ml={4} display={navSize === "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">
                            Asith Amarasekara
                        </Heading>
                        <Text color="gray">HLC</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default PatientSidebar
