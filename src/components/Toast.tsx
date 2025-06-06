// components/Toast.tsx
'use client'

import React, { useState, useImperativeHandle, forwardRef } from 'react'

export type ToastHandle = {
    showToastMessage: (message: string) => void;
};

const Toast = forwardRef<ToastHandle>((_, ref) => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const showToastMessage = (message: string) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    useImperativeHandle(ref, () => ({
        showToastMessage,
    }));

    return (
        showToast ? (
            <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
                <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="font-medium">{toastMessage}</span>
                </div>
            </div>
        ) : null
    );
});

Toast.displayName = 'Toast';
export default Toast;
