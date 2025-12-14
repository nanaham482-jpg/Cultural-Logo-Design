# 项目设置说明

## ✅ 已完成的操作

1. ✅ 项目依赖已安装完成
2. ✅ 开发服务器已启动（后台运行）

## 📝 需要配置的环境变量

由于 `.env.local` 文件被 git 忽略（出于安全考虑），您需要手动创建该文件：

### 创建 `.env.local` 文件

在项目根目录创建 `.env.local` 文件，内容如下：

```env
# 阿里云OSS配置
OSS_REGION=oss-cn-hangzhou
OSS_ACCESS_KEY_ID=your-access-key-id
OSS_ACCESS_KEY_SECRET=your-access-key-secret
OSS_BUCKET=your-bucket-name

# OpenAI API配置
OPENAI_API_KEY=sk-your-openai-api-key
```

### 配置说明

1. **OSS配置**：
   - `OSS_REGION`: 您的OSS区域，例如 `oss-cn-hangzhou`、`oss-cn-beijing` 等
   - `OSS_ACCESS_KEY_ID`: 阿里云AccessKey ID
   - `OSS_ACCESS_KEY_SECRET`: 阿里云AccessKey Secret
   - `OSS_BUCKET`: OSS存储桶名称

2. **OpenAI配置**：
   - `OPENAI_API_KEY`: 您的OpenAI API密钥（以 `sk-` 开头）

## 🚀 访问应用

开发服务器应该已经在运行，访问：
- **本地地址**: http://localhost:3000

如果服务器未启动，可以手动运行：
```bash
npm run dev
```

## 🧪 测试模式

如果暂时没有配置OSS和OpenAI API密钥，应用会使用模拟数据进行测试：
- 图片搜索会返回示例图片
- Logo生成会返回示例Logo

这样您可以在没有完整配置的情况下测试UI和交互流程。

## 📌 注意事项

1. 环境变量配置后需要重启开发服务器才能生效
2. 确保OSS存储桶中有图片文件，并且文件名包含相关标签关键词
3. OpenAI API需要有效的API密钥和足够的配额

