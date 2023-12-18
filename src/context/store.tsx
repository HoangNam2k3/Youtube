'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getLocalData } from '@/utils/helper';
import ChannelService from '@/service/channel';

const LocalStorageDataContext = createContext<User | null>(null);
const ChannelLocalStorageDataContext = createContext<Channel | null>(null);

export const LocalStorageDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [localStorageData, setLocalStorageData] = useState<User | null>(null);
    const [channelLocalStorageData, setChannelLocalStorageData] = useState<Channel | null>(null);
    const memoizedLocalStorageData = useMemo(() => localStorageData, [localStorageData]);
    const memoizedChannelLocalStorageData = useMemo(() => channelLocalStorageData, [channelLocalStorageData]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getLocalData();
                if (data) {
                    setLocalStorageData(data);
                    try {
                        const channel = await ChannelService.getChannelByUserId({ user_id: data?.user_id });
                        if (channel) {
                            setChannelLocalStorageData(channel);
                        }
                    } catch (error) {
                        console.error('Error fetching data from channel localStorage:', error);
                    }
                }
            } catch (error) {
                console.error('Error fetching data from localStorage:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <LocalStorageDataContext.Provider value={memoizedLocalStorageData}>
            <ChannelLocalStorageDataContext.Provider value={memoizedChannelLocalStorageData}>
                {children}
            </ChannelLocalStorageDataContext.Provider>
        </LocalStorageDataContext.Provider>
    );
};

export const useLocalStorageData = (): User | null => {
    return useContext(LocalStorageDataContext);
};
export const useChannelLocalStorageData = (): Channel | null => {
    return useContext(ChannelLocalStorageDataContext);
};
