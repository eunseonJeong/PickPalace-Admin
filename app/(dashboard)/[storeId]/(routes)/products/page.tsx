import { ProductClient } from "@/app/(dashboard)/[storeId]/(routes)/products/_components/client";

const ProductPage = () => {
  return (
    <>
      <div className="space-y-4 p-8 pt-6">
        <ProductClient />
      </div>
    </>
  );
};
export default ProductPage;
