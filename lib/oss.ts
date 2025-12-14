import { OSSImage } from "./types";
import imagesData from "@/data/images.json";

// 图片数据接口（匹配JSON文件结构）
interface ImageDataItem {
  image_url: string;
  tags: string[];
  status: string;
}

// 从JSON文件加载图片数据
function loadImagesData(): ImageDataItem[] {
  try {
    return imagesData as ImageDataItem[];
  } catch (error) {
    console.error("加载图片数据失败:", error);
    return [];
  }
}

// 根据标签搜索图片
export async function searchImagesByTags(tags: string[]): Promise<OSSImage[]> {
  try {
    console.log("开始搜索图片，关键词:", tags);
    
    // 从JSON文件加载图片数据
    const allImages = loadImagesData();
    console.log(`加载了 ${allImages.length} 张图片数据`);

    // 如果没有搜索标签，返回所有图片
    if (tags.length === 0) {
      console.log("没有搜索标签，返回所有图片");
      return allImages
        .filter((img) => img.status === "success" && img.tags && Array.isArray(img.tags))
        .map((img) => ({
          url: img.image_url || "",
          name: extractFileName(img.image_url || ""),
          tags: Array.isArray(img.tags) ? img.tags : [],
        }))
        .slice(0, 20);
    }

    // 同义词映射表（仅在原始标签无法匹配时使用）
    const synonymMap: Record<string, string[]> = {
      // 宗教/文化主题
      伊斯兰: ["清真寺", "阿拉伯", "穆斯林", "伊斯兰教", "清真", "星月", "新月", "阿拉伯文"],
      清真: ["清真寺", "阿拉伯", "穆斯林", "阿拉伯文"],
      佛教: ["寺庙", "藏传佛教", "藏密"],
      寺庙: ["古建筑", "传统建筑", "宗教建筑", "大召", "无量寺", "召", "古刹"],
      大召: ["无量寺", "寺庙"],
      
      // 建筑风格
      传统: ["传统建筑", "传统风格", "古建筑", "中式建筑", "传统工艺"],
      中式: ["中式建筑", "中式屋顶", "中式装饰", "中式亭阁", "中式古建筑", "中式雕花", "中式香炉"],
      藏式: ["藏式建筑", "藏式寺庙", "藏式风格", "藏式门帘", "藏式装饰", "藏式浮雕"],
      古建筑: ["传统建筑", "古典建筑", "古刹"],
      
      // 装饰元素
      彩绘: ["彩绘装饰", "古建筑彩绘", "传统建筑彩绘", "木雕彩绘", "彩绘立柱", "彩绘屋檐"],
      龙: ["龙纹", "龙柱", "龙浮雕", "金龙", "双龙浮雕", "龙形构件", "龙纹雕刻"],
      莲花: ["莲花纹样", "莲花浮雕", "莲花座"],
      经幡: ["经筒", "转经筒"],
      法轮: ["金鹿"],
      砖雕: ["浮雕", "石雕", "木雕", "雕刻"],
      
      // 颜色
      金色: ["金色装饰", "金色法轮", "金色转经筒", "金色瑞兽"],
      蓝色: ["青绿色", "淡蓝色", "灰蓝色"],
      红色: ["红墙", "红门", "红棕色"],
      绿色: ["青绿色", "绿瓦", "绿树"],
      灰色: ["灰砖", "灰蓝", "青灰"],
    };

    // 计算图片匹配度
    interface ImageWithScore {
      image: OSSImage;
      score: number;
      matchedTags: string[];
    }

    const scoredImages: ImageWithScore[] = [];

    for (const img of allImages) {
      if (img.status !== "success") continue;
      
      // 安全检查：确保tags存在且为数组
      if (!img.tags || !Array.isArray(img.tags) || img.tags.length === 0) {
        continue;
      }

      let matchScore = 0;
      const matchedTags: string[] = [];
      const imgTagsLower = img.tags.map(t => String(t || "").toLowerCase().trim());

      // 对每个搜索标签进行匹配
      for (const searchTag of tags) {
        const searchTagLower = searchTag.toLowerCase().trim();
        let tagMatched = false;

        // 1. 精确匹配（最高分）
        if (imgTagsLower.includes(searchTagLower)) {
          matchScore += 10;
          matchedTags.push(searchTag);
          tagMatched = true;
          continue;
        }

        // 2. 部分匹配（中等分）
        for (const imgTag of img.tags) {
          const imgTagLower = imgTag.toLowerCase().trim();
          
          // 完全包含匹配
          if (imgTagLower === searchTagLower) {
            matchScore += 10;
            matchedTags.push(searchTag);
            tagMatched = true;
            break;
          }
          
          // 图片标签包含搜索关键词
          if (imgTagLower.includes(searchTagLower) && searchTagLower.length >= 2) {
            matchScore += 5;
            matchedTags.push(searchTag);
            tagMatched = true;
            break;
          }
          
          // 搜索关键词包含图片标签（较短的关键词）
          if (searchTagLower.includes(imgTagLower) && imgTagLower.length >= 2) {
            matchScore += 5;
            matchedTags.push(searchTag);
            tagMatched = true;
            break;
          }
        }

        // 3. 同义词匹配（较低分，仅在原始标签无法匹配时使用）
        if (!tagMatched && synonymMap[searchTag]) {
          for (const synonym of synonymMap[searchTag]) {
            const synonymLower = synonym.toLowerCase().trim();
            if (imgTagsLower.includes(synonymLower)) {
              matchScore += 3;
              matchedTags.push(searchTag);
              tagMatched = true;
              break;
            }
            
            // 部分匹配同义词
            for (const imgTag of img.tags) {
              const imgTagLower = imgTag.toLowerCase().trim();
              if (imgTagLower.includes(synonymLower) || synonymLower.includes(imgTagLower)) {
                matchScore += 2;
                matchedTags.push(searchTag);
                tagMatched = true;
                break;
              }
            }
            
            if (tagMatched) break;
          }
        }
      }

      // 只添加有匹配的图片，并且匹配度要足够高
      // 要求至少匹配一个原始搜索标签（不是同义词）
      const originalTagMatches = matchedTags.filter(tag => tags.includes(tag)).length;
      if (matchScore > 0 && originalTagMatches > 0) {
        scoredImages.push({
          image: {
            url: img.image_url || "",
            name: extractFileName(img.image_url || ""),
            tags: Array.isArray(img.tags) ? img.tags : [],
          },
          score: matchScore,
          matchedTags: Array.from(new Set(matchedTags)),
        });
      }
    }

    // 按匹配度排序（降序）
    scoredImages.sort((a, b) => b.score - a.score);

    console.log(`搜索标签: ${tags.join(", ")}, 匹配到 ${scoredImages.length} 张图片`);
    
    // 打印前5个匹配结果用于调试
    scoredImages.slice(0, 5).forEach((item, index) => {
      console.log(`匹配 ${index + 1}: 分数=${item.score}, 匹配标签=${item.matchedTags.join(", ")}, 图片=${item.image.name}`);
    });

    if (scoredImages.length === 0) {
      console.warn("未匹配到相关图片");
      return [];
    }

    // 返回匹配度最高的图片，最多20张
    return scoredImages.slice(0, 20).map(item => item.image);
  } catch (error) {
    console.error("图片搜索错误:", error);
    // 返回模拟数据用于开发测试
    return getMockImages(tags);
  }
}

// 从URL提取文件名
function extractFileName(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const parts = pathname.split("/");
    return parts[parts.length - 1] || "unknown.jpg";
  } catch {
    // 如果URL解析失败，尝试简单提取
    const parts = url.split("/");
    return parts[parts.length - 1] || "unknown.jpg";
  }
}


// 模拟数据（用于开发和测试）
function getMockImages(tags: string[]): OSSImage[] {
  const mockImages: OSSImage[] = [
    {
      url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400",
      name: "mongolian-traditional-1.jpg",
      tags: ["蒙古", "传统"],
    },
    {
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
      name: "mongolian-landscape-1.jpg",
      tags: ["蒙古", "草原"],
    },
    {
      url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400",
      name: "mongolian-culture-1.jpg",
      tags: ["蒙古", "文化"],
    },
    {
      url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400",
      name: "modern-minimal-1.jpg",
      tags: ["现代", "简约"],
    },
    {
      url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400",
      name: "traditional-chinese-1.jpg",
      tags: ["中国", "传统"],
    },
  ];

  // 根据标签过滤
  if (tags.length === 0) {
    return mockImages;
  }

  return mockImages.filter((img) =>
    tags.some((tag) =>
      img.tags.some((imgTag) =>
        imgTag.toLowerCase().includes(tag.toLowerCase())
      )
    )
  );
}

