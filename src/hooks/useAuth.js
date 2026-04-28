'use client';

import { useSyncExternalStore } from 'react';

const STORAGE_KEY = 'loginPhone';
const AUTH_EVENT = 'auth-change';

const subscribe = (callback) => {
    window.addEventListener('storage', callback);
    window.addEventListener(AUTH_EVENT, callback);
    return () => {
        window.removeEventListener('storage', callback);
        window.removeEventListener(AUTH_EVENT, callback);
    };
};

const getSnapshot = () => localStorage.getItem(STORAGE_KEY);
const getServerSnapshot = () => null;

const notify = () => window.dispatchEvent(new Event(AUTH_EVENT));

export function useAuth() {
    const phone = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    const login = (newPhone) => {
        localStorage.setItem(STORAGE_KEY, newPhone);
        notify();
    };

    const logout = () => {
        localStorage.removeItem(STORAGE_KEY);
        notify();
    };

    return { phone, login, logout };
}
