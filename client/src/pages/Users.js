import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import useAxiosMethods from "../hooks/useAxiosMethods";
import useAxiosPrivate from "../hooks/useAxiosPrivate"


const Users = () => {
    const [users, setUsers] = useState();
     
    // const { get } = useAxiosMethods();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        let isMounted = true;
        const controller = new AbortController();

        const getData = async () => {
            try {
                const response = await axiosPrivate.get('/Home/users', {
                    signal: controller.signal
                });
                isMounted && setUsers(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getData();

        return () => {
            isMounted = false;
            controller.abort();
        }

        // try {
        //     get('/Home/users', setUsers);
        // } catch (err) {
        //     console.error(err);
        //     navigate('/login', { state: { from: location }, replace: true });
        // }

    }, [])

    return (
        <article>
            <h2>Users List</h2>
        </article>
    );
};

export default Users;