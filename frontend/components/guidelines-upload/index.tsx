"use client";

import { useDashboard, LOADING_TIME } from "@/context/dashboard-context";
import classNames from "classnames";
import { FaCheck, FaSpinner } from "react-icons/fa";
import { Bounce, ToastContainer, toast } from "react-toastify";

export let getGuidelinesFile = null;


export default function GuidelinesUpload() {
    const { medicalRecord, guidelinesFile, setGuidelinesFile, isLoading, setLoading } = useDashboard();

    const handleClick = () => {
        if (!medicalRecord) {
            toast.error('Need to upload Medical Record before Guidelines upload', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            return false;
        }
        setLoading(true);
        setTimeout(
            () => {
                setLoading(false);
                setGuidelinesFile({ url: "/assets/guidelines.pdf" });
            },
            LOADING_TIME
        );
    }

    return(
        <div className="w-1/2 h-64 border border-4 border-gray-200 border-dashed rounded flex flex-row items-center justify-center">
            {isLoading && (<FaSpinner />)}
            <button
                className={classNames(
                    "text-white font-medium py-2 px-4 rounded border border-2",
                    guidelinesFile === null ? "bg-orange-500 border-orange-500" : "border-transparent text-green-600" 
                )}
                onClick={handleClick}
            >
                {guidelinesFile === null && (<span>Simulate Guidelines Upload</span>)}
                {guidelinesFile !== null && (
                    <span className="text-green-600 flex flex-row gap-1 items-center">
                        <FaCheck />
                        <span>Guidelines File Uploaded</span>
                    </span>
                )}
            </button>
            <ToastContainer />
        </div>
    )
}