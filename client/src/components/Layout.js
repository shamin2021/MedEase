import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <main className='App font-poppins'>
            <Outlet />
        </main>
    )
}

export default Layout
