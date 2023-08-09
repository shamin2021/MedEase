import { Outlet } from 'react-router-dom'
import NavBar from './NavBar';
import Footer from './Footer'
import React from "react";

const Layout = () => {
    return (
        <main className='App font-poppins'>
            <NavBar />
            <Outlet />
            <Footer />
        </main>
    )
}

export default Layout
