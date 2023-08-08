import { Flex, Icon, Link, Menu, MenuButton, Text } from "@chakra-ui/react";
import React from "react";

const NavItem = ({ navSize, icon, title, href, active }) => {

    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}
        >

            <Menu placement="right">
                <Link
                    backgroundColor={active && "#C5DCFB"}
                    p={3}
                    borderRadius={12}
                    _hover={ {textDecor: "none", backgroundColor: "#C5DCFB"}}
                    w={navSize == "large" && "100%"}
                    href={href ? href : "#"}
                >
                    <MenuButton>
                        <Flex>
                            <Icon as={icon} fontSize="xl" color={active ? "Black" : "gray.400"} />
                            <Text ml={5} display={navSize == "small" ? "none" : "flex"}> {title}</Text>
                        </Flex>
                    </MenuButton>
                </Link>
            </Menu>

        </Flex>
        
    
    )
}

export default NavItem