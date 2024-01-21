"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from "axios"
import toast from 'react-hot-toast'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
// import { imageStore } from '@/store/imageStore'


const urlSchema = z.object({
    url: z.string().min(2),
})

type Props = {}

const URLForm = (props: Props) => {

    const form = useForm<z.infer<typeof urlSchema>>({
        resolver: zodResolver(urlSchema),
        defaultValues: {
            url: "https://github.com/"
        },
    })

    // const screenshots = imageStore((state:any) => state.screenshots)
    // const updateScreenshot = imageStore((state:any) => state.updateScreenshot)

    const onSubmit = async (data: z.infer<typeof urlSchema>) => {
        try {
            // console.log(data);

            const result = await axios.get(`/api/screenshot?url=${data.url}`, );
            toast.success("Screenshot added")
            // console.log(result)
            console.log(result.data.screenshot)
            // updateScreenshot({screenshot : result.data.screenshot})
        
        }
         catch (error) {
            toast.error("Something went wrong!")
        }

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Website Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Add Website" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the website you for screenshot.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Render</Button>
            </form>
        </Form>
    )
}

export default URLForm