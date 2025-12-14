"use client";

import { OSSImage } from "@/lib/types";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ImageGridProps {
  images: OSSImage[];
  onSelect?: (image: OSSImage) => void;
  selectedImage?: OSSImage | null;
}

export function ImageGrid({
  images,
  onSelect,
  selectedImage,
}: ImageGridProps) {
  if (images.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        未找到匹配的图片
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {images.map((image) => (
        <Card
          key={image.url}
          className={cn(
            "cursor-pointer overflow-hidden transition-all hover:shadow-lg",
            selectedImage?.url === image.url && "ring-2 ring-primary"
          )}
          onClick={() => onSelect?.(image)}
        >
          <div className="relative aspect-square">
            <Image
              src={image.url}
              alt={image.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          </div>
          <div className="p-2">
            <p className="text-xs text-muted-foreground truncate">
              {image.name}
            </p>
            {image.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {image.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-1.5 py-0.5 bg-secondary rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}

