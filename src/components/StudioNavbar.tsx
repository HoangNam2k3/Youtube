'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiBookAlt, BiBrush, BiCategoryAlt } from 'react-icons/bi';

import { useChannelLocalStorageData } from '@/context/store';

const StudioNavbar = () => {
    // State
    const pathname = usePathname();
    const channelLocal = useChannelLocalStorageData();

    useEffect(() => {}, [channelLocal]);
    // Render
    return (
        <div className="sticky top-14 h-full w-16 lg:w-64 border-r">
            <div className="flex items-center flex-col my-6">
                <img
                    className="w-8 h-8 lg:w-28 lg:h-28 object-cover rounded-full"
                    src={channelLocal?.avatar ? channelLocal?.avatar : '/unnamed.png'}
                    alt={channelLocal?.channel_name}
                />
                <div className="hidden lg:block text-sm">
                    <span className="font-semibold">Kênh của bạn</span>
                    <h4>{channelLocal?.channel_name}</h4>
                </div>
            </div>
            <div className="px-5 flex flex-col">
                {ITEMS.map((item, index) => {
                    const isActive = item.to == pathname;
                    return (
                        <Link
                            key={index}
                            href={item.to}
                            className={`${
                                isActive ? 'text-red-700' : 'text-inherit'
                            } flex flex-row items-center py-3 gap-3`}
                        >
                            <span className="text-2xl">{item.icon}</span>
                            <span className="lg:block hidden text-sm font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default StudioNavbar;
const ITEMS = [
    {
        to: '/studio',
        name: 'Trang tổng quan',
        icon: <BiCategoryAlt />,
    },
    {
        to: '/studio/uploads',
        name: 'Nội dung',
        icon: <BiBookAlt />,
    },
    {
        to: '/studio/edit',
        name: 'Tùy chỉnh',
        icon: <BiBrush />,
    },
];
