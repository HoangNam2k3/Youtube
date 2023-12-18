import axios, { AxiosResponse } from 'axios';

const DOMAIN = 'https://localhost:7196/api/Channel';

class ChannelService {
    private domain: string;

    constructor() {
        this.domain = DOMAIN;
    }

    async getChannelById({ channel_id }: { channel_id: any }): Promise<any> {
        try {
            const response: AxiosResponse<any> = await axios.get(`${this.domain}/${channel_id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getChannelByUserId({ user_id }: { user_id: any }): Promise<any> {
        try {
            const response: AxiosResponse<any> = await axios.get(`${this.domain}/user/${user_id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async createChannel({ channel }: { channel: Channel }): Promise<any> {
        try {
            const response: AxiosResponse<any> = await axios.post(this.domain, channel);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateChannel({ channel }: { channel: Channel }): Promise<any> {
        try {
            const response: AxiosResponse<any> = await axios.put(this.domain, channel);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default new ChannelService();
