# Netlify 部署指南

## ✅ 部署前检查清单

- [x] 代码已推送到GitHub
- [x] netlify.toml 配置正确
- [x] @netlify/plugin-nextjs 已安装
- [x] .env.local 已在 .gitignore 中

## 🚀 快速部署步骤（5分钟）

### 步骤1: 访问Netlify并登录

1. 打开浏览器，访问：**https://app.netlify.com**
2. 点击右上角 **"Sign up"** 或 **"Log in"**
3. 选择 **"Continue with GitHub"**（推荐，自动连接GitHub仓库）

### 步骤2: 导入项目

1. 登录后，点击 **"Add new site"** → **"Import an existing project"**
2. 选择 **"GitHub"** 作为Git提供商
3. 如果首次使用，授权Netlify访问你的GitHub账号
4. 在仓库列表中找到并选择：**`Cultural-Logo-Design`**
5. 点击 **"Import"**

### 步骤3: 配置构建设置

Netlify会自动检测配置（从 `netlify.toml`），通常无需修改：

```
Build command: npm run build
Publish directory: .next
```

如果显示不正确，手动设置：
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Base directory**: `/`（默认）

### 步骤4: 配置环境变量（重要！）

在部署前，必须配置环境变量：

1. 点击 **"Environment variables"** 或 **"Show advanced"** → **"Environment variables"**
2. 点击 **"Add variable"**，逐个添加以下变量：

```
变量名: OSS_REGION
值: oss-cn-beijing

变量名: OSS_ACCESS_KEY_ID
值: 你的AccessKey ID

变量名: OSS_ACCESS_KEY_SECRET
值: 你的AccessKey Secret

变量名: OSS_BUCKET
值: innermongolia-images-2025

变量名: QWEN_API_KEY
值: 你的通义千问API Key

变量名: DOUBAO_API_KEY
值: 你的豆包API Key

变量名: NODE_ENV
值: production
```

3. 添加完所有变量后，点击 **"Deploy site"**

### 步骤5: 等待部署完成

1. 部署过程需要 **3-5分钟**
2. 可以在部署日志中查看进度
3. 部署成功后，会显示：
   - ✅ **Site is live**
   - 你的网站URL：`https://your-project-name.netlify.app`

### 步骤6: 访问网站

点击网站URL，测试功能是否正常。

---

## 🔧 部署后配置

### 自定义域名（可选）

1. 在Netlify项目页面，点击 **"Domain settings"**
2. 点击 **"Add custom domain"**
3. 输入你的域名（如：`yourdomain.com`）
4. 按照Netlify提示配置DNS解析
5. SSL证书会自动配置（Let's Encrypt）

### 自动部署设置

- ✅ 默认已启用：每次推送到GitHub的 `main` 分支，Netlify会自动重新部署
- 可以在 **"Site settings"** → **"Build & deploy"** 中修改

---

## 📋 环境变量配置清单

复制以下内容，在Netlify中逐个添加：

```
OSS_REGION=oss-cn-beijing
OSS_ACCESS_KEY_ID=your-access-key-id
OSS_ACCESS_KEY_SECRET=your-access-key-secret
OSS_BUCKET=innermongolia-images-2025
QWEN_API_KEY=your-qwen-api-key
DOUBAO_API_KEY=your-doubao-api-key
NODE_ENV=production
```

---

## 🆘 常见问题

### Q1: 构建失败？

**检查**：
- 环境变量是否全部配置
- 构建日志中的错误信息
- Node.js版本是否正确（需要20.x）

### Q2: API调用失败？

**检查**：
- API密钥是否正确配置
- 环境变量名称是否正确（区分大小写）
- API服务是否正常

### Q3: 图片无法加载？

**检查**：
- OSS配置是否正确
- 图片URL是否可以访问
- CORS设置是否正确

### Q4: 如何查看部署日志？

在Netlify项目页面：
- 点击 **"Deploys"** 标签
- 点击具体的部署记录
- 查看 **"Deploy log"**

---

## 📊 部署状态检查

部署成功后，检查以下功能：

- [ ] 网站可以正常访问
- [ ] 关键词提取功能正常
- [ ] 图片搜索功能正常
- [ ] Logo生成功能正常
- [ ] 图片可以正常显示

---

## 🔗 相关链接

- **Netlify控制台**: https://app.netlify.com
- **GitHub仓库**: https://github.com/nanaham482-jpg/Cultural-Logo-Design
- **Netlify文档**: https://docs.netlify.com/

---

**部署完成后，记得更新README.md中的在线演示链接！**

