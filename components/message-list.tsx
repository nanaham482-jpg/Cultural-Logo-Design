"use client";

import { Message } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { User, Bot } from "lucide-react";
import { ImageGrid } from "./image-grid";
import { LogoResult } from "./logo-result";

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.role === "assistant" && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
            )}

            <Card
              className={`max-w-[80%] p-4 ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {message.type === "image-list" && message.data?.images && (
                <div>
                  <p className="mb-2">{message.content}</p>
                  <ImageGrid images={message.data.images} />
                </div>
              )}

              {message.type === "logo-result" && message.data?.generatedLogo && (
                <LogoResult logoUrl={message.data.generatedLogo} />
              )}

              {message.type === "text" && (
                <p className="whitespace-pre-wrap">{message.content}</p>
              )}

              {message.type === "image-selection" && message.data?.selectedImage && (
                <div>
                  <p className="mb-2">{message.content}</p>
                  <img
                    src={message.data.selectedImage.url}
                    alt={message.data.selectedImage.name}
                    className="w-32 h-32 object-cover rounded"
                  />
                </div>
              )}
            </Card>

            {message.role === "user" && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

