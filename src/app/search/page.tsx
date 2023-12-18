'use client';
import React, { useEffect, useState } from 'react';
import DefaultLayout from '../DefaultLayout';
import VideoService from '@/service/video';
import ChannelService from '@/service/channel';
import VideoCard from '@/components/VideoCard';
import { useSearchParams } from 'next/navigation';

const Search = () => {
    const searchParams = useSearchParams();

    const [videos, setVideos] = useState<Video[] | null>(null);
    const [channels, setChannels] = useState<Channel[] | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Lấy list video
                const query = searchParams.get('query');
                const fetchedVideos = (await VideoService.searchVideo({ query })) as Video[];
                if (fetchedVideos) {
                    setVideos(fetchedVideos);
                }
                // lấy list user_id duy nhất từ tất cả video
                const uniqueChannelIds = Array.from(new Set(fetchedVideos.map((video: Video) => video.channel_id)));
                // Lấy thông tin channel cho từng channel_id
                const fetchedChannels = await Promise.all(
                    uniqueChannelIds.map(async (channel_id) => {
                        const channel = await ChannelService.getChannelById({ channel_id });
                        return channel;
                    }),
                );
                setChannels(fetchedChannels);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);
    return (
        <DefaultLayout>
            {videos ? (
                <div className="max-w-7xl mx-auto mt-3">
                    <div className="w-full flex-col flex gap-3 justify-center px-4">
                        {videos &&
                            channels &&
                            videos.map((video, index) => (
                                <VideoCard
                                    video={video}
                                    channel={
                                        channels.find((channel) => channel?.channel_id === video.channel_id) as Channel
                                    }
                                    key={index}
                                    isRow
                                    videoStyle="w-[240px] md:w-[360px]"
                                />
                            ))}
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center">
                    <img
                        // className="w-full"
                        src="/issue-cannot-filter-by-playlist-on-youtube-v0-lfotewibrzca1.webp"
                        alt=""
                    />
                </div>
            )}
        </DefaultLayout>
    );
};

export default Search;
