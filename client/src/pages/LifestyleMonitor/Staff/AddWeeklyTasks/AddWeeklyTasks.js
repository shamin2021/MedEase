import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import AddTasksForm from "../../components/AddTasksForm";
import RegisteredTasks from "../../components/RegisteredTasks";

const AddWeeklyTasks = () => {
    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <SimpleGrid
                mb='20px'
                p={'10px'}
                columns={{ sm: 1, md: 2 }}
                spacing={{ base: "20px", xl: "20px" }}>

                <AddTasksForm />

                <RegisteredTasks />
            </SimpleGrid>
        </Box>
    )
}

export default AddWeeklyTasks