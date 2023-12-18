'use client';
import React, { useRef, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import AccountsLayout from '../layout';
import UserService from '@/service/account';

const SignUp = () => {
    // ref
    const router = useRouter();
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    // Action
    const handleCreateAccounts = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const name = nameRef.current?.value || '';
        const email = emailRef.current?.value || '';
        const password = passwordRef.current?.value || '';
        const confirmPassword = confirmPasswordRef.current?.value || '';
        if (!name || !email || !password || !(password == confirmPassword)) {
            toast.error('Đăng ký không thành công. Xin kiểm tra lại dữ liệu!');
            return;
        }
        try {
            const userData = await UserService.signUp({ username: name, email, password });
            router.replace('/accounts/signIn');
            console.log('Post Successful', userData);
        } catch (error) {
            console.error(error);
        }
    };

    // Render
    const Input = React.forwardRef<
        HTMLInputElement,
        {
            title?: string;
            type?: string;
        }
    >(({ title = '', type = 'text' }, ref) => (
        <input
            className="border outline-none rounded px-3 py-2"
            ref={ref}
            title={title}
            placeholder={title}
            type={type}
            width={'100%'}
            required
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
            <h5 className="text-center mb-4 text-2xl text-red-500">Create accounts</h5>
            <form onSubmit={handleCreateAccounts} className="flex flex-col gap-5">
                <Input title="Name" ref={nameRef} />
                <Input title="Email" type="email" ref={emailRef} />
                <Input title="Password" type="password" ref={passwordRef} />
                <Input title="Confirm Password" type="password" ref={confirmPasswordRef} />

                <div className="flex justify-between gap-2">
                    <Button title="Sign In" onClick={() => router.replace('/accounts/signIn')} />
                    <Button title="Sign Up" isActive />
                </div>
            </form>
        </AccountsLayout>
    );
};

export default SignUp;
