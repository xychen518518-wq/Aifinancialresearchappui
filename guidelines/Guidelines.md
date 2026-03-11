# 识途 AI 投研助手 — 设计规范 (Design Guidelines)

> **本文档是跨工具协同的唯一真相来源 (Single Source of Truth)**
> 适用于：Figma Make / v0 / Claude Code / Cursor 等任何 AI 代码生成工具
> 在任何工具中开始新对话时，请先提供本文档作为上下文。

---

## 1. 品牌定位

- **产品名**：识途
- **定位**：可用 · 可信 · 可靠的 AI 投研伙伴
- **核心诗句**：

```
乱花迷人眼，云深路欲无。
拨开千重雾，老马自识途。
```

- **品牌意象**：用户骑在马上，眼前乱花迷眼、云深路断。识途是那匹老马，拨开雾，带你走对路。
  - 可用 — 你骑得上去
  - 可信 — 它不会带你走岔
  - 可靠 — 路断的时候它还在

---

## 2. 设计语言

### 2.1 整体风格

| 维度 | 规范 |
|------|------|
| 基调 | 深沉、克制、东方美学，避免花哨 |
| 氛围 | 水墨山雾、暗夜识途，安静而有力量 |
| 情绪 | 信赖感、专业感、从容不迫 |
| 动效 | 轻柔、有呼吸感，如雾气散开 |

### 2.2 色彩体系

```
// 主背景
--bg-primary:     #0a0a0f        // 近乎纯黑，夜色
--bg-card:        rgba(255,255,255,0.03)  // 毛玻璃卡片
--bg-card-border: rgba(255,255,255,0.04~0.06)

// 品牌色 — 琥珀金 (老马的鬃毛、灯盏)
--brand-primary:  amber-500       // #f59e0b  主金色
--brand-gradient: from-amber-500 to-amber-600/700
--brand-subtle:   amber-400/500 at 10~20% opacity  // 卡片背景

// 语义色
--color-up:       emerald-400     // 涨
--color-down:     red-400         // 跌
--color-info:     blue-400        // 信息
--color-accent:   purple-400      // 港股/特殊

// 文字层级
--text-primary:   white/90
--text-secondary: white/60~70
--text-tertiary:  white/35~40
--text-disabled:  white/20~25
```

### 2.3 字体

```css
/* 衬线 — 标题、诗句、品牌标识 */
font-family: 'Noto Serif SC', serif;

/* 无衬线 — 正文、UI控件 */
font-family: 'Noto Sans SC', sans-serif;

/* 等宽 — 数字、股价 */
font-family: monospace;
```

### 2.4 圆角规范

| 元素 | 圆角 |
|------|------|
| 大卡片/对话框 | rounded-2xl (16px) |
| 中卡片/按钮 | rounded-xl (12px) |
| 小标签 | rounded-lg / rounded-md |
| 头像/Logo | rounded-lg (8px) |
| 药丸按钮 | rounded-full |

### 2.5 间距与布局

- 页面水平内边距：`px-5` (20px)
- 卡片内边距：`p-3.5~p-5`
- 卡片间距：`gap-2~gap-3`
- 底部 Tab 栏高度：56px (`h-14`)
- 顶部 Header 高度：56px (`h-14`)
- 安全区适配：`pt-[env(safe-area-inset-top)]`

---

## 3. 组件规范

### 3.1 品牌标识 (Logo)

```jsx
// 金色渐变圆角方块 + 衬线"识"字
<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700
     flex items-center justify-center">
  <span style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 14 }}
        className="text-white">识</span>
</div>
```

### 3.2 输入栏

```jsx
// 底部悬浮输入栏
<div className="flex items-center gap-2 bg-white/[0.06] border border-white/[0.08]
     rounded-2xl px-4 py-2.5 backdrop-blur-sm">
  <input placeholder="输入股票代码或问题..."
         className="flex-1 bg-transparent text-white/90 placeholder-white/25 outline-none"
         style={{ fontSize: 14 }} />
  <button className="p-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600">
    <Send size={18} className="text-white" />
  </button>
</div>
```

### 3.3 卡片

```
基础卡片：bg-white/[0.03] border border-white/[0.04~0.06] rounded-2xl
激活态：  active:bg-white/[0.06]
品牌卡片：bg-gradient-to-br from-amber-500/10~20 to-amber-600/5 border-amber-500/10~20
```

### 3.4 涨跌色

```
涨：text-emerald-400  bg-emerald-500/10 (背景)
跌：text-red-400      bg-red-500/10     (背景)
```

### 3.5 Tab 栏

- 5个 Tab：首页 / 对话 / 行情 / 历史 / 我的
- 选中态：amber-400 文字 + 顶部 amber 渐变指示条
- 未选中：white/35
- 图标尺寸：20px
- 标签字号：10px

---

## 4. 页面结构

```
/ ................. 首页 (诗意Hero + 快捷入口 + 热点)
/chat ............. 对话列表
/chat/:id ......... 对话详情 (隐藏Tab栏)
/chat/new?q=xxx ... 新建对话
/market ........... 行情 (指数 / 板块 / 自选)
/history .......... 历史记录 (按日期分组)
/profile .......... 个人中心 (会员 + 设置)
```

---

## 5. 技术栈

| 类别 | 选型 |
|------|------|
| 框架 | React 18 |
| 样式 | Tailwind CSS v4 |
| 路由 | react-router v7 (Data Mode, createBrowserRouter) |
| 动画 | motion (Motion/react) |
| 图标 | lucide-react |
| 图表 | recharts |
| 字体 | Google Fonts (Noto Serif SC + Noto Sans SC) |

---

## 6. 跨工具协同指南

### 6.1 协同架构

```
┌─────────────────────────────────────────┐
│         Guidelines.md (本文档)            │
│         设计规范 · 唯一真相来源             │
└──────┬──────────┬──────────┬─────────────┘
       │          │          │
  ┌────▼────┐ ┌──▼───┐ ┌───▼────────┐
  │ Figma   │ │  v0  │ │ Claude Code│
  │  Make   │ │      │ │ / Cursor   │
  └────┬────┘ └──┬───┘ └───┬────────┘
       │         │          │
       └─────────┴──────────┘
              Git Repo
```

### 6.2 各工具分工建议

| 工具 | 最适合做什么 | 怎么给上下文 |
|------|-------------|-------------|
| **Figma Make** | UI原型快速搭建、整体页面框架、视觉风格探索 | 直接在对话中生成，已有本项目代码上下文 |
| **v0** | 单个组件精雕细琢、复杂交互组件（图表、表格、表单） | 粘贴本文档相关章节 + 目标组件描述 |
| **Claude Code** | 业务逻辑、API对接、状态管理、代码重构、测试 | 在项目根目录运行，自动读取本文档 |

### 6.3 给 v0 的 Prompt 模板

```markdown
我正在开发一个叫"识途"的AI金融投研App，以下是设计规范：

【粘贴本文档 §2 设计语言 的相关内容】

技术栈：React 18 + Tailwind CSS v4 + lucide-react icons
风格：深色主题，品牌色琥珀金(amber)，东方水墨美学

请帮我生成一个 [组件名称] 组件，要求：
- [具体需求]
- 遵循上述色彩和圆角规范
- 移动端优先，宽度 390px 视口
```

### 6.4 给 Claude Code / Cursor 的 Prompt 模板

```markdown
请阅读 /guidelines/Guidelines.md 了解本项目的设计规范。

当前任务：[描述任务]

要求：
- 遵循 Guidelines.md 中的色彩、字体、圆角规范
- 组件放在 /src/app/components/ 目录
- 使用 react-router v7 Data Mode 路由模式
- 动画使用 motion/react
```

### 6.5 协同工作流

```
1. 在 Figma Make 中搭建页面框架和整体 UI
2. 将复杂单组件的需求描述发给 v0 精调
3. 将 v0 生成的组件代码复制回项目
4. 用 Claude Code 做逻辑集成、API对接、代码质量优化
5. 任何视觉调整都先更新本 Guidelines.md，再同步到各工具
```

### 6.6 同步规则

> **改设计规范，先改文档，再改代码。**

- 色彩变更 → 更新 §2.2 → 全局搜索替换
- 新增页面 → 更新 §4 页面结构 → 在对应工具中生成
- 组件修改 → 更新 §3 组件规范 → 同步到所有引用处

---

## 7. 命名约定

| 类别 | 规则 | 示例 |
|------|------|------|
| 页面组件 | PascalCase + Page 后缀 | `HomePage.tsx` |
| 功能组件 | PascalCase | `StockCard.tsx` |
| 路由文件 | 小写 | `routes.ts` |
| CSS变量 | kebab-case | `--brand-primary` |

---

## 8. 动效规范

| 场景 | 动效 | 参数 |
|------|------|------|
| 页面进入 | fadeIn + slideUp | duration: 0.4~0.6s, ease: easeOut |
| 列表项 | stagger fadeIn | delay: 0.04~0.08s per item |
| Tab切换 | layoutId spring | stiffness: 400, damping: 30 |
| 按钮点击 | scale | active:scale-[0.97] |
| AI思考 | pulse/breathe | opacity: [0.3, 1, 0.3], repeat: Infinity |

---

*最后更新：2026-03-11*
*维护者：识途产品团队*
