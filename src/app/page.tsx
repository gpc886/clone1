'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Clock, Trophy, PenTool, Scroll, Target, Upload, Database } from 'lucide-react';
import Game from '@/components/Game';
import ImportQuestions from '@/components/ImportQuestions';
import type { QuestionType } from '@/lib/questions';

type GameMode = 'single' | 'multi' | 'ladder' | null;

export default function Home() {
  const [gameMode, setGameMode] = useState<GameMode>(null);
  const [questionType, setQuestionType] = useState<QuestionType | null>(null);
  const [startGame, setStartGame] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);

  // 返回主菜单
  const handleBackToMenu = () => {
    setGameMode(null);
    setQuestionType(null);
    setStartGame(false);
  };

  // 开始游戏
  const handleStartGame = () => {
    setStartGame(true);
  };

  // 刷新页面以重新加载题库
  const handleImportSuccess = () => {
    setShowImportDialog(false);
    // 可选：显示成功提示
  };

  // 游戏界面
  if (startGame && gameMode) {
    // 天梯赛模式不需要题型
    if (gameMode === 'ladder') {
      return <Game gameMode={gameMode} questionType="wenyan" onBack={handleBackToMenu} />;
    }
    // 其他模式需要题型
    if (questionType) {
      return <Game gameMode={gameMode} questionType={questionType} onBack={handleBackToMenu} />;
    }
    return null;
  }

  // 游戏确认界面
  if (gameMode && questionType && !startGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="text-3xl text-center">准备开始挑战</CardTitle>
              <CardDescription className="text-center text-lg">
                {gameMode === 'single' ? '单人模式' : gameMode === 'multi' ? '双人PK模式' : '天梯赛模式'} - {getQuestionTypeName(questionType)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">游戏模式</p>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {gameMode === 'single' ? '单人模式' : gameMode === 'multi' ? '双人PK模式' : '天梯赛模式'}
                  </p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">题目类型</p>
                  <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                    {getQuestionTypeName(questionType)}
                  </p>
                </div>
              </div>

              {gameMode === 'multi' && (
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">⚠️ 注意</p>
                  <p className="text-amber-700 dark:text-amber-300">
                    双人PK模式有时间限制，请在规定时间内完成答题，分数高者获胜！
                  </p>
                </div>
              )}

              {gameMode === 'ladder' && (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">🎯 天梯赛说明</p>
                  <p className="text-emerald-700 dark:text-emerald-300">
                    答对进入下一层，答错退回前一层（最低第1层）。通过投篮选择答案，左篮筐代表正确，右篮筐代表错误！
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  onClick={() => setQuestionType(null)}
                  variant="outline"
                  className="flex-1"
                >
                  返回修改
                </Button>
                <Button onClick={handleStartGame} className="flex-1">
                  开始挑战
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // 主界面
  if (!gameMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 flex items-center justify-center p-4">
        <div className="max-w-5xl w-full">
          {/* 标题 */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              高中语文基础知识挑战
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              考察文言文、成语、古诗词等知识点，挑战自我，争当学霸
            </p>
          </div>

          {/* 操作按钮区 */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              onClick={() => setShowImportDialog(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Database className="w-4 h-4" />
              导入题库
            </Button>
          </div>

          {/* 模式选择卡片 */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* 单人模式 */}
            <Card
              className="cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-400"
              onClick={() => setGameMode('single')}
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">单人模式</CardTitle>
                    <CardDescription className="text-sm">独自挑战，测试语文水平</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span>满分100分通关</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>无时间限制</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Scroll className="w-4 h-4 text-green-500" />
                    <span>三种题型可选</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 双人PK模式 */}
            <Card
              className="cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-purple-400"
              onClick={() => setGameMode('multi')}
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                    <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">双人PK模式</CardTitle>
                    <CardDescription className="text-sm">与好友对战，争夺学霸</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span>分高者获胜</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-red-500" />
                    <span>限时40秒</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-500" />
                    <span>实时对战</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 天梯赛模式 */}
            <Card
              className="cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-emerald-400"
              onClick={() => {
                setGameMode('ladder');
                // 天梯赛模式直接开始，不需要选择题型
                handleStartGame();
              }}
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-full">
                    <Target className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">天梯赛模式</CardTitle>
                    <CardDescription className="text-sm">投篮答题，挑战高层</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span>无限层数挑战</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-emerald-500" />
                    <span>投篮选择答案</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>难度递增</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // 题型选择界面
  if (gameMode && !questionType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          {/* 返回按钮 */}
          <Button
            onClick={handleBackToMenu}
            variant="outline"
            className="mb-8"
          >
            ← 返回主菜单
          </Button>

          {/* 标题 */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              {gameMode === 'single' ? '单人模式' : '双人PK模式'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              请选择你要挑战的知识点
            </p>
          </div>

          {/* 题型选择卡片 */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* 文言文字词 */}
            <Card
              className="cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-amber-400"
              onClick={() => setQuestionType('wenyan')}
            >
              <CardHeader>
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-amber-100 dark:bg-amber-900 rounded-full">
                    <PenTool className="w-10 h-10 text-amber-600 dark:text-amber-400" />
                  </div>
                  <CardTitle className="text-xl text-center">文言文字词</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  考察文言文中的字词释义、通假字、古今异义等知识点
                </p>
              </CardContent>
            </Card>

            {/* 成语 */}
            <Card
              className="cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-green-400"
              onClick={() => setQuestionType('idiom')}
            >
              <CardHeader>
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-green-100 dark:bg-green-900 rounded-full">
                    <BookOpen className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-xl text-center">成语典故</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  考察成语的含义、出处、使用场景及所蕴含的哲理
                </p>
              </CardContent>
            </Card>

            {/* 古诗词 */}
            <Card
              className="cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-pink-400"
              onClick={() => setQuestionType('poetry')}
            >
              <CardHeader>
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-pink-100 dark:bg-pink-900 rounded-full">
                    <Scroll className="w-10 h-10 text-pink-600 dark:text-pink-400" />
                  </div>
                  <CardTitle className="text-xl text-center">古诗词</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  考察古诗词的作者、诗句含义、所描写的季节及蕴含的哲理
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 导入题库对话框 */}
        <ImportQuestions
          isOpen={showImportDialog}
          onClose={() => setShowImportDialog(false)}
          onImportSuccess={handleImportSuccess}
        />
      </div>
    );
  }
}

function getQuestionTypeName(type: QuestionType | null): string {
  switch (type) {
    case 'wenyan':
      return '文言文字词';
    case 'idiom':
      return '成语典故';
    case 'poetry':
      return '古诗词';
    default:
      return '';
  }
}
