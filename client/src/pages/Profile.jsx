import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { getEnv } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showToast'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Textarea } from "@/components/ui/textarea"
import { useFetch } from '@/hooks/UseFetch'
import { IoCameraOutline } from "react-icons/io5";
import Dropzone from 'react-dropzone'
import { setUser } from '@/redux/user/user.slice'
// import Loading from '@/components/Loading'


const Profile = () => {

    const user = useSelector((state) => state.user)
    const [file, setFile] = useState()
    const [filePreview, setPreview] = useState()

    const { data: userData, loading, error } = useFetch(
        `${getEnv("VITE_API_BASE_URL")}/user/get-user/${user.user._id}`, // ✅ Correct URL
        {
            method: "get",
            credentials: "include"
        }
    );



    const dispatch = useDispatch()

    const formSchema = z.object({
        name: z.string().min(3, "name must be at least 3 Charcrters long"),
        email: z.string().email(),
        bio: z.string().min(3, "Bio must be at least 3 Charcrters long"),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            bio: "",
            password: ""
        },
    })

    useEffect(() => {
        if (userData && userData.success && userData.user) { // ✅ Ensure `userData.user` exists
            form.reset({
                name: userData.user.name,
                email: userData.user.email,
                bio: userData.user.bio || ""
            });
        }
    }, [userData]);


    async function onSubmit(values) {
        try {
            const formData = new FormData()
            formData.append("file", file)
            formData.append("data", JSON.stringify(values))

            const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/user/update-user/${userData.user._id}`, {
                method: "put",
                credentials: "include",
                body: formData
            })
            const data = await response.json()
            if (!response.ok) {
                return showToast("error", data.message)
            }
            dispatch(setUser(data.user))
            showToast("success", data.message)

        } catch (error) {
            showToast("error", error.message)
        }
    }


    const handleFileSelection = (files) => {
        const file = files[0]
        const preview = URL.createObjectURL(file)
        setFile(file)
        setPreview(preview)
    }


    return (
        <Card className="max-w-screen-md mx-auto">
            <CardContent>
                <div className='flex justify-center items-center mt-10'>


                    <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (

                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Avatar className="w-32 h-32 relative group ">
                                    <AvatarImage className="rounded-full w-32 h-32" src={filePreview ? filePreview : userData?.user?.avatar} />
                                    <div className=" absolute z-50 w-full h-full top-0 left-0 items-center justify-center bg-black/20 border-2 border-violet-500 rounded-full group-hover:flex hidden cursor-pointer">
                                        <IoCameraOutline color="#7c3aed" />
                                    </div>
                                </Avatar>
                            </div>
                        )}
                    </Dropzone>






                </div>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} >

                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Your Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>

                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Your Email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>

                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Bio</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Enter Bio" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>

                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Enter Your Password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>
                            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">Save Changes</Button>

                        </form>
                    </Form>

                </div>
            </CardContent>
        </Card>
    )
}

export default Profile