# GitHub推送操作指南

## 📋 快速推送步骤

### 1. 检查Git状态

```bash
git status
```

### 2. 添加所有更改的文件

```bash
git add .
```

### 3. 提交更改

```bash
git commit -m "你的提交信息"
```

例如：
```bash
git commit -m "更新README文档"
git commit -m "修复图片搜索匹配问题"
git commit -m "添加新功能"
```

### 4. 推送到GitHub

```bash
git push -u origin main
```

首次推送后，之后只需要：
```bash
git push
```

---

## 🔄 完整工作流程

### 日常开发流程

```bash
# 1. 修改代码后，查看更改
git status

# 2. 添加更改的文件
git add .

# 或者只添加特定文件
git add README.md
git add lib/oss.ts

# 3. 提交更改
git commit -m "描述你的更改"

# 4. 推送到GitHub
git push
```

### 首次推送（已完成）

```bash
# ✅ 已完成：
# 1. git init                    # 初始化仓库
# 2. git add .                   # 添加所有文件
# 3. git commit -m "..."         # 提交
# 4. git remote add origin ...   # 添加远程仓库
# 5. git branch -M main          # 重命名分支

# 现在只需要推送：
git push -u origin main
```

---

## 🆘 常见问题

### Q1: 推送时提示需要认证？

**A**: GitHub现在使用Personal Access Token（PAT）而不是密码。

1. 生成Token：
   - 访问：https://github.com/settings/tokens
   - 点击 "Generate new token (classic)"
   - 选择权限：`repo`（完整仓库权限）
   - 生成并复制Token

2. 推送时使用Token作为密码：
   ```bash
   git push -u origin main
   # Username: 你的GitHub用户名
   # Password: 粘贴你的Token（不是密码）
   ```

### Q2: 推送失败，提示需要先拉取？

**A**: 如果GitHub仓库已有内容，需要先合并：

```bash
# 拉取远程更改
git pull origin main --allow-unrelated-histories

# 解决冲突（如果有）
# 然后推送
git push -u origin main
```

### Q3: 如何查看提交历史？

```bash
git log
git log --oneline  # 简洁版本
```

### Q4: 如何撤销最后一次提交？

```bash
# 保留文件更改，只撤销提交
git reset --soft HEAD~1

# 完全撤销提交和更改（谨慎使用）
git reset --hard HEAD~1
```

---

## 📝 提交信息规范

建议使用清晰的提交信息：

```bash
# 功能添加
git commit -m "feat: 添加图片搜索匹配度评分系统"

# 问题修复
git commit -m "fix: 修复JSON解析错误"

# 文档更新
git commit -m "docs: 更新README文档"

# 代码重构
git commit -m "refactor: 优化图片搜索算法"

# 样式调整
git commit -m "style: 调整UI布局"
```

---

## 🎯 你的仓库信息

- **仓库地址**: https://github.com/nanaham482-jpg/Cultural-Logo-Design
- **分支**: main
- **远程名称**: origin

---

## ✅ 现在可以推送了

执行以下命令：

```bash
git push -u origin main
```

如果遇到认证问题，请参考上面的"常见问题"部分。

