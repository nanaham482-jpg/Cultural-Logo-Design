# 配置说明

## ✅ 已完成的配置

### 1. 阿里云OSS配置
- **OSS_REGION**: `oss-cn-beijing`
- **OSS_ACCESS_KEY_ID**: `your-access-key-id`（请替换为您的实际值）
- **OSS_ACCESS_KEY_SECRET**: `your-access-key-secret`（请替换为您的实际值）
- **OSS_BUCKET**: `your-bucket-name`（请替换为您的实际值）

### 2. 阿里云通义千问API配置
- **QWEN_API_KEY**: `your-qwen-api-key`（请替换为您的实际值）
- **模型**: 
  - 文本生成（关键词提取）: `qwen-plus`
  - 图像生成（Logo生成）: `qwen-image-plus`

## 📋 API功能说明

### 关键词提取
- **API端点**: `https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation`
- **模型**: `qwen-plus`
- **功能**: 从用户输入中提取设计相关的关键词

### Logo生成
- **API端点**: `https://dashscope.aliyuncs.com/api/v1/services/aigc/image-generation/generation`
- **模型**: `qwen-image-plus`
- **功能**: 基于用户选择的参考图片和风格描述生成Logo
- **特点**: 异步任务，需要轮询获取结果

## 🔄 工作流程

1. 用户输入需求（如"我想做一个蒙古风格的logo"）
2. 调用通义千问文本生成API提取关键词
3. 根据关键词从OSS搜索匹配的图片
4. 用户选择参考图片
5. 用户输入风格描述
6. 调用通义千问图像生成API生成Logo（异步任务）
7. 轮询获取生成结果
8. 展示并支持下载生成的Logo

## ⚠️ 注意事项

1. **环境变量**: 配置在 `.env.local` 文件中，已添加到 `.gitignore`
2. **API密钥安全**: 请勿将 `.env.local` 文件提交到版本控制系统
3. **图像生成**: 通义千问图像生成是异步的，可能需要等待几秒到几十秒
4. **降级处理**: 如果API调用失败，系统会自动使用降级方案（关键词匹配和模拟数据）

## 🚀 重启服务器

配置更新后，需要重启开发服务器：

```bash
# 停止当前服务器（Ctrl+C）
# 然后重新启动
npm run dev
```

