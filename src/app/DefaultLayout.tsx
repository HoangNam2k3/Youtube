import { LocalStorageDataProvider, useLocalStorageData } from '@/context/store';
import Navbar from '@/components/Navbar';
import { getLocalData } from '@/utils/helper';
import React, { useEffect, useState } from 'react';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <LocalStorageDataProvider>
            <Navbar />
            <main>{children}</main>
        </LocalStorageDataProvider>
    );
}
