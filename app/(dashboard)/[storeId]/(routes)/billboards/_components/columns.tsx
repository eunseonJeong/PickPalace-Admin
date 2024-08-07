"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "@/app/(dashboard)/[storeId]/(routes)/billboards/_components/cell-action";

export type BillboardColumns = {
  id: string;
  accessorKey: string;
  header: string;
};

export const columns: ColumnDef<BillboardColumns>[] = [
  {
    accessorKey: "label",
    header: "이름",
  },
  {
    accessorKey: "createdAt",
    header: "생성일자",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
