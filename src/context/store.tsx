'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getLocalData } from '@/utils/helper';
import { getChannelById } from '@/lib/channel';

const LocalStorageDataContext = createContext<User | null>(null);

export const LocalStorageDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [localStorageData, setLocalStorageData] = useState<User | null>(null);
    const [channelLocalStorageData, setChannelLocalStorageData] = useState<Channel | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getLocalData();
                if (data) {
                    setLocalStorageData(data);
                    // const channel = await getChannelById(data?.user_id);
                }
            } catch (error) {
                console.error('Error fetching data from localStorage:', error);
            }
        };

        fetchData();
    }, []);

    return <LocalStorageDataContext.Provider value={localStorageData}>{children}</LocalStorageDataContext.Provider>;
};

export const useLocalStorageData = (): User | null => {
    return useContext(LocalStorageDataContext);
};
