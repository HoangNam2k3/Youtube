'use client';
import React, { FormEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import AccountsLayout from '../layout';
import UserService from '@/service/account';
import { saveLocalData } from '@/utils/helper';

const SignIn = () => {
    const router = useRouter();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const email = emailRef.current?.value || '';
        const password = passwordRef.current?.value || '';

        try {
            const userData: User = await UserService.signIn({ email, password });
            if (userData) {
                saveLocalData({ user: userData });
                router.push('/');
            } else toast.error('Đăng nhập không thành công. Kiểm tra lại dữ liệu!');
        } catch (error) {
            toast.error('Đăng nhập không thành công. Kiểm tra lại dữ liệu!');
            console.error(error);
        }
    };

    const Input = React.forwardRef<
        HTMLInputElement,
        {
            title?: string;
            type?: string;
        }
    >(({ title = '', type = 'text' }, ref) => (
        <input
            className="border outline-none rounded px-3 py-2"
            title={title}
            placeholder={title}
            type={type}
            width={'100%'}
            required
            ref={ref}
        />
    ));
    const Button = ({ title = '', isActive = false, onClick = () => {} }) => (
        <button
            onClick={onClick}
            className={`${isActive ? 'bg-red-500 text-white' : 'border border-red-500'} flex-1 py-1 rounded`}
            type={`${isActive ? 'submit' : 'button'}`}
        >
            {title}
        </button>
    );
    return (
        <AccountsLayout>
            <h5 className="text-center text-2xl mb-4 text-red-500">Sign In</h5>
            <form onSubmit={handleSignIn} className="flex flex-col gap-5">
                <Input title="Email" type="email" ref={emailRef} />
                <Input title="Password" type="password" ref={passwordRef} />
                <div>
                    <input type="checkbox" title="Remember Password" />
                    <span className="ml-2">Remember password.</span>
                </div>
                <div className="flex justify-between gap-2">
                    <Button title="Sign In" isActive />
                    <Button title="Sign Up" onClick={() => router.replace('/accounts/signUp')} />
                </div>
            </form>
        </AccountsLayout>
    );
};

export default SignIn;
