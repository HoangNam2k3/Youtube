'use client';
import React, { useEffect, useState } from 'react';

import VideoCard from '@/components/VideoCard';
import Button from '@/components/Button';
import DefaultLayout from './DefaultLayout';
import VideoService from '@/service/video';
import ChannelService from '@/service/channel';
import { getCategories } from '@/service/category';

export default function Home() {
    const [videos, setVideos] = useState<Video[] | null>(null);
    const [channels, setChannels] = useState<Channel[] | null>(null);
    const [categories, setCategories] = useState<Category[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { fetchedVideos, fetchedChannels, categoryList } = await getAllData();

                setVideos(fetchedVideos);
                setChannels(fetchedChannels);
                setCategories(categoryList);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    const fetchDataByCriteria = async (videosPromise: Promise<Video[]>, criteria: string) => {
        try {
            const fetchedVideos = await videosPromise;
            const uniqueChannelIds = Array.from(new Set(fetchedVideos.map((video: Video) => video.channel_id)));

            const fetchedChannels = await Promise.all(
                uniqueChannelIds.map(async (channel_id) => {
                    const channel = await ChannelService.getChannelById({ channel_id });
                    return channel;
                }),
            );

            return { fetchedVideos, fetchedChannels };
        } catch (error) {
            console.error(`Error fetching videos by ${criteria}: `, error);
            throw error; // Re-throw the error to handle it outside
        }
    };

    const getAllData = async () => {
        try {
            const categoryList = await getCategories();
            const fetchedVideos = await VideoService.getAllVideo();
            const { fetchedVideos: videosData, fetchedChannels: channelsData } = await fetchDataByCriteria(
                fetchedVideos,
                'all',
            );

            return { fetchedVideos: videosData, fetchedChannels: channelsData, categoryList };
        } catch (error) {
            console.error('Error fetching all data: ', error);
            throw error; // Re-throw the error to handle it outside
        }
    };

    const handleGetByCategory = async (category_id: any) => {
        try {
            const fetchedVideos = await VideoService.getVideoByCategoryId({ category_id });
            const { fetchedVideos: videosData, fetchedChannels: channelsData } = await fetchDataByCriteria(
                fetchedVideos,
                `category ${category_id}`,
            );

            setVideos(videosData);
            setChannels(channelsData);
        } catch (error) {
            console.error(`Error fetching videos for category ${category_id}: `, error);
        }
    };

    const channelMap = channels
        ? channels.reduce((acc: { [key: string]: Channel }, channel: Channel) => {
              acc[channel.channel_id] = channel;
              return acc;
          }, {})
        : {};
    return (
        <DefaultLayout>
            <div className="px-4">
                <div className="sticky z-10  flex justify-center bg-white pb-2 pt-1 top-14">
                    <div className="flex gap-3 flex-nowrap overflow-x-auto mb-1">
                        {categories &&
                            categories.map((item) => (
                                <Button
                                    onClick={() => handleGetByCategory(item.category_id)}
                                    key={item.category_id}
                                    tit={item.category_name}
                                />
                            ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
                    {videos &&
                        channels &&
                        videos.map((video, index) => (
                            <VideoCard key={index} video={video} channel={channelMap[video.channel_id]} />
                        ))}
                </div>
            </div>
        </DefaultLayout>
    );
}
