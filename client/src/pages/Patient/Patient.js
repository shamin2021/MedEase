import React from 'react'
import TestUsers from '../../components/TestUsers'
import { Box, Flex, Grid, GridItem, SimpleGrid } from '@chakra-ui/react'
import PatientSidebar from '../../components/Patient/PatientSidebar'

const Patient = () => {
  return (
    // <div>
    //   <h1>Patient Dashboard</h1>
    //   <br />
    //   {/* test purposes */}
    //   {/* < TestUsers /> */}
    //   <br />
    // </div>

    <Grid
      h="93vh"
      templateRows='repeat(7, 1fr)'
      templateColumns='repeat(7, 1fr)'
      gap={4}
      mt={1}
    >

      <GridItem colSpan={2} bg='tomato' h="5rem" />

    </Grid>
  )
}

export default Patient
