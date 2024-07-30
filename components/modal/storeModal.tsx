"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
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
import { Modal } from "@/components/modal/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useTransition } from "react";
import axios from "axios";

const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const { isOpen, onClose } = useStoreModal();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // TODO: 상점 생성하기
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        const response = await axios.post("/api/stores", values);
        window.location.assign(`/${response.data.id}`);
      } catch (error) {
        console.error("[STORE_CREATION_ERROR]", error);
        alert("가게 생성 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    });
  };

  return (
    <Modal
      title="가게 등록"
      description="새 가게를 만들어 상품들과 카테고리를 관리해보세요."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-4 py-2 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>가게 이름</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="가게 이름을 입력하세요."
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full items-center justify-end space-x-2 pt-6">
              <Button
                disabled={isPending}
                variant="outline"
                type="button"
                onClick={onClose}
              >
                취소하기
              </Button>
              <Button type="submit" disabled={isPending}>
                계속하기
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
