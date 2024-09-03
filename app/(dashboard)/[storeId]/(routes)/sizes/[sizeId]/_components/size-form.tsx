//사이즈 등록 & 수정 컴포넌트
"use client";

import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { Size } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Loader2, Trash } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

type Props = {
  initialData: Size | null;
};

export const SizeForm: React.FC<Props> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const title = initialData ? "사이즈 수정" : "사이즈 생성";

  const description = initialData
    ? "사이즈를 수정합니다."
    : "사이즈를 생성합니다.";

  const action = initialData ? "수정하기" : "생성하기";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { name: "", value: "" },
  });

  // 사이즈 생성
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        await axios.post(`/api/${params.storeId}/sizes`, values);
        toast.success("사이즈가 생성되었습니다.", {
          id: "category",
        });
        router.push(`/${params.storeId}/sizes`);
        router.refresh();
      } catch (e) {
        toast.error("생성에 실패했습니다.");
      }
    });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>사이즈 명칭</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="사이즈 명칭을 입력하세요."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="value"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>수치</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="수치를 입력하세요."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="ml-auto" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
