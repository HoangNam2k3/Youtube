import axios from 'axios';
import { Domain } from 'domain';

const DOMAIN = 'https://localhost:7196/api/Video';
class VideoService {
    private domain: string;
    constructor() {
        this.domain = DOMAIN;
    }
    async getAllVideo(): Promise<any> {
        try {
            const response = await axios.get(this.domain, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async getVideoById({ video_id }: { video_id: any }): Promise<any> {
        try {
            const response = await axios.get(`${this.domain}/${video_id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async getVideoByChannelId({ channel_id }: { channel_id: any }): Promise<any> {
        try {
            const response = await axios.get(`${this.domain}/channel/${channel_id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async getVideoByCategoryId({ category_id }: { category_id: any }): Promise<any> {
        try {
            const response = await axios.get(`${this.domain}/category?category_id=${category_id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async searchVideo({ query }: { query: any }): Promise<any> {
        try {
            const response = await axios.post(`${this.domain}/search?query=${query}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async createVideo({ videoData }: { videoData: Video }): Promise<any> {
        try {
            const response = await axios.post(this.domain, videoData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async updateChannelVideo({ video }: { video: Video }): Promise<any> {
        try {
            const response = await axios.put(this.domain, video);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateVideoView({ video_id }: { video_id: any }): Promise<any> {
        try {
            const response = await axios.patch(`${this.domain}/view/update/${video_id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async deleteVideo({ video_id }: { video_id: any }): Promise<any> {
        try {
            const response = await axios.delete(`${this.domain}?id=${video_id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
export default new VideoService();

// async getAllVideo({ numberOfVideos }: { numberOfVideos: number }): Promise<any> {
//     try {
//         const response = await axios.get(this.domain, {
//             params: { numberOfVideos: numberOfVideos },
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// }
