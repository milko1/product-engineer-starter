/*
	case/[case_id]/page.tsx

	For demo only, showing data handling, retrieval from db.
	Needs styling, more error checking and validations.
*/

import { API as CaseAPI } from "@/api/cases";


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
							Step {index}: Reasoning: {nextValue.reasoning}
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
	const caseData = (await CaseAPI.getCase(case_id)).message[0];
	// console.log('caseData=', caseData);

	return (
		<>
			<h1>Case Result:</h1>
			<hr/>
			<div>Case ID: {case_id}</div>
			{typeof caseData !== 'undefined' ? (
				<>
					<div>Status: {caseData.status}</div>
					<div>Procedure Name: {caseData.procedure_name}</div>
					<div>CPT Codes: {caseData.cpt_codes.join(', ')}</div>
					<div>Case Summary: {caseData.summary}</div>
					<div>Case Creation: {caseData.created_at}</div>
					<div>Case Age: {timeDeltaToWords(Date.now() - Date.parse(caseData.created_at))}</div>
					<div>Final Determination: {caseData.is_met ? "Met" : "Not Met"}</div>
					<br/>
					<div>Steps Taken by the LLM: {stepsToText(caseData.steps)}</div>
				</>
			)
			: <div>Case Not Found</div>}
		</>
	)
}
