import { Box, Flex, Input, Button, Grid, GridItem, SimpleGrid, Text } from '@chakra-ui/react'
import { FiLogOut } from 'react-icons/fi';
import { HiSearch } from 'react-icons/hi';
import React from 'react'

import CommonCard from '../../components/CommonCard'
import BarChart from '../../components/BarChart'
import SimpleTable from '../../components/Table/SimpleTable'


const Admin = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = () => {
    console.log(`Searching for: ${searchQuery}`);
  };
  return (
    <GridItem
      colSpan={6}
      rowSpan={1}
      borderRadius="lg"
      p="4"

    // background="blue.300"
    >
      <Flex
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-end"
        pb="25"
      >
        <Input
          w="400px"
          type="text"
          placeholder="Search"
          borderRadius="lg"
          border="2px solid #909090"
          size="sm"
          mr="3"
          pl="10"
          pr="3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          colorScheme="teal"
          // size="sm"
          leftIcon={<HiSearch />}
          onClick={handleSearch}
        >
        </Button>

      </Flex>

      <Flex
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={10}
        pb="4"
      // bg="blue.200"
      >
        <CommonCard title="Today's Appointments" description={10} />
        <CommonCard title="Last Week Patiants" description={140} />
        <CommonCard title="Last Week Patiants" description={140} />
        <CommonCard title="Last Week Patiants" description={140} />

      </Flex>

      <Flex
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={10}
        pb="4"
      >

        <SimpleTable />
        <SimpleTable />

      </Flex>

      <Flex
        justifyContent="space-around"
      >
        <Flex
          flexDirection="column"
          alignItems="center"
          pb="4"
        >
          <Text>
            Chart Title
          </Text>

          <BarChart />
        </Flex>
        <Flex
          flexDirection="column"
          alignItems="center"
          pb="4"
        >
          <Text>
            Chart Title
          </Text>

          <BarChart />
        </Flex>


      </Flex>



    </GridItem >
  )
}

export default Admin