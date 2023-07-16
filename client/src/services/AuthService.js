import axios from '../constants/axios';

const REGISTER_URL = '/auth/register';

export async function RegisterUser(username, password) {
  try {
    const response = await axios.post(
      REGISTER_URL,
      JSON.stringify({ username, password }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        },
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
