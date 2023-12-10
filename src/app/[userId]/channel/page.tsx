'use client';
import React, { useState } from 'react';

import { BiChevronRight, BiInfoCircle, BiSolidMoviePlay, BiTrendingUp, BiX } from 'react-icons/bi';

import Button from '@/components/Button';
import VideoCard from '@/components/VideoCard';
import Overlay from '@/components/Overlay';
import { user, video } from '@/data';

const Channel = () => {
    const [showOverlay, setShowOverlay] = useState(false);

    const handleOverlayClose = () => {
        setShowOverlay(false);
    };

    const InfoItem = ({ icon, text }: { icon: React.ReactElement; text: React.ReactNode }) => (
        <div className="flex items-center gap-2">
            {icon && React.cloneElement(icon, { className: 'text-2xl' })}
            <span>{text}</span>
        </div>
    );
    return (
        <>
            <div className="max-w-7xl w-full mx-auto">
                <div className="px-4">
                    <img
                        className="w-full xl:max-h-52 lg:max-h-44 md:max-h-32 max-h-28 object-cover rounded-2xl"
                        src={user.background}
                        alt=""
                    />
                    <div className="mt-2 py-5 flex items-center gap-3 border-b">
                        <div>
                            <img
                                className="w-40 h-40 object-cover rounded-full"
                                src={user.avatar}
                                alt={user.username}
                            />
                        </div>
                        <div className="flex-1 max-w-2xl">
                            <h4 className="text-2xl font-bold">{user.name}</h4>
                            <div className="flex">
                                <div className="relative mr-3">
                                    <p>@{user.username}</p>
                                    <span className="dot" />
                                </div>
                                <span className="">33 videos</span>
                            </div>
                            <div onClick={() => setShowOverlay(true)} className="relative cursor-pointer mt-2">
                                <p className="line-clamp-1 pr-2">{user.description}</p>
                                <span className="absolute right-0 top-1/2 -translate-y-1/2">
                                    <BiChevronRight className="text-2xl" />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex py-2 gap-3 flex-nowrap overflow-x-auto">
                        {data.map((item, ind) => (
                            <Button key={ind} tit={item.name} />
                        ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-4">
                        {[1, 2, 23, 4, 5].map((it) => (
                            <VideoCard video={video} user={user} key={it} />
                        ))}
                    </div>
                </div>
            </div>
            {showOverlay && (
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
                                <pre className="whitespace-pre-wrap">{user.description}</pre>
                            </div>
                            <div className="mt-4">
                                <h5 className="font-bold text-xl">Chi tiết về kênh</h5>
                                <div className="flex flex-col mt-3 gap-4">
                                    <InfoItem icon={<BiSolidMoviePlay />} text="184 video" />
                                    <InfoItem icon={<BiTrendingUp />} text="184 lượt xem" />
                                    <InfoItem
                                        icon={<BiInfoCircle />}
                                        text={`Đã tham gia ${user.created_at.toLocaleDateString()}`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Overlay>
            )}
        </>
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
