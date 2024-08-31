//사이즈 등록 & 수정 컴포넌트

import { Size } from "@prisma/client";

type Props = {
  initialData: Size | null;
};

export const SizeForm: React.FC<Props> = ({ initialData }) => {
  return (
    <>
      <div>size form</div>
    </>
  );
};
