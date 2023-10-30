import { Outlet, useLocation } from 'react-router-dom'

import NavBar from './NavBar';
import Footer from './Footer'
import React from "react";
import useAuth from '../hooks/useAuth';
import HLCSidebar from './HLC/HLCSidebar';
import PatientSidebar from './Patient/PatientSidebar';
import DoctorSideBar from './Doctor/DoctorSideBar';
import AdminSidebar from './Admin/AdminSidebar';
import { Grid, GridItem, SimpleGrid } from '@chakra-ui/react'

const Layout = () => {

    const { auth } = useAuth();
    const location = useLocation();

    const sideBarHiddenPaths = [
        '/',
        '/home',
        '/register',
        '/login',
        '/forgot-password',
        '/unauthorized',
        '/test-components',
        '/loading',
        '/findHLC',
        '/about-us',
        '/contact-us'
    ];

    const layoutHiddenPaths = [
        '/meeting/:id/:role/:time'
    ]


    const renderSidebar = () => {

        if (auth.role && !sideBarHiddenPaths.includes(location.pathname) && !location.pathname.startsWith('/meeting/') && !location.pathname.startsWith('/reset-password/')) {

            if (auth?.role === "PATIENT") {
                return <PatientSidebar />;
            } else if (auth?.role === "HLC") {
                return <HLCSidebar />;
            } else if (auth?.role === "DOCTOR") {
                return <DoctorSideBar />;
            } else if (auth?.role === "ADMIN") {
                return <AdminSidebar />;
            }
        }
        return null;
    };

    return (
        <main className='App font-poppins bg-primary'>

            {!layoutHiddenPaths.includes(location.pathname) && !location.pathname.startsWith('/meeting/') && !(auth.role === "HLC") && !(auth.role === "DOCTOR") && !(auth.role === "ADMIN") ? (
                <NavBar />
            ) : null}


            {!sideBarHiddenPaths.includes(location.pathname) && !location.pathname.startsWith('/reset-password/') ? (
                <Grid
                    h="calc(100% - 120px)"
                    templateRows='repeat(1, 1fr)'
                    templateColumns='repeat(1, 1fr)'
                    gap={4}
                    mt={1}
                >
                    < GridItem rowSpan={1} colSpan={1}>
                        <SimpleGrid >
                            {renderSidebar()}
                        </SimpleGrid>
                    </GridItem >

                    <Outlet />

                </Grid>
            ) : (
                <Outlet />
            )}

            {!layoutHiddenPaths.includes(location.pathname) && !location.pathname.startsWith('/meeting/') && sideBarHiddenPaths.includes(location.pathname) && location.pathname.startsWith('/reset-password/') ? (
                <Grid><Footer /></Grid>
            ) : null}

        </main>
    )
}

export default Layout