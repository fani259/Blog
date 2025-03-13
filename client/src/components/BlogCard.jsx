import React from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from "@/components/ui/badge"
import { useSelector } from 'react-redux'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { FaRegCalendarAlt } from "react-icons/fa";
import usericon from "@/assets/user.png"
import moment from 'moment'
import { Link } from 'react-router'
import { RouteBlogDetails } from '@/helpers/RouteName'

const BlogCard = ({ props }) => {
    return (

        // <Link to={RouteBlogDetails(props.category.slug, props.slug)}>
        //     <Card className="pt-5">
        //         <CardContent>
        //             <div className='flex items-center justify-between'>

        //                 <div className='flex items-center justify-between gap-2'>
        //                     <Avatar>
        //                         <AvatarImage className='w-10 h-10 rounded-full' src={props.author.avatar || usericon} />
        //                     </Avatar>
        //                     <span>{props.author.name}</span>
        //                 </div>

        //                 {props.author.role == "admin" &&

        //                     <Badge variant="outline" className="bg-violet-500">Admin</Badge>
        //                 }
        //             </div>

        //             <div className='my-2'>
        //                 <img
        //                     src={props.featuredImage}
        //                     className='rounded w-[300px] h-[200px] object-cover'
        //                     alt={props.title}
        //                 />
        //             </div>



        //             <div>
        //                 <p className='flex items-center gap-2 mb-2'>

        //                     <FaRegCalendarAlt />
        //                     <span>{moment(props.createdAt).format("DD-MM-YYYY")}</span>
        //                 </p>
        //                 <h2 className='text-2xl font-bold line-clamp-2'>{props.title}</h2>
        //             </div>
        //         </CardContent>
        //     </Card>
        // </Link>

        <Link to={RouteBlogDetails(props.category.slug, props.slug)}>
            <Card className="pt-5 h-[400px] flex flex-col justify-between">
                <CardContent className="flex flex-col flex-grow">
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <Avatar>
                                <AvatarImage className='w-10 h-10 rounded-full' src={props.author.avatar || usericon} />
                            </Avatar>
                            <span>{props.author.name}</span>
                        </div>
                        {props.author.role === "admin" && (
                            <Badge variant="outline" className="bg-violet-500">Admin</Badge>
                        )}
                    </div>

                    {/* Image Section */}
                    <div className='my-2'>
                        <img
                            src={props.featuredImage}
                            className='rounded w-full h-[200px] object-cover'
                            alt={props.title}
                        />
                    </div>

                    Title & Date Section
                    <div className="flex flex-col flex-grow justify-end">
                        <p className='flex items-center gap-2 mb-2'>
                            <FaRegCalendarAlt />
                            <span>{moment(props.createdAt).format("DD-MM-YYYY")}</span>
                        </p>
                        <h2 className='text-2xl font-bold line-clamp-2'>{props.title}</h2>
                    </div>
                </CardContent>
            </Card>
        </Link>

    )
}

export default BlogCard