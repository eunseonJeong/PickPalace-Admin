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
import { Trash } from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertModal } from "@/components/modal/alert-modal";

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

type Props = {
  initialData: Size | null;
};

export const SizeForm: React.FC<Props> = ({ initialData }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { name: "", value: "" },
  });

  return (
    <>
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>사이즈 명칭</FormLabel>
                <FormControl>
                  <Input placeholder="사이즈 명칭을 입력하세요." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>사이즈 수치</FormLabel>
                <FormControl>
                  <Input placeholder="수치를 입력하세요." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
};
