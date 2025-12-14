import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl || typeof imageUrl !== "string") {
      return NextResponse.json(
        { error: "图片URL无效" },
        { status: 400 }
      );
    }

    // 验证URL格式
    try {
      new URL(imageUrl);
    } catch {
      return NextResponse.json(
        { error: "无效的URL格式" },
        { status: 400 }
      );
    }

    // 代理下载图片
    const response = await fetch(imageUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `下载失败: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const blob = await response.blob();

    // 返回图片数据
    return new NextResponse(blob, {
      headers: {
        "Content-Type": blob.type || "image/png",
        "Content-Disposition": `attachment; filename="logo.png"`,
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("图片下载代理错误:", error);
    const errorMessage = error instanceof Error ? error.message : "未知错误";
    return NextResponse.json(
      { error: `图片下载失败: ${errorMessage}` },
      { status: 500 }
    );
  }
}

