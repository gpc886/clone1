# 高中语文基础知识挑战

一个基于 [Next.js 16](https://nextjs.org) + [shadcn/ui](https://ui.shadcn.com) 开发的互动式语文知识学习游戏，支持单人练习、双人PK对战和天梯赛挑战。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)

## 📋 目录

- [项目简介](#项目简介)
- [功能特色](#功能特色)
- [快速开始](#快速开始)
- [游戏模式](#游戏模式)
- [题库说明](#题库说明)
- [技术架构](#技术架构)
- [开发指南](#开发指南)
- [部署指南](#部署指南)
- [常见问题](#常见问题)

## 项目简介

本项目旨在通过游戏化的方式帮助高中生巩固语文基础知识，涵盖文言文字词、成语和古诗词三大知识点。通过单人练习、双人PK和天梯赛三种模式，满足不同的学习场景和趣味需求。

### 核心特性

- ✅ **单人模式**：独自挑战，测试语文水平，满分100分通关
- ✅ **双人PK模式**：限时40秒，与好友对战，争夺学霸
- ✅ **天梯赛模式**：拟真投篮答题，难度递增，挑战极限
- ✅ **智能出题**：随机抽签，确保题目不重复
- ✅ **语音提示**：321倒计时语音，滴答音效增强沉浸感
- ✅ **错误记录**：自动记录错题，支持复习和删除
- ✅ **实时反馈**：即时显示答案解析，帮助理解
- ✅ **持久化存储**：天梯赛最高记录自动保存

## 功能特色

### 1. 单人模式

- 无时间限制，自由作答
- 每次随机抽取10道题
- 答对得10分，答错不扣分
- 完成后显示总分和答案解析
- 支持查看错题和重新挑战

### 2. 双人PK模式

- 限时40秒，321倒计时后开始
- 两位玩家同时作答相同题目
- 答对可以让自己的小动物加速
- 答错让对方小动物前进
- 时间结束时分数高者获胜
- 包含滴答音效和倒计时提示

### 3. 天梯赛模式

- 判断题形式，1-10层难度递增
- 左篮筐代表"正确"，右篮筐代表"错误"
- 拟真物理投篮体验
- 答对进入下一层，答错退回前一层
- 连进效果，火焰动画增强成就感
- 需要输入挑战者姓名
- 最高记录（姓名和层数）持久化保存

## 快速开始

### 启动开发服务器

```bash
coze dev
```

启动后，在浏览器中打开 [http://localhost:5000](http://localhost:5000) 查看应用。

开发服务器支持热更新，修改代码后页面会自动刷新。

### 构建生产版本

```bash
coze build
```

### 启动生产服务器

```bash
coze start
```

## 项目结构

```
src/
├── app/                      # Next.js App Router 目录
│   ├── layout.tsx           # 根布局组件
│   ├── page.tsx             # 首页
│   ├── globals.css          # 全局样式（包含 shadcn 主题变量）
│   └── [route]/             # 其他路由页面
├── components/              # React 组件目录
│   └── ui/                  # shadcn/ui 基础组件（优先使用）
│       ├── button.tsx
│       ├── card.tsx
│       └── ...
├── lib/                     # 工具函数库
│   └── utils.ts            # cn() 等工具函数
└── hooks/                   # 自定义 React Hooks（可选）
```

## 核心开发规范

### 1. 组件开发

**优先使用 shadcn/ui 基础组件**

本项目已预装完整的 shadcn/ui 组件库，位于 `src/components/ui/` 目录。开发时应优先使用这些组件作为基础：

```tsx
// ✅ 推荐：使用 shadcn 基础组件
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function MyComponent() {
  return (
    <Card>
      <CardHeader>标题</CardHeader>
      <CardContent>
        <Input placeholder="输入内容" />
        <Button>提交</Button>
      </CardContent>
    </Card>
  );
}
```

**可用的 shadcn 组件清单**

- 表单：`button`, `input`, `textarea`, `select`, `checkbox`, `radio-group`, `switch`, `slider`
- 布局：`card`, `separator`, `tabs`, `accordion`, `collapsible`, `scroll-area`
- 反馈：`alert`, `alert-dialog`, `dialog`, `toast`, `sonner`, `progress`
- 导航：`dropdown-menu`, `menubar`, `navigation-menu`, `context-menu`
- 数据展示：`table`, `avatar`, `badge`, `hover-card`, `tooltip`, `popover`
- 其他：`calendar`, `command`, `carousel`, `resizable`, `sidebar`

详见 `src/components/ui/` 目录下的具体组件实现。

### 2. 路由开发

Next.js 使用文件系统路由，在 `src/app/` 目录下创建文件夹即可添加路由：

```bash
# 创建新路由 /about
src/app/about/page.tsx

# 创建动态路由 /posts/[id]
src/app/posts/[id]/page.tsx

# 创建路由组（不影响 URL）
src/app/(marketing)/about/page.tsx

# 创建 API 路由
src/app/api/users/route.ts
```

**页面组件示例**

```tsx
// src/app/about/page.tsx
import { Button } from '@/components/ui/button';

export const metadata = {
  title: '关于我们',
  description: '关于页面描述',
};

export default function AboutPage() {
  return (
    <div>
      <h1>关于我们</h1>
      <Button>了解更多</Button>
    </div>
  );
}
```

**动态路由示例**

```tsx
// src/app/posts/[id]/page.tsx
export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <div>文章 ID: {id}</div>;
}
```

**API 路由示例**

```tsx
// src/app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ users: [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ success: true });
}
```

### 3. 依赖管理

**必须使用 pnpm 管理依赖**

```bash
# ✅ 安装依赖
pnpm install

# ✅ 添加新依赖
pnpm add package-name

# ✅ 添加开发依赖
pnpm add -D package-name

# ❌ 禁止使用 npm 或 yarn
# npm install  # 错误！
# yarn add     # 错误！
```

项目已配置 `preinstall` 脚本，使用其他包管理器会报错。

### 4. 样式开发

**使用 Tailwind CSS v4**

本项目使用 Tailwind CSS v4 进行样式开发，并已配置 shadcn 主题变量。

```tsx
// 使用 Tailwind 类名
<div className="flex items-center gap-4 p-4 rounded-lg bg-background">
  <Button className="bg-primary text-primary-foreground">
    主要按钮
  </Button>
</div>

// 使用 cn() 工具函数合并类名
import { cn } from '@/lib/utils';

<div className={cn(
  "base-class",
  condition && "conditional-class",
  className
)}>
  内容
</div>
```

**主题变量**

主题变量定义在 `src/app/globals.css` 中，支持亮色/暗色模式：

- `--background`, `--foreground`
- `--primary`, `--primary-foreground`
- `--secondary`, `--secondary-foreground`
- `--muted`, `--muted-foreground`
- `--accent`, `--accent-foreground`
- `--destructive`, `--destructive-foreground`
- `--border`, `--input`, `--ring`

### 5. 表单开发

推荐使用 `react-hook-form` + `zod` 进行表单开发：

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  username: z.string().min(2, '用户名至少 2 个字符'),
  email: z.string().email('请输入有效的邮箱'),
});

export default function MyForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { username: '', email: '' },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Input {...form.register('username')} />
      <Input {...form.register('email')} />
      <Button type="submit">提交</Button>
    </form>
  );
}
```

### 6. 数据获取

**服务端组件（推荐）**

```tsx
// src/app/posts/page.tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    cache: 'no-store', // 或 'force-cache'
  });
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

**客户端组件**

```tsx
'use client';

import { useEffect, useState } from 'react';

export default function ClientComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);

  return <div>{JSON.stringify(data)}</div>;
}
```

## 常见开发场景

### 添加新页面

1. 在 `src/app/` 下创建文件夹和 `page.tsx`
2. 使用 shadcn 组件构建 UI
3. 根据需要添加 `layout.tsx` 和 `loading.tsx`

### 创建业务组件

1. 在 `src/components/` 下创建组件文件（非 UI 组件）
2. 优先组合使用 `src/components/ui/` 中的基础组件
3. 使用 TypeScript 定义 Props 类型

### 添加全局状态

推荐使用 React Context 或 Zustand：

```tsx
// src/lib/store.ts
import { create } from 'zustand';

interface Store {
  count: number;
  increment: () => void;
}

export const useStore = create<Store>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

### 集成数据库

推荐使用 Prisma 或 Drizzle ORM，在 `src/lib/db.ts` 中配置。

## 技术栈

- **框架**: Next.js 16.1.1 (App Router)
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **样式**: Tailwind CSS v4
- **表单**: React Hook Form + Zod
- **图标**: Lucide React
- **字体**: Geist Sans & Geist Mono
- **包管理器**: pnpm 9+
- **TypeScript**: 5.x

## 参考文档

- [Next.js 官方文档](https://nextjs.org/docs)
- [shadcn/ui 组件文档](https://ui.shadcn.com)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com)

## 重要提示

1. **必须使用 pnpm** 作为包管理器
2. **优先使用 shadcn/ui 组件** 而不是从零开发基础组件
3. **遵循 Next.js App Router 规范**，正确区分服务端/客户端组件
4. **使用 TypeScript** 进行类型安全开发
5. **使用 `@/` 路径别名** 导入模块（已配置）

---

## 游戏模式详解

### 单人模式

**玩法说明**：
1. 点击首页"单人模式"卡片
2. 选择题型：文言文、成语或古诗词
3. 随机抽取10道题目，无时间限制
4. 选择答案后点击"提交答案"
5. 查看解析，继续下一题
6. 完成后显示总分和答题详情

**评分规则**：
- 答对：+10分
- 答错：不扣分
- 满分：100分

**功能特性**：
- 错题记录：自动记录答错的题目
- 错题复习：点击"查看错题"可以复习错题
- 删除错题：可以删除已掌握的错题
- 重新挑战：重新开始新的练习

### 双人PK模式

**玩法说明**：
1. 点击首页"双人PK模式"卡片
2. 选择题型：文言文、成语或古诗词
3. 输入两位玩家姓名
4. 等待321倒计时后开始游戏
5. 在40秒内尽可能多答题
6. 答对可以让自己的小动物前进
7. 答错会让对方的小动物前进
8. 时间结束时分数高者获胜

**时间规则**：
- 321倒计时：语音提示"3、2、1、开始"
- 游戏时长：40秒
- 滴答音效：游戏开始后每秒播放一次
- 倒计时显示：实时显示剩余时间

**胜负判定**：
- 答对：+10分，自己的动物前进
- 答错：不加分，对方动物前进
- 胜利条件：时间结束时分数高者获胜

### 天梯赛模式

**玩法说明**：
1. 点击首页"天梯赛模式"卡片
2. 输入挑战者姓名
3. 系统自动生成判断题，难度1-10级
4. 通过投篮选择答案：
   - 左篮筐：认为题目说法正确
   - 右篮筐：认为题目说法错误
5. 答对进入下一层，答错退回前一层
6. 未投进篮筐会自动重置，可重新投掷

**投篮操作**：
- 拖拽蓝色轨迹线调整方向
- 点击屏幕快速定位篮筐
- 发射力度固定，只需调整方向
- 抛物线可调节范围：水平±45%、垂直-270%至20%

**难度递增**：
- 第1-3层：基础难度
- 第4-6层：中等难度
- 第7-10层：高难度

**记录保存**：
- 挑战者姓名和最高层数会保存到本地存储
- 如果突破最高记录，会自动更新
- 可以查看历史最高记录

## 题库说明

### 题库来源

题库包含以下知识点：

1. **文言文字词**：通假字、古今异义、一词多义、词类活用
2. **成语**：成语含义、成语用法、成语出处
3. **古诗词**：名句默写、诗词理解、作者背景

### 题型分类

- **选择题**：单项选择，4个选项
- **判断题**：对错判断，用于天梯赛模式

### 题目管理

题目定义在 `src/lib/questions.ts` 中：

```typescript
export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty?: number;
}

export interface JudgeQuestion {
  id: string;
  statement: string;
  isCorrect: boolean;
  explanation: string;
  difficulty: number;
}
```

### 添加新题目

```typescript
// 在 src/lib/questions.ts 中添加
export const wenyanQuestions: Question[] = [
  {
    id: 'wenyan-001',
    type: 'wenyan',
    question: '"之"字的用法',
    options: ['助词，的', '代词，他', '动词，去', '以上都正确'],
    correctAnswer: 3,
    explanation: '"之"字有多种用法，包括助词、代词、动词等。',
    difficulty: 1,
  },
  // 添加更多题目...
];
```

## 技术架构

### 项目结构

```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # 根布局
│   ├── page.tsx             # 首页（游戏模式选择）
│   └── globals.css          # 全局样式
├── components/              # React 组件
│   ├── Game.tsx             # 游戏主组件（核心逻辑）
│   └── ui/                  # shadcn/ui 基础组件
├── lib/                     # 工具函数
│   ├── questions.ts         # 题库管理
│   └── utils.ts             # 通用工具函数
└── hooks/                   # 自定义 Hooks
    └── use-mobile.ts        # 响应式检测
```

### 核心组件

**Game.tsx** - 游戏主组件，包含三种游戏模式的完整逻辑：
- 题目生成和打乱
- 答题判定和评分
- 时间管理和倒计时
- 音效播放
- 错题记录
- 本地存储管理

### 状态管理

使用 React Hooks 进行状态管理：

```typescript
const [gameMode, setGameMode] = useState<GameMode>(null);
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
const [score, setScore] = useState(0);
const [gameStarted, setGameStarted] = useState(false);
```

### 音效实现

使用 Web Audio API 实现音效：

```typescript
const playSound = (isCorrect: boolean) => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  // 创建振荡器和增益节点
  // 播放音效
};
```

支持音效：
- 答对音效：上升的三和弦
- 答错音效：低沉的下降音调
- 滴答音效：时间倒计时提示

### 本地存储

使用 `localStorage` 持久化数据：

```typescript
// 保存天梯赛记录
localStorage.setItem('ladderRecord', JSON.stringify({ name, level }));

// 读取天梯赛记录
const record = JSON.parse(localStorage.getItem('ladderRecord') || '{}');
```

## 开发指南

### 本地开发

```bash
# 1. 安装依赖
pnpm install

# 2. 启动开发服务器
coze dev

# 3. 访问 http://localhost:5000
```

### 添加新功能

1. **新增游戏模式**：
   - 在 `Game.tsx` 中添加模式处理逻辑
   - 更新 `GameProps` 接口
   - 在首页添加模式选择卡片

2. **新增题型**：
   - 在 `src/lib/questions.ts` 中定义新题型
   - 更新 `QuestionType` 类型
   - 添加题目数据

3. **添加音效**：
   - 在 `playSound` 函数中添加新的音效逻辑
   - 支持自定义频率和音色

### 代码规范

1. **组件命名**：使用 PascalCase
2. **变量命名**：使用 camelCase
3. **常量命名**：使用 UPPER_SNAKE_CASE
4. **文件命名**：使用 PascalCase（组件）或 camelCase（工具函数）

### TypeScript 最佳实践

```typescript
// ✅ 定义接口
interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

// ✅ 使用类型守卫
function isQuestion(obj: any): obj is Question {
  return obj && typeof obj.id === 'string';
}

// ✅ 使用泛型
function shuffleArray<T>(array: T[]): T[] {
  // 打乱数组的实现
}
```

## 部署指南

### 依赖要求

- Node.js 24+
- pnpm 9+
- Git

### 构建流程

```bash
# 1. 构建生产版本
coze build

# 2. 启动生产服务器
coze start
```

### 环境变量

创建 `.env.local` 文件（如需要）：

```env
# 添加环境变量
NEXT_PUBLIC_API_URL=https://api.example.com
```

### Git 提交规范

```bash
# 添加文件
git add .

# 提交更改
git commit -m "feat: 添加新功能"
git commit -m "fix: 修复bug"
git commit -m "docs: 更新文档"

# 推送到远程仓库
git push origin main
```

### .gitignore 配置

```gitignore
# 依赖
node_modules/
.pnpm-store

# 构建产物
.next/
out/
dist/
build/

# 环境变量
.env.local
.env.production.local

# 日志
*.log
```

## 常见问题

### 1. 如何修改题库？

编辑 `src/lib/questions.ts` 文件，在对应的数组中添加或修改题目。

### 2. 如何添加新的音效？

在 `Game.tsx` 中的 `playSound` 函数中添加新的音效逻辑。

### 3. 如何修改游戏时间限制？

在 `Game.tsx` 中找到 `GAME_TIME` 常量并修改：

```typescript
const GAME_TIME = 40; // 修改这里的数字
```

### 4. 天梯赛模式如何调整投篮力度？

在 `Game.tsx` 中调整 `THROW_POWER` 常量：

```typescript
const THROW_POWER = 12.0; // 修改投篮力度
```

### 5. 如何重置天梯赛记录？

打开浏览器开发者工具，在控制台执行：

```javascript
localStorage.removeItem('ladderRecord');
```

### 6. 支持哪些浏览器？

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 7. 如何禁用音效？

在 `Game.tsx` 中找到音效播放的位置，添加条件判断：

```typescript
if (enableSound) {
  playSound(isCorrect);
}
```

### 8. 游戏数据保存在哪里？

- 天梯赛记录：`localStorage['ladderRecord']`
- 错题记录：`localStorage['wrongQuestions']`

### 9. 如何备份游戏数据？

打开浏览器开发者工具，在控制台执行：

```javascript
// 导出数据
const data = {
  ladderRecord: JSON.parse(localStorage.getItem('ladderRecord') || '{}'),
  wrongQuestions: JSON.parse(localStorage.getItem('wrongQuestions') || '[]'),
};
console.log(JSON.stringify(data, null, 2));

// 恢复数据
const backup = { /* 粘贴备份的数据 */ };
localStorage.setItem('ladderRecord', JSON.stringify(backup.ladderRecord));
localStorage.setItem('wrongQuestions', JSON.stringify(backup.wrongQuestions));
```

## 许可证

MIT License

## 联系方式

- GitHub Issues: https://github.com/gpc886/clone1/issues

---

**祝学习愉快！🎉**
