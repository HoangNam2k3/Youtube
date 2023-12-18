'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { useChannelLocalStorageData } from '@/context/store';
import VideoService from '@/service/video';

interface RenderRowProps {
    index: number;
    isSelected: boolean;
    toggleSelectItem: (index: number) => void;
    video: Video;
}

const Uploads = () => {
    // State
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [videosData, setVideosData] = useState<Video[] | null>(null);
    const channelLocal = useChannelLocalStorageData();

    useEffect(() => {
        const fetchData = async () => {
            if (channelLocal) {
                const videos = (await VideoService.getVideoByChannelId({
                    channel_id: channelLocal.channel_id,
                })) as Video[];
                if (videos) setVideosData(videos);
            }
        };
        fetchData();
    }, [channelLocal]);
    // useEffect(() => {}, [selectedItems]);
    // Action
    const toggleSelectAll = () => {
        const allIndexes = videosData ? videosData.map((_, index) => index) : [];
        const newSelectedItems = selectAll ? [] : allIndexes;
        setSelectedItems(newSelectedItems);
        setSelectAll(!selectAll);
    };

    const toggleSelectItem = (index: number) => {
        const selectedIndex = selectedItems.indexOf(index);
        let newSelectedItems = [...selectedItems];

        if (selectedIndex === -1) {
            newSelectedItems.push(index);
        } else {
            newSelectedItems.splice(selectedIndex, 1);
        }

        setSelectedItems(newSelectedItems);
        if (newSelectedItems.length === videosData?.length) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
    };
    const handleDeleteMany = async () => {
        const confirmation = window.confirm(`Bạn có chắc chắn muốn xóa ${selectedItems.length} video đã chọn?`);
        if (confirmation) {
            const remainingItems = [...selectedItems];

            for (let i = remainingItems.length - 1; i >= 0; i--) {
                const videoToDelete = videosData && videosData[remainingItems[i]];
                if (videoToDelete) {
                    await VideoService.deleteVideo({ video_id: videoToDelete.video_id });
                }
            }

            setSelectedItems([]);
            setSelectAll(false);
            setVideosData([]);
        }
    };
    // Render
    const RenderRow = ({ index, isSelected, toggleSelectItem, video }: RenderRowProps) => {
        const handleDelete = async (video_id: any, index: number) => {
            const confirmation = window.confirm('Bạn có chắc chắn muốn xóa video này?');

            if (confirmation) {
                const respond = await VideoService.deleteVideo({ video_id });

                if (respond) {
                    const updatedVideos = videosData ? videosData.filter((_, idx) => idx !== index) : [];
                    setVideosData(updatedVideos);

                    // Update selectedItems by removing the deleted index
                    setSelectedItems((prevSelectedItems) =>
                        prevSelectedItems.filter((itemIndex) => itemIndex !== index),
                    );
                    toast.success('Xóa thành công!');
                } else {
                    toast.error('Xóa không thành công!');
                }
            }
        };
        return (
            <tr className="border-b">
                <td>
                    <input type="checkbox" title="t" onChange={() => toggleSelectItem(index)} checked={isSelected} />
                </td>
                <td>
                    <div className="py-2 flex gap-4 text-sm items-center">
                        <video className="w-32 aspect-video rounded" src={video.url} />
                        <div>
                            <h4 className="font-medium line-clamp-1">{video.title}</h4>
                            <h4 className="line-clamp-3">
                                {video.description ? video.description : 'Thêm nội dung mô tả'}
                            </h4>
                        </div>
                    </div>
                </td>
                <td>
                    <div className="flex flex-col text-sm ">
                        <span>{video?.upload_date && new Date(video.upload_date).toLocaleDateString()}</span>
                        <span>Ngày tải lên</span>
                    </div>
                </td>
                <td>{video.views}</td>
                <td>
                    <div className="flex flex-col text-lg font-semibold">
                        <Link href={`/studio/edit/video?videoId=${video.video_id}`} className="text-blue-400">
                            Chỉnh sửa
                        </Link>

                        <button className="text-red-400" onClick={() => handleDelete(video.video_id, index)}>
                            Xóa
                        </button>
                    </div>
                </td>
            </tr>
        );
    };
    return (
        <div>
            <h4 className="text-xl font-semibold">Nội dung của kênh</h4>
            {selectedItems.length > 0 && (
                <div className="bg-slate-200 flex gap-6 mt-3 pl-3">
                    <span>
                        {selectedItems.length} Video{selectedItems.length > 1 ? 's' : ''}
                    </span>
                    <button className="underline font-medium" onClick={handleDeleteMany}>
                        Xóa
                    </button>
                </div>
            )}

            <table className="table-fixed text-left">
                <thead>
                    <tr className="border-b h-12">
                        <th>
                            <input
                                onChange={toggleSelectAll}
                                checked={selectAll}
                                className="mr-4"
                                type="checkbox"
                                title="Check"
                            />
                        </th>
                        <th className="w-96">
                            <h4 className="mr-4">Video</h4>
                        </th>
                        <th className="w-36">
                            <button className="mr-4">Ngày</button>
                        </th>
                        <th className="w-32">
                            <button className="mr-4">Lượt xem</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {videosData &&
                        videosData.map((video, index) => (
                            <RenderRow
                                key={video.video_id}
                                index={index}
                                isSelected={selectedItems.includes(index)}
                                toggleSelectItem={toggleSelectItem}
                                video={video}
                            />
                        ))}
                </tbody>
            </table>
        </div>
    );
};
export default Uploads;
