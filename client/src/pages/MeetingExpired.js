import React from 'react'
import '../styles/MeetingLinkExpired.css';
import { Link } from 'react-router-dom';
import { GridItem } from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';

const MeetingExpired = () => {

    const { auth } = useAuth();

    return (
        <GridItem colSpan={6} >
            <div className="link-expired-container h-screen py-1 bg-primary">
                <h1>Meeting Expired</h1>
                <p>The Scheduled Meeting Has Expired.</p>
                <Link to={auth.role === "PATIENT" ? "/PatientMeetings" : "/DoctorMeetings"} className="home-btn">Go to Meetings Page</Link>
            </div>
        </GridItem>

    )
}

export default MeetingExpired
