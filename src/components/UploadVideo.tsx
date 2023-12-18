'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Describe from './Describe';
import { useChannelLocalStorageData } from '@/context/store';
import VideoService from '@/service/video';
import { getCategories } from '@/service/category';

interface UploadVideoProps {
    url?: string;
    fileName?: string;
    onCloseOverlay: () => void;
}

export const UploadVideo = ({ url = '', fileName = '', onCloseOverlay }: UploadVideoProps) => {
    const title = fileName.split('.').slice(0, -1).join('.');

    const channelLocal = useChannelLocalStorageData();
    const [videoData, setVideoData] = useState<Video | null>(null);
    const [categories, setCategory] = useState<Category[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const category_list = await getCategories();
            setCategory(category_list);
            if (channelLocal) {
                setVideoData({
                    category_id: 1,
                    channel_id: channelLocal.channel_id,
                    title: title,
                    description: '',
                    url: url,
                    thumbnail: '',
                } as Video);
            }
        };

        fetchData();
    }, [channelLocal]);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setVideoData({
            ...videoData,
            category_id: Number(event.target.value),
        } as Video);
    };
    const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setVideoData({
            ...videoData,
            title: event.target.value,
        } as Video);
    };
    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setVideoData({
            ...videoData,
            description: event.target.value,
        } as Video);
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFile = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                if (e.target) {
                    const videoUrl = e.target.result as string;
                    setVideoData({
                        ...videoData,
                        thumbnail: videoUrl,
                    } as Video);
                }
            };
            reader.readAsDataURL(selectedFile);
        }
    };
    const handlePostVideo = async () => {
        if (videoData) {
            if (!videoData.title) {
                toast.error('Tiêu đề không được để trống!');
                return;
            }
            try {
                const respond = await VideoService.createVideo({ videoData });
                if (respond) onCloseOverlay();
            } catch {
                toast.error('Đăng video không thành công!');
                console.log('Upload fail');
            }
        }
    };
    return (
        <div className="relative flex resize-none max-w-5xl gap-6">
            <div className="flex flex-col gap-6 overflow-y-auto">
                <div className="border rounded px-3 py-1">
                    <Describe
                        title="Tiêu đề (bắt buộc)"
                        desc="Tiêu đề hay có thể giúp bạn thu hút người xem. Khi tạo tiêu đề video, bạn nên thêm những từ khóa mà người xem có thể sử dụng khi tìm kiếm video giống như video của bạn."
                    />
                    <textarea
                        onChange={handleTitleChange}
                        placeholder="Thêm tiêu đề để mô tả video của bạn"
                        maxLength={500}
                        className="w-full outline-none min-h-[60px]"
                        value={videoData?.title}
                    />
                </div>
                <div className="border rounded px-3 py-1">
                    <Describe
                        title="Mô tả"
                        desc="Đưa từ khóa vào nội dung mô tả có thể giúp người xem tìm video của bạn dễ dàng hơn thông qua tính năng tìm kiếm. Bạn có thể cung cấp thông tin tổng quan về video và đặt từ khóa ở đầu đoạn mô tả."
                    />
                    <textarea
                        onChange={handleDescriptionChange}
                        placeholder="Giới thiệu về video của bạn cho người xem"
                        className="w-full outline-none min-h-[170px]"
                        value={videoData?.description}
                        maxLength={1000}
                    />
                </div>
                <div>
                    <h5 className="font-semibold">Hình thu nhỏ</h5>
                    <span className="text-sm">
                        Chọn hoặc tải một hình ảnh lên để thể hiện nội dung trong video của bạn. Hình thu nhỏ hấp dẫn sẽ
                        làm nổi bật video của bạn và thu hút người xem
                    </span>
                    <div className="flex items-center gap-3">
                        <div className="w-44 aspect-video mt-1">
                            <img src={videoData?.thumbnail} title="Video image" className="w-full h-full bg-red-200" />
                        </div>
                        <input onChange={handleFileChange} title="Thumbnail" type="file" accept="img/*" />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <h5 className="font-semibold">Danh mục</h5>
                    <span className="text-sm">
                        Thêm video của bạn vào một danh mục để người xem dễ dàng tìm thấy hơn
                    </span>
                    <select
                        value={videoData?.category_id}
                        onChange={handleCategoryChange}
                        title="Category"
                        className="outline-none border p-3 min-w-[312px]"
                    >
                        {categories &&
                            categories.map((item) => (
                                <option key={item.category_id} value={item.category_id}>
                                    {item.category_name}
                                </option>
                            ))}
                    </select>
                </div>
            </div>
            <div>
                <video src={url} className="rounded-lg aspect-video" controls title="" />
                <div className="mt-4 ml-2">
                    <span>{fileName}</span>
                </div>
            </div>
            <div className="fixed right-6 bg-blue-500 bottom-24 rounded">
                <button onClick={handlePostVideo} className="px-4 py-1 text-white font-semibold">
                    Đăng lên
                </button>
            </div>
        </div>
    );
};
