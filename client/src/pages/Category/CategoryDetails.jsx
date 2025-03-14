import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RouteAddCategory, RouteEditCategory } from '@/helpers/RouteName'
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


const CategoryDetails = () => {
    const [refreshData, setRefreshData] = useState(false)
    const { data: categoryData, loading, error } = useFetch(`${getEnv("VITE_API_BASE_URL")}/category/all-category`, {
        method: "get",
        credentials: "include"
    }, [refreshData])

    const handleDelete = async (id) => {
        const response = await deleteData(`${getEnv("VITE_API_BASE_URL")}/category/delete/${id}`)
        if (response) {
            setRefreshData(!refreshData)
            showToast("success", "Data Deleted")
        } else {
            showToast("error", "Cancelled")
        }
    }

    if (loading) return <Loading />
    return (
        <div>
            <Card>
                <CardHeader>
                    <div>
                        <Button asChild className="bg-purple-600 hover:bg-purple-700">
                            <Link to={RouteAddCategory}>
                                Add Category
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Category</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>

                            {categoryData && categoryData.category.length > 0 ?

                                categoryData.category.map(category =>
                                    <TableRow key={category._id}>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell>{category.slug}</TableCell>
                                        <TableCell className="flex gap-3">
                                            <Button asChild variant="outline" className=" hover:bg-violet-600 hover:text-white">
                                                <Link to={RouteEditCategory(category._id)} >
                                                    <FiEdit />
                                                </Link>
                                            </Button>
                                            <Button onClick={() => handleDelete(category._id)} variant="outline" className=" hover:bg-violet-600 hover:text-white">
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

export default CategoryDetails