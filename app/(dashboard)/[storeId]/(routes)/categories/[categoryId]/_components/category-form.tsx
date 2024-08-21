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
import { Billboard, Category } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(1, { message: "카테고리 이름을 입력해주세요." }),
  billboardId: z.string().min(1, { message: "빌보드를 선택해주세요." }),
});

type Props = {
  initialData: Category | null;
  billboards: Billboard[];
};
export const CategoryForm: React.FC<Props> = ({ initialData, billboards }) => {
  const params = useParams();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isDeletePending, startDeleteTransition] = useTransition();

  const title = initialData ? "카테고리 수정" : "카테고리 생성";

  const description = initialData ? "카테고리 수정" : "새 카테고리 추가";

  const toastMessage = initialData
    ? "카테고리 수정되었습니다."
    : "카테고리 생성되었습니다.";

  const actions = initialData ? "변경하기" : "생성하기";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { name: "", billboardId: "" },
  });
  //카테고리 등록/수정
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        if (initialData) {
          await axios.patch(
            `api/${params.storeId}/categories/${params.categoryId}`,
            values,
          );
        } else {
          await axios.post(`api/${params.storeId}/category`, values);
        }
        toast.success(toastMessage, { id: "patch-category" });
        router.push(`/${params.storeId}/category`);
        router.refresh();
      } catch (error) {
        toast.error("변경에 실패했습니다.", { id: "patch-billboard" });
      }
    });
  };

  //카테고리 삭제
  const onDelete = () => {};

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
        loading={isDeletePending}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant="destructive"
            onClick={() => setIsOpen(true)}
            size="icon"
            disabled={isPending}
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
          <div className="grid grid-cols-3 gap-8">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>카테고리 이름</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="카테고리 이름을 입력하세요."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="billboardId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>빌보드</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="빌보드를 선택하세요."
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isPending} className="ml-auto">
            {actions}
          </Button>
        </form>
      </Form>
    </>
  );
};
