# GitHub + Vercel 部署详细教程 🚀

## 📋 完整流程概览

```
1. 创建 GitHub 账号（如果没有）
2. 创建新仓库
3. 上传项目文件到 GitHub
4. 连接 Vercel 到 GitHub
5. 部署项目
6. 获取链接分享
```

**预计时间**：15-20分钟（首次）  
**难度**：⭐⭐☆☆☆（跟着做很简单）

---

## 步骤一：准备 GitHub 账号

### 1.1 注册 GitHub（如果已有账号跳过此步）

1. **访问 GitHub**
   ```
   https://github.com
   ```

2. **点击右上角 "Sign up"**
   - 输入邮箱
   - 创建密码
   - 选择用户名（例如：`ryan-theace`）
   - 验证邮箱

3. **完成注册**
   - 选择免费方案（Free）
   - 填写简单问卷（可跳过）

### 1.2 登录 GitHub
```
https://github.com/login
```

---

## 步骤二：创建 GitHub 仓库

### 2.1 创建新仓库

1. **点击右上角 "+" → "New repository"**

2. **填写仓库信息**：
   ```
   Repository name: pinduoduo-confession
   （仓库名称，可以自定义）
   
   Description: 拼多多风格表白网页
   （描述，可选）
   
   Public or Private: 
   ✅ Private（推荐）- 只有你能看到
   或
   ⭕ Public - 所有人都能看到（不推荐，毕竟是表白内容）
   
   Initialize this repository with:
   ❌ 不要勾选任何选项（保持全部不勾选）
   ```

3. **点击 "Create repository"**
   - 仓库创建成功！
   - 会看到一个空仓库页面

### 2.2 记下仓库地址

创建后会看到类似这样的地址：
```
https://github.com/你的用户名/pinduoduo-confession
```
**先别关闭这个页面！**

---

## 步骤三：上传文件到 GitHub

### 方法A：网页上传（最简单，推荐新手）

#### 3.1 准备文件

1. **打开你的项目文件夹**
   ```
   C:\Users\Microsoft\CascadeProjects\pinduoduo-confession
   ```

2. **确保文件齐全**：
   ```
   pinduoduo-confession/
   ├── index.html          ← 必须
   ├── styles.css          ← 必须
   ├── script.js           ← 必须
   ├── assets/
   │   └── boyfriend-photo.jpg  ← 必须（你的照片）
   ├── README.md           ← 可选
   └── 其他 .md 文件       ← 可选
   ```

#### 3.2 上传主要文件

1. **在 GitHub 仓库页面**
   - 点击 "uploading an existing file"（上传现有文件）
   - 或直接点击 "Add file" → "Upload files"

2. **拖拽文件**
   - 把 `index.html` 拖进去
   - 把 `styles.css` 拖进去
   - 把 `script.js` 拖进去
   - 把 `README.md` 拖进去（可选）

3. **等待上传完成**
   - 看到绿色勾勾 ✅

4. **提交更改**
   - 滚动到页面底部
   - "Commit message" 输入：`添加主要文件`
   - 点击 "Commit changes"（绿色按钮）

#### 3.3 创建 assets 文件夹并上传照片

1. **返回仓库主页**
   - 点击仓库名称返回

2. **创建文件夹**
   - 点击 "Add file" → "Create new file"
   - 在文件名输入框输入：`assets/.gitkeep`
     - `assets/` 会自动创建文件夹
     - `.gitkeep` 是一个占位文件
   - 点击 "Commit new file"

3. **进入 assets 文件夹**
   - 点击 `assets` 文件夹
   - 点击 "Add file" → "Upload files"

4. **上传照片**
   - 把你的照片 `boyfriend-photo.jpg` 拖进去
   - **确保文件名是**: `boyfriend-photo.jpg`（必须一模一样）
   - 提交：输入 "添加照片"，点击 "Commit changes"

#### 3.4 验证上传

返回仓库主页，应该看到：
```
pinduoduo-confession/
├── assets/
│   └── boyfriend-photo.jpg
├── index.html
├── styles.css
├── script.js
└── README.md
```

✅ **完成！文件上传成功！**

---

### 方法B：使用 Git 命令行（适合熟悉命令行的用户）

<details>
<summary>点击展开查看 Git 命令行方法</summary>

#### B.1 安装 Git

1. **下载 Git**
   ```
   https://git-scm.com/download/win
   ```

2. **安装**
   - 双击下载的文件
   - 一路 "Next"
   - 安装完成

#### B.2 配置 Git

打开命令提示符（CMD）或 PowerShell：

```bash
# 设置用户名
git config --global user.name "你的名字"

# 设置邮箱（与GitHub注册邮箱一致）
git config --global user.email "你的邮箱@example.com"
```

#### B.3 上传项目

```bash
# 1. 进入项目文件夹
cd C:\Users\Microsoft\CascadeProjects\pinduoduo-confession

# 2. 初始化 Git 仓库
git init

# 3. 添加所有文件
git add .

# 4. 提交
git commit -m "初始提交"

# 5. 连接远程仓库（替换成你的仓库地址）
git remote add origin https://github.com/你的用户名/pinduoduo-confession.git

# 6. 推送到 GitHub
git push -u origin main
```

#### B.4 输入 GitHub 凭据

- 首次推送会要求输入 GitHub 用户名和密码
- 或使用 Personal Access Token

</details>

---

## 步骤四：连接 Vercel 到 GitHub

### 4.1 注册/登录 Vercel

1. **访问 Vercel**
   ```
   https://vercel.com
   ```

2. **使用 GitHub 登录**
   - 点击 "Sign Up"（注册）或 "Log In"（登录）
   - **选择 "Continue with GitHub"**（用GitHub继续）
   - ⭐ 这是关键！必须用 GitHub 登录！

3. **授权 Vercel**
   - GitHub 会弹出授权页面
   - 点击 "Authorize Vercel"（授权）
   - 允许 Vercel 访问你的仓库

### 4.2 选择权限

Vercel 会询问要访问哪些仓库：

**选项1：所有仓库**
- "All repositories"
- 推荐新手选这个

**选项2：特定仓库**
- "Only select repositories"
- 选择 `pinduoduo-confession`
- 更安全，推荐有经验的用户

**点击 "Install"** 完成安装

---

## 步骤五：部署项目到 Vercel

### 5.1 导入项目

1. **进入 Vercel 控制台**
   - 登录后会看到 Dashboard

2. **点击 "Add New..."**
   - 在右上角或中间
   - 选择 "Project"

3. **导入 Git 仓库**
   - 会看到 "Import Git Repository"
   - 找到你的 `pinduoduo-confession` 仓库
   - 点击 "Import"

### 5.2 配置项目

1. **项目设置**：
   ```
   Project Name: pinduoduo-confession
   （可以改成你喜欢的名字，会影响最终链接）
   
   Framework Preset: Other
   （或留空，选 "Other" 即可）
   
   Root Directory: ./
   （保持默认，不要改）
   
   Build and Output Settings:
   ├─ Build Command: 留空
   ├─ Output Directory: 留空
   └─ Install Command: 留空
   （都不用填！直接留空！）
   
   Environment Variables: 
   （不需要添加，留空）
   ```

2. **点击 "Deploy"**
   - 大大的蓝色按钮
   - 开始部署！

### 5.3 等待部署

1. **部署进度**
   - 会看到部署日志
   - 显示 "Building..."（构建中）
   - 大约 30-60 秒

2. **部署成功**
   - 会看到 🎉 庆祝动画
   - 显示 "Your project has been deployed"

---

## 步骤六：获取链接并分享

### 6.1 获取部署链接

部署成功后会看到：

```
🎉 Your project is live at:

https://pinduoduo-confession.vercel.app

或

https://pinduoduo-confession-你的用户名.vercel.app
```

**这就是你的表白网页链接！**

### 6.2 测试链接

1. **点击链接**
   - 在新标签页打开
   - 检查网页是否正常

2. **测试功能**
   - 照片是否显示
   - 所有动画是否正常
   - 砍价功能是否能用

3. **手机测试**
   - 用手机浏览器打开链接
   - 测试响应式效果

### 6.3 分享给女朋友

**方式1：直接发链接**
```
嘿，给你看个好玩的
https://pinduoduo-confession.vercel.app
```

**方式2：生成二维码**
1. 访问草料二维码：https://cli.im
2. 输入你的链接
3. 生成二维码
4. 截图发给她

**方式3：短链接**
1. 使用短链接服务（如 bit.ly）
2. 缩短链接
3. 更美观易记

---

## 步骤七：后续管理

### 7.1 查看访问数据

1. **进入 Vercel Dashboard**
   - 点击你的项目
   - 可以看到访问次数、流量等

2. **查看部署历史**
   - 每次 GitHub 提交都会自动部署
   - 可以回滚到任何版本

### 7.2 修改内容后更新

如果你想修改网页内容：

**GitHub 网页修改**：
1. 进入 GitHub 仓库
2. 点击要修改的文件（如 `index.html`）
3. 点击 ✏️ 编辑图标
4. 修改内容
5. 点击 "Commit changes"
6. **自动触发 Vercel 重新部署！**
7. 等待 1 分钟，更改生效

**本地修改后上传**：
1. 修改本地文件
2. 在 GitHub 仓库点击 "Upload files"
3. 拖拽修改后的文件（会覆盖）
4. Commit changes
5. 自动部署

### 7.3 自定义域名（可选）

如果你有自己的域名：

1. **进入项目设置**
   - Vercel Dashboard → 你的项目
   - 点击 "Settings"

2. **添加域名**
   - 左侧菜单 "Domains"
   - 输入你的域名
   - 按提示配置 DNS

3. **完成**
   - 就可以用 `https://你的域名.com` 访问了

---

## 🎯 完整流程速查表

```
☐ 1. 注册 GitHub 账号
☐ 2. 创建仓库 pinduoduo-confession（Private）
☐ 3. 上传文件：
    ☐ index.html
    ☐ styles.css
    ☐ script.js
    ☐ assets/boyfriend-photo.jpg
☐ 4. 访问 vercel.com
☐ 5. 用 GitHub 登录 Vercel
☐ 6. 授权 Vercel 访问仓库
☐ 7. Import 项目
☐ 8. 配置设置（Framework: Other，其他留空）
☐ 9. 点击 Deploy
☐ 10. 获取链接
☐ 11. 测试链接
☐ 12. 分享给她！
```

---

## ❓ 常见问题

### Q1: 部署后照片不显示？

**原因**：照片路径不对或文件名错误

**解决**：
1. 确保照片在 `assets/boyfriend-photo.jpg`
2. 文件名必须是 `boyfriend-photo.jpg`（区分大小写）
3. 检查 GitHub 仓库中文件是否存在
4. 重新部署：Vercel → Deployments → 点击最新部署的三个点 → Redeploy

### Q2: 提示 "Failed to deploy"？

**解决**：
1. 检查文件结构是否正确
2. 确保 `index.html` 在根目录
3. 检查文件名是否正确（不要有中文）
4. 重新导入项目

### Q3: 每次修改都要手动部署吗？

**答**：不需要！
- GitHub + Vercel 连接后
- 每次提交到 GitHub 自动部署
- 大约 1 分钟后更改生效

### Q4: 可以删除项目吗？

**答**：可以！
- Vercel: Settings → Advanced → Delete Project
- GitHub: Settings → Delete this repository
- 删除后链接失效

### Q5: Private 仓库别人能看到吗？

**答**：不能！
- Private 仓库只有你能看到代码
- 但部署后的网页链接是公开的
- 任何人都能通过链接访问网页

### Q6: 可以改链接地址吗？

**答**：可以！
- Vercel → Settings → Domains
- 添加自定义域名
- 或在项目设置中改项目名

---

## 🎨 优化建议

### 1. 添加 README.md

在 GitHub 仓库中创建 `README.md`：

```markdown
# 拼多多风格表白网页 💘

这是一个超级土味的拼多多风格表白网页

## 预览
https://你的链接.vercel.app

## 功能
- 砍价小游戏
- Tinder + 水烟回忆
- 超级土味特效
- 手机完美适配
```

### 2. 添加 .gitignore

创建 `.gitignore` 文件，忽略不必要的文件：

```
# 忽略的文件
.DS_Store
Thumbs.db
desktop.ini
```

### 3. 保护隐私

如果担心隐私：
- 仓库设置为 Private
- 不要在代码中包含真实个人信息
- 微信号可以在部署后再手动修改

---

## 🌟 高级技巧

### 自动部署触发

每次推送到 GitHub 会触发 Vercel 自动部署：

```bash
1. 修改本地文件
2. git add .
3. git commit -m "更新内容"
4. git push
5. Vercel 自动检测并部署
```

### 分支管理

可以创建不同分支测试：

```bash
# 创建测试分支
git checkout -b test

# 修改并测试
# ...

# 合并到主分支
git checkout main
git merge test
git push
```

Vercel 会自动为每个分支创建预览链接！

---

## 📊 对比：网页上传 vs Git 命令行

| 功能 | 网页上传 | Git 命令行 |
|------|----------|-----------|
| 难度 | ⭐ 超简单 | ⭐⭐⭐ 需学习 |
| 速度 | 稍慢 | 很快 |
| 批量操作 | 不便 | 方便 |
| 适合人群 | 新手 | 有经验者 |
| 推荐度 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

**推荐新手使用网页上传！**

---

## 🎯 总结

### GitHub + Vercel 的优势

✅ **自动部署** - 改代码自动更新  
✅ **版本控制** - 可以回滚任何版本  
✅ **永久有效** - 只要账号在，链接永久可用  
✅ **免费无限** - 完全免费，无流量限制  
✅ **专业可靠** - 大公司服务，稳定靠谱  

### 完成后你将拥有

- ✅ 一个永久有效的链接
- ✅ 自动更新的表白网页
- ✅ 完整的代码版本控制
- ✅ 随时可以修改内容
- ✅ 微信完美支持

---

**部署愉快！表白成功！** 💘

---

**文档版本**：v1.0  
**更新时间**：2026-04-21  
**适用人群**：所有用户（特别详细的新手教程）  
**预计完成时间**：15-20分钟
