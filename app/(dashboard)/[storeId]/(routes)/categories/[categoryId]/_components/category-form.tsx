"use client";

import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { Trash } from "lucide-react";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AlertModal } from "@/components/modal/alert-modal";
import { ImageUploadComponent } from "@/components/ui/image-upload";
import { Category } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(1, { message: "카테고리 이름을 입력해주세요." }),
  billboardId: z.string().min(1, { message: "빌보드를 선택해주세요." }),
});

type Props = {
  initialData: Category | null;
};

export const CategoryForm: React.FC<Props> = ({ initialData }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { name: "", billboardId: "" },
  });

  return <></>;
};
