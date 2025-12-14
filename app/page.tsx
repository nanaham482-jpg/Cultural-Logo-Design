"use client";

import { useState } from "react";
import { Message, OSSImage, ChatState } from "@/lib/types";
import { ChatInput } from "@/components/chat-input";
import { MessageList } from "@/components/message-list";
import { ImageGrid } from "@/components/image-grid";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function Home() {
  const [state, setState] = useState<ChatState>({
    messages: [
      {
        id: "1",
        role: "system",
        content: "欢迎使用智能Logo设计助手！请告诉我您想要设计的Logo风格。",
        timestamp: new Date(),
        type: "text",
      },
    ],
    selectedImage: null,
    isLoading: false,
    currentStep: "input",
  });

  const addMessage = (message: Omit<Message, "id" | "timestamp">) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
    return newMessage;
  };

  const handleUserInput = async (input: string) => {
    if (state.currentStep === "input") {
      // 第一步：用户输入需求，提取关键词并搜索图片
      addMessage({
        role: "user",
        content: input,
        type: "text",
      });

      setState((prev) => ({ ...prev, isLoading: true }));

      try {
        // 提取关键词
        const keywordsRes = await fetch("/api/extract-keywords", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userInput: input }),
        });
        
        if (!keywordsRes.ok) {
          throw new Error(`关键词提取失败: ${keywordsRes.status}`);
        }
        
        const keywordsData = await keywordsRes.json();
        const keywords = keywordsData.keywords || [];
        
        console.log("提取的关键词:", keywords);

        // 搜索图片
        const imagesRes = await fetch("/api/search-images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keywords }),
        });
        
        if (!imagesRes.ok) {
          throw new Error(`图片搜索失败: ${imagesRes.status}`);
        }
        
        const imagesData = await imagesRes.json();
        const images = imagesData.images || [];
        
        console.log("搜索到的图片数量:", images.length);

        addMessage({
          role: "assistant",
          content: `根据您的需求，我找到了以下相关图片（关键词：${keywords.join("、")}）。请选择一张作为参考：`,
          type: "image-list",
          data: { images, keywords },
        });

        setState((prev) => ({
          ...prev,
          isLoading: false,
          currentStep: "selecting",
        }));
      } catch (error) {
        console.error("处理用户输入错误:", error);
        addMessage({
          role: "assistant",
          content: "抱歉，处理您的请求时出现错误，请稍后重试。",
          type: "text",
        });
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    } else if (state.currentStep === "generating") {
      // 第二步：用户输入风格描述，生成Logo
      addMessage({
        role: "user",
        content: input,
        type: "text",
      });

      if (!state.selectedImage) {
        addMessage({
          role: "assistant",
          content: "请先选择一张参考图片。",
          type: "text",
        });
        return;
      }

      setState((prev) => ({ ...prev, isLoading: true }));

      try {
        const logoRes = await fetch("/api/generate-logo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageUrl: state.selectedImage.url,
            styleDescription: input,
          }),
        });

        if (!logoRes.ok) {
          const errorData = await logoRes.json().catch(() => ({ error: "未知错误" }));
          throw new Error(errorData.error || `API错误: ${logoRes.status}`);
        }

        const { logoUrl, error } = await logoRes.json();

        if (error || !logoUrl) {
          throw new Error(error || "Logo生成失败：未返回图片URL");
        }

        addMessage({
          role: "assistant",
          content: "Logo生成完成！",
          type: "logo-result",
          data: { generatedLogo: logoUrl },
        });

        setState((prev) => ({
          ...prev,
          isLoading: false,
          currentStep: "complete",
        }));
      } catch (error) {
        console.error("生成Logo错误:", error);
        const errorMessage = error instanceof Error ? error.message : "未知错误";
        addMessage({
          role: "assistant",
          content: `抱歉，生成Logo时出现错误：${errorMessage}。请稍后重试。`,
          type: "text",
        });
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    }
  };

  const handleImageSelect = (image: OSSImage) => {
    setState((prev) => ({ 
      ...prev, 
      selectedImage: image,
      currentStep: "generating" // 选择图片后，可以输入风格描述
    }));

    addMessage({
      role: "assistant",
      content: `您已选择图片：${image.name}。请描述您想要的风格，例如"现代简约、扁平化、柔和的线条"：`,
      type: "image-selection",
      data: { selectedImage: image },
    });
  };

  const handleReset = () => {
    setState({
      messages: [
        {
          id: Date.now().toString(),
          role: "system",
          content: "欢迎使用智能Logo设计助手！请告诉我您想要设计的Logo风格。",
          timestamp: new Date(),
          type: "text",
        },
      ],
      selectedImage: null,
      isLoading: false,
      currentStep: "input",
    });
  };

  // 获取当前显示的图片列表
  const currentImages = state.messages
    .find((msg) => msg.type === "image-list")
    ?.data?.images as OSSImage[] | undefined;

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* 头部 */}
      <header className="border-b p-4 bg-card">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">智能Logo设计助手</h1>
          </div>
          {state.currentStep === "complete" && (
            <Button variant="outline" onClick={handleReset}>
              重新开始
            </Button>
          )}
        </div>
      </header>

      <div className="flex-1 overflow-hidden flex">
        {/* 左侧：聊天区域 */}
        <div className="flex-1 flex flex-col border-r">
          <MessageList messages={state.messages} />
          <ChatInput
            onSend={handleUserInput}
            disabled={state.isLoading || state.currentStep === "selecting"}
            placeholder={
              state.currentStep === "input"
                ? "输入您的需求，例如：我想做一个蒙古风格的logo"
                : state.currentStep === "selecting"
                ? "请先在上方选择一张参考图片"
                : state.currentStep === "generating"
                ? "描述您想要的风格，例如：现代简约、扁平化、柔和的线条"
                : "输入您的需求"
            }
          />
        </div>

        {/* 右侧：图片选择区和Logo生成区 */}
        <div className="w-96 flex flex-col border-l bg-muted/30">
          {(state.currentStep === "selecting" || state.currentStep === "generating") && currentImages && (
            <div className="p-4 border-b">
              <h2 className="font-semibold mb-2">选择参考图片</h2>
              <div className="max-h-[400px] overflow-y-auto">
                <ImageGrid
                  images={currentImages}
                  onSelect={handleImageSelect}
                  selectedImage={state.selectedImage}
                />
              </div>
            </div>
          )}

          {state.selectedImage && (
            <Card className="m-4 p-4">
              <h3 className="font-semibold mb-2">已选择的图片</h3>
              <div className="relative w-full aspect-square mb-2">
                <img
                  src={state.selectedImage.url}
                  alt={state.selectedImage.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {state.selectedImage.name}
              </p>
            </Card>
          )}

          {state.isLoading && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-sm text-muted-foreground">
                  {state.currentStep === "generating"
                    ? "正在生成Logo..."
                    : "正在处理..."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

