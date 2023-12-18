'use client';
import React, { useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { BiUserCircle, BiSearch, BiArrowBack, BiVideoPlus, BiCaretRightSquare, BiLogOutCircle } from 'react-icons/bi';

import Overlay from './Overlay';
import { removeLocalData } from '@/utils/helper';
import { useChannelLocalStorageData, useLocalStorageData } from '@/context/store';
import ChannelService from '@/service/channel';

const Navbar = () => {
    // State và refs
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const [createdChannel, setCreatedChannel] = useState<Channel | null>(null);
    const [isChannel, setIsChannel] = useState(false);

    const userLocal = useLocalStorageData();
    const channelLocal = useChannelLocalStorageData();

    useEffect(() => {
        const fetchData = async () => {
            if (userLocal) {
                try {
                    setIsLogin(true);
                    if (channelLocal) {
                        setCreatedChannel(channelLocal);
                        setIsChannel(true);
                    } else {
                        setCreatedChannel((prevChannel: Channel | null) => ({
                            ...prevChannel!,
                            user_id: userLocal.user_id,
                            channel_name: userLocal.username,
                        }));
                        setIsChannel(false);
                    }
                } catch (error) {
                    console.error('Invalid JSON format in localStorage:', error);
                }
            }
        };
        fetchData();
    }, [userLocal, channelLocal]);
    useEffect(() => {}, [userLocal]);
    useEffect(() => {}, [channelLocal]);
    // useEffect(() => {
    //     console.log('channelLocal', createdChannel);
    // }, [createdChannel]);

    // Action
    // Xử lý khi người dùng nhấn nút tìm kiếm
    const handleSearchButton = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
        setShow(true);
    };
    // Xử lý đăng xuất
    const handleLogOut = async () => {
        removeLocalData();
        router.push('/accounts/signIn');
    };
    // xử lý chọn ảnh
    const handleIconClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFile = event.target.files[0];
            const reader = new FileReader();
            console.log(event.target.files);

            reader.onload = (e) => {
                if (e.target) {
                    const avatar = e.target.result as string;
                    setCreatedChannel((prevChannel: Channel | null) => ({
                        ...prevChannel!,
                        avatar: avatar,
                    }));
                }
            };

            reader.readAsDataURL(selectedFile);
        }
    };
    // Xử lý khi đóng Overlay
    const handleOverlayClose = () => {
        setShowOverlay(false);
    };
    // Xử lý tạo kênh mới
    const handleCreateChannel = async () => {
        if (createdChannel) {
            try {
                const newChannel = (await ChannelService.createChannel({ channel: createdChannel })) as Channel;
                if (newChannel) {
                    setCreatedChannel(newChannel);
                    setIsChannel(true);
                    handleOverlayClose();
                } else {
                    console.error('Failed to create new channel');
                }
            } catch (error) {
                toast.error('Tạo lỗi, kiểm tra lại!');
                console.error('Error creating new channel:', error);
            }
        }
    };
    // Render
    const RenderLogo = (
        <Link href={'/'}>
            <img className="w-[90px] h-5 mr-9" src="/logo.png" alt="Logo" />
        </Link>
    );

    const RenderSearchButton = (
        <button onClick={handleSearchButton} className="sm:hidden" title="Search">
            <BiSearch className="text-2xl" />
        </button>
    );

    const RenderUser = (
        <button
            onClick={() => router.push('accounts/signIn')}
            className="flex items-center border rounded-full text-blue-400 whitespace-nowrap gap-1 px-2 h-9"
        >
            <BiUserCircle className="text-2xl" />
            <span>Sign in</span>
        </button>
    );

    const RenderAvatar = (
        <div className="flex items-center">
            <Link href={'/studio/uploads'} className="rounded-full p-2 hover:bg-[#e5e5e5]" title="Create">
                <BiVideoPlus className="text-3xl" />
            </Link>
            <Tippy
                // visible
                interactive
                offset={[20, 0]}
                render={() => (
                    <div className="shadow-xl bg-white rounded-xl py-3 z-40 w-[300px]">
                        <div className="flex flex-col">
                            <div className="flex gap-3 pl-4 pr-8 border-b pb-4">
                                <img
                                    className="w-10 h-10 rounded-full"
                                    title="Avatar"
                                    src={isChannel && createdChannel?.avatar ? createdChannel.avatar : '/unnamed.png'}
                                />
                                <div className="leading-5">
                                    <h4 className="line-clamp-1">{userLocal?.username}</h4>
                                    <h4 className="line-clamp-1">{userLocal?.email}</h4>
                                    {isChannel ? (
                                        <Link className="text-blue-400 text-sm py-1" href={'/studio'}>
                                            Đến kênh của bạn
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={() => setShowOverlay(true)}
                                            className="text-blue-400 text-sm py-1"
                                        >
                                            Tạo kênh
                                        </button>
                                    )}
                                </div>
                            </div>
                            {isChannel && (
                                <Link
                                    href={'/studio'}
                                    className="flex items-center mt-2 py-2 pl-4 gap-2 hover:bg-black/5"
                                >
                                    <BiCaretRightSquare className="text-2xl" />
                                    <span>Studio</span>
                                </Link>
                            )}
                            <button
                                onClick={handleLogOut}
                                className="flex items-center py-2 pl-4 gap-2 hover:bg-black/5"
                            >
                                <BiLogOutCircle className="text-2xl" />
                                <span>Đăng xuất</span>
                            </button>
                        </div>
                    </div>
                )}
            >
                <button className="mx-4 rounded-full w-8 h-8 overflow-hidden">
                    <img
                        className="object-cover w-full h-full"
                        alt="avatar"
                        src={isChannel && createdChannel?.avatar ? createdChannel.avatar : '/unnamed.png'}
                    />
                </button>
            </Tippy>
        </div>
    );
    const RenderCreateChannel = (
        <Overlay isShow onClose={handleOverlayClose}>
            <div className="min-w-[730px] p-5">
                <h5 className="text-2xl font-semibold">Cách bạn sẽ xuất hiện</h5>
                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center mb-5 mt-24 gap-4">
                        <img
                            src={`${createdChannel?.avatar ? createdChannel.avatar : '/unnamed.png'}`}
                            className="w-32 h-32 rounded-full object-cover"
                            alt="Avatar"
                        />
                        <button onClick={handleIconClick} className="text-blue-500 text-center text-sm">
                            Tải ảnh lên
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            title="Avatar"
                            className="hidden"
                        />
                    </div>
                    <div className="border flex mb-4 flex-col p-3 rounded w-full max-w-[460px]">
                        <span>Tên</span>
                        <input
                            onChange={(e) =>
                                setCreatedChannel((prevChannel: Channel | null) => ({
                                    ...prevChannel!,
                                    channel_name: e.target.value,
                                }))
                            }
                            className="w-full outline-none py-1 text-lg"
                            title="Name"
                            type="text"
                            defaultValue={userLocal?.username || ''}
                        />
                    </div>
                    <div className="border flex flex-col p-3 rounded w-full max-w-[460px]">
                        <span>Mô tả</span>
                        <textarea
                            onChange={(e) =>
                                setCreatedChannel((prevChannel: Channel | null) => ({
                                    ...prevChannel!,
                                    description: e.target.value,
                                }))
                            }
                            className="w-full h-36 outline-none py-1 text-lg"
                            title="Description"
                        />
                    </div>
                </div>
                <div className="flex gap-5 justify-end font-bold mt-3 mr-3">
                    <button onClick={handleOverlayClose}>Hủy</button>
                    <button onClick={handleCreateChannel}>Lưu</button>
                </div>
            </div>
        </Overlay>
    );
    return (
        <>
            <nav className="z-50 flex justify-between items-center h-14 px-4 sticky bg-white top-0 w-full">
                {!show ? RenderLogo : null}
                {show && (
                    <button className="mr-4" onClick={() => setShow(false)} title="Back">
                        <BiArrowBack className="text-xl" />
                    </button>
                )}
                <form
                    className={`max-w-[720px] ${
                        show ? 'flex' : 'hidden'
                    } sm:flex w-full mx-4 items-center border h-10 rounded-full overflow-hidden`}
                    onSubmit={(e) => {
                        e.preventDefault();
                        router.push(`/search?query=${inputRef.current?.value}`);
                    }}
                >
                    <input
                        ref={inputRef}
                        className="flex-1 pl-4 pr-1 h-full rounded-l-full outline-blue-300"
                        placeholder="Search"
                        type="text"
                    />
                    <button
                        type="submit"
                        title="Search"
                        className="w-20 flex justify-center items-center border-l h-full bg-[#f8f8f8] hover:bg-[#f0f0f0]"
                    >
                        <BiSearch className="text-2xl" />
                    </button>
                </form>
                {!show && (
                    <div className="flex items-center gap-4">
                        {RenderSearchButton}
                        {isLogin ? RenderAvatar : RenderUser}
                    </div>
                )}
            </nav>
            {showOverlay && RenderCreateChannel}
        </>
    );
};

export default React.memo(Navbar);
