import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RouteBlogAdd, RouteBlogEdit } from '@/helpers/RouteName'
import React, { useState } from 'react'
import { Link } from 'react-router'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useFetch } from '@/hooks/UseFetch'
import { getEnv } from '@/helpers/getEnv'
import Loading from '@/components/Loading'
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteData } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/showToast'
import moment from 'moment'
const BlogDetails = () => {

    const [refreshData, setRefreshData] = useState(false)
    const { data: blogData, loading, error } = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/get-all`, {
        method: "get",
        credentials: "include"
    }, [refreshData])

    const handleDelete = (id) => {
        const response = deleteData(`${getEnv("VITE_API_BASE_URL")}/blog/delete/${id}`)
        if (response) {
            setRefreshData(!refreshData)
            showToast("success", "Data Deleted")
        } else {
            showToast("error", "Data not Deleted")
        }
    }


    if (loading) return <Loading />

    return (
        <div>
            <Card>
                <CardHeader>
                    <div>
                        <Button asChild className="bg-purple-600 hover:bg-purple-700">
                            <Link to={RouteBlogAdd}>
                                Add Blog
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Author</TableHead>
                                <TableHead>Category Name</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Dated</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>

                            {blogData && blogData.blog.length > 0 ?

                                blogData.blog.map(blog =>
                                    <TableRow key={blog._id}>
                                        <TableCell>{blog?.author?.name}</TableCell>
                                        <TableCell>{blog?.category?.name}</TableCell>
                                        <TableCell>{blog.title}</TableCell>
                                        <TableCell>{blog.slug}</TableCell>
                                        <TableCell>{moment(blog?.createdAt).format("DD-MM-YYYY")}</TableCell>
                                        <TableCell className="flex gap-3">
                                            <Button asChild variant="outline" className=" hover:bg-violet-600 hover:text-white">
                                                <Link to={RouteBlogEdit(blog._id)} >
                                                    <FiEdit />
                                                </Link>
                                            </Button>
                                            <Button onClick={() => handleDelete(blog._id)} variant="outline" className=" hover:bg-violet-600 hover:text-white">
                                                <FaRegTrashAlt />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )

                                :

                                <TableRow>
                                    <TableCell colSpan="3">
                                        Data Not Found.
                                    </TableCell>
                                </TableRow>
                            }

                        </TableBody>
                    </Table>

                </CardContent>
            </Card>
        </div>
    )
}

export default BlogDetails