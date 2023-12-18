import React from 'react';
import Tippy from '@tippyjs/react/headless';
import { BiInfoCircle } from 'react-icons/bi';

const Describe = ({ title, desc }: { title: string; desc: string }) => {
    return (
        <div className="flex items-center gap-1">
            <h5 className="font-semibold">{title}</h5>
            <Tippy
                delay={300}
                interactive
                render={() => (
                    <div className="max-w-sm text-sm font-medium bg-white shadow-lg rounded p-4">
                        <span>{desc}</span>
                    </div>
                )}
            >
                <span>
                    <BiInfoCircle className="text-xl" />
                </span>
            </Tippy>
        </div>
    );
};

export default Describe;
