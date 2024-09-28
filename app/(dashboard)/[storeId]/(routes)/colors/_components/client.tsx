"use client";

import { useParams, useRouter } from "next/navigation";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";
import {
  ColorColumn,
  columns,
} from "@/app/(dashboard)/[storeId]/(routes)/colors/_components/columns";

type Props = {
  data: ColorColumn[];
};

export const ColorClient: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  // 색상 추가 페이지로 이동
  const onAddClick = () => {
    router.push(`/${params.storeId}/colors/new`);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${data.length})`}
          description="색상을 관리할 수 있습니다."
        />
        <Button onClick={onAddClick}>
          <Plus className="mr-2 size-4" />
          색상 추가
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description=" 색상을 위한 API를 제공합니다." />
      <Separator />
      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  );
};
