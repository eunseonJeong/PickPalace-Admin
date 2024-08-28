import React from "react";
import { SizeClient } from "@/app/(dashboard)/[storeId]/(routes)/sizes/_components/client";
import db from "@/lib/prismadb";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

type Props = {
  params: {
    storeId: string;
  };
};

const SizesPage: React.FC<Props> = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  const sizesList = await db.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes = sizesList.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "yyyy-MM-dd", { locale: ko }),
  }));

  return (
    <>
      <div className="space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </>
  );
};

export default SizesPage;
