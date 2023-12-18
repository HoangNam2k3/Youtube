'use client';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { useChannelLocalStorageData } from '@/context/store';
import ChannelService from '@/service/channel';

const Edit = () => {
    // State & ref
    const channelLocal = useChannelLocalStorageData();
    const fileInputRefs = {
        avatar: useRef<HTMLInputElement>(null),
        background: useRef<HTMLInputElement>(null),
    };
    const [channel, setChannel] = useState<Channel | null>(null);

    useEffect(() => {
        setChannel(channelLocal);
    }, [channelLocal]);

    // Action
    const handleIconClick = (type: 'avatar' | 'background') => {
        if (fileInputRefs[type]?.current) {
            if (type === 'avatar') {
                fileInputRefs.avatar.current?.click();
            } else {
                fileInputRefs.background.current?.click();
            }
        }
    };
    const handleDeleteClick = (type: 'avatar' | 'background') => {
        setChannel(
            (prevChannel) =>
                ({
                    ...prevChannel,
                    [type]: '',
                } as Channel),
        );
    };

    const handleFileChange = (type: 'avatar' | 'background', event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFile = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                if (e.target) {
                    const image = e.target.result as string;
                    switch (type) {
                        case 'avatar':
                            setChannel({
                                ...channel,
                                avatar: image,
                            } as Channel);
                            break;
                        case 'background':
                            setChannel({
                                ...channel,
                                background: image,
                            } as Channel);
                            break;
                        default:
                            break;
                    }
                }
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleUpdate = async () => {
        if (channel) {
            try {
                const respond = await ChannelService.updateChannel({ channel });
                if (respond) window.location.reload();
            } catch (error) {
                toast('Update fail');
            }
        }
    };

    // Render
    interface ImageProps {
        title: string;
        desc: string;
        src: string;
        handleIconClick: () => void;
        handleDeleteClick: () => void;
        handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        type: 'avatar' | 'background';
    }
    const RenderImage = ({
        title,
        desc,
        src,
        handleIconClick,
        handleDeleteClick,
        handleFileChange,
        type,
    }: ImageProps) => (
        <div>
            <h5>{title}</h5>
            <span className="text-sm">{desc}</span>
            <div className="flex items-center">
                <div className="flex flex-col items-center w-[290px] my-4">
                    <img
                        src={src ? src : '/unnamed.png'}
                        loading="lazy"
                        alt="Avatar"
                        className="w-36 h-36 rounded-full object-cover"
                    />
                </div>
                <div className="flex-1 max-w-[350px]">
                    <span className="text-xs">
                        Bạn nên dùng ảnh có độ phân giải tối thiểu 98 x 98 pixel và có kích thước tối đa 4 MB. Hãy dùng
                        tệp PNG hoặc GIF (không dùng ảnh động). Nhớ đảm bảo hình ảnh của bạn tuân thủ Nguyên tắc cộng
                        đồng của YouTube
                    </span>
                    <div className="flex gap-4 text-blue-500 font-semibold mt-4">
                        <button onClick={handleIconClick}>Thay đổi</button>
                        <input
                            title="Image"
                            className="hidden"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            ref={fileInputRefs[type]}
                        />
                        <button onClick={handleDeleteClick}>Xóa</button>
                    </div>
                </div>
            </div>
        </div>
    );
    return (
        <div>
            <div className="sticky top-16 h-12 border-b flex bg-white justify-end pb-2 gap-2">
                <button onClick={() => setChannel(channelLocal)} className="text-xl px-5 text-gray-500">
                    Cancel
                </button>
                <button className="bg-blue-500 text-xl px-5 rounded-lg text-white" onClick={handleUpdate}>
                    Save
                </button>
            </div>
            <div className="max-w-4xl flex gap-6 flex-col mt-3">
                <div>
                    <h5>Tên</h5>
                    <input
                        defaultValue={channel?.channel_name}
                        title="Name"
                        className="border mt-2 outline-blue-300 w-full rounded px-4 py-2"
                        onChange={(e) => setChannel({ ...channel, channel_name: e.target.value } as Channel)}
                    />
                </div>
                <div>
                    <h5>Tên người dùng</h5>
                    <input
                        defaultValue={channel?.channel_name}
                        title="Username"
                        className="border mt-2 outline-blue-300 w-full rounded px-4 py-2"
                    />
                </div>
                <div>
                    <h5>Thông tin mô tả</h5>
                    <div
                        contentEditable
                        placeholder="Giới thiệu người xem về kênh của bạn. Nội dung mô tả sẽ xuất hiện trong phần Giới thiệu kênh, trong kết quả tìm kiếm và tại các vị trí khác"
                        className="border mt-2 outline-blue-300 overflow-y-auto w-full min-h-[100px] max-h-[680px] rounded px-4 py-2"
                        defaultValue={channel?.description}
                    />
                </div>
                <RenderImage
                    title="Ảnh"
                    desc="Ảnh hồ sơ sẽ xuất hiện cùng với kênh của bạn trên YouTube tại những vị trí như bên cạnh bình luận và video của bạn"
                    src={channel?.avatar ? channel?.avatar : ''}
                    handleIconClick={() => handleIconClick('avatar')}
                    handleDeleteClick={() => handleDeleteClick('avatar')}
                    handleFileChange={(e) => handleFileChange('avatar', e)}
                    type="avatar"
                />
                <RenderImage
                    title="Hình ảnh biều ngữ"
                    desc="Hình ảnh này sẽ xuất hiện ở phần đầu kênh của bạn"
                    src={channel?.background ? channel?.background : ''}
                    handleIconClick={() => handleIconClick('background')}
                    handleDeleteClick={() => handleDeleteClick('background')}
                    handleFileChange={(e) => handleFileChange('background', e)}
                    type="background"
                />
            </div>
        </div>
    );
};

export default Edit;
