import { Flex, Icon, Link, Menu, MenuButton, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from 'react-router-dom'

import useAuth from "../hooks/useAuth";
import useAxiosMethods from "../hooks/useAxiosMethods";

const NavItem = ({ navSize, icon, title, href }) => {

    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const { post } = useAxiosMethods();

    const handleNavItemClick = (title) => {
        localStorage.setItem('activeItem', title);

        if (title === 'Logout') {

            try {
                post('/auth/logout', null, setAuth);
                navigate('/login');
                localStorage.setItem('activeItem', 'Dashboard');

            } catch (err) {
                console.error(err);
            }
        }
    };

    const active = localStorage.getItem('activeItem');

    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={navSize === "small" ? "center" : "flex-start"}
            onClick={() => handleNavItemClick(title)}   
        >

            <Menu placement="right">
                <Link
                    backgroundColor={active === title && "#C5DCFB"}
                    p={3}
                    borderRadius={12}
                    _hover={ {textDecor: "none", backgroundColor: "#C5DCFB"}}
                    w={navSize === "large" && "100%"}
                    href={href ? href : "#"}
                >
                    <MenuButton>
                        <Flex>
                            <Icon as={icon} fontSize="xl" color={active === title ? "Black" : "gray.400"} />
                            <Text ml={5} display={navSize === "small" ? "none" : "flex"}> {title}</Text>
                        </Flex>
                    </MenuButton>
                </Link>
            </Menu>

        </Flex>
        
    
    )
}

export default NavItem