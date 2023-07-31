import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosMethods from "../hooks/useAxiosMethods";

const Users = () => {
    const [users, setUsers] = useState();
     
    const { get } = useAxiosMethods();
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

    return (
        <article>
            <h2>Users List</h2>
        </article>
    );
};

export default Users;