import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { Inter } from '@next/font/google'
import { useFetchJobs } from "@/services/jobs";
import Card from "@/components/Card";
import {NextSeo} from "next-seo";

const inter = Inter({ subsets: ['latin'] })


export default function Search() {
  const router = useRouter();
  const { data: jobsData, isLoading } = useFetchJobs(router, router.query);
  const [jobs, setJobs] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    // query api to get jobs
    if (jobsData && jobsData.jobs){
        setJobs(jobsData.jobs);
    }

  }, [jobsData]);

  return (
    <>
      <NextSeo
          title="Job Search"
          description="Find remote/hybrid jobs, and have AI assisted resume writing."
          openGraph={{
            url: 'https://hart.ly/search',
            title: 'Hart.ly | Applying for jobs just got easier with AI assistance.',
            description: 'Find remote/hybrid jobs, and have AI assisted resume writing.',
            images: [
              {
                url: 'https://hart.ly/images/create_resume_using_chatgpt.png',
                width: 1200,
                height: 630,
                alt: 'hart.ly create resume using chatgpt',
                type: 'image/jpeg',
              }
            ],
            siteName: 'Hart.ly',
          }}
      />
      <main>
        <nav x-data="{ isOpen: false }" className="container mx-auto p-6 lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <div>
              <a className="text-2xl font-bold text-gray-800 hover:text-gray-700 dark:text-white dark:hover:text-gray-300 lg:text-3xl" href="https://hart.ly">Hartly 💙</a>
            </div>
          </div>
        </nav>
        {
          isLoading || isGenerating ? <>
            <div className='flex items-center justify-center min-h-screen'>
              <div style={{"border-top-color": "transparent"}}
                   className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"></div>
              <p className="ml-2">Loading...</p>
            </div>
          </> : <></>
        }

        <div className="flex justify-between grid grid-cols-3 gap-6 m-10 mb-10">
          { jobs && jobs.length > 0 && jobs.map(job => {return <Card key={job.position} isLoading={isLoading} job={job} setIsGenearting={setIsGenerating} /> } ) }
        </div>
      </main>
    </>
  )
}
