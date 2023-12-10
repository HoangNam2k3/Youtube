'use client';
import { video } from '@/data';
import React, { useState } from 'react';

const Uploads = () => {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const toggleSelectAll = () => {
        setSelectAll(!selectAll);
        const newSelectedItems = selectAll ? [] : [1, 2, 3]; // Chọn tất cả các hàng
        setSelectedItems(newSelectedItems);
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
        if (newSelectedItems.length === 3) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
    };
    return (
        <div>
            <h4>Nội dung của kênh</h4>
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
                    {[1, 2, 3].map((ind) => (
                        <RenderRow
                            key={ind}
                            index={ind}
                            isSelected={selectedItems.includes(ind)}
                            toggleSelectItem={toggleSelectItem}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Uploads;

const RenderRow = ({
    index,
    isSelected,
    toggleSelectItem,
}: {
    index: number;
    isSelected: boolean;
    toggleSelectItem: (index: number) => void;
}) => (
    <tr className="border-b">
        <td>
            <input type="checkbox" title="t" onChange={() => toggleSelectItem(index)} checked={isSelected} />
        </td>
        <td>
            <div className="py-2 flex gap-4 text-sm items-center">
                <video className="w-32 aspect-video rounded" src={video.video_url} />
                <div>
                    <h4 className="font-medium">Title</h4>
                    <h4>Thêm nội dung mô tả</h4>
                </div>
            </div>
        </td>
        <td>
            <div className="flex flex-col text-sm ">
                <span>9 thg 11, 2023</span>
                <span>Ngày tải lên</span>
            </div>
        </td>
        <td>100</td>
        <td>
            <div className="flex flex-col text-lg font-semibold">
                <button className="text-blue-400">Chỉnh sửa</button>
                <button className="text-red-400">Xóa</button>
            </div>
        </td>
    </tr>
);
