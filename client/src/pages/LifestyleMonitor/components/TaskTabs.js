import { Flex, Link } from '@chakra-ui/react'
import React from 'react'

const tabs = [
    {
        name: 'All',
        link: '#all'
    },
    {
        name: 'Diet',
        link: '#diet'
    },
    {
        name: 'Exercise',
        link: '#exercise'
    },
    {
        name: 'Checkup',
        link: '#checkup'
    }
]

const TaskTabs = () => {
    return (
        <Flex
            align='center'
            me='20px'
            ms='24px'
            mt='20px'>

            {tabs.map((tab, index) => (
                <Link
                    href={tab.link}
                    key={index}
                    fontSize='sm'
                    fontWeight='600'
                    lineHeight='100%'
                    px='20px'
                    py='10px'
                    color='secondaryGray.500'
                    _hover={{
                        color: 'secondaryGray.900',
                        background: '#c7d2fe',
                        textDecoration: 'none',
                        borderRadius: '10px'
                    }}
                    _focus={{
                        color: 'secondaryGray.900',
                    }}
                    mr='20px'>
                    {tab.name}
                </Link>
            ))}
        </Flex>
    )
}

export default TaskTabs