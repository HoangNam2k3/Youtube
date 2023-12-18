import React from 'react';
import DefaultLayout from '../DefaultLayout';

const AccountsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <DefaultLayout>
            <div className="relative z-50">
                <div className="fixed bg-white top-0 left-0 right-0 bottom-0">
                    <div className="flex items-center justify-center w-full h-full">
                        <div className=" shadow-lg h-[475px] flex">
                            <div className="w-96 p-12">{children}</div>
                            <div className="w-72 h-full">
                                <img
                                    className="h-full"
                                    title="Intro"
                                    loading="lazy"
                                    src="https://cdn.mekoong.com/wp-content/uploads/2022/11/7151813419694296346-7.jpg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default AccountsLayout;
