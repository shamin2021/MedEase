import axios from '../constants/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {

    const { setAuth } = useAuth();

    return async () => {
        console.log("Token Refreshed");
        const response = await axios.get('/auth/refreshToken', {
            withCredentials: true
        });
        setAuth(response?.data);
        return response.data.access_token;
    };
};

export default useRefreshToken; 