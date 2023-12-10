export const user: User = {
    user_id: 1,
    name: 'example user',
    username: 'example_user',
    email: 'user@example.com',
    password: 'hashed_and_encoded_password',
    avatar: '/meme-meo-8.webp',
    background: '/avatar-dep-2.jpg',
    description:
        '"Cuộc sống không phải là việc đợi chờ mưa ngừng, mà là việc học cách vui mừng khi còn mưa." - Unknown \nÝ nghĩa: Câu nói này nhấn mạnh tầm quan trọng của việc chấp nhận và tận hưởng cuộc sống dù trong những thời kỳ khó khăn. Thay vì chờ đợi những điều tốt đẹp, chúng ta nên học cách tìm niềm vui và hạnh phúc ngay cả khi gặp khó khăn. Cuộc sống có thể thay đổi, nhưng tinh thần lạc quan và sẵn sàng vượt qua khó khăn là chìa khóa để sống một cuộc sống có ý nghĩa.',
    created_at: new Date(),
};

export const video: Video = {
    video_id: 1,
    user_id: 1,
    title: 'Example Video',
    description:
        '"Cuộc sống không phải là việc đợi chờ mưa ngừng, mà là việc học cách vui mừng khi còn mưa." - Unknown \nÝ nghĩa: Câu nói này nhấn mạnh tầm quan trọng của việc chấp nhận và tận hưởng cuộc sống dù trong những thời kỳ khó khăn. Thay vì chờ đợi những điều tốt đẹp, chúng ta nên học cách tìm niềm vui và hạnh phúc ngay cả khi gặp khó khăn. Cuộc sống có thể thay đổi, nhưng tinh thần lạc quan và sẵn sàng vượt qua khó khăn là chìa khóa để sống một cuộc sống có ý nghĩa.',
    video_url: '/english.mp4',
    views: 100,
    created_at: new Date(),
};

export const video1: Video = {
    video_id: 2,
    user_id: 1,
    title: 'Vieod Video',
    description:
        '"Cuộc sống không phải là việc đợi chờ mưa ngừng, mà là việc học cách vui mừng khi còn mưa." - Unknown \nÝ nghĩa: Câu nói này nhấn mạnh tầm quan trọng của việc chấp nhận và tận hưởng cuộc sống dù trong những thời kỳ khó khăn. Thay vì chờ đợi những điều tốt đẹp, chúng ta nên học cách tìm niềm vui và hạnh phúc ngay cả khi gặp khó khăn. Cuộc sống có thể thay đổi, nhưng tinh thần lạc quan và sẵn sàng vượt qua khó khăn là chìa khóa để sống một cuộc sống có ý nghĩa.',
    video_url: '/english.mp4',
    views: 1000,
    created_at: new Date(),
};
