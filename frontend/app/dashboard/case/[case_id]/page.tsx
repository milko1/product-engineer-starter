/*
	case/[case_id]/page.tsx

	For demo only, showing data handling, retrieval from db.
	Needs more/better styling, more error checking and validations.
*/

import { API as CaseAPI, CaseStatus } from "@/api/cases";


function timeDeltaToWords(timeDelta: number) {
  const days = Math.floor(timeDelta / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDelta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDelta % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDelta % (1000 * 60)) / 1000);

  const words = [];

  if (days > 0) {
    words.push(`${days} day${days > 1 ? 's' : ''}`);
  }
  if (hours > 0) {
    words.push(`${hours} hour${hours > 1 ? 's' : ''}`);
  }
  if (minutes > 0) {
    words.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
  }
  if (seconds > 0) {
    words.push(`${seconds} second${seconds > 1 ? 's' : ''}`);
  }

  return words.join(' ');
}


function stepsToText(stepsData: any) {
	let stepsText = (
		<>
			<ol>
				{stepsData.map((nextValue: any, index: number) => {
					return (
						<li key={index}>
							<span className="font-bold italic">Step {index}: Reasoning:</span> {nextValue.reasoning}
						</li>
					)
				})}
			</ol>
		</>
	);
	return stepsText;
}


export default async function CaseResult({ params }: { params: {case_id: string} }) {
	const case_id = params.case_id;
	let caseData: any;
	let errorMessage = '';

	try {
		const caseDataMessage = await CaseAPI.getCase(case_id)
		// console.log('caseDataMessage=', caseDataMessage);
		if (typeof caseDataMessage !== 'undefined' && typeof caseDataMessage.message !== 'undefined' && caseDataMessage.message.length) {
			caseData = caseDataMessage.message[0];
			// console.log('caseData=', caseData);
		} else {
			errorMessage = 'Case Not Found'
		}
	} catch (error) {
		errorMessage = (error as Error).message;
	}

	return (
		<>
			<h1 className="text-2xl leading-10">Case Result:</h1>
			<hr/>
			<div className="font-bold">Case ID: {case_id}</div>
			{typeof caseData !== 'undefined' ? (
				<>
					<div className="font-bold">Status: <span className={caseData.status !== CaseStatus.COMPLETE ? "font-normal" : ""}>{caseData.status}</span></div>
					<div className="font-bold">Procedure Name: <span className="font-normal">{caseData.procedure_name}</span></div>
					<div className="font-bold">CPT Codes: <span className="font-normal">{caseData.cpt_codes.join(', ')}</span></div>
					<div className="font-bold">Case Summary: <span className="font-normal">{caseData.summary}</span></div>
					<div className="font-bold">Case Creation: <span className="font-normal">{caseData.created_at}</span></div>
					<div className="font-bold">Case Age: <span className="font-normal">{timeDeltaToWords(Date.now() - Date.parse(caseData.created_at))}</span></div>
					<div className="font-bold">Final Determination: {caseData.is_met ? "Met" : "Not Met"}</div>
					<br/>
					<div className="font-bold">Steps Taken by the LLM: <span className="font-normal">{stepsToText(caseData.steps)}</span></div>
				</>
			)
			: <div className="text-red-500">{errorMessage}</div>}
		</>
	)
}
