import axios from "../constants/axios";


export async function RegisterUser(username, password, setErrMsg, setSuccess, setUser, setPwd, setMatchPwd, errRef) { 
    try {
            const response = await axios.post('/auth/register',
                JSON.stringify({ username: username, password: password }),
                {
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            setUser('');
            setPwd('');
            setMatchPwd('');
        
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
}