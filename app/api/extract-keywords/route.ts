import { NextRequest, NextResponse } from "next/server";
import { extractKeywords } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const { userInput } = await request.json();

    console.log("收到关键词提取请求，用户输入:", userInput);

    if (!userInput || typeof userInput !== "string") {
      console.error("用户输入无效:", userInput);
      return NextResponse.json(
        { error: "用户输入无效", keywords: [] },
        { status: 400 }
      );
    }

    const keywords = await extractKeywords(userInput);

    console.log("提取的关键词:", keywords);

    return NextResponse.json({ keywords, error: null });
  } catch (error) {
    console.error("关键词提取API错误:", error);
    const errorMessage = error instanceof Error ? error.message : "未知错误";
    return NextResponse.json(
      { error: `关键词提取失败: ${errorMessage}`, keywords: [] },
      { status: 500 }
    );
  }
}

