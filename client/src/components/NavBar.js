import React from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Stack,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import useAxiosMethods from "../hooks/useAxiosMethods";

export const NAVBARHEIGHT = "8vh";

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const { post } = useAxiosMethods();

  console.log(auth.user_id);

  const handleLogout = async () => {
    try {
      post("/auth/logout", null, setAuth);
      navigate("/login");
      localStorage.setItem("activeItem", "Dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Box
        className="bg-indigo-100 dark:bg-indigo-200"
        zIndex="999"
        position="fixed"
        top={0}
        width="full"
        px={4}
        style={{
          backgroundColor: "rgba(194, 211, 255, 0.55)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Flex
          h={NAVBARHEIGHT}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Link to="/">
              <Image src={logo} alt="Logo" width={150} />
            </Link>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {auth.user_id ? (
                <Box
                  as="a"
                  px={2}
                  py={1}
                  rounded={"md"}
                  _hover={{
                    textDecoration: "none",
                    bg: "gray.200",
                  }}
                  href={"/" + auth.role.toLowerCase()}
                >
                  Dashboard
                </Box>
              ) : (
                <Box
                  as="a"
                  px={2}
                  py={1}
                  rounded={"md"}
                  _hover={{
                    textDecoration: "none",
                    bg: "gray.200",
                  }}
                  href={"/"}
                >
                  Home
                </Box>
              )}

              <Box
                as="a"
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: "gray.200",
                }}
                href={"/about-us"}
              >
                About
              </Box>
              <Box
                as="a"
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: "gray.200",
                }}
                href={"/contact-us"}
              >
                Contact Us
              </Box>
              <Box
                as="a"
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: "gray.200",
                }}
                href={"/findHLC"}
              >
                Find HLC
              </Box>
            </HStack>
          </HStack>

          <Flex alignItems={"center"}>
            {auth.user_id ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    name={auth.first_name} // use response user name
                    bg={"teal.500"}
                    size={"sm"}
                    src={
                      auth.profile_image
                        ? `data:image/png;base64, ${auth.profile_image}`
                        : null
                    } // use response user image
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem as={"a"} href={"/PatientSettings"}>
                    Profile Settings
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Stack
                flex={{ base: 1, md: 0 }}
                justify={"flex-end"}
                direction={"row"}
                spacing={6}
              >
                <Button
                  as={"a"}
                  fontSize={"sm"}
                  fontWeight={600}
                  href={"/login"}
                  color={"white"}
                  bg={"blue.300"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign In
                </Button>
                <Button
                  as={"a"}
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"black"}
                  bg={"white"}
                  href={"/register"}
                  _hover={{
                    bg: "gray.100",
                  }}
                >
                  Sign Up
                </Button>
              </Stack>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {auth.user_id ? (
                <Box
                  as="a"
                  px={2}
                  py={1}
                  rounded={"md"}
                  _hover={{
                    textDecoration: "none",
                    bg: "gray.200",
                  }}
                  href={"/" + auth.role.toLowerCase()}
                >
                  Dashboard
                </Box>
              ) : (
                <Box
                  as="a"
                  px={2}
                  py={1}
                  rounded={"md"}
                  _hover={{
                    textDecoration: "none",
                    bg: "gray.200",
                  }}
                  href={"/"}
                >
                  Home
                </Box>
              )}

              <Box
                as="a"
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: "gray.200",
                }}
                href={"#"}
              >
                About
              </Box>
              <Box
                as="a"
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: "gray.200",
                }}
                href={"#"}
              >
                Contact Us
              </Box>
              <Box
                as="a"
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: "gray.200",
                }}
                href={"#"}
              >
                Find HLC
              </Box>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default NavBar;
