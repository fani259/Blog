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
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteData } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/showToast'
import usericon from "@/assets/user.png"
import moment from 'moment'

const User = () => {
    const [refreshData, setRefreshData] = useState(false)
    const { data, loading, error } = useFetch(`${getEnv("VITE_API_BASE_URL")}/user/get-all-user`, {
        method: "get",
        credentials: "include"
    }, [refreshData])

    const handleDelete = async (id) => {
        const response = await deleteData(`${getEnv("VITE_API_BASE_URL")}/user/delete/${id}`)
        if (response) {
            setRefreshData(!refreshData)
            showToast("success", "User Deleted")
        } else {
            showToast("error", "User not Deleted")
        }
    }

    console.log(data);

    if (loading) return <Loading />
    return (
        <div>
            <Card>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Blog</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Avatar</TableHead>
                                <TableHead>Dated</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>

                            {data && data.user.length > 0 ?

                                data.user.map(user =>
                                    <TableRow key={user._id}>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <img className='w-10' src={user.avatar || usericon} alt="" />
                                        </TableCell>
                                        <TableCell>{moment(user.createdAt).format("DD-MM-YYYY")}</TableCell>

                                        <TableCell className="flex gap-3">
                                            <Button onClick={() => handleDelete(user._id)} variant="outline" className=" hover:bg-violet-600 hover:text-white">
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

export default User