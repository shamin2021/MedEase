import React, { useState } from 'react';
import { FiHome, FiVideo, FiCalendar, FiSettings } from 'react-icons/fi'; 
import NavItem from '../NavItem';

function Navigation() {
    const [activeNavItem, setActiveNavItem] = useState('Dashboard'); 

    const handleNavItemClick = (title) => {
        setActiveNavItem(title);
    };

    return (
        <div>
            <NavItem
                navSize={navSize}
                icon={FiHome}
                title="Dashboard"
                href={"/Doctor"}
                active={activeNavItem === 'Dashboard'}
                onClick={() => handleNavItemClick('Dashboard')}
            />
            <NavItem
                navSize={navSize}
                icon={FiHome}
                title="HCI"
                href={"/DoctorHLC"}
                active={activeNavItem === 'HCI'}
                onClick={() => handleNavItemClick('HCI')}
            />
            <NavItem
                navSize={navSize}
                icon={FiHome}
                title="Patients"
                href={"/DoctorPatient"}
                active={activeNavItem === 'Patients'}
                onClick={() => handleNavItemClick('Patients')}
            />
            <NavItem
                navSize={navSize}
                icon={FiVideo}
                title="Meetings"
                href={"/DoctorMeetings"}
                active={activeNavItem === 'Meetings'}
                onClick={() => handleNavItemClick('Meetings')}
            />
            <NavItem
                navSize={navSize}
                icon={FiCalendar}
                title="Availability"
                href={"/DoctorAvailability"}
                active={activeNavItem === 'Availability'}
                onClick={() => handleNavItemClick('Availability')}
            />
            <NavItem
                navSize={navSize}
                icon={FiSettings}
                title="Settings"
                href={"/DoctorSetting"}
                active={activeNavItem === 'Settings'}
                onClick={() => handleNavItemClick('Settings')}
            />
        </div>
    );
}

export default Navigation;
