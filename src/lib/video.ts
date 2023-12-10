import axios from 'axios';

const DOMAIN = 'https://localhost:7196/api/Video';
export async function getAllVideo() {
    try {
        const response = await axios.get(DOMAIN, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
export async function getVideoById({ video_id }: { video_id: any }) {
    try {
        const response = await axios.get(`${DOMAIN}/${video_id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
