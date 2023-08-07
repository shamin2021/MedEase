import { Box, Flex, Grid, GridItem, SimpleGrid } from '@chakra-ui/react'
import AdminSidebar from '../../components/Admin/AdminSidebar'
import CommonCard from '../../components/CommonCard'
import ButtonCard from '../../components/ButtonCard'
import BarChart from '../../components/BarChart'
import DoughnutChart from '../../components/DoughnutChart'
import LineChart from '../../components/LineChart'
import PieChart from '../../components/PieChart'
import React from 'react'


const Admin = () => {

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
          <AdminSidebar />
        </SimpleGrid>
      </GridItem>

      <GridItem colSpan={6} bg='tomato' h="5rem" />


      <GridItem colSpan={2} bg="yellow" h="15rem">

        <Flex justifyContent="space-around">
          <Box p="10px" bg="blue.200">hello 1</Box>
          <Box p="10px" bg="blue">hello 2</Box>
        </Flex>

      </GridItem>


      <GridItem colSpan={2} bg=''>
        <CommonCard title="Dashboard" description="This is a simple card using Chakra UI. You can customize it with your
                own content and styles.  " />
      </GridItem>


      <GridItem colSpan={2} bg='' >
        <ButtonCard title="Dashboard" description="This is a simple card using Chakra UI. You can customize it with your
                own content and styles." />
      </GridItem>

      <GridItem colSpan={2} bg='' h="15rem" >
        <BarChart />
      </GridItem>

      <GridItem colSpan={2} bg='' h="15rem" >
        <DoughnutChart />  
      </GridItem>

      <GridItem colSpan={2} bg='' h="15rem" >
        <LineChart />  
      </GridItem>

      <GridItem colSpan={2} bg='' h="15rem" >
        <PieChart />  
      </GridItem>
      

      <GridItem colSpan={2} bg='tomato' />
      <GridItem colSpan={2} bg='tomato' />

    </Grid>
    
  )
}

export default Admin

