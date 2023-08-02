import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosMethods from "../hooks/useAxiosMethods";

const TestUsers = () => {
    const [users, setUsers] = useState();

    const { get, post, put, del } = useAxiosMethods(); //imported all the methods from useAxiosMethods
    const navigate = useNavigate(); //to navigate to another page
    const location = useLocation(); // to get the current location

    useEffect(() => { 

        try {
            get('/Home/getUsers', setUsers);
        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }

    }, [])

        return (
            <article>
                <h2>Users List</h2>
                <br />
                <br />
            </article>
        );

}

export default TestUsers;