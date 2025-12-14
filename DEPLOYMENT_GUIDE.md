# 网站部署指南 - 最简单经济快速方案

## 🎯 推荐方案对比

| 方案 | 成本 | 难度 | 速度 | 推荐度 |
|------|------|------|------|--------|
| **Netlify（免费）** | ¥0/月 | ⭐ 极简单 | ⭐⭐⭐ 最快 | ⭐⭐⭐⭐⭐ |
| **Vercel（免费）** | ¥0/月 | ⭐ 极简单 | ⭐⭐⭐ 最快 | ⭐⭐⭐⭐⭐ |
| **轻量应用服务器** | ¥100-150/月 | ⭐⭐ 简单 | ⭐⭐ 较快 | ⭐⭐⭐⭐ |
| **ECS云服务器** | ¥300-500/月 | ⭐⭐⭐ 中等 | ⭐⭐ 较快 | ⭐⭐⭐ |

---

## 方案一：Netlify部署（推荐 - 最简单免费）

### ✅ 优点
- **完全免费**（个人项目）
- **5分钟部署完成**
- **自动HTTPS**
- **全球CDN加速**
- **自动部署（Git推送即部署）**
- **100GB带宽/月（免费版）**
- **300分钟构建时间/月（免费版）**

### ⚠️ 注意事项
- API路由有执行时间限制（10秒免费版，26秒Pro版）
- 需要将代码推送到GitHub/GitLab/Bitbucket
- 需要安装 `@netlify/plugin-nextjs` 插件

### 📋 部署步骤（5分钟）

#### 步骤1: 安装Netlify插件

```bash
# 安装Netlify Next.js插件
npm install --save-dev @netlify/plugin-nextjs
```

#### 步骤2: 准备代码仓库

```bash
# 1. 初始化Git（如果还没有）
git init

# 2. 确保 .gitignore 包含 .env.local

# 3. 提交代码（包括 netlify.toml）
git add .
git commit -m "Initial commit"

# 4. 推送到GitHub/GitLab/Bitbucket
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

#### 步骤3: 部署到Netlify

1. **访问 Netlify**
   - 打开 https://app.netlify.com
   - 使用GitHub/GitLab/Bitbucket账号登录

2. **导入项目**
   - 点击 "Add new site" → "Import an existing project"
   - 选择你的Git仓库（GitHub/GitLab/Bitbucket）
   - 点击 "Import"

3. **配置构建设置**
   ```
   Build command: npm run build
   Publish directory: .next
   ```
   （通常会自动检测，无需修改）

4. **配置环境变量**
   点击 "Environment variables" → "Add variable"，添加：
   ```
   OSS_REGION=oss-cn-beijing
   OSS_ACCESS_KEY_ID=your-access-key-id
   OSS_ACCESS_KEY_SECRET=your-access-key-secret
   OSS_BUCKET=your-bucket-name
   QWEN_API_KEY=your-qwen-api-key
   DOUBAO_API_KEY=your-doubao-api-key
   NODE_ENV=production
   ```

5. **点击 Deploy site**
   - 等待3-5分钟构建完成
   - 部署完成后获得域名：`your-project.netlify.app`

#### 步骤4: 自定义域名（可选）

1. 在Netlify项目设置 → Domain settings
2. 点击 "Add custom domain"
3. 输入您的域名
4. 配置DNS解析（按Netlify提示）
5. 自动获得SSL证书

### 💰 成本：**完全免费**

### 📝 Netlify vs Vercel 对比

| 特性 | Netlify | Vercel |
|------|---------|--------|
| **免费带宽** | 100GB/月 | 100GB/月 |
| **构建时间** | 300分钟/月 | 6000分钟/月 |
| **API执行时间** | 10秒（免费）| 10秒（免费）|
| **Next.js支持** | ✅ 需要插件 | ✅ 原生支持 |
| **部署速度** | 快 | 很快 |
| **界面** | 友好 | 非常友好 |

**结论**: 两者都很优秀，Netlify和Vercel都可以选择！

---

## 方案二：Vercel部署（推荐 - 最简单免费）

### ✅ 优点
- **完全免费**（个人项目）
- **5分钟部署完成**
- **自动HTTPS**
- **全球CDN加速**
- **自动部署（Git推送即部署）**

### ⚠️ 注意事项
- API路由有执行时间限制（10秒）
- 免费版有流量限制（100GB/月）
- 需要将代码推送到GitHub/GitLab

### 📋 部署步骤（5分钟）

#### 步骤1: 准备代码仓库

```bash
# 1. 初始化Git（如果还没有）
git init

# 2. 创建 .gitignore（确保已包含）
# 确保 .env.local 在 .gitignore 中

# 3. 提交代码
git add .
git commit -m "Initial commit"

# 4. 推送到GitHub
# 在GitHub创建新仓库，然后：
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

#### 步骤2: 部署到Vercel

1. **访问 Vercel**
   - 打开 https://vercel.com
   - 使用GitHub账号登录

2. **导入项目**
   - 点击 "Add New Project"
   - 选择你的GitHub仓库
   - 点击 "Import"

3. **配置环境变量**
   ```
   OSS_REGION=oss-cn-beijing
   OSS_ACCESS_KEY_ID=your-access-key-id
   OSS_ACCESS_KEY_SECRET=your-access-key-secret
   OSS_BUCKET=your-bucket-name
   QWEN_API_KEY=your-qwen-api-key
   DOUBAO_API_KEY=your-doubao-api-key
   ```

4. **部署设置**
   - Framework Preset: Next.js（自动检测）
   - Root Directory: `./`（默认）
   - Build Command: `npm run build`（默认）
   - Output Directory: `.next`（默认）

5. **点击 Deploy**
   - 等待2-3分钟
   - 部署完成后获得域名：`your-project.vercel.app`

#### 步骤3: 自定义域名（可选）

1. 在Vercel项目设置中添加域名
2. 配置DNS解析（A记录或CNAME）
3. 自动获得SSL证书

### 💰 成本：**完全免费**

---

## 方案二：轻量应用服务器部署（推荐 - 经济实用）

### ✅ 优点
- **成本低**（¥100-150/月）
- **性能稳定**
- **完全控制**
- **适合长期使用**

### 📋 部署步骤（30分钟）

#### 步骤1: 购买服务器

1. **访问阿里云轻量应用服务器**
   - https://swas.console.aliyun.com/

2. **选择配置**
   ```
   CPU: 2核
   内存: 4GB
   系统盘: 60GB SSD
   带宽: 5Mbps
   流量: 2000GB/月
   地域: 北京（与OSS同地域）
   镜像: Ubuntu 22.04 LTS
   ```

3. **购买**（约¥100-150/月）

#### 步骤2: 连接服务器

```bash
# Windows使用PowerShell或PuTTY
ssh root@your-server-ip

# 输入root密码
```

#### 步骤3: 安装环境（一键脚本）

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装PM2
sudo npm install -g pm2

# 安装Nginx
sudo apt install -y nginx

# 验证安装
node --version  # 应显示 v20.x.x
npm --version
pm2 --version
nginx -v
```

#### 步骤4: 部署项目

**方法A: 使用Git（推荐）**

```bash
# 1. 安装Git
sudo apt install -y git

# 2. 克隆项目
cd /var/www
sudo git clone https://github.com/your-username/your-repo.git cultural-design-web
cd cultural-design-web

# 3. 安装依赖
sudo npm install

# 4. 创建环境变量文件
sudo nano .env.local
```

添加环境变量：
```env
OSS_REGION=oss-cn-beijing
OSS_ACCESS_KEY_ID=your-access-key-id
OSS_ACCESS_KEY_SECRET=your-access-key-secret
OSS_BUCKET=your-bucket-name
QWEN_API_KEY=your-qwen-api-key
DOUBAO_API_KEY=your-doubao-api-key
NODE_ENV=production
```

```bash
# 5. 构建项目
sudo npm run build

# 6. 启动应用
pm2 start npm --name "cultural-design" -- start

# 7. 保存PM2配置
pm2 save
pm2 startup
# 执行输出的命令（通常是 sudo env PATH=...）
```

**方法B: 使用SCP上传（如果不用Git）**

```bash
# 在本地Windows PowerShell执行
# 1. 构建项目
npm run build

# 2. 上传项目（排除node_modules）
scp -r ./CulturaldesignWeb root@your-server-ip:/var/www/
```

然后在服务器上：
```bash
cd /var/www/CulturaldesignWeb
npm install --production
npm run build
# 创建 .env.local（同上）
pm2 start npm --name "cultural-design" -- start
pm2 save
pm2 startup
```

#### 步骤5: 配置Nginx

```bash
# 编辑Nginx配置
sudo nano /etc/nginx/sites-available/default
```

替换为以下配置：

```nginx
server {
    listen 80;
    server_name your-domain.com;  # 替换为您的域名或IP

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# 测试配置
sudo nginx -t

# 重启Nginx
sudo systemctl restart nginx

# 设置开机自启
sudo systemctl enable nginx
```

#### 步骤6: 配置防火墙

```bash
# 开放端口
sudo ufw allow 22    # SSH
sudo ufw allow 80     # HTTP
sudo ufw allow 443    # HTTPS（如果使用SSL）

# 启用防火墙
sudo ufw enable
```

#### 步骤7: 配置SSL（可选但推荐）

```bash
# 安装Certbot
sudo apt install -y certbot python3-certbot-nginx

# 获取证书（替换为您的域名）
sudo certbot --nginx -d your-domain.com

# 自动续期测试
sudo certbot renew --dry-run
```

### 💰 成本：**¥100-150/月**

---

## 方案三：Netlify/Vercel + 自定义域名（最佳性价比）

### 推荐组合
- **Vercel免费托管** + **域名（¥50-100/年）**

### 步骤

1. **按方案一部署到Netlify或Vercel**
2. **购买域名**（阿里云/腾讯云等）
3. **在Netlify/Vercel添加自定义域名**
4. **配置DNS解析**

### 💰 成本：**¥50-100/年**（仅域名费用）

---

## 🚀 快速部署检查清单

### Netlify/Vercel部署
- [ ] GitHub仓库已创建
- [ ] 代码已推送
- [ ] Vercel账号已注册
- [ ] 项目已导入
- [ ] 环境变量已配置
- [ ] 部署成功
- [ ] 网站可访问

### 服务器部署
- [ ] 服务器已购买
- [ ] SSH可以连接
- [ ] Node.js已安装
- [ ] PM2已安装
- [ ] Nginx已安装
- [ ] 项目已部署
- [ ] 环境变量已配置
- [ ] PM2已启动
- [ ] Nginx已配置
- [ ] 防火墙已配置
- [ ] 网站可访问

---

## 📊 方案选择建议

### 选择Netlify/Vercel如果：
- ✅ 预算有限（免费）
- ✅ 需要快速上线
- ✅ 代码在GitHub上
- ✅ 流量不大（<100GB/月）
- ✅ API调用时间短（<10秒）

### 选择轻量应用服务器如果：
- ✅ 需要完全控制
- ✅ 流量较大
- ✅ 需要长时间运行
- ✅ 有预算（¥100-150/月）
- ✅ 需要自定义配置

---

## 🔧 部署后维护

### 更新代码（Netlify/Vercel）
```bash
# 本地修改代码
git add .
git commit -m "Update"
git push

# Vercel自动部署
```

### 更新代码（服务器）
```bash
# SSH连接服务器
ssh root@your-server-ip

# 进入项目目录
cd /var/www/cultural-design-web

# 拉取最新代码
git pull

# 安装新依赖（如果有）
npm install

# 重新构建
npm run build

# 重启应用
pm2 restart cultural-design

# 查看日志
pm2 logs cultural-design
```

---

## 🆘 常见问题

### Q1: Netlify/Vercel部署后API调用失败？
**A**: 检查环境变量是否正确配置，确保API密钥有效。

### Q2: 服务器部署后无法访问？
**A**: 
- 检查防火墙是否开放80端口
- 检查Nginx是否运行：`sudo systemctl status nginx`
- 检查应用是否运行：`pm2 status`
- 查看日志：`pm2 logs` 和 `sudo tail -f /var/log/nginx/error.log`

### Q3: 如何查看服务器资源使用？
**A**: 
```bash
# CPU和内存
htop

# 磁盘使用
df -h

# PM2监控
pm2 monit
```

---

## 📞 推荐方案

**对于您的项目，我推荐：**

### 🥇 首选：Netlify/Vercel（免费，最简单）
- 5分钟部署完成
- 完全免费
- 自动HTTPS和CDN
- 适合快速上线

### 🥈 备选：轻量应用服务器（经济实用）
- ¥100-150/月
- 完全控制
- 适合长期使用

---

**立即开始部署：**

1. **最快方案**：使用Netlify或Vercel，5分钟上线
2. **经济方案**：使用轻量应用服务器，30分钟部署

需要我帮您选择具体方案并指导部署吗？

