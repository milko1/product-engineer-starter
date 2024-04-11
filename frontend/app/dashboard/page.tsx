"use client";

import GuidelinesUpload from "@/components/guidelines-upload";
import MedicalRecordUpload from "@/components/medical-record-upload";
import { useRouter } from "next/navigation";
import { useDashboard } from "@/context/dashboard-context";

import "react-toastify/dist/ReactToastify.css";

export const revalidate = 0;

// export default async function DashboardRoot() { // cannot use async in client components in this version of NextJS
export default function DashboardRoot() {
	const router = useRouter();
	const CASE_ID = "case_891a_6fbl_87d1_4326";
	const { guidelinesFile, medicalRecord } = useDashboard();

	const handleContinue = () => {
		router.push(`/dashboard/case/${CASE_ID}`)
	}

	return (
		<div className="w-full flex flex-col justify-center items-center h-screen">
			<div className="w-full flex flex-row gap-2 items-center">
				<MedicalRecordUpload />
				<GuidelinesUpload />
			</div>
			{guidelinesFile && medicalRecord && (
				<div className="w-full py-4 flex flex-row justify-center">
					<button
						className="bg-green-600 font-medium text-white py-2 px-4 rounded"
						onClick={handleContinue}
					>
						Continue
					</button>
				</div>
			)}
		</div>
	)
}
