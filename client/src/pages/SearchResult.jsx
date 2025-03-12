// import BlogCard from '@/components/BlogCard'
// import { getEnv } from '@/helpers/getEnv'
// import { useFetch } from '@/hooks/UseFetch'
// import React from 'react'
// import { useSearchParams } from 'react-router'

// const SearchResult = () => {

//     const [searchParams] = useSearchParams()
//     const q = searchParams.get('q')
//     const { data: blogData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/search?q=${q}`, {
//         method: 'get',
//         credentials: 'include'
//     })


//     return (
//         <>
//             <div className='flex items-center gap-3 text-2xl font-bold text-violet-500 border-b pb-3 mb-5'>
//                 <h4>Search Result For : {q}</h4>
//             </div>
//             <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>

//                 {blogData && blogData.blog.length > 0

//                     ?
//                     blogData.blog.map(blog => <BlogCard key={blog._id} props={blog} />)

//                     :
//                     <div>Data Not Found</div>
//                 }
//             </div></>
//     )
// }

// export default SearchResult


import BlogCard from '@/components/BlogCard';
import { getEnv } from '@/helpers/getEnv';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

const SearchResult = () => {
    const [searchParams] = useSearchParams();
    const q = searchParams.get('q'); // Get query from URL

    const [blogData, setBlogData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSearchResults = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/blog/search?q=${q}`, {
                method: 'GET',
                credentials: 'include',
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to fetch');

            setBlogData(data.blog);
            setError(null);
        } catch (err) {
            setError(err.message);
            setBlogData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (q) {
            fetchSearchResults();
        }
    }, [q]); // Re-fetch when query changes

    return (
        <>
            {/* <div className='flex items-center gap-3 text-2xl font-bold text-violet-500 border-b pb-3 mb-5'>
                <h4>Search Result For: {q}</h4>
            </div> */}

            <div className="flex items-center gap-3 text-2xl font-bold text-violet-500 border-b pb-3 mb-5">
                <h4 className="relative text-3xl font-extrabold text-white uppercase tracking-wider">
                    <span className="relative z-10 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                        Search Result For: {q}
                    </span>
                    <span className="absolute left-0 bottom-0 w-full h-1 rounded-full transition-all duration-300 transform scale-x-0 origin-left group-hover:scale-x-100"></span>
                    <span className="absolute -left-2 -top-2 w-10 h-10 blur-xl opacity-40"></span>
                    <span className="absolute -right-2 -bottom-2 w-10 h-10 blur-xl opacity-40"></span>
                </h4>
            </div>



            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : blogData && blogData.length > 0 ? (
                <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
                    {blogData.map(blog => <BlogCard key={blog._id} props={blog} />)}
                </div>
            ) : (
                // <div>No blogs found</div>
                <div className="flex flex-col items-center justify-center text-center py-10">
                    <span className="text-6xl">😕</span>
                    <h2 className="text-2xl font-bold text-gray-700 mt-3">
                        No Blogs Found!
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Try searching with a different keyword or check back later.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-6 py-2 text-white font-semibold rounded-full 
                               bg-gradient-to-r from-purple-500 to-indigo-600 
                               hover:from-indigo-600 hover:to-purple-500 
                               transition-all duration-300 transform hover:scale-105 shadow-md"
                    >
                        🔄 Refresh Page
                    </button>
                </div>


            )}
        </>
    );
};

export default SearchResult;
