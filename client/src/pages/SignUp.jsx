import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card } from '@/components/ui/card'
import { Link, useNavigate } from 'react-router'
import { RouteSignIn } from '@/helpers/RouteName'
import { getEnv } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showToast'
import GoogleLogin from '@/components/GoogleLogin'


const SignUp = () => {

    const navigate = useNavigate()

    const formSchema = z.object({
        name: z.string().min(3, "Name must be at least 3 Characters"),
        email: z.string().email(),
        password: z.string().min(8, "Password must be at least 8 Characters"),
        confirmPassword: z.string().refine(data => data.password === data.confirmPassword, "Password and Confirm Password Should be same")
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    })

    async function onSubmit(values) {
        try {
            const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/auth/register`, {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            })
            const data = await response.json()
            if (!response.ok) {
                return showToast("error", data.message)
            }
            navigate(RouteSignIn)
            showToast("success", data.message)

        } catch (error) {
            showToast("error", error.message)
        }
    }

    return (
        <div className='flex justify-center items-center h-screen w-screen'>

            <Card className="w-[400px] p-5">
                <h1 className='text-2xl font-bold text-center mb-5'>Create Your Account</h1>

                <div className=''>
                    <GoogleLogin />
                    <div className='border my-5 flex justify-center items-center'>
                        <span className='absolute bg-white tet-sm'>Or</span>
                    </div>
                </div>

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

                        <div className='mb-3'>
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Confirm Your Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>


                        <div className='mt-5'>
                            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">Sign Up</Button>
                            <div className='mt-5 text-sm flex justify-center items-center gap-2'>
                                <p>Already have an account?</p>
                                <Link className='text-blue-500 hover:underline' to={RouteSignIn}>Sign in</Link>
                            </div>
                        </div>
                    </form>
                </Form>

            </Card>

        </div>
    )
}

export default SignUp