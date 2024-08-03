//빌보드 추가
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "@/lib/prismadb";

export async function POST(
  request: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth();
    const body = await request.json();
    const { label, imageUrl } = body;

    // 인증된 사용자인지 확인
    if (!userId) {
      return new NextResponse("로그인이 필요합니다.", { status: 401 });
    }

    // 입력된 이름이 있는지 확인
    if (!label) {
      return new NextResponse("이름을 입력하세요.", { status: 400 });
    }

    // 입력된 이미지가 있는지 확인
    if (!imageUrl) {
      return new NextResponse("이미지를 등록하세요.", { status: 400 });
    }

    // 가게 아이디가 params에 있는지 확인
    if (!params.storeId) {
      return new NextResponse("가게 이름을 찾을 수 없습니다.", { status: 400 });
    }

    // 유저가 권한이 있는지 확인
    const storeByUserId = await db.store.findFirst({
      where: { id: params.storeId, userId },
    });

    // 권한이 없다면 에러 반환
    if (!storeByUserId) {
      return new NextResponse("권한이 없습니다.", { status: 403 });
    }

    //빌보드 등록
    const billboard = await db.billboard.create({
      data: { label, imageUrl, storeId: params.storeId },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error);
    return new NextResponse("서버 오류", { status: 500 });
  }
}
