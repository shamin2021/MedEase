import React from 'react'
import useAuth from "../../hooks/useAuth";

import { Flex, IconButton, Divider, Avatar, Heading, Text } from "@chakra-ui/react";
import { FiMenu, FiHome, FiUser, FiVideo, FiCalendar, FiFileText, FiMessageSquare, FiUserPlus } from "react-icons/fi";
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
                <NavItem navSize={navSize} icon={FiFileText} title="Risk Assessment" href={"/SelfAssessments"} />
                <NavItem navSize={navSize} icon={FiCalendar} title="Lifestyle" href={"/Lifestyledashboard"} />
                <NavItem navSize={navSize} icon={FiUserPlus} title="Doctor" href={"/SearchDoctorPatient"} />
                <NavItem navSize={navSize} icon={FiMessageSquare} title="Messaging" href={"/message"} />
                <NavItem navSize={navSize} icon={FiVideo} title="Meetings" href={"/PatientMeetings"} />
            </Flex>
        </Flex>
    );
}

export default PatientSidebar
