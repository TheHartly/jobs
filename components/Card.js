import React from "react";
import { useRouter } from 'next/router';
export default function Card({job, setIsGenearting}) {
    const router = useRouter();
    const generateResume = async (job) => {
        console.log(`Generating resume for ${job}`)
        const url = `/api/resume/${encodeURIComponent(JSON.stringify(job))}`;
        console.log(`pushing ${url}`)
        router.push(url);
    };

    if (job){
        return (
            <article className="container bg-white shadow-2xl rounded-2xl p-5">
                <span>Position:</span>
                <h1 className="font-bold text-blue-500">{job.position}</h1>
                <span>Perks:</span>
                {
                    job.perks.map(perk => {
                        return (
                            <p key={job.position} className="font-light text-gray-500 hover:font-bold">* {perk}</p>
                        );
                    })
                }
                <span>Compnay:</span>
                <h6 className="text-sm text-blue-500 mb-5">{job.employer}</h6>
                <a href={job.link} className="rounded-lg py-2 px-4 text-center text-white bg-blue-400 hover:bg-yellow-500 p-2">Apply</a>
                <a onClick={() => {
                    setIsGenearting(true);
                    generateResume({
                        position: job.position,
                        description: job.description.detail,
                        highlights: job.highlights}
                    )
                }} className="rounded-lg py-2 px-4 text-center text-white bg-blue-400 hover:bg-yellow-500 p-2">Generate Resume</a>
            </article>
        )
    }
    else {
        return (<></>)
    }
}