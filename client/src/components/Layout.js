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

    const unauthorizedPaths = [
        '/',
        '/home',
        '/register',
        '/login',
        '/forgot-password',
        '/reset-password/:token',
        '/unauthorized',
        '/test-components',
    ];


    const renderSidebar = () => {

        if (auth.role && !unauthorizedPaths.includes(location.pathname)) {

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
        <main className='App font-poppins'>
            <NavBar />
            {auth.role && !unauthorizedPaths.includes(location.pathname) ? (
                <Grid
                    h="93vh"
                    templateRows='repeat(7, 1fr)'
                    templateColumns='repeat(7, 1fr)'
                    gap={4}
                    mt={1}

                >
                    < GridItem rowSpan={4} colSpan={1} >
                        <SimpleGrid >
                            {renderSidebar()}
                        </SimpleGrid>
                    </GridItem >

                    <Outlet />
                    
                </Grid>
            ) : (
                <Outlet />
            )}

            {/* </div>
            </div> */}
            <Footer />
        </main>
    )
}

export default Layout