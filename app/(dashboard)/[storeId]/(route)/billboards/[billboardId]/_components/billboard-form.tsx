"use client";

import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Billboard } from "@prisma/client";
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

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

type Props = {
  initialData: Billboard | null;
};

export const BillboardForm: React.FC<Props> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isPatchPending, setIsPatchPending] = useTransition();

  const title = initialData ? "빌보드 수정" : "빌보드 생성";
  const description = initialData ? "빌보드 수정" : "새 빌보드 추가";

  const toastMessage = initialData
    ? "빌보드가 수정되었습니다."
    : "빌보드가 생성되었습니다.";

  const action = initialData ? "변경하기" : "생성하기";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { label: "", imageUrl: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        await axios.post(`/api/${params.storeId}/billboards`, values);
        toast.success("빌보드가 등록되었습니다.", {
          id: "billboard",
        });
        router.push(`/${params.storeId}/billboards`);
        router.refresh();
      } catch (error) {
        toast.error("생성에 실패했습니다.");
      }
    });
  };

  const onDelete = () => {
    // TODO: 빌보드 삭제 연동
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
        loading={isPending}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            size="icon"
            variant="destructive"
            disabled={isPending}
            onClick={() => setIsOpen(true)}
          >
            <Trash className="size-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            name="imageUrl"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>배경 이미지</FormLabel>
                <FormControl>
                  <ImageUploadComponent
                    disabled={isPatchPending}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                    value={field.value ? [field.value] : []}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              name="label"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>빌보드 이름</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="빌보드 이름을 입력하세요."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="ml-auto" disabled={isPending}>
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};