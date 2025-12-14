# 🎨 智能Logo设计助手

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**基于AI技术的智能Logo设计生成平台，融合非遗文化元素与现代设计**

[快速开始](#快速开始) • [功能特性](#功能特性) • [在线演示](#在线演示) • [部署指南](#部署指南)

</div>

---

## 📖 项目简介

智能Logo设计助手是一个创新的Web应用，通过AI技术帮助用户快速生成融合非遗文化元素的Logo设计。系统使用自然语言理解用户需求，智能匹配非遗文化图片库，并基于选中的参考图片生成现代风格的Logo设计。

### ✨ 核心亮点

- 🎯 **AI驱动**：使用通义千问和豆包AI，理解自然语言并生成设计
- 🏛️ **文化传承**：集成5000+非遗文化图片，支持蒙古族、藏式、伊斯兰等多种文化类型
- 🔍 **智能匹配**：匹配度评分系统，确保推荐结果的文化相关性
- 💡 **创意融合**：将传统非遗文化元素与现代设计风格完美结合

## ✨ 功能特性

| 功能 | 描述 |
|------|------|
| 🤖 **AI关键词提取** | 使用阿里云通义千问从用户自然语言输入中智能提取设计关键词 |
| 🖼️ **智能图片推荐** | 基于关键词从5000+非遗文化图片库中匹配相关图片（匹配度评分系统） |
| 🎨 **Logo生成** | 使用字节跳动豆包AI，基于参考图片和风格描述生成Logo设计 |
| 💬 **聊天式交互** | 类似ChatGPT的对话体验，简单直观的用户界面 |
| 📥 **Logo下载** | 支持下载生成的Logo，支持多种格式 |
| 🏛️ **文化知识库** | 涵盖蒙古族、藏式、伊斯兰等多种非遗文化类型 |
| 🔍 **智能搜索** | 精确匹配、部分匹配、同义词匹配三重算法，确保结果准确性 |

## 🛠️ 技术栈

### 前端框架
- **Next.js 15** - React全栈框架（App Router）
- **TypeScript** - 类型安全的JavaScript
- **TailwindCSS** - 实用优先的CSS框架
- **shadcn/ui** - 高质量UI组件库

### AI服务
- **阿里云通义千问** (`qwen-plus`) - 自然语言理解与关键词提取
- **字节跳动豆包** (`doubao-seedream-4-0-250828`) - 图像生成与Logo设计

### 数据存储
- **阿里云OSS** - 图片文件存储
- **JSON文件** - 图片元数据和标签库（5000+条记录）

### 部署平台
- **Netlify** / **Vercel** - 免费托管（推荐）
- **轻量应用服务器** - 自托管方案

## 🚀 快速开始

### 前置要求

- Node.js 20.x 或更高版本
- npm 9.x 或更高版本
- Git（用于克隆仓库）

### 安装步骤

#### 1. 克隆仓库

```bash
git clone https://github.com/your-username/cultural-design-web.git
cd cultural-design-web
```

#### 2. 安装依赖

```bash
npm install
```

#### 3. 配置环境变量

创建 `.env.local` 文件：

```bash
cp .env.example .env.local
```

编辑 `.env.local` 并填入您的配置：

```env
# 阿里云OSS配置（可选，用于图片存储）
OSS_REGION=oss-cn-beijing
OSS_ACCESS_KEY_ID=your-access-key-id
OSS_ACCESS_KEY_SECRET=your-access-key-secret
OSS_BUCKET=your-bucket-name

# 阿里云通义千问API配置（关键词提取）
QWEN_API_KEY=your-qwen-api-key

# 字节跳动豆包API配置（Logo生成）
DOUBAO_API_KEY=your-doubao-api-key
```

> 💡 **提示**: 如果不配置API密钥，系统会使用降级方案（关键词匹配和模拟数据）进行测试。

#### 4. 运行开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 📦 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
├── app/
│   ├── api/              # API路由
│   │   ├── extract-keywords/  # 关键词提取API
│   │   ├── search-images/     # 图片搜索API
│   │   └── generate-logo/     # Logo生成API
│   ├── layout.tsx        # 根布局
│   ├── page.tsx          # 主页面
│   └── globals.css       # 全局样式
├── components/
│   ├── ui/               # shadcn/ui组件
│   ├── chat-input.tsx    # 聊天输入组件
│   ├── message-list.tsx  # 消息列表组件
│   ├── image-grid.tsx    # 图片网格组件
│   └── logo-result.tsx   # Logo结果组件
├── lib/
│   ├── ai.ts            # AI服务封装
│   ├── oss.ts           # OSS服务封装
│   ├── types.ts         # TypeScript类型定义
│   └── utils.ts         # 工具函数
└── package.json
```

## 📱 使用流程

```
用户输入需求 → AI提取关键词 → 搜索匹配图片 → 选择参考图片 
    → 输入风格描述 → 生成Logo → 下载Logo
```

### 详细步骤

1. **💬 输入需求**
   - 在聊天框输入您的设计需求
   - 例如："我想做一个蒙古风格的logo"

2. **🤖 AI提取关键词**
   - 系统使用通义千问AI理解您的需求
   - 自动提取关键词：`["蒙古", "传统", "草原"]`

3. **🖼️ 智能图片推荐**
   - 系统从5000+非遗文化图片库中搜索
   - 使用匹配度评分系统，返回最相关的图片（最多20张）

4. **✅ 选择参考图片**
   - 浏览推荐的图片
   - 点击选中一张作为设计参考

5. **✍️ 输入风格描述**
   - 描述您想要的现代设计风格
   - 例如："现代简约、扁平化、柔和的线条"

6. **🎨 生成Logo**
   - 系统调用豆包AI，融合参考图片的文化元素和您的风格描述
   - 生成融合传统与现代的Logo设计

7. **📥 下载Logo**
   - 查看生成的Logo
   - 点击下载按钮保存设计

## 开发说明

### 图片数据管理

图片数据存储在 `data/images.json` 文件中，包含以下字段：
- `image_url`: 图片的完整URL地址
- `tags`: 图片标签数组
- `status`: 状态（success/failed）

详细说明请参考 [README_DATA.md](./README_DATA.md)

### 图片搜索机制

系统使用**匹配度评分系统**进行图片搜索：

- **精确匹配**：10分（标签完全一致）
- **部分匹配**：5分（标签包含关键词）
- **同义词匹配**：2-3分（仅在原始标签无法匹配时使用）
- **排序规则**：按匹配度降序排序，返回最多20张图片
- **匹配要求**：至少匹配一个原始搜索标签

### AI服务

当前使用的AI服务：

- **关键词提取**：阿里云通义千问（qwen-plus）
  - API端点：`https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation`
  - 功能：从用户输入中提取与图片标签匹配的关键词

- **Logo生成**：字节跳动豆包（doubao-seedream-4-0-250828）
  - API端点：`https://ark.cn-beijing.volces.com/api/v3/images/generations`
  - 功能：基于参考图片和风格描述生成Logo

你也可以替换为其他AI服务，只需修改 `lib/ai.ts` 中的实现。

## 🌐 在线演示

> 🚀 **在线体验**: [https://your-project.netlify.app](https://your-project.netlify.app)  
> （部署后更新此链接）

## 📦 部署指南

### 方案一：Netlify部署（推荐 - 免费，5分钟）

1. **准备代码仓库**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **部署到Netlify**
   - 访问 [Netlify](https://app.netlify.com)
   - 使用GitHub账号登录
   - 点击 "Add new site" → "Import an existing project"
   - 选择您的仓库
   - 配置环境变量（QWEN_API_KEY、DOUBAO_API_KEY等）
   - 点击 "Deploy site"

3. **完成**
   - 等待3-5分钟构建完成
   - 获得域名：`your-project.netlify.app`

### 方案二：Vercel部署（免费，5分钟）

1. **访问 [Vercel](https://vercel.com)**
2. **使用GitHub账号登录**
3. **导入项目** → 选择仓库
4. **配置环境变量**
5. **点击 Deploy**

### 方案三：自托管部署

详细步骤请参考 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

> 💡 **推荐**: 对于个人项目，Netlify或Vercel是最简单、最经济的方案（完全免费）

## 📚 项目文档

| 文档 | 说明 |
|------|------|
| [SYSTEM_WORKFLOW.md](./SYSTEM_WORKFLOW.md) | 📖 完整的系统工作流文档（架构、数据流、技术实现） |
| [WORKFLOW_DIAGRAM.md](./WORKFLOW_DIAGRAM.md) | 📊 可视化流程图和架构图 |
| [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) | 🚀 详细部署指南（Netlify/Vercel/服务器） |
| [README_DATA.md](./README_DATA.md) | 📁 图片数据管理说明 |
| [CONFIG.md](./CONFIG.md) | ⚙️ 配置说明和API文档 |

## 🏛️ 核心价值：非遗文化数字化转化

本项目致力于通过技术手段实现非遗文化的数字化保护、传播和创新。

### 数字化转化流程

```
物理世界 → 数字化采集 → 标签化整理 → 知识图谱构建
   ↓
AI语义理解 → 智能匹配 → 创意设计生成 → 数字产品
```

### 实现方式

1. **📸 数字化采集**
   - 将非遗文化实物（建筑、工艺品、服饰等）拍摄成数字图片
   - 上传到阿里云OSS，建立永久数字档案库

2. **🏷️ 标签化整理**
   - 多维度标签体系：文化类型、建筑类型、装饰元素、颜色、风格特征
   - 建立完整的非遗文化知识库（**5000+条记录**）

3. **🕸️ 知识图谱构建**
   - 同义词映射表，建立文化元素之间的语义关联
   - 形成文化知识网络，便于检索和理解

4. **🤖 AI语义理解**
   - 通义千问理解用户的自然语言需求
   - 智能提取文化关键词，匹配非遗文化标签库

5. **🔍 智能匹配推荐**
   - 匹配度评分系统（精确匹配10分、部分匹配5分、同义词匹配2-3分）
   - 确保推荐结果的文化相关性

6. **🎨 创意设计生成**
   - 基于非遗文化元素，结合现代设计风格
   - 豆包AI生成融合传统与现代的Logo设计

### 文化价值

| 价值维度 | 说明 |
|---------|------|
| 🛡️ **文化保护** | 数字化保存非遗文化，建立永久档案，防止文化流失 |
| 🌍 **文化传播** | 在线展示，打破地域限制，让更多人了解非遗文化 |
| 💡 **文化创新** | 将传统文化元素转化为现代设计，创造文化创意产品 |
| 📚 **文化教育** | 通过交互式体验，帮助用户了解和认识不同文化类型 |

### 支持的文化类型

- 🏛️ **宗教建筑文化**：清真大寺、大召无量寺、席力图召
- 🐎 **蒙古族文化**：蒙古包、马头琴、呼麦、传统工艺
- 🏔️ **藏式文化**：藏式建筑、经幡、法轮、传统纹样
- 🎨 **传统工艺**：彩绘、砖雕、木雕、刺绣、皮雕
- 🎵 **民族音乐**：马头琴、四胡、潮尔、阿斯尔

## 🧪 开发说明

### 图片搜索机制

系统使用**匹配度评分系统**进行图片搜索：

- **精确匹配**：10分（标签完全一致）
- **部分匹配**：5分（标签包含关键词）
- **同义词匹配**：2-3分（仅在原始标签无法匹配时使用）
- **排序规则**：按匹配度降序排序，返回最多20张图片
- **匹配要求**：至少匹配一个原始搜索标签

### AI服务配置

- **关键词提取**：阿里云通义千问（qwen-plus）
- **Logo生成**：字节跳动豆包（doubao-seedream-4-0-250828）

详细API文档请参考 [CONFIG.md](./CONFIG.md)

## 🤝 贡献指南

欢迎贡献！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证。

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React全栈框架
- [TailwindCSS](https://tailwindcss.com/) - CSS框架
- [shadcn/ui](https://ui.shadcn.com/) - UI组件库
- [阿里云通义千问](https://dashscope.aliyun.com/) - AI服务
- [字节跳动豆包](https://www.volcengine.com/) - 图像生成服务

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 📧 提交 [Issue](https://github.com/your-username/cultural-design-web/issues)
- 💬 开启 [Discussion](https://github.com/your-username/cultural-design-web/discussions)

---

<div align="center">

**如果这个项目对您有帮助，请给个 ⭐ Star 支持一下！**

Made with ❤️ for Cultural Heritage Digitalization

</div>
