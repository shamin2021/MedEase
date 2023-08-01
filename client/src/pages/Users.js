import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosMethods from "../hooks/useAxiosMethods";
import useAuth from "../hooks/useAuth";

const Users = () => {
    const [users, setUsers] = useState();
    const { setAuth, setPersist } = useAuth();

    const { get, post } = useAxiosMethods();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        try {
            get('/Home/users', setUsers);
        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }

    }, [])

    const handleLogout = async () => {

        try {
            await post('/auth/logout', null, setAuth);
            setPersist(false);
            navigate('/login');

        } catch (err) {
            console.error(err);
        }
    };

        return (
            <article>
                <h2>Users List</h2>
                <br />
                <button onClick={() => handleLogout()}>Logout</button>
                <br />
            </article>
        );

}

export default Users;