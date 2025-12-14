import { NextRequest, NextResponse } from "next/server";
import { generateLogo } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, styleDescription } = await request.json();

    if (!imageUrl || !styleDescription) {
      return NextResponse.json(
        { error: "参数不完整", logoUrl: null },
        { status: 400 }
      );
    }

    console.log("开始生成Logo，参数:", { imageUrl, styleDescription });

    const logoUrl = await generateLogo(imageUrl, styleDescription);

    if (!logoUrl) {
      return NextResponse.json(
        { error: "Logo生成失败：未获取到图片URL", logoUrl: null },
        { status: 500 }
      );
    }

    console.log("Logo生成成功:", logoUrl);
    return NextResponse.json({ logoUrl, error: null });
  } catch (error) {
    console.error("Logo生成API错误:", error);
    const errorMessage = error instanceof Error ? error.message : "未知错误";
    return NextResponse.json(
      { error: `Logo生成失败: ${errorMessage}`, logoUrl: null },
      { status: 500 }
    );
  }
}

