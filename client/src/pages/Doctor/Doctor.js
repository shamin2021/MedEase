import { Box, Flex, Grid, GridItem, SimpleGrid } from '@chakra-ui/react'
import DoctorSideBar from '../../components/Doctor/DoctorSideBar'
import CommonCard from '../../components/CommonCard'
import ButtonCard from '../../components/ButtonCard'
import BarChart from '../../components/BarChart'
import DoughnutChart from '../../components/DoughnutChart'
import LineChart from '../../components/LineChart'
import PieChart from '../../components/PieChart'
import CommonForm from '../../components/Form/CommonForm'
import React from 'react'


const Doctor = () => {

    return (
        <Grid
            h="93vh"
            templateRows='repeat(7, 1fr)'
            templateColumns='repeat(7, 1fr)'
            // templateColumns={`repeat(${sidebarWidth == "75px" ? '1, 75px' : '1, 300px'} 6fr)`}
            gap={4}
            mt={1}

        >

            <CommonForm />

        </Grid>

    )
}

export default Doctor

