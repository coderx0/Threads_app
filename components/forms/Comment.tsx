"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CommentValidation } from "@/lib/validations/thread";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.action";
// import { createThread } from "@/lib/actions/thread.action";

interface Props {
    threadId: string,
    currentUserImage: string,
    currentUserId: string,
}

const Comment = ({
    threadId,
    currentUserImage,
    currentUserId   
}: Props)=>{
    const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    console.log('running');
    
    await addCommentToThread(
      threadId,
      values.thread,
      JSON.parse(currentUserId),
      pathname
    );

    form.reset();
  };

  console.log({currentUserImage})

    return (
        <Form {...form}>
      <form
        className='comment-form'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex w-full items-center gap-3'>
              <FormLabel>
                <Image
                    src={currentUserImage}
                    alt="Profile Image"
                    width={48}
                    height={48}
                    className="rounded-full object-cover w-[48px] h-[48px]"
                />
              </FormLabel>
              <FormControl className='border-none bg-transparent'>
                <Input 
                    {...field}
                    type="text"
                    placeholder="Comment..."
                    className="no-focus text-light-1 outline-none"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type='submit' className='comment-form_btn'>
            Reply
        </Button>
      </form>
    </Form>
    );
}

export default Comment;