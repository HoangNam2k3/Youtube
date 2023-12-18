import React from 'react';
import DefaultLayout from '../DefaultLayout';
import StudioNavbar from '@/components/StudioNavbar';

const LayoutStudio = ({ children }: { children: React.ReactNode }) => {
    return (
        <DefaultLayout>
            <div className="flex border-t relative">
                <StudioNavbar />
                <div className="flex-1 p-5">{children}</div>
            </div>
        </DefaultLayout>
    );
};

export default LayoutStudio;
