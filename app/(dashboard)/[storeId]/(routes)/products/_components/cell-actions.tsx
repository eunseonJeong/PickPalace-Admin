"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Copy, Edit, MoreHorizontal } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ProductColumn } from "./columns";
import { toast } from "sonner";

type Props = {
  data: ProductColumn;
};

export const CellAction = ({ data }: Props) => {
  const router = useRouter();
  const params = useParams();

  const onEditClick = () => {
    router.push(`/${params.storeId}/products/${data.id}`);
  };
  // 아이디를 클립보드로 복사
  const onCopyClick = () => {
    navigator.clipboard.writeText(data.id);
    toast.success("클립보드에 복사되었습니다.", {
      id: "copy-to-clipboard",
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <Separator />
          <DropdownMenuItem onClick={onCopyClick}>
            <Copy className="mr-2 size-4" />
            아이디 복사
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onEditClick}>
            <Edit className="mr-2 size-4" />
            상품 수정
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
