import React from "react";
import { SizeClient } from "@/app/(dashboard)/[storeId]/(routes)/sizes/_components/client";

type Props = {
  params: {
    storeId: string;
  };
};

const SizesPage: React.FC<Props> = async ({ params }) => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient />
      </div>
    </div>
  );
};

export default SizesPage;
