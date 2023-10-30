import React from 'react';
import useAuth from "../../hooks/useAuth";

import NavItem from '../NavItem';
import { Flex, IconButton, Avatar, Heading, Divider } from "@chakra-ui/react";
import { FiMenu, FiHome, FiUsers, FiSettings, FiLogOut, FiUserPlus, FiRepeat } from "react-icons/fi";

const HLCSidebar = () => {
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
            // top="83"
            bottom="0"
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
                <NavItem navSize={navSize} icon={FiHome} title="Dashboard" href={"/HLC"} />
                <NavItem navSize={navSize} icon={FiUsers} title="Patients" href={"/ManagePatientHLC"} />
                <NavItem navSize={navSize} icon={FiUserPlus} title="Doctor" href={"/ManageDoctor"} />
                <NavItem navSize={navSize} icon={FiRepeat} title="Transfer Requests" href={"/TransferPatient"} />
                <NavItem navSize={navSize} icon={FiSettings} title="Settings" href={"/HLCSettings"} />

            </Flex>

            <Flex p="5%" flexDir="column" w="100%" alignItems={navSize === "small" ? "center" : "flex-start"} mb={4}>
                <Divider display={navSize === "small" ? "none" : "flex"} />

                <Flex mt={4} align="center">
                    <Avatar size="sm" name={auth.hlc_name} src={auth.profile_image ? `data:image/png;base64, ${auth.profile_image}` : null} />
                    <Flex flexDir="column" ml={4} display={navSize === "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">
                            {auth.hlc_name.toUpperCase()}
                        </Heading>
                    </Flex>
                </Flex>
                <NavItem navSize={navSize} icon={FiLogOut} title="Logout" />
            </Flex>
        </Flex>
    );
};

export default HLCSidebar;
