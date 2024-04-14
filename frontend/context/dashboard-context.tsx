"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export const LOADING_TIME = 3_000;

interface IUploadedFile {
    url: string;
}

interface IDashboardContext {
    medicalRecord: IUploadedFile | null;
    setMedicalRecord: (file: IUploadedFile | null) => void;
    guidelinesFile: IUploadedFile | null;
    setGuidelinesFile: (file: IUploadedFile | null) => void;
    // Using this flag for both uploads for simplicity,
    // but depending on real use maybe it would be better to use different flags for each:
    isLoading: boolean;
    setLoading: (isLoading: boolean) => void;
}

const INITIAL_STATE: IDashboardContext = {
    medicalRecord: null,
    setMedicalRecord: () => {},
    guidelinesFile: null,
    setGuidelinesFile: () => {},
    isLoading: false,
    setLoading: () => {},
};

export const DashboardContext = createContext(INITIAL_STATE);

export function DashboardProvider({ children }: { children: ReactNode }) { 
    const [medicalRecord, setMedicalRecord] = useState<IUploadedFile | null>(null);
    const [guidelinesFile, setGuidelinesFile] = useState<IUploadedFile | null>(null);
	const [isLoading, setLoading] = useState<boolean>(false);

    const value = { medicalRecord, setMedicalRecord, guidelinesFile, setGuidelinesFile, isLoading, setLoading };

    return (
        <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
    );
}

export function useDashboard() { 
    const context = useContext(DashboardContext);
    return context;
}