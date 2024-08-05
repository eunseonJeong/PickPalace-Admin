import React from "react";
import db from "@/lib/prismadb";

type Props = {
  params: { storeId: string };
};

const DashboardPage: React.FC<Props> = async ({params}:Props) => {

  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return (
    <>
      <div>활성화된 스토어: {store?.name}</div>
    </>
  );
};

export default DashboardPage;