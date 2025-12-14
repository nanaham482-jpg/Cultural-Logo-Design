import { NextRequest, NextResponse } from "next/server";
import { searchImagesByTags } from "@/lib/oss";

export async function POST(request: NextRequest) {
  try {
    const { keywords } = await request.json();

    console.log("收到图片搜索请求，关键词:", keywords);

    if (!keywords || !Array.isArray(keywords)) {
      console.error("关键词无效:", keywords);
      return NextResponse.json(
        { error: "关键词无效", images: [] },
        { status: 400 }
      );
    }

    if (keywords.length === 0) {
      console.warn("关键词数组为空");
    }

    const images = await searchImagesByTags(keywords);

    console.log(`返回 ${images.length} 张图片`);

    return NextResponse.json({ images, error: null });
  } catch (error) {
    console.error("图片搜索API错误:", error);
    const errorMessage = error instanceof Error ? error.message : "未知错误";
    return NextResponse.json(
      { error: `图片搜索失败: ${errorMessage}`, images: [] },
      { status: 500 }
    );
  }
}

