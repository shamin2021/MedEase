import { Outlet } from 'react-router-dom'
import NavBar from './NavBar';
import Footer from './Footer'
import React from "react";
import useAuth from '../hooks/useAuth';
import HLCSidebar from './HLC/HLCSidebar';
import PatientSidebar from './Patient/PatientSidebar';
import DoctorSideBar from './Doctor/DoctorSideBar';
import AdminSidebar from './Admin/AdminSidebar';

const Layout = () => {

    const { auth } = useAuth();

    const renderSidebar = () => {

        if (auth?.role === "PATIENT") {
            return <PatientSidebar />;
        } else if (auth?.role === "HLC") {
            return <HLCSidebar />;
        } else if (auth?.role === "DOCTOR") {
            return <DoctorSideBar />;
        } else if (auth?.role === "ADMIN") {
            return <AdminSidebar />;
        }
        return null;
    };

    return (
        <main className='App font-poppins'>
            <NavBar />
            <div style={{ display: "flex" }}>
                {renderSidebar()}
                <div style={{ flex: 1 }}>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default Layout
