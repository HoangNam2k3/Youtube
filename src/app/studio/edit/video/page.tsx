'use client';

import Describe from '@/components/Describe';
import { getCategories } from '@/service/category';
import VideoService from '@/service/video';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const UpdateVideo = () => {
    const searchParams = useSearchParams();
    const [videoData, setVideoData] = useState<Video | null>(null);
    const [categories, setCategory] = useState<Category[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const video_id = searchParams.get('videoId');
            if (video_id) {
                const category_list = await getCategories();
                const videoRes = await VideoService.getVideoById({ video_id });
                setCategory(category_list);
                setVideoData(videoRes);
            }
        };
        fetchData();
    }, []);

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
    const handleUpdate = async () => {
        if (videoData) {
            try {
                const respond = await VideoService.updateChannelVideo({ video: videoData });
                if (respond) window.location.reload();
            } catch (error) {
                toast('Update fail');
            }
        }
    };
    return (
        <div>
            <div className="sticky top-16 h-12 border-b flex justify-end pb-2 gap-2">
                <button onClick={() => setVideoData(videoData)} className="text-xl px-5 text-gray-500">
                    Cancel
                </button>
                <button className="bg-blue-500 text-xl px-5 rounded-lg text-white" onClick={handleUpdate}>
                    Save
                </button>
            </div>
            <div className="relative flex resize-none max-w-5xl gap-6 mt-3">
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
                            Chọn hoặc tải một hình ảnh lên để thể hiện nội dung trong video của bạn. Hình thu nhỏ hấp
                            dẫn sẽ làm nổi bật video của bạn và thu hút người xem
                        </span>
                        <div className="flex items-center gap-3">
                            <div className="w-44 aspect-video mt-1">
                                <img
                                    src={videoData?.thumbnail}
                                    title="Video image"
                                    className="w-full h-full bg-red-200"
                                />
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
                <div className="min-w-[350px]">
                    <video src={videoData?.url} className="rounded-lg w-full aspect-video" controls title="" />
                    <div className="mt-4 ml-2">
                        <span>{videoData?.title}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateVideo;
