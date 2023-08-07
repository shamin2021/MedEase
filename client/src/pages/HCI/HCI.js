import { Box, Flex, Grid, GridItem, SimpleGrid } from '@chakra-ui/react'
import HCISidebar from '../../components/HCI/HCISidebar'
// import CommonCard from '../../components/CommonCard'
// import ButtonCard from '../../components/ButtonCard'
// import BarChart from '../../components/BarChart'
// import DoughnutChart from '../../components/DoughnutChart'
// import LineChart from '../../components/LineChart'
// import PieChart from '../../components/PieChart'
import React from 'react'


const HCI = () => {

  return (
    <Grid
      h="93vh"
      templateRows='repeat(7, 1fr)'
      templateColumns='repeat(7, 1fr)'
      // templateColumns={`repeat(${sidebarWidth == "75px" ? '1, 75px' : '1, 300px'} 6fr)`}
      gap={4}
      mt={1}

    >
      <GridItem rowSpan={4} colSpan={1} >
        <SimpleGrid >
          <HCISidebar />
        </SimpleGrid>
      </GridItem>


    </Grid>
    
  )
}

export default HCI

