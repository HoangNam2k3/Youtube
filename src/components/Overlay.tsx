import React, { useState } from 'react';

const Overlay = ({
    children,
    isShow,
    onClose,
}: {
    children: React.ReactNode;
    isShow: boolean;
    onClose: () => void;
}) => {
    const [show, setShow] = useState(isShow);

    const handleClose = () => {
        setShow(false);
        onClose();
    };

    return show ? (
        <div className="z-50 relative">
            <div onClick={handleClose} className="bg-black/50 z-10 fixed top-0 bottom-0 right-0 left-0" />
            <div className="z-20 fixed top-0 bottom-0 left-1/2 -translate-x-1/2 my-8 min-w-[450px] rounded-b-2xl overflow-hidden">
                <div className="bg-white rounded-2xl min-h-[64px] max-h-[787px]">{children}</div>
            </div>
        </div>
    ) : null;
};

export default Overlay;
