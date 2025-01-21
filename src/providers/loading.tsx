"use client";
import { createContext, ReactNode, useState } from 'react';
import Loading from '@/app/loading';

interface LoadingDataProps {
    loading: boolean;
    setLoading: (value: boolean) => void;
}

export const LoadingContext = createContext<LoadingDataProps | null>(null);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(false);
    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );
}
