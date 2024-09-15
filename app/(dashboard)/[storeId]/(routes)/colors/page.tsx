import db from "@/lib/prismadb";
import { ColorClient } from "@/app/(dashboard)/[storeId]/(routes)/colors/_components/client";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const ColorPage = async ({ params }: { params: { storeId: string } }) => {
  // DB에서 색상 리스트 조회
  const colors = await db.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // 색상 리스트 데이터 가공
  const formattedColors = colors.map((color) => ({
    id: color.id,
    name: color.name,
    value: color.value,
    createdAt: format(color.createdAt, "yyyy-MM-dd", { locale: ko }),
  }));

  return (
    <div className="space-y-4 p-8 pt-6">
      <ColorClient data={formattedColors} />
    </div>
  );
};
export default ColorPage;
