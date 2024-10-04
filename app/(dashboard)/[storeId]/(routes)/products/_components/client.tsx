"use client";

import { useParams, useRouter } from "next/navigation";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const ProductClient = () => {
  const router = useRouter();
  const params = useParams();

  const onAddClick = () => {
    router.push(`/${params.storeId}/products/new`);
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`상품 (0)`} description="상품을 관리할 수 있습니다." />
        <Button onClick={onAddClick}>
          <Plus className="mr-2 size-4" />
          상품 추가
        </Button>
      </div>
      <Separator />
    </>
  );
};
