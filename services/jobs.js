import { useRouter, NextRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';

export async function fetchJobs(router, slug) {
    if (slug){
        console.log(`fetching jobs for ${slug.slug}`)
        const res = await fetch(`${window.location.origin}/api/jobs/${slug.slug}`, { method: 'GET' });
        const data = res.json();
        console.log(`Got data from /api/search/jobs ${data}`);
        return data;
    }
    return [];
}

export function useFetchJobs(router, slug) {
    return useQuery('jobs', () => fetchJobs(router, slug));
}