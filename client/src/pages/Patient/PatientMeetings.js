import React, { useState } from 'react'
import { Button, Grid, GridItem } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import Conference from '../../components/Conference'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'

const PatientMeetings = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [showMeeting, setShowMeeting] = useState(false)

    const handleMeeting = async () => {
        setIsLoading(true);

        try {

            await new Promise(resolve => setTimeout(resolve, 2000));
            // const newPath = "/conference/01/doctor/" + new Date().toISOString();
            // navigate(newPath);
            setShowMeeting(true);

        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (

        <Grid
            h="93vh"
            templateRows='repeat(7, 1fr)'
            templateColumns='repeat(7, 1fr)'
            // templateColumns={`repeat(${sidebarWidth == "75px" ? '1, 75px' : '1, 300px'} 6fr)`}
            gap={4}
            mt={1}

        >

            <GridItem colSpan={7} h="15rem">

                {!showMeeting ? (
                    <>
                        <h1>Patient Meeting</h1>
                        <br />

                        <Button
                            rightIcon={<ArrowForwardIcon />}
                            colorScheme='teal'
                            variant='outline'
                            onClick={handleMeeting}
                            loadingText="Joining..."
                            isLoading={isLoading}
                        >
                            Join Meeting
                        </Button>
                    </>

                ) : (

                    <Card>
                        <CardBody>
                            <Conference id={1} user={"doctor"} time={new Date().toISOString()} />
                        </CardBody>
                    </Card>
                )}


            </GridItem>


        </Grid>
    )
}

export default PatientMeetings
