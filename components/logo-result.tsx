"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Card } from "@/components/ui/card";

interface LogoResultProps {
  logoUrl: string;
}

export function LogoResult({ logoUrl }: LogoResultProps) {
  const handleDownload = async () => {
    try {
      // 方法1：尝试通过代理API下载（避免CORS问题）
      try {
        const response = await fetch("/api/download-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageUrl: logoUrl }),
        });

        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `logo-${Date.now()}.png`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
          return;
        }
      } catch (proxyError) {
        console.warn("代理下载失败，尝试直接下载:", proxyError);
      }

      // 方法2：直接下载（如果URL支持）
      const a = document.createElement("a");
      a.href = logoUrl;
      a.download = `logo-${Date.now()}.png`;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("下载失败:", error);
      // 如果都失败了，打开新窗口让用户手动保存
      window.open(logoUrl, "_blank");
      alert("自动下载失败，已在新窗口打开图片，请右键保存图片");
    }
  };

  return (
    <div className="space-y-4">
      <p className="font-semibold">生成的Logo：</p>
      <Card className="p-4 bg-background">
        <div className="relative w-full aspect-square max-w-md mx-auto mb-4">
          <Image
            src={logoUrl}
            alt="生成的Logo"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 512px"
          />
        </div>
        <div className="flex justify-center">
          <Button onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            下载Logo
          </Button>
        </div>
      </Card>
    </div>
  );
}

