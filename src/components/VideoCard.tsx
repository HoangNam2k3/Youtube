'use client';
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import VideoService from '@/service/video';

interface VideoCardProps {
    video: Video;
    isRow?: boolean;
    channel: Channel;
    videoStyle?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ isRow = false, video, channel, videoStyle = '' }) => {
    // State & ref
    const router = useRouter();

    const { title, url, views, upload_date } = video;
    const { channel_id, channel_name, avatar } = channel;

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const handleVideoError = (error: Event) => {
            console.error('Video loading error:', (error.target as HTMLVideoElement).error);
        };

        const handleTimeUpdate = () => {
            if (videoRef.current) {
                setCurrentTime(videoRef.current.currentTime);
            }
        };

        if (videoRef.current) {
            videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
        }

        return () => {
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
                videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
            }
        };
    }, []);

    // Action
    const handleMouseEnter = () => {
        if (videoRef.current && videoRef.current.paused) {
            videoRef.current
                .play()
                .then(() => {
                    setIsPlaying(true);
                })
                .catch((error) => {
                    console.error('Error playing video:', error);
                });
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    };

    const formatTime = (time: number) => {
        // Format the time to mm:ss
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    const handleVideoClick = async (video_id: number) => {
        const respond = await VideoService.updateVideoView({ video_id });
        if (respond) router.push(`/watch/${video_id}?video_id=${video_id}`);
    };

    // Render
    return (
        <div
            onClick={() => handleVideoClick(video.video_id)}
            className={`flex cursor-pointer gap-4 ${isRow ? 'flex-row' : 'flex-col'}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className={`min-w-[170px] ${videoStyle} rounded-lg overflow-hidden object-cover relative aspect-video`}
            >
                <video
                    ref={videoRef}
                    className="absolute top-0 left-0 w-full h-full"
                    src={url}
                    title={title}
                    controls={false}
                    muted={true}
                    poster={video.thumbnail ? video.thumbnail : ''}
                />
                {isPlaying && (
                    <div className="absolute bottom-2 right-2 text-white select-none">{formatTime(currentTime)}</div>
                )}
            </div>
            <div className="flex flex-row">
                {(!isRow || videoStyle) && (
                    <Link href={`/${channel_id}/channel`} className="w-9 z-10 h-9 rounded-full overflow-hidden mr-3">
                        <img className="w-full h-full object-cover" loading="lazy" src={avatar} alt={channel_name} />
                    </Link>
                )}
                <div className="flex-1">
                    <h4 className={`${isRow && 'text-sm'} font-semibold max-h-12 line-clamp-2`}>{title}</h4>
                    <h3 className={`${isRow ? 'text-xs' : 'text-sm'} line-clamp-1`}>{channel_name}</h3>
                    <div className={`${isRow ? 'text-xs' : 'text-sm'} inline-flex`}>
                        <div className="relative mr-3">
                            <span>{views} view</span>
                            <span className="dot" />
                        </div>
                        <span>{upload_date && new Date(upload_date).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
