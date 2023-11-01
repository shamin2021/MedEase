import { Box, Flex, Progress } from "@chakra-ui/react";
import { CircularProgressbar } from "react-circular-progressbar";
import { Link } from "react-router-dom";

const WeekProgress = ({
  percentage = 0,
  exerciseProgress = 0,
  dietProgress = 0,
  weekDates = "",
  isCurrentWeek = false,
}) => {
  return (
    <Flex
      flexDir={"column"}
      alignItems={"center"}
      h={"fit-content"}
      mt={5}
      p={5}
      rounded={"md"}
      bgColor={"white"}
      display={{ base: "none", xl: "block" }}
    >
      <Box
        fontSize={"1rem"}
        fontWeight={"medium"}
        m={2}
        className="font-poppins"
      >
        {isCurrentWeek ? "This week progress" : "Progress"}
      </Box>
      <Flex
        flexDir={{ base: "row", xl: "column" }}
        m={3}
        maxW={"200px"}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <Box minW={"100px"}>
          <CircularProgressbar value={percentage} text={`${percentage}%`} />
        </Box>
        <Box className="text-[16px] text-center m-2 font-medium font-poppins">
          Week <br /> {weekDates}
        </Box>
        <Box className="my-4">
          <Box className="m-1">
            <Box className="text-[16px] font-poppins m-1">Diet</Box>
            <Progress value={dietProgress} height="10px" rounded="5px" />
          </Box>
          <Box className="m-1">
            <Box className="text-[16px] font-poppins m-1 mt-2">Exercise</Box>
            <Progress value={exerciseProgress} height="10px" rounded="5px" />
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default WeekProgress;
