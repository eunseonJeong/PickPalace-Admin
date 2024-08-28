//사이즈 리스트 조회

import { SizeColumn } from "@/app/(dashboard)/[storeId]/(routes)/sizes/_components/columns";

type Props = {
  data: SizeColumn[];
};

export const SizeClient: React.FC<Props> = () => {
  return (
    <>
      <div>size client components</div>
    </>
  );
};
