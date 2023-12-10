import axios from 'axios';

const DOMAIN = 'https://localhost:7196/api/Channel';
export async function getChannelById({ channel_id }: { channel_id: any }) {
    try {
        const response = await axios.get(`${DOMAIN}/${channel_id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
