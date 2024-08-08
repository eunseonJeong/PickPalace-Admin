"use client";

import { BillboardColumns } from "@/app/(dashboard)/[storeId]/(routes)/billboards/_components/columns";
import React, { useState, useTransition } from "react";
import { AlertModal } from "@/components/modal/alert-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

type Props = {
  data: BillboardColumns;
};

export const CellAction: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeletePending, startDeleteTransition] = useTransition();

  // 빌보드 수정 클릭 시 수정 페이지로 이동
  const onUpdateClick = () => {
    router.push(`/${params.storeId}/billboards/${data.id}`);
  };

  // 빌보드 삭제
  const onDeleteConfirm = () => {
    startDeleteTransition(async () => {
      try {
        await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
        router.refresh();
        toast.success("삭제되었습니다.", { id: "delete-billboard" });
      } catch (error) {
        toast.error("모든 물품과 카테고리를 삭제했는지 확인하세요.", {
          id: "delete-billboard",
        });
      } finally {
        setIsOpen(false);
      }
    });
  };

  //클립보드에 클릭한 빌보드 아이디 복사
  const onCopyClick = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("클립보드에 복사되었습니다.", {
      id: "copy-to-clipboard",
    });
  };
  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDeleteConfirm}
        loading={isDeletePending}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <Separator />
          <DropdownMenuItem onClick={() => onCopyClick(data.id)}>
            <Copy className="mr-2 size-4" />
            아이디 복사
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onUpdateClick}>
            <Edit className="mr-2 size-4" />
            빌보드 수정
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => setIsOpen(true)}
          >
            <Trash className="mr-2 size-4" />
            빌보드 삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
