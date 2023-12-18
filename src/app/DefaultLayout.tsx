import { ToastContainer } from 'react-toastify';

import { LocalStorageDataProvider } from '@/context/store';
import Navbar from '@/components/Navbar';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <LocalStorageDataProvider>
            <Navbar />
            <main>{children}</main>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer />
        </LocalStorageDataProvider>
    );
}
