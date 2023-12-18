'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import DefaultLayout from '@/app/DefaultLayout';
import VideoCard from '@/components/VideoCard';
import ChannelService from '@/service/channel';
import VideoService from '@/service/video';

const Watch = () => {
    // State
    const searchParams = useSearchParams();
    const [targetVideo, setTargetVideo] = useState<Video | null>(null);
    const [fetchedChannel, setFetchedChannel] = useState<Channel | null>(null);

    const [videos, setVideos] = useState<Video[] | null>(null);
    const [channels, setChannels] = useState<Channel[] | null>(null);
    const video_id = searchParams.get('video_id');
    useEffect(() => {
        const fetchData = async () => {
            if (video_id) {
                const fetchedVideo = (await VideoService.getVideoById({ video_id })) as Video;
                if (fetchedVideo) {
                    setTargetVideo(fetchedVideo);
                    const channel = (await ChannelService.getChannelById({
                        channel_id: fetchedVideo.channel_id,
                    })) as Channel;
                    setFetchedChannel(channel);
                }
            }
            try {
                // Lấy list video
                let fetchedVideos = (await VideoService.getAllVideo()) as Video[];
                if (fetchedVideos) {
                    fetchedVideos = fetchedVideos.filter((video) => video.video_id !== Number(video_id));
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
    }, [video_id]);

    // Render
    return (
        <DefaultLayout>
            <div className="px-4 pt-4">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                        <div className="min-w-[170px] rounded-lg overflow-hidden object-cover relative aspect-video">
                            <video
                                className="absolute top-0 left-0 w-full h-full"
                                src={targetVideo?.url}
                                title="video player"
                                poster={targetVideo?.thumbnail ? targetVideo.thumbnail : ''}
                                controls
                                autoPlay
                            />
                        </div>
                        <div>
                            <div className="flex flex-col">
                                <div className="my-4">
                                    <h4 className="text-xl font-bold line-clamp-2">{targetVideo?.title}</h4>
                                </div>
                                <div className="flex items-center flex-row">
                                    <Link
                                        href={`/${fetchedChannel?.channel_id}/channel`}
                                        className="w-9 h-9 rounded-full overflow-hidden mr-3"
                                    >
                                        <img
                                            className="w-full h-full object-cover"
                                            src={fetchedChannel?.avatar}
                                            alt={fetchedChannel?.channel_name}
                                            loading="lazy"
                                        />
                                    </Link>
                                    <h3 className="line-clamp-1 text-lg font-semibold">
                                        {fetchedChannel?.channel_name}
                                    </h3>
                                </div>
                                <div className="bg-[#f2f2f2] rounded-lg my-4">
                                    <div className="p-3">
                                        <div className="inline-flex font-semibold">
                                            <div className="relative mr-3">
                                                <span>{targetVideo?.views} view</span>
                                                <span className="dot" />
                                            </div>
                                            <span>
                                                <span>
                                                    {targetVideo?.upload_date &&
                                                        new Date(targetVideo.upload_date).toLocaleDateString()}
                                                </span>
                                            </span>
                                        </div>
                                        <div className="text-sm">
                                            <pre className="whitespace-pre-wrap">{targetVideo?.description}</pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-[345px] xl:w-[425px] flex-col flex gap-2">
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
                                />
                            ))}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Watch;
