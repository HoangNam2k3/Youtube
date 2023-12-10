import { removeLocalData } from '@/utils/helper';
import axios from 'axios';

const DOMAIN = 'https://localhost:7196/api/User';

export async function signIn({ email = '', password = '' }) {
    try {
        const response = await axios.post(`${DOMAIN}/login`, null, {
            params: {
                email: email.toString(),
                password: password.toString(),
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function signUp({ username = '', email = '', password = '' }) {
    try {
        const response = await axios.post(DOMAIN, {
            username: username.toString(),
            email: email.toString(),
            password: password.toString(),
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}
