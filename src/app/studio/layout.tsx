'use client';
import { user } from '@/data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { BiBookAlt, BiBrush, BiCategoryAlt } from 'react-icons/bi';
import DefaultLayout from '../DefaultLayout';

const LayoutStudio = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    return (
        <DefaultLayout>
            <div className="flex border-t">
                <div className="w-16 lg:w-64 border-r">
                    <div className="flex items-center flex-col my-6">
                        <img
                            className="w-8 h-8 lg:w-28 lg:h-28 object-cover rounded-full"
                            src={user.avatar}
                            alt={user.username}
                        />
                        <div className="hidden lg:block text-sm">
                            <span className="font-semibold">Kênh của bạn</span>
                            <h4>{user.name}</h4>
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
                <div className="flex-1 p-5">{children}</div>
            </div>
        </DefaultLayout>
    );
};

export default LayoutStudio;
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
