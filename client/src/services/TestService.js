import React from 'react'
import axios from '../constants/axios'

// this is not used anywhere, this is the format of returning from unautheticated axios instance
// use this format to create a new service for unauthenticated requests
const TestService = () => {

    const TestService = async (url, data) => {
        try {
            // used the open (unautheticated) axios instance
            const response = await axios.get(
                url,
                data, {
                    headers: { 'Content-Type': 'application/json' }, // or any header type you want to send
                    withCredentials: true
                }
            );

            if (response.status === 200) {
                return {
                    success: true,
                    response: response.data
                };
            } else {
                throw new Error('Unhandled Exception');
            }
        } catch (e) {
            return {
                success: false,
                msg: e.toString()
            };
        }
    };
}

export default TestService
