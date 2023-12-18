import axios from 'axios';

const DOMAIN = 'https://localhost:7196/api/Category';
export const getCategories = async () => {
    try {
        const respond = await axios.get(DOMAIN);
        return respond.data;
    } catch {
        console.log('Get Category fail');
    }
};
