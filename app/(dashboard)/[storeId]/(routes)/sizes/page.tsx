import React from "react";

type Props = {
  params: {
    storeId: string;
  };
};

const SizesPage: React.FC<Props> = async ({ params }) => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">{/*form 자리*/}</div>
    </div>
  );
};

export default SizesPage;
