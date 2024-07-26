import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import db from "@/lib/prismadb";

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    const body = await request.json();
    const { name } = body;

    // 인증된 사용자인지 확인
    if (!userId) {
      return new NextResponse("로그인이 필요합니다.", { status: 401 });
    }

    // 매장 이름이 있는지 확인
    if (!name) {
      return new NextResponse("등록하려는 매장 이름이 필요합니다.", {
        status: 400,
      });
    }

    // DB에 가게 만들어서 등록하기
    const store = await db.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.error("[STORES_POST]", error); // 에러를 콘솔에 출력
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 });
    }
    return new NextResponse("Internal Error", { status: 500 });
  }
}