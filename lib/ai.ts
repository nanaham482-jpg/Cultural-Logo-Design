// 使用HTTP请求直接调用阿里云通义千问API

// 从用户输入提取关键词/标签
export async function extractKeywords(userInput: string): Promise<string[]> {
  try {
    const apiKey = process.env.QWEN_API_KEY;
    if (!apiKey) {
      throw new Error("QWEN_API_KEY未配置");
    }

    // 调用通义千问文本生成API
    const response = await fetch(
      "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "qwen-plus", // 使用通义千问Plus模型
          input: {
            messages: [
              {
                role: "system",
                content: `你是一个关键词提取助手，专门用于从用户输入中提取与图片标签匹配的关键词。

图片标签库包含以下类型的标签：
- 建筑类型：清真寺、寺庙、古建筑、中式建筑、藏式建筑、传统建筑等
- 文化主题：伊斯兰、宗教、佛教、藏传佛教、传统文化、宗教文化等
- 装饰元素：彩绘、砖雕、木雕、浮雕、龙纹、莲花、经幡、法轮等
- 颜色：蓝色、金色、红色、绿色、灰色、白色等
- 风格特征：庄严、吉祥、祈福、传统、文化传承等

请从用户输入中提取3-5个关键词，这些关键词应该能够匹配到图片标签库中的标签。优先提取：
1. 文化/宗教主题（如：伊斯兰、清真、佛教、寺庙等）
2. 建筑风格（如：中式、传统、藏式等）
3. 装饰元素（如：龙、莲花、彩绘等）
4. 风格特征（如：庄严、吉祥等）

返回格式：只返回关键词，用逗号分隔，不要其他解释。`,
              },
              {
                role: "user",
                content: `请从以下文本中提取关键词：${userInput}`,
              },
            ],
          },
          parameters: {
            temperature: 0.3, // 降低温度以获得更准确的关键词
            max_tokens: 150,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API请求失败:", response.status, errorText);
      throw new Error(`API请求失败: ${response.status}`);
    }

    const data = await response.json();
    const keywordsText =
      data.output?.choices?.[0]?.message?.content ||
      data.output?.text ||
      data.output?.result?.text ||
      "";

    console.log("AI提取的原始关键词文本:", keywordsText);

    // 清理和提取关键词
    let keywords = keywordsText
      .split(/[,，、\n]/) // 支持多种分隔符
      .map((k: string) => k.trim())
      .filter((k: string) => k.length > 0)
      .filter((k: string) => {
        // 过滤掉一些无意义的词
        const lowerK = k.toLowerCase();
        return !["关键词", "标签", "包括", "例如", "如", "的", "和", "与"].includes(lowerK);
      });

    // 如果提取的关键词为空，使用降级方案
    if (keywords.length === 0) {
      console.warn("AI未提取到关键词，使用降级方案");
      keywords = extractKeywordsFallback(userInput);
    }

    console.log("最终提取的关键词:", keywords);
    return keywords;
  } catch (error) {
    console.error("关键词提取错误:", error);
    // 降级处理：简单的关键词提取
    return extractKeywordsFallback(userInput);
  }
}

// 降级关键词提取（当AI服务不可用时）
function extractKeywordsFallback(input: string): string[] {
  const keywords: string[] = [];
  const lowerInput = input.toLowerCase();

  // 扩展的关键词映射，基于 images.json 中的实际标签
  const keywordMap: Record<string, string[]> = {
    伊斯兰: ["伊斯兰", "islam", "islamic", "穆斯林", "muslim"],
    清真: ["清真", "清真寺", "mosque"],
    寺庙: ["寺庙", "temple", "寺", "大召", "无量寺", "召"],
    佛教: ["佛教", "buddhism", "buddhist", "佛", "藏传佛教"],
    传统: ["传统", "traditional", "classic", "古典"],
    中式: ["中式", "chinese", "中国", "china"],
    藏式: ["藏式", "tibetan", "藏传"],
    蒙古: ["蒙古", "mongolia", "mongolian", "蒙古族"],
    现代: ["现代", "modern", "contemporary"],
    简约: ["简约", "minimal", "simple", "简洁"],
    彩绘: ["彩绘", "painted", "colorful"],
    龙: ["龙", "dragon", "龙纹"],
    莲花: ["莲花", "lotus", "莲"],
    经幡: ["经幡", "prayer flag"],
    法轮: ["法轮", "dharma wheel"],
    金色: ["金色", "gold", "golden"],
    蓝色: ["蓝色", "blue"],
    红色: ["红色", "red"],
    绿色: ["绿色", "green"],
    庄严: ["庄严", "solemn", "dignified"],
    吉祥: ["吉祥", "auspicious", "lucky"],
    祈福: ["祈福", "prayer", "blessing"],
  };

  for (const [key, values] of Object.entries(keywordMap)) {
    if (values.some((v) => lowerInput.includes(v.toLowerCase()))) {
      keywords.push(key);
    }
  }

  // 如果还是没找到，尝试直接提取输入中的关键词
  if (keywords.length === 0) {
    // 提取中文词汇
    const chineseWords = input.match(/[\u4e00-\u9fa5]+/g) || [];
    keywords.push(...chineseWords.slice(0, 5));
  }

  return keywords.length > 0 ? keywords : ["传统", "文化"];
}

// 图生图生成Logo（使用豆包Seedream图像生成模型）
export async function generateLogo(
  imageUrl: string,
  styleDescription: string
): Promise<string> {
  try {
    const apiKey = process.env.DOUBAO_API_KEY;
    if (!apiKey) {
      throw new Error("DOUBAO_API_KEY未配置");
    }

    // 构建提示词：结合参考图片和风格描述
    const prompt = `基于参考图片的风格，创建一个logo设计。要求：${styleDescription}。参考图片风格：${imageUrl}。生成一个简洁、专业的logo，适合商业使用。`;

    console.log("调用豆包图像生成API，prompt:", prompt);

    // 调用豆包图像生成API
    const response = await fetch(
      "https://ark.cn-beijing.volces.com/api/v3/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "doubao-seedream-4-0-250828",
          prompt: prompt,
          size: "1024x1024", // 生成1024x1024的图片
          n: 1, // 生成1张图片
          response_format: "url", // 返回URL格式
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API请求失败:", response.status, errorText);
      throw new Error(`API请求失败: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("API响应数据:", JSON.stringify(data, null, 2));

    // 豆包API通常直接返回图片URL（同步模式）
    const imageUrl_result =
      data.data?.[0]?.url ||
      data.images?.[0]?.url ||
      data.url ||
      data.data?.[0]?.image_url ||
      "";

    if (imageUrl_result) {
      console.log("图像生成成功，URL:", imageUrl_result);
      return imageUrl_result;
    }

    // 如果没有直接返回URL，检查是否有错误
    if (data.error) {
      throw new Error(`图像生成失败: ${data.error.message || JSON.stringify(data.error)}`);
    }

    throw new Error("Logo生成失败：未获取到图片URL，响应数据: " + JSON.stringify(data));
  } catch (error) {
    console.error("Logo生成错误:", error);
    // 返回模拟的logo URL（用于开发测试）
    return "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=1024";
  }
}
