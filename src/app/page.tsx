'use client';
import React, { useEffect, useState } from 'react';
import VideoCard from '@/components/VideoCard';
import Button from '@/components/Button';
import { user, video, video1 } from '@/data';
import DefaultLayout from './DefaultLayout';
import { getAllVideo } from '@/lib/video';
import { getChannelById } from '@/lib/channel';

export default function Home() {
    const [videos, setVideos] = useState<Video[] | null>(null);
    const [channels, setChannels] = useState<Channel[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Lấy danh sách video
                const fetchedVideos = await getAllVideo();

                setVideos(fetchedVideos);

                // Lấy danh sách user_id duy nhất từ tất cả video
                const uniqueChannelIds = Array.from(new Set(fetchedVideos.map((video: Video) => video.channel_id)));

                // Lấy thông tin kênh cho từng channel_id
                const fetchedChannels = await Promise.all(
                    uniqueChannelIds.map(async (channel_id) => {
                        const channel = await getChannelById({ channel_id });
                        return channel;
                    }),
                );
                console.log('videos', fetchedVideos);
                console.log('channel', fetchedChannels);

                setChannels(fetchedChannels);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <DefaultLayout>
            <div className="px-4">
                <div className="sticky z-10  flex justify-center bg-white pb-2 pt-1 top-14">
                    <div className="flex gap-3 flex-nowrap overflow-x-auto mb-1">
                        {data.map((item, index) => (
                            <Button key={index} tit={item.name} />
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
                    {videos &&
                        channels &&
                        videos.map((video, index) => (
                            <VideoCard
                                video={video}
                                channel={channels.find((channel) => channel?.channel_id === video.channel_id)}
                                key={index}
                            />
                        ))}
                </div>
            </div>
        </DefaultLayout>
    );
}

const data = [
    {
        name: 'Giải trí',
    },
    {
        name: 'Âm nhạc',
    },
    {
        name: 'Âm nhạc',
    },
    {
        name: 'Giải trí',
    },
    {
        name: 'Âm nhạc',
    },
    {
        name: 'Giải trí',
    },
    {
        name: 'Âm nhạc',
    },
    {
        name: 'Âm nhạc',
    },
    {
        name: 'Giải trí',
    },
];
