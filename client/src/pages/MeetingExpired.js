import React from 'react'
import '../styles/MeetingLinkExpired.css';
import { Link } from 'react-router-dom';

const MeetingExpired = () => {
    return (

        <div className="link-expired-container">
            <h1>Meeting Expired</h1>
            <p>The Scheduled Meeting Has Expired.</p>
            <Link to="/meetings" className="home-btn">Go to Meetings Page</Link>
        </div>

    )
}

export default MeetingExpired
