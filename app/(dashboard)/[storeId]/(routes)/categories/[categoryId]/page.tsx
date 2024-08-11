import db from "@/lib/prismadb";

const CategoryDetail = async ({
  params,
}: {
  params: { categoryId: string };
}) => {
  // DB에서 카테고리 정보 조회
  const category = await db.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">//카테고리 폼</div>
    </div>
  );
};
export default CategoryDetail;
