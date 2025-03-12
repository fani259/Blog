import { getEnv } from '@/helpers/getEnv';
import { RouteBlogDetails } from '@/helpers/RouteName';
import { useFetch } from '@/hooks/UseFetch';
import React from 'react'
import { Link } from 'react-router';

const RelatedBlog = ({ props }) => {
    const { data, loading, error } = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/get-related-blog/${props.category}/${props.currentBlog}`, {
        method: "get",
        credentials: "include",
    });
    console.log("Fetching Related Blogs...");
    console.log("API URL:", `${getEnv("VITE_API_BASE_URL")}/blog/get-related-blog/${props.category}/${props.currentBlog}`);
    console.log("Fetched Data:", data);
    console.log("Loading State:", loading);
    console.log("Error:", error);
    if (loading) return <div>Loading ....</div>
    return (
        <div>
            <h2 className='text-2xl font-bold mb-5'>RelatedBlog</h2>
            <div>
                {data && data.relatedBlog
                    ?
                    data.relatedBlog.map(blog => {
                        return (
                            <Link key={blog._id} to={RouteBlogDetails(props.category, blog.slug)}>
                                <div className='flex items-center gap-2 mb-3' >
                                    <img className='w-[100px] h-[80px] object-cover rounded-md' src={blog.featuredImage} />
                                    <h4 className='line-clamp-2 text-lg font-semibold'>{blog.title}</h4>
                                </div>
                            </Link>
                        )
                    })

                    :
                    <div>
                        No related Blog
                    </div>
                }
            </div >
        </div >

    )
}

export default RelatedBlog