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

import { commentValidation } from "@/lib/validations/thread";
import { addCommentToThread } from "@/lib/actions/thread.actions";



interface Props {
    threadId: string,
    currentUserImage: string,
    currentuserId: string,
}
const Comment = ({ threadId, currentUserImage, currentuserId }: Props) => {

    const router = useRouter();
    const pathname = usePathname();


    const form = useForm<z.infer<typeof commentValidation>>({
        resolver: zodResolver(commentValidation),
        defaultValues: {
            thread: "",
        },
    });
    
    
    console.log("ckldsafjadslkf", currentuserId);
    
    const onSubmit = async (values: z.infer<typeof commentValidation>) => {

        await addCommentToThread(
            threadId,
            values?.thread,
            JSON?.parse(currentuserId),
            pathname
        );

        form.reset();
    }
    return (
        <div className='text-white'>
            <Form {...form}>
                <form
                    className=' comment-form'
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name='thread'
                        render={({ field }) => (
                            <FormItem className='flex w-full items-center gap-3'>
                                <FormLabel className=''>
                                    <Image
                                        src={currentUserImage}
                                        alt="Profile image"
                                        width={48}
                                        height={48}
                                    />
                                </FormLabel>
                                <FormControl className="border-none bg-transparent">
                                    <Input
                                        type="text"
                                        {...field}
                                        className="no-focus text-light-1 out"
                                        placeholder="Comment.."
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="comment-form-btn"> Reply</Button>

                </form>
            </Form>
        </div>
    )
}

export default Comment