"use client";

import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { isBase64Image } from "@/lib/utils";
import { threadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";

// import { userValidation } from "@/lib/validations/user";
// import { updateUser } from "@/lib/actions/user.actions";

interface Props {
    user: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    };
    btnTitle: string;
}


function PostThread({ userId }: { userId: string }) {

    const router = useRouter();
    const pathname = usePathname();


    const form = useForm<z.infer<typeof threadValidation>>({
        resolver: zodResolver(threadValidation),
        defaultValues: {
            thread: "",
            accountId: userId,
        },
    });


    const onSubmit= async (values:z.infer<typeof threadValidation>)=>{
        console.log(userId);
        
        await  createThread({
            text:values.thread,
            author:userId,
            communityId:null,
             path:pathname
        });
        router.push("/");
    }
    return (
        <Form {...form}>
            <form
                className=' mt-10 flex flex-col justify-start gap-10'
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name='thread'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col gap-3'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Content
                            </FormLabel>
                            <FormControl className="np-focus border border-dark-4 bg-dark-4 text-light-1">
                                <Textarea
                                rows={10}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                type="submit" 
                className="bg-primary-500"> Post thread</Button>

            </form>
        </Form>
    )
}

export default PostThread