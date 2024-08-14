import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

//카테고리 등록
export async function POST(
  requset: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth();
    const body = await requset.json();
    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("로그인이 필요합니다.", { status: 401 });
    }

    if (!name) {
      return new NextResponse("이름을 입력하세요.", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("빌보드를 찾을 수 없습니다.", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("가게 이름을 찾을 수 없습니다.", { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse("권한이 없습니다.", { status: 403 });
    }

    const category = await db.category.create({
      data: { name, billboardId, storeId: params.storeId },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_POST]", error);
    return new NextResponse("서버 오류", { status: 500 });
  }
}
