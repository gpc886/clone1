'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Upload, FileJson, FileSpreadsheet, CheckCircle, XCircle, Download, AlertTriangle, X } from 'lucide-react';
import type { Question, JudgeQuestion, QuestionType } from '@/lib/questions';

interface ImportQuestionsProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: () => void;
}

export default function ImportQuestions({ isOpen, onClose, onImportSuccess }: ImportQuestionsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<{
    success: boolean;
    message: string;
    imported: number;
    failed: number;
  } | null>(null);

  // 处理文件上传
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    setImportResult(null);

    try {
      const content = await file.text();
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (fileExtension === 'json') {
        await importJSON(content);
      } else if (fileExtension === 'csv') {
        await importCSV(content);
      } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        // Excel 文件需要使用 SheetJS，这里先提示用户
        throw new Error('Excel 文件请先转换为 CSV 或 JSON 格式');
      } else {
        throw new Error('不支持的文件格式，请使用 JSON 或 CSV 文件');
      }
    } catch (error) {
      setImportResult({
        success: false,
        message: error instanceof Error ? error.message : '导入失败',
        imported: 0,
        failed: 0,
      });
    } finally {
      setImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // 导入 JSON 格式
  const importJSON = async (content: string) => {
    try {
      const data = JSON.parse(content);
      
      if (!Array.isArray(data)) {
        throw new Error('JSON 格式错误：根元素必须是数组');
      }

      let imported = 0;
      let failed = 0;
      const importedQuestions: any[] = [];

      // 获取现有题库
      const existingQuestions = JSON.parse(localStorage.getItem('custom-questions') || '[]');

      for (const item of data) {
        try {
          // 验证题目格式
          if (item.question && typeof item.question === 'string') {
            // 判断是选择题还是判断题
            if (item.options && Array.isArray(item.options) && item.answer !== undefined) {
              // 选择题
              const question: Question = {
                id: item.id || `custom-${Date.now()}-${imported}`,
                question: item.question,
                options: item.options,
                answer: Number(item.answer),
                explanation: item.explanation || '',
                type: (item.type as QuestionType) || 'wenyan',
              };
              importedQuestions.push(question);
            } else if (item.answer !== undefined && typeof item.answer === 'boolean') {
              // 判断题
              const judgeQuestion: JudgeQuestion = {
                id: item.id || `custom-judge-${Date.now()}-${imported}`,
                question: item.question,
                answer: item.answer,
                explanation: item.explanation || '',
                difficulty: Number(item.difficulty) || 1,
              };
              importedQuestions.push(judgeQuestion);
            } else {
              failed++;
            }
          } else {
            failed++;
          }
        } catch (error) {
          failed++;
        }
      }

      // 保存到 localStorage
      const mergedQuestions = [...existingQuestions, ...importedQuestions];
      localStorage.setItem('custom-questions', JSON.stringify(mergedQuestions));

      setImportResult({
        success: true,
        message: `成功导入 ${imported} 道题目${failed > 0 ? `，${failed} 道题目格式错误被跳过` : ''}`,
        imported,
        failed,
      });

      if (imported > 0) {
        onImportSuccess();
      }
    } catch (error) {
      throw new Error('JSON 解析失败：文件格式不正确');
    }
  };

  // 导入 CSV 格式
  const importCSV = async (content: string) => {
    try {
      const lines = content.split('\n').filter(line => line.trim());
      if (lines.length < 2) {
        throw new Error('CSV 文件为空或格式错误');
      }

      // 解析表头
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      
      let imported = 0;
      let failed = 0;
      const importedQuestions: any[] = [];

      // 获取现有题库
      const existingQuestions = JSON.parse(localStorage.getItem('custom-questions') || '[]');

      // 解析每一行数据
      for (let i = 1; i < lines.length; i++) {
        try {
          const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
          const row: any = {};
          
          headers.forEach((header, index) => {
            row[header] = values[index] || '';
          });

          // 验证并转换
          if (row.question) {
            if (row.options && row.answer) {
              // 选择题
              const question: Question = {
                id: row.id || `custom-${Date.now()}-${imported}`,
                question: row.question,
                options: row.options.split('|'),
                answer: Number(row.answer),
                explanation: row.explanation || '',
                type: (row.type as QuestionType) || 'wenyan',
              };
              importedQuestions.push(question);
            } else if (row.answer === 'true' || row.answer === 'false') {
              // 判断题
              const judgeQuestion: JudgeQuestion = {
                id: row.id || `custom-judge-${Date.now()}-${imported}`,
                question: row.question,
                answer: row.answer === 'true',
                explanation: row.explanation || '',
                difficulty: Number(row.difficulty) || 1,
              };
              importedQuestions.push(judgeQuestion);
            } else {
              failed++;
            }
          } else {
            failed++;
          }
        } catch (error) {
          failed++;
        }
      }

      // 保存到 localStorage
      const mergedQuestions = [...existingQuestions, ...importedQuestions];
      localStorage.setItem('custom-questions', JSON.stringify(mergedQuestions));

      setImportResult({
        success: true,
        message: `成功导入 ${imported} 道题目${failed > 0 ? `，${failed} 道题目格式错误被跳过` : ''}`,
        imported,
        failed,
      });

      if (imported > 0) {
        onImportSuccess();
      }
    } catch (error) {
      throw new Error('CSV 解析失败：文件格式不正确');
    }
  };

  // 导出模板
  const exportTemplate = () => {
    const jsonTemplate = [
      {
        id: 'template-1',
        type: 'wenyan',
        question: '"学而时习之"中"习"的意思是？',
        options: ['学习', '复习', '练习', '实习'],
        answer: 1,
        explanation: '"习"指复习、温习。'
      },
      {
        id: 'template-2',
        type: 'judge',
        question: '"学而时习之"出自《论语》。',
        answer: true,
        explanation: '正确，这是《论语·学而》中的名句。',
        difficulty: 1
      }
    ];

    const blob = new Blob([JSON.stringify(jsonTemplate, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '题库导入模板.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 清除自定义题库
  const clearCustomQuestions = () => {
    if (confirm('确定要清除所有导入的题库吗？此操作不可恢复。')) {
      localStorage.removeItem('custom-questions');
      setImportResult({
        success: true,
        message: '已清除所有导入的题库',
        imported: 0,
        failed: 0,
      });
      onImportSuccess();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">导入题库</DialogTitle>
          <DialogDescription>
            支持 JSON 和 CSV 格式的题库导入，可批量添加自定义题目
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* 导入结果提示 */}
          {importResult && (
            <Alert variant={importResult.success ? 'default' : 'destructive'}>
              {importResult.success ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              <AlertTitle>
                {importResult.success ? '导入成功' : '导入失败'}
              </AlertTitle>
              <AlertDescription>{importResult.message}</AlertDescription>
            </Alert>
          )}

          {/* 上传区域 */}
          <Card>
            <CardHeader>
              <CardTitle>选择文件</CardTitle>
              <CardDescription>
                支持 JSON 和 CSV 格式，文件大小不超过 5MB
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,.csv"
                  onChange={handleFileUpload}
                  disabled={importing}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      点击选择文件或拖拽文件到此处
                    </p>
                    <p className="text-xs text-gray-500">
                      支持 .json 和 .csv 格式
                    </p>
                  </div>
                </label>

                {importing && (
                  <div className="flex items-center justify-center space-x-2 text-sm text-blue-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span>正在导入...</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 模板下载 */}
          <Card>
            <CardHeader>
              <CardTitle>下载导入模板</CardTitle>
              <CardDescription>
                使用模板可以快速了解正确的题库格式
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button onClick={exportTemplate} variant="outline" className="flex-1">
                  <FileJson className="mr-2 h-4 w-4" />
                  下载 JSON 模板
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 格式说明 */}
          <Card>
            <CardHeader>
              <CardTitle>格式说明</CardTitle>
              <CardDescription>
                了解题库文件的正确格式要求
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <FileJson className="mr-2 h-4 w-4" />
                  JSON 格式
                </h4>
                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-xs overflow-x-auto">
{`[
  {
    "id": "question-1",
    "type": "wenyan",
    "question": "题目内容",
    "options": ["选项A", "选项B", "选项C", "选项D"],
    "answer": 1,
    "explanation": "答案解析"
  },
  {
    "id": "judge-1",
    "question": "判断题内容",
    "answer": true,
    "explanation": "答案解析",
    "difficulty": 1
  }
]`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  CSV 格式
                </h4>
                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-xs overflow-x-auto">
{`id,type,question,options,answer,explanation,difficulty
q1,wenyan,题目内容,选项A|选项B|选项C|选项D,1,答案解析,
j1,judge,判断题内容,,,答案解析,1`}
                </pre>
                <p className="text-xs text-gray-500 mt-2">
                  注意：CSV 格式中，选择题的选项用 | 分隔
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 已导入题目统计 */}
          {typeof window !== 'undefined' && localStorage.getItem('custom-questions') && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>已导入题目</AlertTitle>
              <AlertDescription>
                当前已导入 {JSON.parse(localStorage.getItem('custom-questions') || '[]').length} 道自定义题目
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          {localStorage.getItem('custom-questions') && (
            <Button variant="destructive" onClick={clearCustomQuestions}>
              清除题库
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>
            关闭
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
