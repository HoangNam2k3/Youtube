'use client';
import React, { useEffect, useState } from 'react';
import { BiChevronRight, BiInfoCircle, BiSolidMoviePlay, BiTrendingUp, BiX } from 'react-icons/bi';

import DefaultLayout from '@/app/DefaultLayout';
import Button from '@/components/Button';
import Overlay from '@/components/Overlay';
import VideoCard from '@/components/VideoCard';
import ChannelService from '@/service/channel';
import VideoService from '@/service/video';

const Channel = ({ params }: { params?: { userId?: string } }) => {
    // State
    const [showOverlay, setShowOverlay] = useState(false);
    const [channelData, setChannelData] = useState<Channel | null>(null);
    const [videosData, setVideosData] = useState<Video[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (params) {
                const channel_id = Number(params.userId);
                const channel = await ChannelService.getChannelById({ channel_id });
                setChannelData(channel);

                const videos = await VideoService.getVideoByChannelId({ channel_id });
                setVideosData(videos);
            }
        };
        fetchData();
    }, [params]);

    // Action
    const handleOverlayClose = () => {
        setShowOverlay(false);
    };
    const calculateTotalViews = (videos: Video[] | null): number => {
        if (!videos) return 0;

        const totalViews = videos.reduce((accumulator, video) => accumulator + video.views, 0);
        return totalViews;
    };
    const totalViews = calculateTotalViews(videosData);
    // Render
    const RenderInfoItem = ({ icon, text }: { icon: React.ReactElement; text: React.ReactNode }) => (
        <div className="flex items-center gap-2">
            {icon && React.cloneElement(icon, { className: 'text-2xl' })}
            <span>{text}</span>
        </div>
    );
    const RenderChannelInfo = (
        <>
            <img
                className="w-full xl:max-h-52 lg:max-h-44 md:max-h-32 max-h-28 object-cover rounded-2xl"
                src={channelData?.background}
                alt=""
                loading="lazy"
            />
            <div className="mt-2 py-5 flex items-center gap-3 border-b">
                <div>
                    <img
                        className="w-40 h-40 object-cover rounded-full"
                        src={channelData?.avatar ? channelData?.avatar : '/unnamed.png'}
                        alt={channelData?.channel_name}
                        loading="lazy"
                    />
                </div>
                <div className="flex-1 max-w-2xl">
                    <h4 className="text-2xl font-bold">{channelData?.channel_name}</h4>
                    <div className="flex">
                        <div className="relative mr-3">
                            <p>@{channelData?.channel_name}</p>
                            <span className="dot" />
                        </div>
                        <span className="">{videosData?.length} videos</span>
                    </div>
                    <div onClick={() => setShowOverlay(true)} className="relative cursor-pointer mt-2">
                        <p className="line-clamp-1 pr-2">{channelData?.description}</p>
                        <span className="absolute right-0 top-1/2 -translate-y-1/2">
                            <BiChevronRight className="text-2xl" />
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
    const RenderOverlayContent = (
        <Overlay isShow={showOverlay} onClose={handleOverlayClose}>
            <div className="max-w-[560px] py-6 px-4 flex flex-col max-h-[787px]">
                <div className="pb-1 flex justify-between items-center">
                    <h5 className="font-bold text-xl">Giới thiệu</h5>
                    <button
                        onClick={handleOverlayClose}
                        className="text-4xl rounded-full hover:bg-[#e5e5e5]"
                        title="Close"
                    >
                        <BiX />
                    </button>
                </div>
                <div className="overflow-y-auto">
                    <div>
                        <pre className="whitespace-pre-wrap">{channelData?.description}</pre>
                    </div>
                    <div className="mt-4">
                        <h5 className="font-bold text-xl">Chi tiết về kênh</h5>
                        <div className="flex flex-col mt-3 gap-4">
                            <RenderInfoItem icon={<BiSolidMoviePlay />} text={`${videosData?.length} video`} />
                            <RenderInfoItem icon={<BiTrendingUp />} text={`${totalViews} lượt xem`} />
                            <RenderInfoItem
                                icon={<BiInfoCircle />}
                                text={`Đã tham gia ${
                                    channelData?.creation_date &&
                                    new Date(channelData?.creation_date).toLocaleDateString()
                                }`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Overlay>
    );
    return (
        <DefaultLayout>
            <div className="max-w-7xl w-full mx-auto">
                <div className="px-4">
                    {RenderChannelInfo}
                    <div className="flex py-2 gap-3 flex-nowrap overflow-x-auto">
                        {data.map((item, ind) => (
                            <Button key={ind} tit={item.name} />
                        ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-4">
                        {videosData &&
                            videosData.map((video) => (
                                <VideoCard video={video} channel={channelData as Channel} key={video.video_id} />
                            ))}
                    </div>
                </div>
            </div>
            {showOverlay && RenderOverlayContent}
        </DefaultLayout>
    );
};

export default Channel;
const data = [
    {
        name: 'Mới nhất',
    },
    {
        name: 'Phổ biến',
    },
    {
        name: 'Cũ nhất',
    },
];
