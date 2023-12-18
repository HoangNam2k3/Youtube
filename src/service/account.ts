import axios, { AxiosResponse } from 'axios';

const DOMAIN = 'https://localhost:7196/api/User';

interface UserCredentials {
    email: string;
    password: string;
}

class UserService {
    private domain: string;

    constructor() {
        this.domain = DOMAIN;
    }

    async signIn({ email, password }: UserCredentials): Promise<any> {
        try {
            const response: AxiosResponse<any> = await axios.post(`${this.domain}/login`, null, {
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

    async signUp({ username = '', email = '', password = '' }): Promise<any> {
        try {
            const response: AxiosResponse<any> = await axios.post(this.domain, {
                username: username.toString(),
                email: email.toString(),
                password: password.toString(),
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default new UserService();
