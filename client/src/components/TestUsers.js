import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosMethods from "../hooks/useAxiosMethods";

const TestUsers = () => {
    const [users, setUsers] = useState({users: []}); // have to convert to array to use map function
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [state, setState] = useState(''); // to show the request status
    const [res, setRes] = useState(''); // to show the response from the server 
    const [updateId, setUpdateId] = useState(null); // to identify the specific user first

    // non autheticated request are using a different axios instance, you can see it in the login page or i have created dummy service format in services TestService.js
    // In here we use the private authenticated axios instance
    // for unauthenticated requests (any user can access) create a new file in service folder define axios instance and import it where you
    const { get, post, put, del } = useAxiosMethods(); //imported all the methods from useAxiosMethods (all the requests for authenticated user should follow this pattern )
    const navigate = useNavigate(); //to navigate to another page
    const location = useLocation(); // to get the current location


    const fetchUsers = async () => {
        try {
            get('/Home/getUsers', setUsers);

        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }
    };


    const handleSubmit = async () => {

        try {
            post('/Home/addUser', { firstname, lastname }, setRes);
        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }
    };

    const handleDelete = async (userId) => {

        try {
            del(`/Home/deleteUser/${userId}`, setRes);
            fetchUsers().then();
        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }


    };

    const handleEdit = (userId) => {

        setUpdateId(userId);

        const userToUpdate = users.users.find(user => user.id === userId);
        setFirstname(userToUpdate.firstname);
        setLastname(userToUpdate.lastname);
    };

    const handleUpdate = async () => {
        try {
            const updatedData = { firstname, lastname };
            put(`/Home/updateUser/${updateId}`, updatedData, setRes);;


        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }

    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchUsers();
        };

        fetchData();
    }, []);


    useEffect(() => {
        console.log(users.users); // Logged the users state here
        console.log(res); // Logged the response state here
    }, [users,res]);


    return (
        <article>
            <h2>Users List</h2>
            <br />
            {users.users.length > 0 ? (
                users.users.map(user =>
                    <div key={user.id}>
                        {user.firstname} {user.lastname}
                        <button onClick={() => handleEdit(user.id)}>Edit</button>
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </div>)
            ) : (<p>No users</p>)}
            <br />
            <h2>ADD User</h2>
            <br />

            <form onSubmit={handleSubmit}>
                {state ? <p>{state}</p> : null}
                <label htmlFor="firstname">Firstname:</label>
                <input
                    type="text"
                    id="firstname"
                    autoComplete="off"
                    onChange={(e) => setFirstname(e.target.value)}
                    value={firstname}
                    required
                />
                <label htmlFor="lastname">Lastname:</label>
                <input
                    type="text"
                    id="lastname"
                    onChange={(e) => setLastname(e.target.value)}
                    value={lastname}
                    required
                />
                <button className="mx-auto px-5 py-1 bg-indigo-100">Add</button>
            </form>

            {updateId && (
                <>
                    <h2>Edit User</h2>
                    <form onSubmit={handleUpdate}>
                        {state ? <p>{state}</p> : null}
                        <label htmlFor="editFirstname">Firstname:</label>
                        <input
                            type="text"
                            id="editFirstname"
                            autoComplete="off"
                            onChange={(e) => setFirstname(e.target.value)}
                            value={firstname}
                            required
                        />
                        <label htmlFor="editLastname">Lastname:</label>
                        <input
                            type="text"
                            id="editLastname"
                            onChange={(e) => setLastname(e.target.value)}
                            value={lastname}
                            required
                        />
                        <button>Update</button>
                    </form>
                </>
            )}

            <br />
            <br />
        </article>
    );

}

export default TestUsers;