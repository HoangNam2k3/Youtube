interface User {
    user_id: number;
    username: string;
    email: string;
    password: string;
    join_date: Date;
}
interface Channel {
    channel_id: number;
    channel_name: string;
    description?: string;
    avatar?: string;
    background?: string;
    creation_date: Date;

    user_id: number;
}
interface Video {
    video_id: number;
    channel_id: number;
    title: string;
    description: string;
    url: string;
    thumbnail?: string;
    views: number;
    upload_date: string;
    category_id?: number;
    // category_id: Category['category_id'];
}

interface Category {
    category_id: number;
    category_name: string;
}
