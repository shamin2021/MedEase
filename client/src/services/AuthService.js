import axios from '../constants/axios';

const REGISTER_URL = '/auth/register';
const LOGIN_URL = '/auth/login';

export async function RegisterUser(username, password) {
  try {
    const response = await axios.post(
      REGISTER_URL,
      JSON.stringify({ username, password }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', 
        }, withCredentials: true
      }
    );
    console.log(response?.data);
    console.log(response?.accessToken);
    console.log(JSON.stringify(response));
    return true;
  } catch (err) {
    if (!err?.response) {
      throw new Error('No Server Response');
    } else if (err.response?.status === 409) {
      throw new Error('Username Taken');
    } else {
      throw new Error('Registration Failed');
    }
  }
}

export async function LoginUser(username, password) {
  try {
        const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username, password }),
                {
                  headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*', 
                  },
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
        } catch (err) {
            if (!err?.response) {
               throw new Error('No Server Response');
            } else if (err.response?.status === 400) {
                throw new Error('Missing Username or Password');
            } else if (err.response?.status === 401) {
                throw new Error('Unauthorized');
            } else {
               throw new Error('Login Failed');
            }
        }
}
