import React from 'react';

const Button = ({ tit = '' }) => {
    return (
        <button
            className={`text-sm font-bold select-none hover:bg-[#e5e5e5] whitespace-nowrap px-3 py-2 rounded-lg bg-[#f2f2f2]`}
        >
            {tit}
        </button>
    );
};

export default Button;
