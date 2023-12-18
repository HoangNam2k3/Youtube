'use client';
import React, { useRef, useState } from 'react';
import { BiUpload, BiX } from 'react-icons/bi';

import Overlay from '@/components/Overlay';
import { UploadVideo } from '@/components/UploadVideo';

const Channel = () => {
    // State & ref
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [mediaURL, setMediaURL] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [showOverlay, setShowOverlay] = useState(false);

    // Action
    const handleOverlayClose = () => {
        setMediaURL(null);
        setShowOverlay(false);
    };
    const handleIconClick = () => {
        if (!mediaURL && fileInputRef.current) {
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
                    const videoUrl = e.target.result as string;
                    setMediaURL(videoUrl);
                    setFileName(selectedFile.name);
                }
            };
            reader.readAsDataURL(selectedFile);
        }
    };
    // Render
    const RenderOverlayContent = (
        <Overlay isShow={showOverlay} onClose={handleOverlayClose}>
            <div className="w-[960px] h-[90vh] flex flex-col">
                <div className="flex justify-between items-center px-4 py-3 border-b">
                    <h4 className="text-xl font-semibold">{fileName?.split('.').slice(0, -1).join('.')}</h4>
                    <button title="Close" onClick={handleOverlayClose}>
                        <BiX className="text-3xl" />
                    </button>
                </div>
                <>
                    {mediaURL ? (
                        <div className="p-5 overflow-y-auto">
                            <UploadVideo fileName={fileName || ''} url={mediaURL} onCloseOverlay={handleOverlayClose} />
                        </div>
                    ) : (
                        <div className="flex justify-center gap-4 flex-col items-center flex-1">
                            <BiUpload className="text-5xl" />
                            <span>Tải video của bạn lên</span>
                            <div>
                                <input
                                    type="file"
                                    accept="video/*"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleFileChange}
                                    title="Video"
                                />
                                <button
                                    onClick={handleIconClick}
                                    className="bg-blue-600 rounded text-white px-4 py-2 text-sm uppercase font-semibold"
                                >
                                    Chọn Tệp
                                </button>
                            </div>
                        </div>
                    )}
                </>
            </div>
        </Overlay>
    );
    return (
        <>
            <div>
                <h5>Trang tổng quan của kênh</h5>
                <div className="flex gap-8">
                    <div className="border max-w-sm h-[518px] p-4 flex flex-col items-center justify-center">
                        <img src="/no_content_illustration_upload_video_v3.svg" loading="lazy" alt="" />
                        <div className="text-center flex flex-col text-sm my-3">
                            <span>Bạn có muốn xem các chỉ số cho video gần đây của mình không?</span>
                            <span>Hãy đăng tải và xuất bản một video để bắt đầu.</span>
                        </div>
                        <div>
                            <button
                                onClick={() => setShowOverlay(true)}
                                className="bg-blue-700 text-white px-4 py-2 text-sm uppercase font-semibold"
                            >
                                Tải video lên
                            </button>
                        </div>
                    </div>
                    <div className="w-72">
                        <div className="border p-4 flex flex-col">
                            <p className="font-bold text-xl">Số liệu phân tích về kênh</p>
                            <div className="border-t py-4">
                                <p className="font-semibold">Tóm tắt</p>
                                <span className="text-xs">28 ngày qua</span>
                                <div className="flex justify-between text-sm mt-2">
                                    <span>Số lượt xem</span>
                                    <span>100</span>
                                </div>
                            </div>
                            <div className="border-t py-4">
                                <p className="font-semibold">Video hàng đầu</p>
                                <div className="flex justify-between text-sm ">
                                    <div className="flex">
                                        <div className="relative mr-3">
                                            <span>48 giờ qua</span>
                                            <span className="dot" />
                                        </div>
                                        <p>Số lượt xem</p>
                                    </div>
                                    <p>100</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showOverlay && RenderOverlayContent}
        </>
    );
};

export default Channel;
