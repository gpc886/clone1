// 题库数据类型定义
export interface Question {
  id: string;
  question: string;
  options: string[];
  answer: number; // 正确答案的索引（0-3）
  explanation: string; // 答案解析
}

// 判断题类型定义（用于天梯赛模式）
export interface JudgeQuestion {
  id: string;
  question: string;
  answer: boolean; // true=正确, false=错误
  explanation: string; // 答案解析
  difficulty: number; // 难度等级 1-10
}

// 错题记录接口（天梯赛模式）
export interface WrongQuestionRecord {
  id: string;
  question: string;
  userAnswer: boolean; // 用户选择的答案
  correctAnswer: boolean; // 正确答案
  explanation: string;
  difficulty: number;
  timestamp: number; // 记录时间戳
}

// 本地存储键名
const WRONG_QUESTIONS_KEY = 'ladder-wrong-questions';

// 从 localStorage 获取错题记录
export const getWrongQuestions = (): WrongQuestionRecord[] => {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(WRONG_QUESTIONS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// 添加错题到 localStorage
export const addWrongQuestion = (question: JudgeQuestion, userAnswer: boolean) => {
  const wrongQuestions = getWrongQuestions();
  const newRecord: WrongQuestionRecord = {
    id: question.id,
    question: question.question,
    userAnswer,
    correctAnswer: question.answer,
    explanation: question.explanation,
    difficulty: question.difficulty,
    timestamp: Date.now()
  };

  // 检查是否已存在该题，避免重复记录
  const exists = wrongQuestions.some(q => q.id === question.id);
  if (!exists) {
    wrongQuestions.push(newRecord);
    localStorage.setItem(WRONG_QUESTIONS_KEY, JSON.stringify(wrongQuestions));
  }
};

// 清除错题记录
export const clearWrongQuestions = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(WRONG_QUESTIONS_KEY);
  }
};

// 删除单条错题记录
export const removeWrongQuestion = (id: string) => {
  const wrongQuestions = getWrongQuestions();
  const filtered = wrongQuestions.filter(q => q.id !== id);
  localStorage.setItem(WRONG_QUESTIONS_KEY, JSON.stringify(filtered));
};

export type QuestionType = 'wenyan' | 'idiom' | 'poetry' | 'judge';

// 文言文字词题目（120道）
export const wenyanQuestions: Question[] = [
  {
    id: 'wenyan-1',
    question: '"学而时习之，不亦说乎"中"说"的意思是？',
    options: ['说话', '高兴', '劝说', '告诉'],
    answer: 1,
    explanation: '"说"通"悦"，意思是高兴、喜悦。'
  },
  {
    id: 'wenyan-2',
    question: '"温故而知新，可以为师矣"中"故"的意思是？',
    options: ['所以', '缘故', '旧的知识', '因此'],
    answer: 2,
    explanation: '"故"指旧的知识，已经学过的内容。'
  },
  {
    id: 'wenyan-3',
    question: '"学而不思则罔，思而不学则殆"中"罔"的意思是？',
    options: ['迷茫', '困苦', '危险', '忧虑'],
    answer: 0,
    explanation: '"罔"意思是迷惑、迷茫，指学习而不思考就会一无所得。'
  },
  {
    id: 'wenyan-4',
    question: '"三人行，必有我师焉"中"三"的意思是？',
    options: ['三个人', '三五个', '几个', '多次'],
    answer: 2,
    explanation: '"三"在文言文中常表示虚数，意思是"几个"或"多个人"。'
  },
  {
    id: 'wenyan-5',
    question: '"吾日三省吾身"中"省"的意思是？',
    options: ['节省', '省略', '反省', '省份'],
    answer: 2,
    explanation: '"省"意为反省、检查。'
  },
  {
    id: 'wenyan-6',
    question: '"逝者如斯夫，不舍昼夜"中"舍"的意思是？',
    options: ['房子', '停止', '舍弃', '居住'],
    answer: 1,
    explanation: '"舍"意为停止，指时间不停流逝。'
  },
  {
    id: 'wenyan-7',
    question: '"人不知而不愠，不亦君子乎"中"愠"的意思是？',
    options: ['怨恨', '犹豫', '恩惠', '温和'],
    answer: 0,
    explanation: '"愠"意思是怨恨、生气。'
  },
  {
    id: 'wenyan-8',
    question: '"见贤思齐焉，见不贤而内自省也"中"齐"的意思是？',
    options: ['整齐', '平等', '看齐', '一起'],
    answer: 2,
    explanation: '"齐"意为看齐、向他学习，引申为向他看齐。'
  },
  {
    id: 'wenyan-9',
    question: '"学而不厌，诲人不倦"中"厌"的意思是？',
    options: ['厌恶', '厌倦', '满足', '厌烦'],
    answer: 2,
    explanation: '"厌"意为满足，"不厌"指永不满足，学习永不厌倦。'
  },
  {
    id: 'wenyan-10',
    question: '"己所不欲，勿施于人"中"施"的意思是？',
    options: ['施展', '实施', '施加', '施舍'],
    answer: 2,
    explanation: '"施"意为施加，把自己不想要的强加给别人。'
  },
  {
    id: 'wenyan-11',
    question: '"有朋自远方来，不亦乐乎"中"乐"的意思是？',
    options: ['音乐', '快乐', '乐器', '娱乐'],
    answer: 1,
    explanation: '"乐"通"悦"，意思是快乐、高兴。'
  },
  {
    id: 'wenyan-12',
    question: '"温故而知新"中"知"的意思是？',
    options: ['知道', '知识', '领悟', '了解'],
    answer: 2,
    explanation: '"知"在这里是领悟、获得新知识的意思。'
  },
  {
    id: 'wenyan-13',
    question: '"敏而好学，不耻下问"中"敏"的意思是？',
    options: ['敏捷', '聪明', '敏感', '迅速'],
    answer: 1,
    explanation: '"敏"意为聪明、天资聪慧。'
  },
  {
    id: 'wenyan-14',
    question: '"知之为知之，不知为不知"中"为"的意思是？',
    options: ['认为', '是', '为了', '作为'],
    answer: 1,
    explanation: '"为"在这里是"是"的意思。'
  },
  {
    id: 'wenyan-15',
    question: '"三人行，必有我师焉"中"焉"的意思是？',
    options: ['语气词', '哪里', '于是', '的样子'],
    answer: 0,
    explanation: '"焉"在这里是语气词，表示肯定。'
  },
  {
    id: 'wenyan-16',
    question: '"岁寒，然后知松柏之后凋也"中"凋"的意思是？',
    options: ['凋谢', '衰落', '寒冷', '零落'],
    answer: 0,
    explanation: '"凋"意为凋谢、枯萎。'
  },
  {
    id: 'wenyan-17',
    question: '"士不可以不弘毅，任重而道远"中"弘毅"的意思是？',
    options: ['宽大刚强', '宽容坚毅', '宏大勇敢', '广阔坚毅'],
    answer: 0,
    explanation: '"弘毅"意为抱负远大，意志坚强。'
  },
  {
    id: 'wenyan-18',
    question: '"博学而笃志"中"笃"的意思是？',
    options: ['笃定', '坚定', '笃厚', '笃实'],
    answer: 1,
    explanation: '"笃"意为坚定、坚守。'
  },
  {
    id: 'wenyan-19',
    question: '"切问而近思"中"切"的意思是？',
    options: ['切近', '切实', '急切', '恳切'],
    answer: 2,
    explanation: '"切"意为恳切、诚恳。'
  },
  {
    id: 'wenyan-20',
    question: '"子曰：吾十有五而志于学"中"志"的意思是？',
    options: ['志向', '立志', '意志', '志愿'],
    answer: 1,
    explanation: '"志"在这里作动词，意为立志。'
  },
  {
    id: 'wenyan-21',
    question: '"三十而立，四十而不惑"中"立"的意思是？',
    options: ['站立', '独立', '自立', '建立'],
    answer: 2,
    explanation: '"立"意为自立，指自立于社会。'
  },
  {
    id: 'wenyan-22',
    question: '"不患人之不己知，患不知人也"中第一个"患"的意思是？',
    options: ['担心', '祸患', '忧虑', '疾病'],
    answer: 0,
    explanation: '"患"意为担心、忧虑。'
  },
  {
    id: 'wenyan-23',
    question: '"工欲善其事，必先利其器"中"利"的意思是？',
    options: ['锋利', '使锋利', '顺利', '便利'],
    answer: 1,
    explanation: '"利"在这里是使动用法，意为使锋利、磨快。'
  },
  {
    id: 'wenyan-24',
    question: '"欲速则不达"中"达"的意思是？',
    options: ['到达', '通达', '达到目的', '表达'],
    answer: 2,
    explanation: '"达"意为达到目的、成功。'
  },
  {
    id: 'wenyan-25',
    question: '"质胜文则野，文胜质则史"中"质"的意思是？',
    options: ['质量', '本质', '朴实', '体质'],
    answer: 2,
    explanation: '"质"指朴实、本质。'
  },
  {
    id: 'wenyan-26',
    question: '"己欲立而立人，己欲达而达人"中两个"立"字的意思是？',
    options: ['站立，建立', '自立，使别人自立', '建立，成就', '独立，确立'],
    answer: 1,
    explanation: '第一个"立"是自立，第二个"立"是使别人自立。'
  },
  {
    id: 'wenyan-27',
    question: '"见义勇为"中"义"的意思是？',
    options: ['义气', '正义', '情义', '义务'],
    answer: 1,
    explanation: '"义"指正义、正当。'
  },
  {
    id: 'wenyan-28',
    question: '"不义而富且贵，于我如浮云"中"浮云"的意思是？',
    options: ['云彩', '虚幻不实的东西', '飘浮的云', '云朵'],
    answer: 1,
    explanation: '"浮云"比喻不值得重视的东西。'
  },
  {
    id: 'wenyan-29',
    question: '"学而不厌"中的"厌"通？',
    options: ['餍', '懑', '恹', '恚'],
    answer: 0,
    explanation: '"厌"通"餍"，意为满足。'
  },
  {
    id: 'wenyan-30',
    question: '"发愤忘食"中"发"的意思是？',
    options: ['出发', '激发', '奋发', '发出'],
    answer: 2,
    explanation: '"发"意为奋发、激发。'
  },
  {
    id: 'wenyan-31',
    question: '"乐以忘忧"中"乐"的意思是？',
    options: ['音乐', '快乐', '乐观', '享乐'],
    answer: 1,
    explanation: '"乐"意为快乐、以学习为乐。'
  },
  {
    id: 'wenyan-32',
    question: '"不知老之将至"中"之"的意思是？',
    options: ['的', '助词', '它', '到'],
    answer: 1,
    explanation: '"之"在这里是助词，无实义。'
  },
  {
    id: 'wenyan-33',
    question: '"三人行"中"行"的意思是？',
    options: ['行走', '行为', '同行', '行动'],
    answer: 2,
    explanation: '"行"意为同行、一起走。'
  },
  {
    id: 'wenyan-34',
    question: '"必有我师焉"中"必"的意思是？',
    options: ['必须', '必然', '一定', '务必'],
    answer: 2,
    explanation: '"必"意为一定、必定。'
  },
  {
    id: 'wenyan-35',
    question: '"择其善者而从之"中"从"的意思是？',
    options: ['跟从', '学习', '遵从', '听从'],
    answer: 1,
    explanation: '"从"意为学习、模仿。'
  },
  {
    id: 'wenyan-36',
    question: '"其不善者而改之"中"改"的意思是？',
    options: ['改正', '改变', '更改', '改过'],
    answer: 0,
    explanation: '"改"意为改正（自己的缺点）。'
  },
  {
    id: 'wenyan-37',
    question: '"过则勿惮改"中"惮"的意思是？',
    options: ['担心', '害怕', '忌惮', '顾虑'],
    answer: 1,
    explanation: '"惮"意为害怕、畏惧。'
  },
  {
    id: 'wenyan-38',
    question: '"君子坦荡荡，小人长戚戚"中"坦荡荡"的意思是？',
    options: ['宽阔的样子', '心胸宽广的样子', '平坦的样子', '坦然的样子'],
    answer: 1,
    explanation: '"坦荡荡"形容心胸宽广、坦然。'
  },
  {
    id: 'wenyan-39',
    question: '"长戚戚"中"戚戚"的意思是？',
    options: ['忧愁的样子', '悲戚的样子', '忧虑的样子', '悲伤的样子'],
    answer: 0,
    explanation: '"戚戚"形容忧愁、患得患失的样子。'
  },
  {
    id: 'wenyan-40',
    question: '"岁寒"指的是？',
    options: ['寒冷的冬天', '每年的冬天', '比喻艰苦的环境', '比喻乱世'],
    answer: 2,
    explanation: '"岁寒"比喻艰苦的环境或动荡的时代。'
  },
  {
    id: 'wenyan-41',
    question: '"仁以为己任"中"仁"的意思是？',
    options: ['仁慈', '仁爱', '仁德', '仁义'],
    answer: 2,
    explanation: '"仁"指仁德、仁爱之道。'
  },
  {
    id: 'wenyan-42',
    question: '"死而后已"中"已"的意思是？',
    options: ['已经', '完毕', '停止', '完成'],
    answer: 2,
    explanation: '"已"意为停止、中止。'
  },
  {
    id: 'wenyan-43',
    question: '"不亦君子乎"中"君子"的意思是？',
    options: ['君子兰', '品德高尚的人', '统治阶级', '知识分子'],
    answer: 1,
    explanation: '"君子"指品德高尚的人。'
  },
  {
    id: 'wenyan-44',
    question: '"人不知而不愠"中"知"的意思是？',
    options: ['知道', '了解', '理解', '赏识'],
    answer: 1,
    explanation: '"知"意为了解、赏识。'
  },
  {
    id: 'wenyan-45',
    question: '"不耻下问"中"耻"的意思是？',
    options: ['耻辱', '羞耻', '以...为耻', '可耻'],
    answer: 2,
    explanation: '"耻"意为以...为耻，形容词的意动用法。'
  },
  {
    id: 'wenyan-46',
    question: '"下问"中"下"的意思是？',
    options: ['下面', '地位低的人', '向下', '下层'],
    answer: 1,
    explanation: '"下"指地位比自己低的人。'
  },
  {
    id: 'wenyan-47',
    question: '"学而不思则罔"中"思"的意思是？',
    options: ['思想', '思考', '思维', '思想感情'],
    answer: 1,
    explanation: '"思"意为思考、思索。'
  },
  {
    id: 'wenyan-48',
    question: '"思而不学则殆"中"殆"的意思是？',
    options: ['危险', '怠慢', '疲倦', '疑惑'],
    answer: 3,
    explanation: '"殆"意为疑惑、精神疲倦而无所得。'
  },
  {
    id: 'wenyan-49',
    question: '"可以为师矣"中"以"的意思是？',
    options: ['因为', '用来', '凭', '已经'],
    answer: 2,
    explanation: '"以"意为凭、凭借。'
  },
  {
    id: 'wenyan-50',
    question: '"好古，敏以求之者也"中"好"的意思是？',
    options: ['爱好', '喜好', '喜欢', '美好的'],
    answer: 0,
    explanation: '"好"意为爱好、喜爱，读作hào。'
  },
  {
    id: 'wenyan-51',
    question: '"敏以求之"中"之"的意思是？',
    options: ['的', '代指知识', '助词', '它'],
    answer: 1,
    explanation: '"之"代指古代的知识。'
  },
  {
    id: 'wenyan-52',
    question: '"默而识之"中"识"的意思是？',
    options: ['认识', '记住', '识别', '知识'],
    answer: 1,
    explanation: '"识"意为记住，读作zhì。'
  },
  {
    id: 'wenyan-53',
    question: '"学而不厌，诲人不倦"中"诲"的意思是？',
    options: ['教导', '教诲', '告诉', '讲解'],
    answer: 0,
    explanation: '"诲"意为教导。'
  },
  {
    id: 'wenyan-54',
    question: '"何有于我哉"中"何有"的意思是？',
    options: ['有什么', '哪里有', '怎能', '如何'],
    answer: 0,
    explanation: '"何有"意为有什么、哪有。'
  },
  {
    id: 'wenyan-55',
    question: '"三思而后行"中"三"的意思是？',
    options: ['三次', '三个', '多次', '三番'],
    answer: 2,
    explanation: '"三"表示多次，反复思考。'
  },
  {
    id: 'wenyan-56',
    question: '"朝闻道，夕死可矣"中"闻"的意思是？',
    options: ['闻见', '听见', '领悟', '闻知'],
    answer: 2,
    explanation: '"闻"意为领悟、明白。'
  },
  {
    id: 'wenyan-57',
    question: '"君子务本"中"务"的意思是？',
    options: ['务必', '任务', '致力于', '服务'],
    answer: 2,
    explanation: '"务"意为致力于、专心从事。'
  },
  {
    id: 'wenyan-58',
    question: '"本立而道生"中"本"的意思是？',
    options: ['根本', '本来', '书本', '自己'],
    answer: 0,
    explanation: '"本"指根本、基础。'
  },
  {
    id: 'wenyan-59',
    question: '"道生"中"道"的意思是？',
    options: ['道路', '道义', '道理', '道德'],
    answer: 2,
    explanation: '"道"指道理、正道。'
  },
  {
    id: 'wenyan-60',
    question: '"信近于义"中"信"的意思是？',
    options: ['信任', '信用', '守信', '相信'],
    answer: 2,
    explanation: '"信"意为守信、诚实。'
  },
  {
    id: 'wenyan-61',
    question: '《论语》中"有朋自远方来，不亦乐乎"中的"朋"指的是？',
    options: ['朋友', '志同道合的人', '同学', '亲戚'],
    answer: 1,
    explanation: '"朋"指志同道合的人，这里指同学。'
  },
  {
    id: 'wenyan-62',
    question: '"温故而知新，可以为师矣"中"为"的意思是？',
    options: ['为了', '成为', '作为', '是'],
    answer: 1,
    explanation: '"为"意为成为。'
  },
  {
    id: 'wenyan-63',
    question: '"学而时习之"中"习"的意思是？',
    options: ['习惯', '复习', '练习', '学习'],
    answer: 1,
    explanation: '"习"意为复习、温习。'
  },
  {
    id: 'wenyan-64',
    question: '"学而不厌"中"厌"的意思是？',
    options: ['讨厌', '厌倦', '满足', '厌恶'],
    answer: 2,
    explanation: '"厌"通"餍"，意为满足。'
  },
  {
    id: 'wenyan-65',
    question: '"默而识之"中"识"的意思是？',
    options: ['知识', '识别', '记住', '认识'],
    answer: 2,
    explanation: '"识"意为记住，读作zhì。'
  },
  {
    id: 'wenyan-66',
    question: '"三十而立"中"立"的意思是？',
    options: ['站立', '独立', '自立', '确立'],
    answer: 2,
    explanation: '"立"意为自立于社会。'
  },
  {
    id: 'wenyan-67',
    question: '"四十而不惑"中"惑"的意思是？',
    options: ['迷惑', '困惑', '疑惑', '糊涂'],
    answer: 1,
    explanation: '"惑"意为困惑、迷惑。'
  },
  {
    id: 'wenyan-68',
    question: '"五十而知天命"中"天命"的意思是？',
    options: ['上天', '命运', '自然规律', '天意'],
    answer: 1,
    explanation: '"天命"指命运、上天的旨意。'
  },
  {
    id: 'wenyan-69',
    question: '"六十而耳顺"中"耳顺"的意思是？',
    options: ['听力好', '能听懂话', '能听进各种意见', '耳朵顺从'],
    answer: 2,
    explanation: '"耳顺"意为能听进各种不同的意见。'
  },
  {
    id: 'wenyan-70',
    question: '"七十而从心所欲，不逾矩"中"逾"的意思是？',
    options: ['超过', '越过', '违背', '超过界限'],
    answer: 2,
    explanation: '"逾"意为违背、超过。'
  },
  {
    id: 'wenyan-71',
    question: '"己所不欲，勿施于人"中"施"的意思是？',
    options: ['实施', '施加', '给予', '施舍'],
    answer: 1,
    explanation: '"施"意为施加。'
  },
  {
    id: 'wenyan-72',
    question: '"三人行，必有我师焉"中"三"的意思是？',
    options: ['三个', '三五个', '多个', '许多'],
    answer: 2,
    explanation: '"三"表示虚数，意为多个、几个。'
  },
  {
    id: 'wenyan-73',
    question: '"择其善者而从之"中"从"的意思是？',
    options: ['跟从', '学习', '遵从', '跟随'],
    answer: 1,
    explanation: '"从"意为学习、模仿。'
  },
  {
    id: 'wenyan-74',
    question: '"其不善者而改之"中"改"的意思是？',
    options: ['改变', '改正', '修改', '更改'],
    answer: 1,
    explanation: '"改"意为改正自己的缺点。'
  },
  {
    id: 'wenyan-75',
    question: '"过则勿惮改"中"惮"的意思是？',
    options: ['担心', '忌惮', '害怕', '顾虑'],
    answer: 2,
    explanation: '"惮"意为害怕、畏惧。'
  },
  {
    id: 'wenyan-76',
    question: '"见贤思齐焉"中"齐"的意思是？',
    options: ['整齐', '平等', '看齐', '一致'],
    answer: 2,
    explanation: '"齐"意为看齐、向他学习。'
  },
  {
    id: 'wenyan-77',
    question: '"见不贤而内自省也"中"省"的意思是？',
    options: ['省略', '节省', '反省', '省份'],
    answer: 2,
    explanation: '"省"意为反省、检讨。'
  },
  {
    id: 'wenyan-78',
    question: '"学而不思则罔"中"罔"的意思是？',
    options: ['欺骗', '迷惘', '困苦', '危险'],
    answer: 1,
    explanation: '"罔"意为迷惘、迷惑。'
  },
  {
    id: 'wenyan-79',
    question: '"思而不学则殆"中"殆"的意思是？',
    options: ['危险', '疑惑', '疲倦', '松懈'],
    answer: 1,
    explanation: '"殆"意为疑惑、精神疲倦。'
  },
  {
    id: 'wenyan-80',
    question: '"知之为知之，不知为不知"中"为"的意思是？',
    options: ['认为', '是', '作为', '因为'],
    answer: 1,
    explanation: '"为"意为是。'
  },
  {
    id: 'wenyan-81',
    question: '"是知也"中"知"的意思是？',
    options: ['知道', '智慧', '知识', '通"智"'],
    answer: 3,
    explanation: '"知"通"智"，意为智慧。'
  },
  {
    id: 'wenyan-82',
    question: '"人而无信，不知其可也"中"信"的意思是？',
    options: ['信任', '信用', '守信', '诚实'],
    answer: 2,
    explanation: '"信"意为守信、诚信。'
  },
  {
    id: 'wenyan-83',
    question: '"其可也"中"可"的意思是？',
    options: ['可以', '可能', '认可', '行得通'],
    answer: 3,
    explanation: '"可"意为行得通、可行。'
  },
  {
    id: 'wenyan-84',
    question: '"事父母几谏"中"几"的意思是？',
    options: ['几次', '几乎', '轻微', '委婉'],
    answer: 3,
    explanation: '"几"意为委婉、轻微。'
  },
  {
    id: 'wenyan-85',
    question: '"见志不从"中"从"的意思是？',
    options: ['跟从', '听从', '顺从', '跟随'],
    answer: 1,
    explanation: '"从"意为听从。'
  },
  {
    id: 'wenyan-86',
    question: '"又敬不违"中"违"的意思是？',
    options: ['违背', '离开', '违反', '反抗'],
    answer: 0,
    explanation: '"违"意为违背、违抗。'
  },
  {
    id: 'wenyan-87',
    question: '"劳而不怨"中"怨"的意思是？',
    options: ['抱怨', '怨恨', '埋怨', '怨言'],
    answer: 1,
    explanation: '"怨"意为怨恨。'
  },
  {
    id: 'wenyan-88',
    question: '"父母在，不远游"中"远"的意思是？',
    options: ['远方', '长远', '远离', '距离远'],
    answer: 2,
    explanation: '"远"意为远离。'
  },
  {
    id: 'wenyan-89',
    question: '"游必有方"中"方"的意思是？',
    options: ['方向', '地方', '正当', '方法'],
    answer: 1,
    explanation: '"方"意为地方、去处。'
  },
  {
    id: 'wenyan-90',
    question: '"父母之年，不可不知也"中第一个"知"的意思是？',
    options: ['知道', '记住', '了解', '认识'],
    answer: 1,
    explanation: '"知"意为记住。'
  },
  {
    id: 'wenyan-91',
    question: '"一则以喜，一则以惧"中"惧"的意思是？',
    options: ['恐惧', '担忧', '害怕', '畏惧'],
    answer: 1,
    explanation: '"惧"意为担忧、忧虑。'
  },
  {
    id: 'wenyan-92',
    question: '"古者言之不出"中"言"的意思是？',
    options: ['语言', '说话', '话语', '言论'],
    answer: 1,
    explanation: '"言"意为说话、言语。'
  },
  {
    id: 'wenyan-93',
    question: '"耻躬之不逮也"中"躬"的意思是？',
    options: ['身体', '亲自', '躬身', '自身'],
    answer: 3,
    explanation: '"躬"意为自身。'
  },
  {
    id: 'wenyan-94',
    question: '"耻躬之不逮也"中"逮"的意思是？',
    options: ['到达', '赶上', '及得上', '达到'],
    answer: 2,
    explanation: '"逮"意为及得上、达到。'
  },
  {
    id: 'wenyan-95',
    question: '"君子欲讷于言而敏于行"中"讷"的意思是？',
    options: ['说话慢', '说话谨慎', '不善言辞', '结巴'],
    answer: 1,
    explanation: '"讷"意为说话谨慎、迟缓。'
  },
  {
    id: 'wenyan-96',
    question: '"敏于行"中"敏"的意思是？',
    options: ['敏捷', '聪明', '勤勉', '迅速'],
    answer: 2,
    explanation: '"敏"意为勤勉、敏捷。'
  },
  {
    id: 'wenyan-97',
    question: '"德不孤，必有邻"中"孤"的意思是？',
    options: ['孤独', '孤单', '孤立', '寂寞'],
    answer: 2,
    explanation: '"孤"意为孤立。'
  },
  {
    id: 'wenyan-98',
    question: '"必有邻"中"邻"的意思是？',
    options: ['邻居', '伙伴', '朋友', '支持者'],
    answer: 1,
    explanation: '"邻"意为伙伴、志同道合的人。'
  },
  {
    id: 'wenyan-99',
    question: '"朽木不可雕也"中"雕"的意思是？',
    options: ['雕刻', '塑造', '雕琢', '加工'],
    answer: 2,
    explanation: '"雕"意为雕琢、雕刻。'
  },
  {
    id: 'wenyan-100',
    question: '"粪土之墙不可圬也"中"圬"的意思是？',
    options: ['建筑', '涂抹', '粉刷', '修饰'],
    answer: 1,
    explanation: '"圬"意为涂抹、粉刷。'
  },
  {
    id: 'wenyan-101',
    question: '"始吾于人也"中"于"的意思是？',
    options: ['对于', '在', '向', '对'],
    answer: 0,
    explanation: '"于"意为对于。'
  },
  {
    id: 'wenyan-102',
    question: '"听其言而信其行"中"信"的意思是？',
    options: ['相信', '信任', '守信', '信用'],
    answer: 0,
    explanation: '"信"意为相信。'
  },
  {
    id: 'wenyan-103',
    question: '"今吾于人也"中"于"的意思是？',
    options: ['对于', '在', '向', '对'],
    answer: 0,
    explanation: '"于"意为对于。'
  },
  {
    id: 'wenyan-104',
    question: '"听其言而观其行"中"观"的意思是？',
    options: ['观看', '观察', '审视', '看'],
    answer: 1,
    explanation: '"观"意为观察。'
  },
  {
    id: 'wenyan-105',
    question: '"质胜文则野"中"文"的意思是？',
    options: ['文章', '文化', '文采', '文明'],
    answer: 2,
    explanation: '"文"意为文采、礼乐修养。'
  },
  {
    id: 'wenyan-106',
    question: '"文胜质则史"中"史"的意思是？',
    options: ['历史', '史官', '浮华', '文辞华丽'],
    answer: 3,
    explanation: '"史"意为浮华、文辞华丽。'
  },
  {
    id: 'wenyan-107',
    question: '"文质彬彬"中"彬彬"的意思是？',
    options: ['文雅', '文质兼备的样子', '优雅', '斯文'],
    answer: 1,
    explanation: '"彬彬"意为文质兼备、配合适宜的样子。'
  },
  {
    id: 'wenyan-108',
    question: '"然后君子"中"然后"的意思是？',
    options: ['这样之后', '然后', '之后', '最后'],
    answer: 0,
    explanation: '"然后"意为这样之后。'
  },
  {
    id: 'wenyan-109',
    question: '"知之者不如好之者"中"好"的意思是？',
    options: ['爱好', '喜好', '喜爱', '喜欢'],
    answer: 1,
    explanation: '"好"意为爱好、喜好。'
  },
  {
    id: 'wenyan-110',
    question: '"好之者不如乐之者"中"乐"的意思是？',
    options: ['音乐', '快乐', '以...为乐', '享乐'],
    answer: 2,
    explanation: '"乐"意为以...为乐。'
  },
  {
    id: 'wenyan-111',
    question: '"中人以上，可以语上也"中"语"的意思是？',
    options: ['语言', '说话', '告诉', '谈论'],
    answer: 2,
    explanation: '"语"意为告诉、告诉...关于...的事。'
  },
  {
    id: 'wenyan-112',
    question: '"中人以下，不可以语上也"中两个"上"的意思是？',
    options: ['上面', '上等，高深的道理', '向上', '上级'],
    answer: 1,
    explanation: '"上"指高深的学问或道理。'
  },
  {
    id: 'wenyan-113',
    question: '"知者乐水"中第一个"乐"的意思是？',
    options: ['快乐', '喜爱', '音乐', '乐观'],
    answer: 1,
    explanation: '"乐"意为喜爱。'
  },
  {
    id: 'wenyan-114',
    question: '"仁者乐山"中"乐"的意思是？',
    options: ['快乐', '喜爱', '音乐', '乐观'],
    answer: 1,
    explanation: '"乐"意为喜爱。'
  },
  {
    id: 'wenyan-115',
    question: '"知者动，仁者静"中"动"的意思是？',
    options: ['运动', '行动', '活跃', '变动'],
    answer: 2,
    explanation: '"动"意为活跃、灵动。'
  },
  {
    id: 'wenyan-116',
    question: '"知者乐，仁者寿"中"寿"的意思是？',
    options: ['长寿', '寿命', '健康', '年老'],
    answer: 0,
    explanation: '"寿"意为长寿。'
  },
  {
    id: 'wenyan-117',
    question: '"逝者如斯夫"中"逝"的意思是？',
    options: ['消逝', '流逝', '去世', '消失'],
    answer: 1,
    explanation: '"逝"意为流逝。'
  },
  {
    id: 'wenyan-118',
    question: '"不舍昼夜"中"舍"的意思是？',
    options: ['舍弃', '停止', '放弃', '离开'],
    answer: 1,
    explanation: '"舍"意为停止。'
  },
  {
    id: 'wenyan-119',
    question: '"譬如为山，未成一篑"中"篑"的意思是？',
    options: ['筐', '篓子', '土筐', '容器'],
    answer: 2,
    explanation: '"篑"指装土的筐子。'
  },
  {
    id: 'wenyan-120',
    question: '"止，吾止也"中"止"的意思是？',
    options: ['停止', '终止', '中止', '中止'],
    answer: 0,
    explanation: '"止"意为停止。'
  }
];

// 成语典故题目（120道）
export const idiomQuestions: Question[] = [
  {
    id: 'idiom-1',
    question: '"画蛇添足"这个成语的意思是？',
    options: ['画蛇的艺术', '做事恰到好处', '做多余的事', '蛇有四条腿'],
    answer: 2,
    explanation: '"画蛇添足"比喻做了多余的事，反而不好。'
  },
  {
    id: 'idiom-2',
    question: '"守株待兔"这个成语比喻？',
    options: ['坚持等待', '心存侥幸，想不劳而获', '爱护动物', '耐心观察'],
    answer: 1,
    explanation: '"守株待兔"比喻死守狭隘的经验，不知变通；也比喻心存侥幸，想不劳而获。'
  },
  {
    id: 'idiom-3',
    question: '"掩耳盗铃"这个成语的意思是？',
    options: ['保护耳朵', '偷铃铛', '自己欺骗自己', '聋子偷东西'],
    answer: 2,
    explanation: '"掩耳盗铃"比喻自己欺骗自己，明明掩盖不住的事情偏要想法子掩盖。'
  },
  {
    id: 'idiom-4',
    question: '"亡羊补牢"这个成语的意思是？',
    options: ['羊死了', '羊圈坏了', '出了问题及时补救', '补修羊圈'],
    answer: 2,
    explanation: '"亡羊补牢"比喻出了问题以后想办法补救，可以防止继续受损失。'
  },
  {
    id: 'idiom-5',
    question: '"刻舟求剑"这个成语讽刺的是？',
    options: ['船工', '剑客', '死守教条，不知变通的人', '做记号的人'],
    answer: 2,
    explanation: '"刻舟求剑"比喻死守教条，拘泥成法，固执不知变通。'
  },
  {
    id: 'idiom-6',
    question: '"井底之蛙"这个成语比喻？',
    options: ['青蛙', '眼光短浅的人', '井水', '游泳的人'],
    answer: 1,
    explanation: '"井底之蛙"比喻眼界狭窄，见识短浅的人。'
  },
  {
    id: 'idiom-7',
    question: '"杯弓蛇影"这个成语形容的是？',
    options: ['酒杯的影子', '弓箭的形状', '疑神疑鬼，自相惊扰', '蛇的形状'],
    answer: 2,
    explanation: '"杯弓蛇影"比喻疑神疑鬼，自相惊扰。'
  },
  {
    id: 'idiom-8',
    question: '"狐假虎威"这个成语的意思是？',
    options: ['狐狸和老虎做朋友', '狐狸比老虎厉害', '借别人的威势欺压人', '老虎帮助狐狸'],
    answer: 2,
    explanation: '"狐假虎威"比喻依仗别人的势力来欺压人。'
  },
  {
    id: 'idiom-9',
    question: '"对牛弹琴"这个成语比喻？',
    options: ['牛的音乐', '牛的听力', '对不讲道理的人讲道理', '弹琴给牛听'],
    answer: 2,
    explanation: '"对牛弹琴"比喻对不讲道理的人讲道理，或对不懂这种艺术的人谈论这种艺术。'
  },
  {
    id: 'idiom-10',
    question: '"盲人摸象"这个成语说明的道理是？',
    options: ['大象很可爱', '盲人喜欢大象', '只了解局部，不了解整体', '大象有四个部分'],
    answer: 2,
    explanation: '"盲人摸象"比喻对事物只了解一部分，缺乏全面的认识。'
  },
  {
    id: 'idiom-11',
    question: '"拔苗助长"这个成语比喻？',
    options: ['帮助生长', '违反事物规律，急于求成', '拔草', '勤劳工作'],
    answer: 1,
    explanation: '"拔苗助长"比喻违反事物发展的客观规律，急于求成，反而把事情弄糟。'
  },
  {
    id: 'idiom-12',
    question: '"掩耳盗铃"中的"盗"的意思是？',
    options: ['偷', '盗贼', '抢劫', '偷窃'],
    answer: 0,
    explanation: '"盗"意为偷、偷窃。'
  },
  {
    id: 'idiom-13',
    question: '"自相矛盾"这个成语出自？',
    options: ['《韩非子》', '《孟子》', '《庄子》', '《论语》'],
    answer: 0,
    explanation: '"自相矛盾"出自《韩非子·难一》，讲述卖矛和盾的故事。'
  },
  {
    id: 'idiom-14',
    question: '"滥竽充数"这个成语讽刺的是？',
    options: ['会吹竽的人', '不会吹竽的人', '南郭先生', '齐宣王'],
    answer: 1,
    explanation: '"滥竽充数"比喻没有真才实学的人混在行家里面充数。'
  },
  {
    id: 'idiom-15',
    question: '"望梅止渴"这个成语比喻？',
    options: ['吃梅子', '用空想安慰自己', '看到梅子', '渴望得到'],
    answer: 1,
    explanation: '"望梅止渴"比喻用空想来安慰自己。'
  },
  {
    id: 'idiom-16',
    question: '"胸有成竹"这个成语形容的是？',
    options: ['胸中有竹子', '做事之前已经有计划', '画画很好', '心中有数'],
    answer: 1,
    explanation: '"胸有成竹"比喻做事之前已经有成熟的计划。'
  },
  {
    id: 'idiom-17',
    question: '"纸上谈兵"这个成语讽刺的是？',
    options: ['会写字的人', '纸上画画', '空谈理论，不能解决实际问题', '读书人'],
    answer: 2,
    explanation: '"纸上谈兵"比喻空谈理论，不能解决实际问题。'
  },
  {
    id: 'idiom-18',
    question: '"指鹿为马"这个成语比喻？',
    options: ['指鹿给马看', '颠倒黑白，混淆是非', '养鹿养马', '动物分类'],
    answer: 1,
    explanation: '"指鹿为马"比喻颠倒黑白，混淆是非。'
  },
  {
    id: 'idiom-19',
    question: '"负荆请罪"这个成语出自？',
    options: ['廉颇和蔺相如', '项羽和刘邦', '荆轲和秦王', '曹操和关羽'],
    answer: 0,
    explanation: '"负荆请罪"出自廉颇和蔺相如的故事。'
  },
  {
    id: 'idiom-20',
    question: '"三顾茅庐"这个成语讲述的是？',
    options: ['诸葛亮', '刘备', '曹操', '孙权'],
    answer: 1,
    explanation: '"三顾茅庐"讲述刘备三次拜访诸葛亮的故事。'
  },
  {
    id: 'idiom-21',
    question: '"草船借箭"这个故事的主人公是？',
    options: ['周瑜', '诸葛亮', '曹操', '鲁肃'],
    answer: 1,
    explanation: '"草船借箭"的主人公是诸葛亮。'
  },
  {
    id: 'idiom-22',
    question: '"卧薪尝胆"这个成语形容的是？',
    options: ['睡觉', '吃苦受罪，发愤图强', '吃苦', '生活艰苦'],
    answer: 1,
    explanation: '"卧薪尝胆"形容人刻苦自励，发愤图强。'
  },
  {
    id: 'idiom-23',
    question: '"破釜沉舟"这个成语出自？',
    options: ['项羽', '刘邦', '韩信', '曹操'],
    answer: 0,
    explanation: '"破釜沉舟"出自项羽破釜沉舟、背水一战的故事。'
  },
  {
    id: 'idiom-24',
    question: '"四面楚歌"这个成语形容的是？',
    options: ['唱歌', '四面受敌，孤立无援', '楚国的歌声', '音乐'],
    answer: 1,
    explanation: '"四面楚歌"比喻陷入四面受敌、孤立无援的境地。'
  },
  {
    id: 'idiom-25',
    question: '"闻鸡起舞"这个成语形容的是？',
    options: ['养鸡', '早起锻炼', '勤奋刻苦', '跳舞'],
    answer: 2,
    explanation: '"闻鸡起舞"形容勤奋刻苦，有志向。'
  },
  {
    id: 'idiom-26',
    question: '"悬梁刺股"这个成语讲述的是？',
    options: ['苏秦和孙敬', '孙膑和庞涓', '廉颇和蔺相如', '韩非和李斯'],
    answer: 0,
    explanation: '"悬梁刺股"讲述苏秦悬梁、孙敬刺股刻苦学习的故事。'
  },
  {
    id: 'idiom-27',
    question: '"凿壁偷光"这个成语讲述的是？',
    options: ['匡衡', '孙康', '车胤', '王羲之'],
    answer: 0,
    explanation: '"凿壁偷光"讲述匡衡凿壁借光读书的故事。'
  },
  {
    id: 'idiom-28',
    question: '"囊萤映雪"这个成语中的"萤"指的是？',
    options: ['萤火虫', '萤光', '萤火', '明亮'],
    answer: 0,
    explanation: '"萤"指萤火虫，借光读书。'
  },
  {
    id: 'idiom-29',
    question: '"程门立雪"这个成语讲述的是？',
    options: ['程颐', '杨时', '程颢', '朱熹'],
    answer: 1,
    explanation: '"程门立雪"讲述杨时尊敬老师程颐的故事。'
  },
  {
    id: 'idiom-30',
    question: '"画饼充饥"这个成语比喻？',
    options: ['画画', '做饼', '用空想来安慰自己', '饥饿'],
    answer: 2,
    explanation: '"画饼充饥"比喻用空想来安慰自己。'
  },
  {
    id: 'idiom-31',
    question: '"望洋兴叹"这个成语形容的是？',
    options: ['看海洋', '感到力量不足而无可奈何', '感叹', '旅游'],
    answer: 1,
    explanation: '"望洋兴叹"比喻感到力量不足而无可奈何。'
  },
  {
    id: 'idiom-32',
    question: '"叶公好龙"这个成语讽刺的是？',
    options: ['喜欢龙', '口头上说喜欢某事，实际上并不真喜欢', '画画', '迷信'],
    answer: 1,
    explanation: '"叶公好龙"比喻口头上说喜欢某事，实际上并不真喜欢。'
  },
  {
    id: 'idiom-33',
    question: '"黔驴技穷"这个成语比喻？',
    options: ['驴', '本领有限', '黔地的驴', '技术高超'],
    answer: 1,
    explanation: '"黔驴技穷"比喻本领有限，技穷。'
  },
  {
    id: 'idiom-34',
    question: '"南辕北辙"这个成语的意思是？',
    options: ['南北方向', '行动和目的相反', '驾车', '旅行'],
    answer: 1,
    explanation: '"南辕北辙"比喻行动和目的相反。'
  },
  {
    id: 'idiom-35',
    question: '"缘木求鱼"这个成语比喻？',
    options: ['钓鱼', '爬树', '方法不对，达不到目的', '生活'],
    answer: 2,
    explanation: '"缘木求鱼"比喻方法不对，达不到目的。'
  },
  {
    id: 'idiom-36',
    question: '"买椟还珠"这个成语讽刺的是？',
    options: ['买珍珠', '没有眼光，取舍不当', '卖珍珠', '包装'],
    answer: 1,
    explanation: '"买椟还珠"比喻没有眼光，取舍不当。'
  },
  {
    id: 'idiom-37',
    question: '"滥竽充数"这个成语中的"滥"的意思是？',
    options: ['泛滥', '超过', '失实', '随意'],
    answer: 2,
    explanation: '"滥"意为失实、虚假。'
  },
  {
    id: 'idiom-38',
    question: '"自相矛盾"这个成语中的"矛"是指？',
    options: ['兵器', '攻击', '长矛', '武器'],
    answer: 2,
    explanation: '"矛"指古代的一种兵器长矛。'
  },
  {
    id: 'idiom-39',
    question: '"自相矛盾"这个成语中的"盾"是指？',
    options: ['盾牌', '防护', '防御', '保护'],
    answer: 0,
    explanation: '"盾"指盾牌，古代的防御武器。'
  },
  {
    id: 'idiom-40',
    question: '"邯郸学步"这个成语比喻？',
    options: ['学走路', '模仿别人不得要领，连自己原有的技能也丢了', '邯郸的步法', '旅行'],
    answer: 1,
    explanation: '"邯郸学步"比喻模仿别人不得要领，连自己原有的技能也丢了。'
  },
  {
    id: 'idiom-41',
    question: '"东施效颦"这个成语讽刺的是？',
    options: ['丑女', '盲目模仿，效果不好', '西施', '学美'],
    answer: 1,
    explanation: '"东施效颦"比喻盲目模仿，效果不好。'
  },
  {
    id: 'idiom-42',
    question: '"黔驴技穷"中的"黔"指的是？',
    options: ['贵州', '地名', '黑色', '贫穷'],
    answer: 0,
    explanation: '"黔"指贵州一带。'
  },
  {
    id: 'idiom-43',
    question: '"对牛弹琴"中的"琴"指的是？',
    options: ['钢琴', '古琴', '乐器', '音乐'],
    answer: 1,
    explanation: '"琴"指古琴。'
  },
  {
    id: 'idiom-44',
    question: '"守株待兔"中的"株"指的是？',
    options: ['树桩', '树', '木桩', '竹子'],
    answer: 0,
    explanation: '"株"指树桩。'
  },
  {
    id: 'idiom-45',
    question: '"亡羊补牢"中的"牢"指的是？',
    options: ['牢固', '牢房', '羊圈', '监狱'],
    answer: 2,
    explanation: '"牢"指羊圈。'
  },
  {
    id: 'idiom-46',
    question: '"刻舟求剑"中的"舟"指的是？',
    options: ['船', '舟山', '小船', '渔船'],
    answer: 0,
    explanation: '"舟"指船。'
  },
  {
    id: 'idiom-47',
    question: '"掩耳盗铃"中的"铃"指的是？',
    options: ['铃铛', '铃声', '铃铛声', '声音'],
    answer: 0,
    explanation: '"铃"指铃铛。'
  },
  {
    id: 'idiom-48',
    question: '"画蛇添足"中的"足"指的是？',
    options: ['脚', '手脚', '蛇足', '尾巴'],
    answer: 0,
    explanation: '"足"指脚。'
  },
  {
    id: 'idiom-49',
    question: '"杯弓蛇影"中的"影"指的是？',
    options: ['影子', '影像', '倒影', '图像'],
    answer: 0,
    explanation: '"影"指影子。'
  },
  {
    id: 'idiom-50',
    question: '"井底之蛙"中的"蛙"指的是？',
    options: ['青蛙', '蛤蟆', '牛蛙', '蟾蜍'],
    answer: 0,
    explanation: '"蛙"指青蛙。'
  },
  {
    id: 'idiom-51',
    question: '"一箭双雕"这个成语比喻？',
    options: ['射箭', '做一件事达到两个目的', '两只雕', '狩猎'],
    answer: 1,
    explanation: '"一箭双雕"比喻做一件事达到两个目的。'
  },
  {
    id: 'idiom-52',
    question: '"一举两得"这个成语的意思是？',
    options: ['一举成名', '做一件事得到两种好处', '举重', '考试'],
    answer: 1,
    explanation: '"一举两得"指做一件事得到两种好处。'
  },
  {
    id: 'idiom-53',
    question: '"两全其美"这个成语形容的是？',
    options: ['两人都好', '两方面都圆满', '两件事都做好', '完美'],
    answer: 1,
    explanation: '"两全其美"指两方面都圆满。'
  },
  {
    id: 'idiom-54',
    question: '"两败俱伤"这个成语比喻？',
    options: ['两个人受伤', '双方都受损', '打斗', '战争'],
    answer: 1,
    explanation: '"两败俱伤"比喻双方都受损。'
  },
  {
    id: 'idiom-55',
    question: '"鹬蚌相争，渔翁得利"这个成语的意思是？',
    options: ['吃鹬蚌', '双方争执不下，第三者从中得利', '打渔', '争斗'],
    answer: 1,
    explanation: '"鹬蚌相争，渔翁得利"比喻双方争执不下，第三者从中得利。'
  },
  {
    id: 'idiom-56',
    question: '"坐享其成"这个成语比喻？',
    options: ['坐着成功', '自己不出力而享受别人的劳动成果', '成功', '幸福'],
    answer: 1,
    explanation: '"坐享其成"比喻自己不出力而享受别人的劳动成果。'
  },
  {
    id: 'idiom-57',
    question: '"不劳而获"这个成语的意思是？',
    options: ['不劳动', '自己不劳动而占有别人的劳动成果', '不用工作', '轻松'],
    answer: 1,
    explanation: '"不劳而获"指自己不劳动而占有别人的劳动成果。'
  },
  {
    id: 'idiom-58',
    question: '"半途而废"这个成语比喻？',
    options: ['半路停止', '做事不能坚持到底', '放弃', '失败'],
    answer: 1,
    explanation: '"半途而废"比喻做事不能坚持到底。'
  },
  {
    id: 'idiom-59',
    question: '"有始有终"这个成语的意思是？',
    options: ['有开始有结束', '做事能坚持到底', '完整', '完美'],
    answer: 1,
    explanation: '"有始有终"指做事能坚持到底。'
  },
  {
    id: 'idiom-60',
    question: '"精益求精"这个成语形容的是？',
    options: ['精华', '好上加好', '追求完美', '进步'],
    answer: 2,
    explanation: '"精益求精"形容追求完美，好上加好。'
  },
  {
    id: 'idiom-61',
    question: '"熟能生巧"这个成语的意思是？',
    options: ['熟练了就巧妙', '反复练习就能掌握技巧', '熟练后自然巧妙', '熟能生巧技艺高'],
    answer: 1,
    explanation: '"熟能生巧"指反复练习就能掌握技巧，越做越熟练。'
  },
  {
    id: 'idiom-62',
    question: '"笨鸟先飞"这个成语比喻？',
    options: ['鸟飞得早', '能力差的人先行动', '勤奋努力', '早做准备'],
    answer: 1,
    explanation: '"笨鸟先飞"比喻能力差的人怕落后，比别人先行动。'
  },
  {
    id: 'idiom-63',
    question: '"勤能补拙"这个成语的意思是？',
    options: ['勤奋补拙劣', '勤奋可以弥补天资的不足', '勤劳能补差', '勤奋能成功'],
    answer: 1,
    explanation: '"勤能补拙"指勤奋可以弥补天资的不足。'
  },
  {
    id: 'idiom-64',
    question: '"铁杵成针"这个成语比喻？',
    options: ['铁杵变针', '只要有毅力，再难的事也能成功', '磨铁杵', '针的由来'],
    answer: 1,
    explanation: '"铁杵成针"比喻只要有毅力，再难的事也能成功。'
  },
  {
    id: 'idiom-65',
    question: '"水滴石穿"这个成语说明的道理是？',
    options: ['水很厉害', '坚持就能成功', '石头被穿', '水的力量'],
    answer: 1,
    explanation: '"水滴石穿"比喻只要坚持不懈，微小的力量也能成就大事。'
  },
  {
    id: 'idiom-66',
    question: '"积少成多"这个成语的意思是？',
    options: ['积累变多', '一点点积累就能由少变多', '积少为多', '积累财富'],
    answer: 1,
    explanation: '"积少成多"指只要不断积累，就会从少变多。'
  },
  {
    id: 'idiom-67',
    question: '"聚沙成塔"这个成语比喻？',
    options: ['沙子堆成塔', '积少成多，积小成大', '建塔', '收集沙子'],
    answer: 1,
    explanation: '"聚沙成塔"比喻聚少成多，积小成大。'
  },
  {
    id: 'idiom-68',
    question: '"集腋成裘"这个成语中的"腋"指的是？',
    options: ['腋下', '狐狸腋下的皮毛', '皮毛', '动物'],
    answer: 1,
    explanation: '"腋"指狐狸腋下的皮毛。'
  },
  {
    id: 'idiom-69',
    question: '"九牛一毛"这个成语形容？',
    options: ['九头牛', '微不足道', '牛毛', '数量多'],
    answer: 1,
    explanation: '"九牛一毛"比喻极大数量中极微小的数量，微不足道。'
  },
  {
    id: 'idiom-70',
    question: '"沧海一粟"这个成语比喻？',
    options: ['大海中的米粒', '渺小', '数量少', '米粒'],
    answer: 1,
    explanation: '"沧海一粟"比喻非常渺小。'
  },
  {
    id: 'idiom-71',
    question: '"杯水车薪"这个成语的意思是？',
    options: ['杯子水车', '力量太小，无济于事', '水车', '帮助'],
    answer: 1,
    explanation: '"杯水车薪"比喻力量太小，解决不了问题。'
  },
  {
    id: 'idiom-72',
    question: '"螳臂当车"这个成语讽刺的是？',
    options: ['螳螂', '不自量力', '螳螂挡车', '勇敢'],
    answer: 1,
    explanation: '"螳臂当车"比喻做力量达不到的事情，必然失败。'
  },
  {
    id: 'idiom-73',
    question: '"蚍蜉撼树"这个成语比喻？',
    options: ['蚂蚁撼树', '不自量力', '蚂蚁', '撼动'],
    answer: 1,
    explanation: '"蚍蜉撼树"比喻力量很小而妄想动摇强大的事物。'
  },
  {
    id: 'idiom-74',
    question: '"以卵击石"这个成语比喻？',
    options: ['鸡蛋碰石头', '不自量力，自取灭亡', '石头', '击打'],
    answer: 1,
    explanation: '"以卵击石"比喻不自量力，自取灭亡。'
  },
  {
    id: 'idiom-75',
    question: '"班门弄斧"这个成语讽刺的是？',
    options: ['弄斧', '在行家面前卖弄本领', '班门', '斧子'],
    answer: 1,
    explanation: '"班门弄斧"比喻在行家面前卖弄本领。'
  },
  {
    id: 'idiom-76',
    question: '"关公面前耍大刀"这个成语的意思是？',
    options: ['耍大刀', '在行家面前卖弄', '关羽', '武术'],
    answer: 1,
    explanation: '"关公面前耍大刀"比喻在行家面前卖弄本领。'
  },
  {
    id: 'idiom-77',
    question: '"井底之蛙"这个成语比喻？',
    options: ['青蛙', '见识短浅的人', '井水', '游泳'],
    answer: 1,
    explanation: '"井底之蛙"比喻见识短浅的人。'
  },
  {
    id: 'idiom-78',
    question: '"管中窥豹"这个成语的意思是？',
    options: ['看豹子', '只看到一部分', '管子', '豹子'],
    answer: 1,
    explanation: '"管中窥豹"比喻只看到事物的一部分，不能全面了解。'
  },
  {
    id: 'idiom-79',
    question: '"坐井观天"这个成语比喻？',
    options: ['看天', '眼界狭小', '井里', '天空'],
    answer: 1,
    explanation: '"坐井观天"比喻眼界狭小，见识有限。'
  },
  {
    id: 'idiom-80',
    question: '"鼠目寸光"这个成语形容的是？',
    options: ['老鼠', '眼光短浅', '视力', '眼睛'],
    answer: 1,
    explanation: '"鼠目寸光"比喻眼光短浅，见识浅薄。'
  },
  {
    id: 'idiom-81',
    question: '"盲人摸象"这个成语说明的道理是？',
    options: ['盲人摸象', '只了解局部，不了解整体', '大象', '触摸'],
    answer: 1,
    explanation: '"盲人摸象"比喻只了解局部，不了解整体。'
  },
  {
    id: 'idiom-82',
    question: '"一叶障目"这个成语比喻？',
    options: ['叶子遮眼', '被局部现象迷惑，看不到全局', '障目', '眼睛'],
    answer: 1,
    explanation: '"一叶障目"比喻被局部的或暂时的现象所迷惑，看不到全局。'
  },
  {
    id: 'idiom-83',
    question: '"因小失大"这个成语的意思是？',
    options: ['小的变大的', '为了小的利益而造成大的损失', '失去', '损失'],
    answer: 1,
    explanation: '"因小失大"指为了小的利益而造成大的损失。'
  },
  {
    id: 'idiom-84',
    question: '"得不偿失"这个成语形容的是？',
    options: ['得失', '所得的抵不上所失的', '得失相当', '划算'],
    answer: 1,
    explanation: '"得不偿失"指所得的抵不上所失的。'
  },
  {
    id: 'idiom-85',
    question: '"捡了芝麻丢了西瓜"这个成语比喻？',
    options: ['捡芝麻', '因小失大', '西瓜', '收获'],
    answer: 1,
    explanation: '"捡了芝麻丢了西瓜"比喻因小失大。'
  },
  {
    id: 'idiom-86',
    question: '"杀鸡取卵"这个成语比喻？',
    options: ['杀鸡', '只图眼前利益，不顾长远利益', '取卵', '贪心'],
    answer: 1,
    explanation: '"杀鸡取卵"比喻只图眼前利益，不顾长远利益。'
  },
  {
    id: 'idiom-87',
    question: '"竭泽而渔"这个成语的意思是？',
    options: ['捕鱼', '只图眼前利益，不顾后果', '渔网', '沼泽'],
    answer: 1,
    explanation: '"竭泽而渔"比喻只图眼前利益，不顾长远利益。'
  },
  {
    id: 'idiom-88',
    question: '"饮鸩止渴"这个成语比喻？',
    options: ['喝毒酒', '用错误的办法解决眼前的困难', '止渴', '饮鸩'],
    answer: 1,
    explanation: '"饮鸩止渴"比喻用错误的办法解决眼前的困难，不顾后果。'
  },
  {
    id: 'idiom-89',
    question: '"抱薪救火"这个成语的意思是？',
    options: ['救火', '用错误的方法，反而使问题更严重', '抱柴', '火灾'],
    answer: 1,
    explanation: '"抱薪救火"比喻用错误的方法，反而使问题更严重。'
  },
  {
    id: 'idiom-90',
    question: '"火上浇油"这个成语比喻？',
    options: ['倒油', '使事情更加严重', '火烧', '添油'],
    answer: 1,
    explanation: '"火上浇油"比喻使人更加愤怒或使事态更加严重。'
  },
  {
    id: 'idiom-91',
    question: '"雪上加霜"这个成语形容的是？',
    options: ['雪霜', '接连遭受灾难，苦上加苦', '冬天', '寒冷'],
    answer: 1,
    explanation: '"雪上加霜"比喻接连遭受灾难，苦上加苦。'
  },
  {
    id: 'idiom-92',
    question: '"落井下石"这个成语的意思是？',
    options: ['扔石头', '乘人危难时加以陷害', '井', '落石'],
    answer: 1,
    explanation: '"落井下石"比喻乘人危难时加以陷害。'
  },
  {
    id: 'idiom-93',
    question: '"趁火打劫"这个成语比喻？',
    options: ['火灾', '趁人之危，掠夺财物', '打劫', '抢劫'],
    answer: 1,
    explanation: '"趁火打劫"比喻趁人之危，掠夺财物。'
  },
  {
    id: 'idiom-94',
    question: '"浑水摸鱼"这个成语的意思是？',
    options: ['摸鱼', '趁混乱时获取不正当利益', '浑水', '捕鱼'],
    answer: 1,
    explanation: '"浑水摸鱼"比喻趁混乱时获取不正当利益。'
  },
  {
    id: 'idiom-95',
    question: '"顺手牵羊"这个成语比喻？',
    options: ['牵羊', '顺手拿走别人的东西', '偷窃', '顺手'],
    answer: 1,
    explanation: '"顺手牵羊"比喻顺手拿走别人的东西。'
  },
  {
    id: 'idiom-96',
    question: '"守株待兔"这个成语讽刺的是？',
    options: ['兔子', '死守狭隘经验，不知变通', '树桩', '等待'],
    answer: 1,
    explanation: '"守株待兔"讽刺死守狭隘经验，不知变通的人。'
  },
  {
    id: 'idiom-97',
    question: '"刻舟求剑"这个成语讽刺的是？',
    options: ['剑', '拘泥成法，不知变通', '船', '刻记号'],
    answer: 1,
    explanation: '"刻舟求剑"讽刺拘泥成法，不知变通的人。'
  },
  {
    id: 'idiom-98',
    question: '"按图索骥"这个成语的意思是？',
    options: ['找马', '机械地照搬教条', '画图', '索骥'],
    answer: 1,
    explanation: '"按图索骥"比喻机械地照搬教条，不知变通。'
  },
  {
    id: 'idiom-99',
    question: '"照猫画虎"这个成语比喻？',
    options: ['画画', '只是模仿，缺乏创造性', '猫虎', '临摹'],
    answer: 1,
    explanation: '"照猫画虎"比喻只是模仿，缺乏创造性。'
  },
  {
    id: 'idiom-100',
    question: '"鹦鹉学舌"这个成语讽刺的是？',
    options: ['鹦鹉', '只会模仿，没有主见', '学舌', '鸟'],
    answer: 1,
    explanation: '"鹦鹉学舌"讽刺只会模仿，没有主见的人。'
  },
  {
    id: 'idiom-101',
    question: '"东施效颦"这个成语讽刺的是？',
    options: ['丑女', '盲目模仿，适得其反', '西施', '效仿'],
    answer: 1,
    explanation: '"东施效颦"讽刺盲目模仿，适得其反。'
  },
  {
    id: 'idiom-102',
    question: '"邯郸学步"这个成语比喻？',
    options: ['学走路', '模仿别人，反而失掉自己原有的技能', '邯郸', '步法'],
    answer: 1,
    explanation: '"邯郸学步"比喻模仿别人，反而失掉自己原有的技能。'
  },
  {
    id: 'idiom-103',
    question: '"叶公好龙"这个成语讽刺的是？',
    options: ['喜欢龙', '口头上说喜欢，实际上并不真喜欢', '叶公', '爱好'],
    answer: 1,
    explanation: '"叶公好龙"讽刺口头上说喜欢，实际上并不真喜欢的人。'
  },
  {
    id: 'idiom-104',
    question: '"掩耳盗铃"这个成语讽刺的是？',
    options: ['铃铛', '自己欺骗自己', '偷窃', '耳朵'],
    answer: 1,
    explanation: '"掩耳盗铃"讽刺自己欺骗自己的人。'
  },
  {
    id: 'idiom-105',
    question: '"自欺欺人"这个成语的意思是？',
    options: ['欺骗', '欺骗自己，也欺骗别人', '欺人', '自欺'],
    answer: 1,
    explanation: '"自欺欺人"指欺骗自己，也欺骗别人。'
  },
  {
    id: 'idiom-106',
    question: '"弄虚作假"这个成语比喻？',
    options: ['做假', '耍手段，搞欺骗', '虚假', '弄虚'],
    answer: 1,
    explanation: '"弄虚作假"指耍手段，搞欺骗。'
  },
  {
    id: 'idiom-107',
    question: '"招摇撞骗"这个成语的意思是？',
    options: ['招摇', '假借名义，到处诈骗', '撞骗', '欺骗'],
    answer: 1,
    explanation: '"招摇撞骗"指假借名义，到处诈骗。'
  },
  {
    id: 'idiom-108',
    question: '"口是心非"这个成语形容的是？',
    options: ['口不对心', '嘴里说的和心里想的相反', '是非', '矛盾'],
    answer: 1,
    explanation: '"口是心非"形容嘴里说的和心里想的相反。'
  },
  {
    id: 'idiom-109',
    question: '"阳奉阴违"这个成语的意思是？',
    options: ['阴阳', '表面服从，暗中违背', '奉承', '违背'],
    answer: 1,
    explanation: '"阳奉阴违"指表面服从，暗中违背。'
  },
  {
    id: 'idiom-110',
    question: '"两面三刀"这个成语比喻？',
    options: ['刀', '阴险狡猾，当面一套背后一套', '两面', '狡猾'],
    answer: 1,
    explanation: '"两面三刀"比喻阴险狡猾，当面一套背后一套。'
  },
  {
    id: 'idiom-111',
    question: '"表里不一"这个成语形容的是？',
    options: ['内外不同', '表面和内心不一致', '里外', '一致'],
    answer: 1,
    explanation: '"表里不一"形容表面和内心不一致。'
  },
  {
    id: 'idiom-112',
    question: '"口蜜腹剑"这个成语比喻？',
    options: ['蜜剑', '嘴甜心毒，阴险狡诈', '蜜蜂', '宝剑'],
    answer: 1,
    explanation: '"口蜜腹剑"比喻嘴甜心毒，阴险狡诈。'
  },
  {
    id: 'idiom-113',
    question: '"笑里藏刀"这个成语的意思是？',
    options: ['藏刀', '外表和善，内心险恶', '笑容', '刀子'],
    answer: 1,
    explanation: '"笑里藏刀"形容外表和善，内心险恶。'
  },
  {
    id: 'idiom-114',
    question: '"绵里藏针"这个成语比喻？',
    options: ['藏针', '外表柔弱，内心刚强', '棉花', '针'],
    answer: 1,
    explanation: '"绵里藏针"比喻外表柔弱，内心刚强。'
  },
  {
    id: 'idiom-115',
    question: '"刚柔相济"这个成语的意思是？',
    options: ['刚柔', '刚强的和柔和的互相补充', '刚强', '柔和'],
    answer: 1,
    explanation: '"刚柔相济"指刚强的和柔和的互相补充。'
  },
  {
    id: 'idiom-116',
    question: '"恩威并施"这个成语比喻？',
    options: ['恩威', '恩惠和威严同时使用', '施恩', '威严'],
    answer: 1,
    explanation: '"恩威并施"指恩惠和威严同时使用。'
  },
  {
    id: 'idiom-117',
    question: '"宽猛相济"这个成语的意思是？',
    options: ['宽猛', '宽大和严厉互相补充', '宽容', '严厉'],
    answer: 1,
    explanation: '"宽猛相济"指宽大和严厉互相补充。'
  },
  {
    id: 'idiom-118',
    question: '"恩怨分明"这个成语形容的是？',
    options: ['恩怨', '恩惠和怨仇分得清楚', '分明', '清楚'],
    answer: 1,
    explanation: '"恩怨分明"形容恩惠和怨仇分得清楚。'
  },
  {
    id: 'idiom-119',
    question: '"爱憎分明"这个成语的意思是？',
    options: ['爱憎', '爱和恨的界限分明', '分明', '清楚'],
    answer: 1,
    explanation: '"爱憎分明"指爱和恨的界限分明。'
  },
  {
    id: 'idiom-120',
    question: '"是非分明"这个成语比喻？',
    options: ['是非', '对错分得清楚', '分明', '清晰'],
    answer: 1,
    explanation: '"是非分明"指对错分得清楚。'
  }
];

// 古诗词题目（120道）
export const poetryQuestions: Question[] = [
  {
    id: 'poetry-1',
    question: '"床前明月光，疑是地上霜"的作者是？',
    options: ['杜甫', '白居易', '李白', '王维'],
    answer: 2,
    explanation: '这首《静夜思》的作者是李白，唐代著名诗人。'
  },
  {
    id: 'poetry-2',
    question: '"春眠不觉晓，处处闻啼鸟"的下一句是？',
    options: ['夜来风雨声', '花落知多少', '润物细无声', '明月松间照'],
    answer: 1,
    explanation: '全诗是：春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。'
  },
  {
    id: 'poetry-3',
    question: '"大漠孤烟直，长河落日圆"描写的季节是？',
    options: ['春季', '夏季', '秋季', '冬季'],
    answer: 2,
    explanation: '这是王维《使至塞上》中的诗句，描写的是边塞秋日的景象。'
  },
  {
    id: 'poetry-4',
    question: '"随风潜入夜，润物细无声"描写的是？',
    options: ['春风', '春雨', '秋雨', '冬雪'],
    answer: 1,
    explanation: '这是杜甫《春夜喜雨》中的诗句，描写的是春雨。'
  },
  {
    id: 'poetry-5',
    question: '"但使龙城飞将在，不教胡马度阴山"中的"飞将"指的是？',
    options: ['韩信', '李广', '卫青', '霍去病'],
    answer: 1,
    explanation: '"飞将"指西汉名将李广，英勇善战，匈奴称其为"汉之飞将军"。'
  },
  {
    id: 'poetry-6',
    question: '"采菊东篱下，悠然见南山"的作者是？',
    options: ['谢灵运', '陶渊明', '王维', '孟浩然'],
    answer: 1,
    explanation: '这是陶渊明《饮酒》中的名句。'
  },
  {
    id: 'poetry-7',
    question: '"落红不是无情物，化作春泥更护花"表达的是？',
    options: ['爱情的悲剧', '对春天的眷恋', '奉献精神', '对花的怜惜'],
    answer: 2,
    explanation: '这是龚自珍的诗句，表达的是无私奉献的精神。'
  },
  {
    id: 'poetry-8',
    question: '"不识庐山真面目，只缘身在此山中"蕴含的哲理是？',
    options: ['庐山很美', '山高路险', '当局者迷，旁观者清', '要身临其境'],
    answer: 2,
    explanation: '这句诗说明当事者往往因为局限于局部而无法看清全局。'
  },
  {
    id: 'poetry-9',
    question: '"粉身碎骨浑不怕，要留清白在人间"的作者是？',
    options: ['文天祥', '于谦', '岳飞', '辛弃疾'],
    answer: 1,
    explanation: '这是于谦《石灰吟》中的诗句。'
  },
  {
    id: 'poetry-10',
    question: '"山重水复疑无路，柳暗花明又一村"出自？',
    options: ['王安石', '陆游', '苏轼', '杨万里'],
    answer: 1,
    explanation: '这是陆游《游山西村》中的名句。'
  },
  {
    id: 'poetry-11',
    question: '"欲穷千里目，更上一层楼"的作者是？',
    options: ['李白', '王之涣', '杜甫', '白居易'],
    answer: 1,
    explanation: '这是王之涣《登鹳雀楼》中的诗句。'
  },
  {
    id: 'poetry-12',
    question: '"海内存知己，天涯若比邻"的作者是？',
    options: ['李白', '王勃', '杜甫', '王维'],
    answer: 1,
    explanation: '这是王勃《送杜少府之任蜀州》中的名句。'
  },
  {
    id: 'poetry-13',
    question: '"野火烧不尽，春风吹又生"描写的植物是？',
    options: ['树木', '花草', '野草', '庄稼'],
    answer: 2,
    explanation: '这是白居易《赋得古原草送别》中的诗句，描写的是野草。'
  },
  {
    id: 'poetry-14',
    question: '"谁知盘中餐，粒粒皆辛苦"的作者是？',
    options: ['李白', '杜甫', '李绅', '白居易'],
    answer: 2,
    explanation: '这是李绅《悯农》中的诗句。'
  },
  {
    id: 'poetry-15',
    question: '"人生自古谁无死，留取丹心照汗青"的作者是？',
    options: ['岳飞', '文天祥', '于谦', '辛弃疾'],
    answer: 1,
    explanation: '这是文天祥《过零丁洋》中的名句。'
  },
  {
    id: 'poetry-16',
    question: '"风萧萧兮易水寒，壮士一去兮不复还"中的"壮士"指的是？',
    options: ['荆轲', '高渐离', '樊於期', '太子丹'],
    answer: 0,
    explanation: '"壮士"指荆轲，战国时期著名的刺客。'
  },
  {
    id: 'poetry-17',
    question: '"少小离家老大回，乡音无改鬓毛衰"的作者是？',
    options: ['李白', '贺知章', '杜甫', '白居易'],
    answer: 1,
    explanation: '这是贺知章《回乡偶书》中的诗句。'
  },
  {
    id: 'poetry-18',
    question: '"两岸猿声啼不住，轻舟已过万重山"描写的江河是？',
    options: ['黄河', '长江', '珠江', '淮河'],
    answer: 1,
    explanation: '这是李白《早发白帝城》中的诗句，描写的是长江。'
  },
  {
    id: 'poetry-19',
    question: '"孤帆远影碧空尽，唯见长江天际流"的作者是？',
    options: ['李白', '孟浩然', '杜甫', '王维'],
    answer: 0,
    explanation: '这是李白《黄鹤楼送孟浩然之广陵》中的诗句。'
  },
  {
    id: 'poetry-20',
    question: '"飞流直下三千尺，疑是银河落九天"描写的是？',
    options: ['瀑布', '河流', '雨景', '银河'],
    answer: 0,
    explanation: '这是李白《望庐山瀑布》中的诗句，描写的是瀑布。'
  },
  {
    id: 'poetry-21',
    question: '"国破山河在，城春草木深"的作者是？',
    options: ['李白', '杜甫', '白居易', '王维'],
    answer: 1,
    explanation: '这是杜甫《春望》中的诗句。'
  },
  {
    id: 'poetry-22',
    question: '"感时花溅泪，恨别鸟惊心"表达的情感是？',
    options: ['喜悦', '忧伤', '思念', '悲愤'],
    answer: 3,
    explanation: '表达了诗人对国破家亡的悲愤之情。'
  },
  {
    id: 'poetry-23',
    question: '"安能摧眉折腰事权贵，使我不得开心颜"的作者是？',
    options: ['杜甫', '李白', '白居易', '苏轼'],
    answer: 1,
    explanation: '这是李白《梦游天姥吟留别》中的诗句。'
  },
  {
    id: 'poetry-24',
    question: '"天生我材必有用，千金散尽还复来"表达了诗人？',
    options: ['悲伤', '乐观自信', '消沉', '愤慨'],
    answer: 1,
    explanation: '表达了诗人乐观自信的人生态度。'
  },
  {
    id: 'poetry-25',
    question: '"会当凌绝顶，一览众山小"的作者是？',
    options: ['李白', '杜甫', '王维', '孟浩然'],
    answer: 1,
    explanation: '这是杜甫《望岳》中的诗句。'
  },
  {
    id: 'poetry-26',
    question: '"国破山河在"中"国"的意思是？',
    options: ['国家', '国都', '国土', '国度'],
    answer: 1,
    explanation: '"国"指国都，指长安。'
  },
  {
    id: 'poetry-27',
    question: '"烽火连三月"中"烽火"指的是？',
    options: ['火光', '战争', '信号', '烽火台'],
    answer: 1,
    explanation: '"烽火"指战争。'
  },
  {
    id: 'poetry-28',
    question: '"家书抵万金"中"抵"的意思是？',
    options: ['抵抗', '抵达', '抵得上', '抵押'],
    answer: 2,
    explanation: '"抵"意为抵得上、相当。'
  },
  {
    id: 'poetry-29',
    question: '"白日依山尽"中的"白日"指的是？',
    options: ['白色的太阳', '太阳', '白天', '中午'],
    answer: 1,
    explanation: '"白日"指太阳。'
  },
  {
    id: 'poetry-30',
    question: '"黄河入海流"描写的是？',
    options: ['河流的流向', '黄河的气势', '海水的流动', '自然景观'],
    answer: 1,
    explanation: '描写黄河奔腾入海的气势。'
  },
  {
    id: 'poetry-31',
    question: '"劝君更尽一杯酒"中"更"的意思是？',
    options: ['更加', '再', '更改', '更换'],
    answer: 1,
    explanation: '"更"意为再、再喝。'
  },
  {
    id: 'poetry-32',
    question: '"西出阳关无故人"的作者是？',
    options: ['李白', '王维', '杜甫', '王之涣'],
    answer: 1,
    explanation: '这是王维《送元二使安西》中的诗句。'
  },
  {
    id: 'poetry-33',
    question: '"独在异乡为异客"中"异客"的意思是？',
    options: ['外国客人', '他乡的客人', '陌生人', '异国他乡的人'],
    answer: 1,
    explanation: '"异客"指客居他乡的人。'
  },
  {
    id: 'poetry-34',
    question: '"每逢佳节倍思亲"的作者是？',
    options: ['李白', '王维', '杜甫', '白居易'],
    answer: 1,
    explanation: '这是王维《九月九日忆山东兄弟》中的诗句。'
  },
  {
    id: 'poetry-35',
    question: '"两岸青山相对出"的下一句是？',
    options: ['孤帆一片日边来', '轻舟已过万重山', '唯见长江天际流', '碧水东流至此回'],
    answer: 0,
    explanation: '这是李白《望天门山》中的诗句。'
  },
  {
    id: 'poetry-36',
    question: '"桃花潭水深千尺"的下一句是？',
    options: ['不及汪伦送我情', '唯见长江天际流', '孤帆远影碧空尽', '轻舟已过万重山'],
    answer: 0,
    explanation: '这是李白《赠汪伦》中的诗句。'
  },
  {
    id: 'poetry-37',
    question: '"慈母手中线，游子身上衣"的作者是？',
    options: ['李白', '孟郊', '杜甫', '白居易'],
    answer: 1,
    explanation: '这是孟郊《游子吟》中的诗句。'
  },
  {
    id: 'poetry-38',
    question: '"谁言寸草心，报得三春晖"表达的是？',
    options: ['母爱的伟大', '春天的美好', '寸草的心意', '三春的阳光'],
    answer: 0,
    explanation: '表达了母爱的伟大，难以报答。'
  },
  {
    id: 'poetry-39',
    question: '"春江潮水连海平，海上明月共潮生"出自？',
    options: ['张若虚', '李白', '杜甫', '王维'],
    answer: 0,
    explanation: '这是张若虚《春江花月夜》中的诗句。'
  },
  {
    id: 'poetry-40',
    question: '"海上生明月，天涯共此时"的作者是？',
    options: ['李白', '张九龄', '杜甫', '王维'],
    answer: 1,
    explanation: '这是张九龄《望月怀远》中的诗句。'
  },
  {
    id: 'poetry-41',
    question: '"露从今夜白，月是故乡明"的作者是？',
    options: ['李白', '杜甫', '王维', '白居易'],
    answer: 1,
    explanation: '这是杜甫《月夜忆舍弟》中的诗句。'
  },
  {
    id: 'poetry-42',
    question: '"举杯邀明月，对影成三人"的作者是？',
    options: ['杜甫', '李白', '王维', '白居易'],
    answer: 1,
    explanation: '这是李白《月下独酌》中的诗句。'
  },
  {
    id: 'poetry-43',
    question: '"明月松间照，清泉石上流"的作者是？',
    options: ['李白', '王维', '杜甫', '孟浩然'],
    answer: 1,
    explanation: '这是王维《山居秋暝》中的诗句。'
  },
  {
    id: 'poetry-44',
    question: '"停车坐爱枫林晚"中"坐"的意思是？',
    options: ['坐下', '因为', '坐车', '休息'],
    answer: 1,
    explanation: '"坐"意为因为。'
  },
  {
    id: 'poetry-45',
    question: '"霜叶红于二月花"的作者是？',
    options: ['李白', '杜牧', '杜甫', '白居易'],
    answer: 1,
    explanation: '这是杜牧《山行》中的诗句。'
  },
  {
    id: 'poetry-46',
    question: '"清明时节雨纷纷"的下一句是？',
    options: ['路上行人欲断魂', '牧童遥指杏花村', '借问酒家何处有', '此情可待成追忆'],
    answer: 0,
    explanation: '这是杜牧《清明》中的诗句。'
  },
  {
    id: 'poetry-47',
    question: '"借问酒家何处有，牧童遥指杏花村"的作者是？',
    options: ['李白', '杜牧', '杜甫', '白居易'],
    answer: 1,
    explanation: '这是杜牧《清明》中的诗句。'
  },
  {
    id: 'poetry-48',
    question: '"商女不知亡国恨，隔江犹唱后庭花"的作者是？',
    options: ['李白', '杜牧', '杜甫', '李商隐'],
    answer: 1,
    explanation: '这是杜牧《泊秦淮》中的诗句。'
  },
  {
    id: 'poetry-49',
    question: '"夕阳无限好，只是近黄昏"的作者是？',
    options: ['李白', '杜牧', '李商隐', '杜甫'],
    answer: 2,
    explanation: '这是李商隐《乐游原》中的诗句。'
  },
  {
    id: 'poetry-50',
    question: '"春蚕到死丝方尽，蜡炬成灰泪始干"的作者是？',
    options: ['李商隐', '杜牧', '李白', '杜甫'],
    answer: 0,
    explanation: '这是李商隐《无题》中的名句。'
  },
  {
    id: 'poetry-51',
    question: '"身无彩凤双飞翼，心有灵犀一点通"表达的是？',
    options: ['身体残疾', '心灵相通', '爱情', '思念'],
    answer: 1,
    explanation: '表达了两人心灵相通的深厚感情。'
  },
  {
    id: 'poetry-52',
    question: ' "何当共剪西窗烛，却话巴山夜雨时"的作者是？',
    options: ['李商隐', '杜牧', '李白', '杜甫'],
    answer: 0,
    explanation: '这是李商隐《夜雨寄北》中的诗句。'
  },
  {
    id: 'poetry-53',
    question: '"锦瑟无端五十弦"中的"锦瑟"指的是？',
    options: ['美丽的琴', '瑟', '古琴', '琵琶'],
    answer: 1,
    explanation: '"锦瑟"指瑟，一种乐器。'
  },
  {
    id: 'poetry-54',
    question: '"昨夜星辰昨夜风"的下一句是？',
    options: ['画楼西畔桂堂东', '身无彩凤双飞翼', '心有灵犀一点通', '春蚕到死丝方尽'],
    answer: 0,
    explanation: '这是李商隐《无题》中的诗句。'
  },
  {
    id: 'poetry-55',
    question: ' "风劲角弓鸣"中"角弓"指的是？',
    options: ['角的弓', '用兽角装饰的弓', '弯曲的弓', '弓箭'],
    answer: 1,
    explanation: '"角弓"指用兽角装饰的弓。'
  },
  {
    id: 'poetry-56',
    question: '"大漠沙如雪，燕山月似钩"的作者是？',
    options: ['李白', '李贺', '杜甫', '王维'],
    answer: 1,
    explanation: '这是李贺《马诗》中的诗句。'
  },
  {
    id: 'poetry-57',
    question: ' "黑云压城城欲摧"的下一句是？',
    options: ['甲光向日金鳞开', '角声满天秋色里', '塞上燕脂凝夜紫', '提携玉龙为君死'],
    answer: 0,
    explanation: '这是李贺《雁门太守行》中的诗句。'
  },
  {
    id: 'poetry-58',
    question: '"长风破浪会有时，直挂云帆济沧海"的作者是？',
    options: ['杜甫', '李白', '白居易', '苏轼'],
    answer: 1,
    explanation: '这是李白《行路难》中的名句。'
  },
  {
    id: 'poetry-59',
    question: '"抽刀断水水更流，举杯消愁愁更愁"表达了诗人？',
    options: ['豪迈', '愁苦无奈', '潇洒', '乐观'],
    answer: 1,
    explanation: '表达了诗人内心的愁苦和无奈。'
  },
  {
    id: 'poetry-60',
    question: ' "蜀道之难，难于上青天"的作者是？',
    options: ['杜甫', '李白', '白居易', '王维'],
    answer: 1,
    explanation: '这是李白《蜀道难》中的名句。'
  },
  {
    id: 'poetry-61',
    question: '"春风又绿江南岸，明月何时照我还"的作者是？',
    options: ['王安石', '苏轼', '欧阳修', '辛弃疾'],
    answer: 0,
    explanation: '这是王安石《泊船瓜洲》中的诗句。'
  },
  {
    id: 'poetry-62',
    question: '"不畏浮云遮望眼，自缘身在最高层"表达的是？',
    options: ['站得高', '不被假象迷惑，要有远见', '不畏困难', '自信'],
    answer: 1,
    explanation: '表达了不被假象迷惑，要有远见的哲理。'
  },
  {
    id: 'poetry-63',
    question: '"横看成岭侧成峰，远近高低各不同"蕴含的哲理是？',
    options: ['山的多姿', '从不同角度看问题，结果不同', '山水之美', '远近高低'],
    answer: 1,
    explanation: '说明从不同角度看问题，会得到不同的结论。'
  },
  {
    id: 'poetry-64',
    question: '"春色满园关不住，一枝红杏出墙来"的作者是？',
    options: ['叶绍翁', '杨万里', '范成大', '陆游'],
    answer: 0,
    explanation: '这是叶绍翁《游园不值》中的诗句。'
  },
  {
    id: 'poetry-65',
    question: '"小荷才露尖尖角，早有蜻蜓立上头"描写的是？',
    options: ['荷花', '初夏的景象', '蜻蜓', '池塘'],
    answer: 1,
    explanation: '描写初夏时节荷叶初长、蜻蜓停立的景象。'
  },
  {
    id: 'poetry-66',
    question: '"接天莲叶无穷碧，映日荷花别样红"的作者是？',
    options: ['杨万里', '范成大', '陆游', '苏轼'],
    answer: 0,
    explanation: '这是杨万里《晓出净慈寺送林子方》中的诗句。'
  },
  {
    id: 'poetry-67',
    question: '"水光潋滟晴方好，山色空蒙雨亦奇"描写的是？',
    options: ['西湖', '太湖', '洞庭湖', '鄱阳湖'],
    answer: 0,
    explanation: '这是苏轼《饮湖上初晴后雨》中的诗句，描写西湖。'
  },
  {
    id: 'poetry-68',
    question: '"欲把西湖比西子，淡妆浓抹总相宜"中的"西子"指的是？',
    options: ['西施', '西子', '美人', '女子'],
    answer: 0,
    explanation: '"西子"指西施，古代四大美女之一。'
  },
  {
    id: 'poetry-69',
    question: '"不识庐山真面目，只缘身在此山中"的作者是？',
    options: ['李白', '杜甫', '苏轼', '王维'],
    answer: 2,
    explanation: '这是苏轼《题西林壁》中的诗句。'
  },
  {
    id: 'poetry-70',
    question: '"竹外桃花三两枝，春江水暖鸭先知"描写的季节是？',
    options: ['春季', '夏季', '秋季', '冬季'],
    answer: 0,
    explanation: '描写的是早春时节的景象。'
  },
  {
    id: 'poetry-71',
    question: '"几处早莺争暖树，谁家新燕啄春泥"的作者是？',
    options: ['白居易', '杜甫', '李白', '王维'],
    answer: 0,
    explanation: '这是白居易《钱塘湖春行》中的诗句。'
  },
  {
    id: 'poetry-72',
    question: '"乱花渐欲迷人眼，浅草才能没马蹄"描写的是？',
    options: ['春天', '夏天', '秋天', '冬天'],
    answer: 0,
    explanation: '描写早春时节花草初长的景象。'
  },
  {
    id: 'poetry-73',
    question: '"枯藤老树昏鸦，小桥流水人家"的作者是？',
    options: ['马致远', '白朴', '关汉卿', '王实甫'],
    answer: 0,
    explanation: '这是马致远《天净沙·秋思》中的句子。'
  },
  {
    id: 'poetry-74',
    question: '"夕阳西下，断肠人在天涯"表达的情感是？',
    options: ['喜悦', '悲伤', '思乡', '忧愁'],
    answer: 2,
    explanation: '表达了游子思乡的凄凉之情。'
  },
  {
    id: 'poetry-75',
    question: '"渭城朝雨浥轻尘，客舍青青柳色新"的作者是？',
    options: ['王维', '李白', '杜甫', '白居易'],
    answer: 0,
    explanation: '这是王维《送元二使安西》中的诗句。'
  },
  {
    id: 'poetry-76',
    question: '"劝君更尽一杯酒"中"更"的意思是？',
    options: ['更加', '再', '更改', '更换'],
    answer: 1,
    explanation: '"更"意为再。'
  },
  {
    id: 'poetry-77',
    question: '"孤帆远影碧空尽，唯见长江天际流"表达的送别之情是？',
    options: ['不舍', '欢乐', '平静', '悲伤'],
    answer: 0,
    explanation: '表达了对友人的依依不舍之情。'
  },
  {
    id: 'poetry-78',
    question: '"桃花潭水深千尺"运用的修辞手法是？',
    options: ['比喻', '夸张', '拟人', '对偶'],
    answer: 1,
    explanation: '运用夸张手法，表现友情之深。'
  },
  {
    id: 'poetry-79',
    question: '"海内存知己，天涯若比邻"表达的是？',
    options: ['友情', '爱情', '亲情', '乡情'],
    answer: 0,
    explanation: '表达了深厚的友情，距离不是问题。'
  },
  {
    id: 'poetry-80',
    question: '"无为在歧路，儿女共沾巾"中的"儿女"指的是？',
    options: ['子女', '年轻人', '普通人', '男女'],
    answer: 2,
    explanation: '"儿女"指普通人，这里指青年男女。'
  },
  {
    id: 'poetry-81',
    question: '"山重水复疑无路，柳暗花明又一村"表达的哲理是？',
    options: ['山多水多', '困境中蕴含希望', '景色美丽', '路途曲折'],
    answer: 1,
    explanation: '表达了在困境中蕴含着希望的哲理。'
  },
  {
    id: 'poetry-82',
    question: '"萧鼓追随春社近，衣冠简朴古风存"的作者是？',
    options: ['陆游', '范成大', '杨万里', '苏轼'],
    answer: 0,
    explanation: '这是陆游《游山西村》中的诗句。'
  },
  {
    id: 'poetry-83',
    question: '"纸上得来终觉浅，绝知此事要躬行"的意思是？',
    options: ['读书有用', '从书本上得到的知识还要亲身实践', '实践重要', '知识浅显'],
    answer: 1,
    explanation: '强调实践的重要性，理论必须联系实际。'
  },
  {
    id: 'poetry-84',
    question: '"等闲识得东风面，万紫千红总是春"的作者是？',
    options: ['朱熹', '程颢', '陆游', '范成大'],
    answer: 0,
    explanation: '这是朱熹《春日》中的诗句。'
  },
  {
    id: 'poetry-85',
    question: '"问渠那得清如许，为有源头活水来"中"渠"指的是？',
    options: ['水渠', '池塘', '河流', '沟渠'],
    answer: 1,
    explanation: '"渠"指池塘。'
  },
  {
    id: 'poetry-86',
    question: '"为有源头活水来"蕴含的哲理是？',
    options: ['水要流动', '不断学习新知识，才能保持活力', '源头很重要', '活水好'],
    answer: 1,
    explanation: '说明要不断学习新知识，才能保持思想的活力。'
  },
  {
    id: 'poetry-87',
    question: '"人生自古谁无死，留取丹心照汗青"中"汗青"指的是？',
    options: ['汗', '青史', '史册', '历史'],
    answer: 2,
    explanation: '"汗青"指史册。古人用竹简书写，先用火烤干竹青，叫汗青。'
  },
  {
    id: 'poetry-88',
    question: '"辛苦遭逢起一经"中"一经"指的是？',
    options: ['一经书', '经书', '经典', '一经考试'],
    answer: 1,
    explanation: '"一经"指儒家经典。'
  },
  {
    id: 'poetry-89',
    question: '"干戈寥落四周星"中"干戈"指的是？',
    options: ['武器', '战争', '兵器', '干戈'],
    answer: 1,
    explanation: '"干戈"指战争。'
  },
  {
    id: 'poetry-90',
    question: '"山河破碎风飘絮，身世浮沉雨打萍"运用了什么修辞手法？',
    options: ['比喻', '拟人', '夸张', '对偶'],
    answer: 0,
    explanation: '运用比喻，将国家命运比作风中柳絮，个人命运比作雨打浮萍。'
  },
  {
    id: 'poetry-91',
    question: '"惶恐滩头说惶恐，零丁洋里叹零丁"中的"惶恐"和"零丁"分别指？',
    options: ['地名和心情', '心情和地名', '都是地名', '都是心情'],
    answer: 1,
    explanation: '"惶恐"是地名（惶恐滩），"零丁"是地名（零丁洋），也双关孤独无依的心情。'
  },
  {
    id: 'poetry-92',
    question: '"粉身碎骨浑不怕，要留清白在人间"中"浑"的意思是？',
    options: ['浑浊', '全', '浑身', '都'],
    answer: 1,
    explanation: '"浑"意为全、都。'
  },
  {
    id: 'poetry-93',
    question: '"千锤万凿出深山"中"千锤万凿"形容的是？',
    options: ['开采艰难', '开采次数多', '锤炼', '打凿'],
    answer: 0,
    explanation: '形容开采石灰石的艰难过程。'
  },
  {
    id: 'poetry-94',
    question: '"烈火焚烧若等闲"中"若等闲"的意思是？',
    options: ['好像很闲', '看得平常', '很悠闲', '若无其事'],
    answer: 1,
    explanation: '"若等闲"意为看得平常，不当回事。'
  },
  {
    id: 'poetry-95',
    question: '"咬定青山不放松"的作者是？',
    options: ['郑燮', '李白', '杜甫', '苏轼'],
    answer: 0,
    explanation: '这是郑燮（郑板桥）《竹石》中的诗句。'
  },
  {
    id: 'poetry-96',
    question: '"立根原在破岩中"中"原"的意思是？',
    options: ['原来', '原来就', '本', '根本'],
    answer: 1,
    explanation: '"原"意为本来。'
  },
  {
    id: 'poetry-97',
    question: '"千磨万击还坚劲"中"坚劲"的意思是？',
    options: ['坚定强劲', '坚强', '强劲', '刚强'],
    answer: 0,
    explanation: '"坚劲"意为坚定强劲。'
  },
  {
    id: 'poetry-98',
    question: '"任尔东西南北风"中"任"的意思是？',
    options: ['任务', '任凭', '让', '任命'],
    answer: 1,
    explanation: '"任"意为任凭、无论。'
  },
  {
    id: 'poetry-99',
    question: '"落红不是无情物，化作春泥更护花"中"落红"指的是？',
    options: ['红花', '落花', '红色', '花朵'],
    answer: 1,
    explanation: '"落红"指落花。'
  },
  {
    id: 'poetry-100',
    question: '"浩荡离愁白日斜"中"浩荡"形容的是？',
    options: ['广阔', '无边无际', '深沉', '巨大'],
    answer: 1,
    explanation: '"浩荡"形容离愁之深广无边。'
  },
  {
    id: 'poetry-101',
    question: '"吟鞭东指即天涯"中"吟鞭"的意思是？',
    options: ['吟诗的鞭子', '诗人的马鞭', '吟唱', '鞭子'],
    answer: 1,
    explanation: '"吟鞭"指诗人的马鞭。'
  },
  {
    id: 'poetry-102',
    question: '"我劝天公重抖擞"中"抖擞"的意思是？',
    options: ['振作', '振奋', '抖动', '精神'],
    answer: 0,
    explanation: '"抖擞"意为振作、振奋。'
  },
  {
    id: 'poetry-103',
    question: '"不拘一格降人才"中"不拘一格"的意思是？',
    options: ['不拘泥于一种格式', '不限规格', '不拘束', '自由'],
    answer: 0,
    explanation: '"不拘一格"意为不拘泥于一种格式，多种多样。'
  },
  {
    id: 'poetry-104',
    question: '"九州生气恃风雷"中"恃"的意思是？',
    options: ['依靠', '凭借', '等待', '依赖'],
    answer: 0,
    explanation: '"恃"意为依靠、依赖。'
  },
  {
    id: 'poetry-105',
    question: '"万马齐喑究可哀"中"喑"的意思是？',
    options: ['暗', '哑', '沉默', '无声'],
    answer: 1,
    explanation: '"喑"意为哑、沉默。'
  },
  {
    id: 'poetry-106',
    question: '"青海长云暗雪山"的作者是？',
    options: ['王昌龄', '王之涣', '李白', '杜甫'],
    answer: 0,
    explanation: '这是王昌龄《从军行》中的诗句。'
  },
  {
    id: 'poetry-107',
    question: '"黄沙百战穿金甲，不破楼兰终不还"表达的情感是？',
    options: ['悲壮', '豪迈坚定', '忧伤', '思念'],
    answer: 1,
    explanation: '表达了将士们豪迈坚定的报国情怀。'
  },
  {
    id: 'poetry-108',
    question: '"黄河远上白云间，一片孤城万仞山"的作者是？',
    options: ['王之涣', '王昌龄', '李白', '杜甫'],
    answer: 0,
    explanation: '这是王之涣《凉州词》中的诗句。'
  },
  {
    id: 'poetry-109',
    question: '"羌笛何须怨杨柳，春风不度玉门关"中"杨柳"指的是？',
    options: ['柳树', '折杨柳曲', '杨柳枝', '柳絮'],
    answer: 1,
    explanation: '"杨柳"指《折杨柳》曲，古代送别曲。'
  },
  {
    id: 'poetry-110',
    question: '"葡萄美酒夜光杯"的下一句是？',
    options: ['欲饮琵琶马上催', '醉卧沙场君莫笑', '古来征战几人回', '秦时明月汉时关'],
    answer: 0,
    explanation: '这是王翰《凉州词》中的诗句。'
  },
  {
    id: 'poetry-111',
    question: '"醉卧沙场君莫笑，古来征战几人回"表达的是？',
    options: ['豪迈豁达', '悲伤凄凉', '思乡之情', '壮志难酬'],
    answer: 0,
    explanation: '表达了将士们豪迈豁达、视死如归的情怀。'
  },
  {
    id: 'poetry-112',
    question: '"秦时明月汉时关"的作者是？',
    options: ['王昌龄', '王之涣', '李白', '杜甫'],
    answer: 0,
    explanation: '这是王昌龄《出塞》中的诗句。'
  },
  {
    id: 'poetry-113',
    question: '"但使龙城飞将在，不教胡马度阴山"中"飞将"指的是？',
    options: ['李广', '卫青', '霍去病', '韩信'],
    answer: 0,
    explanation: '"飞将"指西汉名将李广。'
  },
  {
    id: 'poetry-114',
    question: '"黑云压城城欲摧"的作者是？',
    options: ['李贺', '李白', '杜甫', '王昌龄'],
    answer: 0,
    explanation: '这是李贺《雁门太守行》中的诗句。'
  },
  {
    id: 'poetry-115',
    question: '"甲光向日金鳞开"中"甲光"指的是？',
    options: ['甲壳的光', '铠甲迎着太阳闪出的光', '光芒', '阳光'],
    answer: 1,
    explanation: '"甲光"指铠甲迎着太阳闪出的光。'
  },
  {
    id: 'poetry-116',
    question: '"角声满天秋色里"中"角"指的是？',
    options: ['角落', '号角', '角兽', '角度'],
    answer: 1,
    explanation: '"角"指号角。'
  },
  {
    id: 'poetry-117',
    question: '"塞上燕脂凝夜紫"中"燕脂"指的是？',
    options: ['胭脂', '胭脂色', '红色的土壤', '血迹'],
    answer: 1,
    explanation: '"燕脂"同"胭脂"，指胭脂色，形容边塞夜色。'
  },
  {
    id: 'poetry-118',
    question: '"报君黄金台上意，提携玉龙为君死"中"玉龙"指的是？',
    options: ['玉做的龙', '宝剑', '龙', '玉石'],
    answer: 1,
    explanation: '"玉龙"指宝剑。'
  },
  {
    id: 'poetry-119',
    question: '"十年生死两茫茫"的作者是？',
    options: ['苏轼', '李白', '杜甫', '李商隐'],
    answer: 0,
    explanation: '这是苏轼《江城子·乙卯正月二十日夜记梦》中的句子。'
  },
  {
    id: 'poetry-120',
    question: '"不思量，自难忘"表达的是？',
    options: ['忘记', '思念深切，难以忘怀', '记不住', '不想'],
    answer: 1,
    explanation: '表达了对亡妻的深切思念，难以忘怀。'
  }
];

// 根据题型获取题目
export function getQuestionsByType(type: QuestionType, count: number = 10): Question[] {
  switch (type) {
    case 'wenyan':
      return shuffleArray([...wenyanQuestions]).slice(0, count);
    case 'idiom':
      return shuffleArray([...idiomQuestions]).slice(0, count);
    case 'poetry':
      return shuffleArray([...poetryQuestions]).slice(0, count);
    default:
      return [];
  }
}

// 随机打乱数组
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// ========== 判断题库（天梯赛模式） ==========

// 判断题数据（按难度1-10分级）
export const judgeQuestions: JudgeQuestion[] = [
  // 难度1：基础常识
  {
    id: 'judge-1-1',
    question: '《论语》是记录孔子言行的书。',
    answer: true,
    explanation: '正确。《论语》是儒家经典之一，记录了孔子及其弟子的言行。',
    difficulty: 1
  },
  {
    id: 'judge-1-2',
    question: '李白被称为"诗仙"。',
    answer: true,
    explanation: '正确。李白被称为"诗仙"，杜甫被称为"诗圣"。',
    difficulty: 1
  },
  {
    id: 'judge-1-3',
    question: '《红楼梦》的作者是施耐庵。',
    answer: false,
    explanation: '错误。《红楼梦》的作者是曹雪芹，施耐庵是《水浒传》的作者。',
    difficulty: 1
  },
  {
    id: 'judge-1-4',
    question: '"床前明月光"是杜甫的诗句。',
    answer: false,
    explanation: '错误。这是李白的《静夜思》中的诗句。',
    difficulty: 1
  },
  {
    id: 'judge-1-5',
    question: '中国四大名著包括《西游记》。',
    answer: true,
    explanation: '正确。中国四大名著是《红楼梦》《西游记》《水浒传》《三国演义》。',
    difficulty: 1
  },
  // 难度2：文言文基础
  {
    id: 'judge-2-1',
    question: '"学而时习之"中的"说"通"悦"，意思是高兴。',
    answer: true,
    explanation: '正确。"说"通"悦"，意思是高兴、喜悦。',
    difficulty: 2
  },
  {
    id: 'judge-2-2',
    question: '"温故而知新"中的"故"指的是"所以"。',
    answer: false,
    explanation: '错误。"故"指的是"旧的知识"，已经学过的内容。',
    difficulty: 2
  },
  {
    id: 'judge-2-3',
    question: '"三人行，必有我师焉"中的"三"表示实指三个人。',
    answer: false,
    explanation: '错误。"三"在这里是虚数，表示"几个"或"多个人"。',
    difficulty: 2
  },
  {
    id: 'judge-2-4',
    question: '"吾日三省吾身"中的"省"意思是反省。',
    answer: true,
    explanation: '正确。"省"意为反省、检查自己。',
    difficulty: 2
  },
  {
    id: 'judge-2-5',
    question: '"逝者如斯夫，不舍昼夜"描写的是时间流逝。',
    answer: true,
    explanation: '正确。这句话是孔子感叹时间像流水一样流逝，日夜不停。',
    difficulty: 2
  },
  // 难度3：成语知识
  {
    id: 'judge-3-1',
    question: '"守株待兔"这个成语出自《韩非子》。',
    answer: true,
    explanation: '正确。这个寓言故事出自《韩非子·五蠹》。',
    difficulty: 3
  },
  {
    id: 'judge-3-2',
    question: '"刻舟求剑"的故事告诉我们看问题要全面。',
    answer: false,
    explanation: '错误。这个故事告诉我们事物是发展变化的，不能静止地看问题。',
    difficulty: 3
  },
  {
    id: 'judge-3-3',
    question: '"画蛇添足"的意思是多此一举，反而坏事。',
    answer: true,
    explanation: '正确。这个成语比喻做了多余的事，反而把事情搞糟了。',
    difficulty: 3
  },
  {
    id: 'judge-3-4',
    question: '"掩耳盗铃"是赞扬一个人聪明机智。',
    answer: false,
    explanation: '错误。这个成语讽刺自欺欺人的人。',
    difficulty: 3
  },
  {
    id: 'judge-3-5',
    question: '"望梅止渴"的主人公是曹操。',
    answer: true,
    explanation: '正确。这个故事讲的是曹操用计策激励士兵继续前进。',
    difficulty: 3
  },
  // 难度4：古诗词
  {
    id: 'judge-4-1',
    question: '"春眠不觉晓，处处闻啼鸟"出自孟浩然的《春晓》。',
    answer: true,
    explanation: '正确。这是孟浩然的代表作之一。',
    difficulty: 4
  },
  {
    id: 'judge-4-2',
    question: '"两个黄鹂鸣翠柳，一行白鹭上青天"是王维的诗句。',
    answer: false,
    explanation: '错误。这是杜甫的《绝句》中的诗句。',
    difficulty: 4
  },
  {
    id: 'judge-4-3',
    question: '"举头望明月，低头思故乡"表达了思乡之情。',
    answer: true,
    explanation: '正确。这首诗表达了诗人对故乡的思念之情。',
    difficulty: 4
  },
  {
    id: 'judge-4-4',
    question: '苏轼的《水调歌头·明月几时有》是一首词。',
    answer: true,
    explanation: '正确。这是苏轼的著名词作，表达了对亲人的思念。',
    difficulty: 4
  },
  {
    id: 'judge-4-5',
    question: '"大漠孤烟直，长河落日圆"描写的是江南景色。',
    answer: false,
    explanation: '错误。这两句描写的是塞外壮丽的景色。',
    difficulty: 4
  },
  // 难度5
  {
    id: 'judge-5-1',
    question: '"学而不思则罔，思而不学则殆"出自《孟子》。',
    answer: false,
    explanation: '错误。这句话出自《论语·为政》。',
    difficulty: 5
  },
  {
    id: 'judge-5-2',
    question: '陶渊明被称为"田园诗人"。',
    answer: true,
    explanation: '正确。陶渊明是东晋诗人，开创了田园诗派。',
    difficulty: 5
  },
  {
    id: 'judge-5-3',
    question: '"落霞与孤鹜齐飞，秋水共长天一色"出自《滕王阁序》。',
    answer: true,
    explanation: '正确。这是王勃《滕王阁序》中的名句。',
    difficulty: 5
  },
  {
    id: 'judge-5-4',
    question: '"先天下之忧而忧，后天下之乐而乐"是诸葛亮的名言。',
    answer: false,
    explanation: '错误。这是范仲淹在《岳阳楼记》中表达的名句。',
    difficulty: 5
  },
  {
    id: 'judge-5-5',
    question: '白居易的《长恨歌》描写的是唐玄宗和杨贵妃的爱情故事。',
    answer: true,
    explanation: '正确。这首长诗叙述了唐玄宗和杨贵妃的爱情悲剧。',
    difficulty: 5
  },
  // 难度6
  {
    id: 'judge-6-1',
    question: '"破釜沉舟"的主人公是项羽。',
    answer: true,
    explanation: '正确。巨鹿之战中，项羽命令士兵砸锅沉船，表示不胜利不回头的决心。',
    difficulty: 6
  },
  {
    id: 'judge-6-2',
    question: '"三顾茅庐"讲的是刘备请诸葛亮出山的故事。',
    answer: true,
    explanation: '正确。刘备三顾茅庐请诸葛亮出山辅佐，体现了礼贤下士的精神。',
    difficulty: 6
  },
  {
    id: 'judge-6-3',
    question: '"负荆请罪"的主动方是廉颇。',
    answer: true,
    explanation: '正确。廉颇背着荆条向蔺相如请罪，表示自己的歉意。',
    difficulty: 6
  },
  {
    id: 'judge-6-4',
    question: '"指鹿为马"讲的是赵高指鹿为马的故事。',
    answer: true,
    explanation: '正确。赵高故意指鹿为马，测试群臣是否顺从。',
    difficulty: 6
  },
  {
    id: 'judge-6-5',
    question: '"纸上谈兵"指的是赵括的故事。',
    answer: true,
    explanation: '正确。赵括只会纸上谈兵，实际指挥能力很差，导致长平之战惨败。',
    difficulty: 6
  },
  // 难度7
  {
    id: 'judge-7-1',
    question: '《诗经》是中国最早的诗歌总集。',
    answer: true,
    explanation: '正确。《诗经》是中国最早的诗歌总集，收录了西周到春秋时期的305首诗。',
    difficulty: 7
  },
  {
    id: 'judge-7-2',
    question: '"关关雎鸠，在河之洲"出自《楚辞》。',
    answer: false,
    explanation: '错误。这出自《诗经·周南·关雎》。',
    difficulty: 7
  },
  {
    id: 'judge-7-3',
    question: '李清照是南宋女词人。',
    answer: true,
    explanation: '正确。李清照是宋代著名女词人，婉约词派代表人物。',
    difficulty: 7
  },
  {
    id: 'judge-7-4',
    question: '辛弃疾的词风以婉约著称。',
    answer: false,
    explanation: '错误。辛弃疾是豪放派词人代表，词风豪放激昂。',
    difficulty: 7
  },
  {
    id: 'judge-7-5',
    question: '"疏影横斜水清浅，暗香浮动月黄昏"描写的是荷花。',
    answer: false,
    explanation: '错误。这两句描写的是梅花，出自林逋的《山园小梅》。',
    difficulty: 7
  },
  // 难度8
  {
    id: 'judge-8-1',
    question: '韩愈是"唐宋八大家"之首。',
    answer: true,
    explanation: '正确。韩愈被尊为"唐宋八大家"之首，倡导古文运动。',
    difficulty: 8
  },
  {
    id: 'judge-8-2',
    question: '"业精于勤，荒于嬉"出自韩愈的《师说》。',
    answer: false,
    explanation: '错误。这出自韩愈的《进学解》。',
    difficulty: 8
  },
  {
    id: 'judge-8-3',
    question: '柳宗元的《小石潭记》是一篇游记散文。',
    answer: true,
    explanation: '正确。这是柳宗元的代表作之一，描写了小石潭的幽美景色。',
    difficulty: 8
  },
  {
    id: 'judge-8-4',
    question: '欧阳修的《醉翁亭记》是他在杭州任职时写的。',
    answer: false,
    explanation: '错误。这是欧阳修在滁州任职时写的。',
    difficulty: 8
  },
  {
    id: 'judge-8-5',
    question: '苏轼的《赤壁赋》描写的是赤壁之战的场景。',
    answer: false,
    explanation: '错误。《赤壁赋》是苏轼游览黄州赤壁时所作，主要抒发人生感慨。',
    difficulty: 8
  },
  // 难度9
  {
    id: 'judge-9-1',
    question: '"人生自古谁无死，留取丹心照汗青"是文天祥的诗句。',
    answer: true,
    explanation: '正确。这是文天祥《过零丁洋》中的名句，表达了视死如归的爱国情怀。',
    difficulty: 9
  },
  {
    id: 'judge-9-2',
    question: '"粉身碎骨浑不怕，要留清白在人间"赞美的是梅花。',
    answer: false,
    explanation: '错误。于谦的《石灰吟》赞美的是石灰，借物喻人，表达清白做人的志向。',
    difficulty: 9
  },
  {
    id: 'judge-9-3',
    question: '"千山鸟飞绝，万径人踪灭"描写的是春天的景象。',
    answer: false,
    explanation: '错误。这是柳宗元《江雪》中的诗句，描写的是冬天的景象。',
    difficulty: 9
  },
  {
    id: 'judge-9-4',
    question: '李商隐与杜牧并称为"小李杜"。',
    answer: true,
    explanation: '正确。李商隐和杜牧是晚唐诗坛的两颗明珠，合称"小李杜"。',
    difficulty: 9
  },
  {
    id: 'judge-9-5',
    question: '"但愿人长久，千里共婵娟"中的"婵娟"指美女。',
    answer: false,
    explanation: '错误。"婵娟"在这里指月亮。',
    difficulty: 9
  },
  // 难度10：高难度
  {
    id: 'judge-10-1',
    question: '《史记》是中国第一部纪传体通史。',
    answer: true,
    explanation: '正确。《史记》由司马迁撰写，是中国第一部纪传体通史。',
    difficulty: 10
  },
  {
    id: 'judge-10-2',
    question: '"六国破灭，非兵不利，战不善"出自苏洵的《六国论》。',
    answer: true,
    explanation: '正确。这是苏洵《六国论》开篇的名句，分析六国灭亡的原因。',
    difficulty: 10
  },
  {
    id: 'judge-10-3',
    question: '"醉里挑灯看剑，梦回吹角连营"是辛弃疾的词。',
    answer: true,
    explanation: '正确。这是辛弃疾《破阵子·为陈同甫赋壮词以寄之》中的句子。',
    difficulty: 10
  },
  {
    id: 'judge-10-4',
    question: '归有光是明代"唐宋派"的代表作家。',
    answer: true,
    explanation: '正确。归有光是明代散文家，"唐宋派"代表人物，代表作有《项脊轩志》。',
    difficulty: 10
  },
  {
    id: 'judge-10-5',
    question: '"二十四桥明月夜，玉人何处教吹箫"描写的是扬州的景色。',
    answer: true,
    explanation: '正确。这是杜牧《寄扬州韩绰判官》中的名句，描写扬州夜色。',
    difficulty: 10
  },
  // 难度1补充
  {
    id: 'judge-1-6',
    question: '汉字书法中，"楷书"是最早出现的字体。',
    answer: false,
    explanation: '错误。汉字的演变顺序是:甲骨文→金文→篆书→隶书→楷书。',
    difficulty: 1
  },
  {
    id: 'judge-1-9',
    question: '《西游记》中的孙悟空是从石头里蹦出来的。',
    answer: true,
    explanation: '正确。孙悟空是从花果山的一块仙石中诞生的。',
    difficulty: 1
  },
  {
    id: 'judge-1-10',
    question: '唐宋八大家中有三位姓苏。',
    answer: true,
    explanation: '正确。唐宋八大家中有三位姓苏：苏洵、苏轼、苏辙。',
    difficulty: 1
  },
  {
    id: 'judge-1-11',
    question: '《三国演义》的作者是罗贯中。',
    answer: true,
    explanation: '正确。罗贯中是元末明初小说家，代表作《三国演义》。',
    difficulty: 1
  },
  {
    id: 'judge-1-12',
    question: '"诗圣"指的是杜甫。',
    answer: true,
    explanation: '正确。杜甫被称为"诗圣"，李白被称为"诗仙"。',
    difficulty: 1
  },
  {
    id: 'judge-1-13',
    question: '"诗佛"指的是李白。',
    answer: false,
    explanation: '错误。"诗佛"指的是王维，李白被称为"诗仙"。',
    difficulty: 1
  },
  {
    id: 'judge-1-14',
    question: '《水浒传》描写的是农民起义的故事。',
    answer: true,
    explanation: '正确。《水浒传》描写了北宋末年梁山好汉起义的故事。',
    difficulty: 1
  },
  {
    id: 'judge-1-15',
    question: '"《西游记》是神魔小说。',
    answer: true,
    explanation: '正确。《西游记》是中国古代神魔小说的代表作。',
    difficulty: 1
  },
  // 难度2补充
  {
    id: 'judge-2-6',
    question: '"三人成虎"的意思是真的有三只老虎。',
    answer: false,
    explanation: '错误。这个成语比喻谣言或讹传一再重复，就会使人信以为真。',
    difficulty: 2
  },
  {
    id: 'judge-2-7',
    question: '"孔孟之道"指的是孔子和孟子的思想学说。',
    answer: true,
    explanation: '正确。孔孟之道是中国传统文化的重要组成部分。',
    difficulty: 2
  },
  {
    id: 'judge-2-8',
    question: '"鸿门宴"讲的是刘邦和项羽的故事。',
    answer: true,
    explanation: '正确。鸿门宴是楚汉相争中的一次著名宴会。',
    difficulty: 2
  },
  {
    id: 'judge-2-10',
    question: '"学富五车"形容一个人车很多。',
    answer: false,
    explanation: '错误。这个成语形容读书多，学问大。',
    difficulty: 2
  },
  {
    id: 'judge-2-11',
    question: '"闻鸡起舞"的主人公是祖逖和刘琨。',
    answer: true,
    explanation: '正确。他们每天听到鸡叫就起床练武，形容勤奋刻苦。',
    difficulty: 2
  },
  {
    id: 'judge-2-12',
    question: '"程门立雪"表达的是对老师的尊敬。',
    answer: true,
    explanation: '正确。这个典故讲述杨时在程颐门前立雪等待，表现对老师的尊敬。',
    difficulty: 2
  },
  {
    id: 'judge-2-13',
    question: '"高山流水"讲的是伯牙和子期的故事。',
    answer: true,
    explanation: '正确。这个故事比喻知己难寻。',
    difficulty: 2
  },
  {
    id: 'judge-2-14',
    question: '"高山流水"是关于音乐的成语。',
    answer: true,
    explanation: '正确。伯牙善鼓琴，子期善听琴，是知音难觅的典故。',
    difficulty: 2
  },
  {
    id: 'judge-2-15',
    question: '"守株待兔"讽刺的是懒人。',
    answer: true,
    explanation: '正确。这个成语讽刺妄想不劳而获的人。',
    difficulty: 2
  },
  {
    id: 'judge-2-16',
    question: '"杞人忧天"出自《列子》。',
    answer: true,
    explanation: '正确。这个寓言出自《列子·天瑞》。',
    difficulty: 2
  },
  {
    id: 'judge-2-17',
    question: '"愚公移山"出自《韩非子》。',
    answer: false,
    explanation: '错误。这个寓言出自《列子·汤问》。',
    difficulty: 2
  },
  {
    id: 'judge-2-18',
    question: '"亡羊补牢"比喻出了问题补救还不晚。',
    answer: true,
    explanation: '正确。这个成语比喻出了问题以后想办法补救，可以防止继续受损失。',
    difficulty: 2
  },
  {
    id: 'judge-2-19',
    question: '"画龙点睛"出自张僧繇的故事。',
    answer: true,
    explanation: '正确。传说张僧繇画龙不点睛，点了眼睛龙就飞走了。',
    difficulty: 2
  },
  {
    id: 'judge-2-20',
    question: '"画蛇添足"比喻做多余的事。',
    answer: true,
    explanation: '正确。这个成语比喻做了多余的事，反而把事情搞糟了。',
    difficulty: 2
  },
  // 难度3补充
  {
    id: 'judge-3-6',
    question: '"对牛弹琴"出自《庄子》。',
    answer: false,
    explanation: '错误。这个成语出自《牟子理惑论》。',
    difficulty: 3
  },
  {
    id: 'judge-3-7',
    question: '"叶公好龙"的叶公是真的喜欢龙。',
    answer: false,
    explanation: '错误。叶公只是表面上喜欢龙，当真龙出现时却吓坏了。',
    difficulty: 3
  },
  {
    id: 'judge-3-8',
    question: '"杯弓蛇影"的意思是酒杯里有蛇的影子。',
    answer: false,
    explanation: '错误。这个成语比喻疑神疑鬼，自相惊扰。',
    difficulty: 3
  },
  {
    id: 'judge-3-9',
    question: '"杞人忧天"出自《列子》。',
    answer: true,
    explanation: '正确。这个寓言出自《列子·天瑞》。',
    difficulty: 3
  },
  {
    id: 'judge-3-10',
    question: '"滥竽充数"的主人公是南郭先生。',
    answer: true,
    explanation: '正确。南郭先生不会吹竽却混在乐队里凑数。',
    difficulty: 3
  },
  {
    id: 'judge-3-11',
    question: '"胸有成竹"与文与可有关。',
    answer: true,
    explanation: '正确。文与可是北宋画家，他画竹子之前胸中已有成竹的形象。',
    difficulty: 3
  },
  {
    id: 'judge-3-12',
    question: '"愚公移山"出自《孟子》。',
    answer: false,
    explanation: '错误。这个寓言出自《列子·汤问》。',
    difficulty: 3
  },
  {
    id: 'judge-3-13',
    question: '"掩耳盗铃"出自《吕氏春秋》。',
    answer: true,
    explanation: '正确。这个寓言出自《吕氏春秋·自知》。',
    difficulty: 3
  },
  {
    id: 'judge-3-14',
    question: '"自相矛盾"出自《韩非子》。',
    answer: true,
    explanation: '正确。这个寓言出自《韩非子·难一》。',
    difficulty: 3
  },
  {
    id: 'judge-3-15',
    question: '"刻舟求剑"出自《吕氏春秋》。',
    answer: true,
    explanation: '正确。这个寓言出自《吕氏春秋·察今》。',
    difficulty: 3
  },
  {
    id: 'judge-3-16',
    question: '"揠苗助长"出自《孟子》。',
    answer: true,
    explanation: '正确。这个寓言出自《孟子·公孙丑上》。',
    difficulty: 3
  },
  {
    id: 'judge-3-17',
    question: '"按图索骥"出自《韩非子》。',
    answer: false,
    explanation: '错误。这个成语出自《汉书》等记载，相传伯乐善相马。',
    difficulty: 3
  },
  {
    id: 'judge-3-18',
    question: '"井底之蛙"出自《庄子》。',
    answer: true,
    explanation: '正确。这个寓言出自《庄子·秋水》。',
    difficulty: 3
  },
  {
    id: 'judge-3-19',
    question: '"坐井观天"和"井底之蛙"意思相近。',
    answer: true,
    explanation: '正确。这两个成语都比喻眼界狭窄，见识短浅。',
    difficulty: 3
  },
  {
    id: 'judge-3-20',
    question: '"盲人摸象"出自佛经故事。',
    answer: true,
    explanation: '正确。这个寓言最初来自佛教经典。',
    difficulty: 3
  },
  // 难度4补充
  {
    id: 'judge-4-6',
    question: '"野火烧不尽，春风吹又生"出自白居易的《赋得古原草送别》。',
    answer: true,
    explanation: '正确。这是白居易16岁时的成名作。',
    difficulty: 4
  },
  {
    id: 'judge-4-7',
    question: '王维被称为"诗圣"。',
    answer: false,
    explanation: '错误。王维被称为"诗佛"，杜甫才被称为"诗圣"。',
    difficulty: 4
  },
  {
    id: 'judge-4-8',
    question: '"千门万户曈曈日，总把新桃换旧符"描写的是春节。',
    answer: true,
    explanation: '正确。这是王安石《元日》中的诗句，描写春节的景象。',
    difficulty: 4
  },
  {
    id: 'judge-4-9',
    question: '"随风潜入夜，润物细无声"描写的是雨水。',
    answer: true,
    explanation: '正确。这是杜甫《春夜喜雨》中的诗句，描写春雨。',
    difficulty: 4
  },
  {
    id: 'judge-4-10',
    question: '"飞流直下三千尺，疑是银河落九天"描写的是黄河。',
    answer: false,
    explanation: '错误。这是李白《望庐山瀑布》中的诗句，描写庐山瀑布。',
    difficulty: 4
  },
  {
    id: 'judge-4-11',
    question: '"独在异乡为异客，每逢佳节倍思亲"是王维的诗句。',
    answer: true,
    explanation: '正确。这是王维《九月九日忆山东兄弟》中的名句。',
    difficulty: 4
  },
  {
    id: 'judge-4-12',
    question: '杜牧被称为"小杜"。',
    answer: true,
    explanation: '正确。杜牧与李商隐并称"小李杜"，杜牧被称为"小杜"。',
    difficulty: 4
  },
  {
    id: 'judge-4-13',
    question: '"慈母手中线，游子身上衣"出自孟郊的《游子吟》。',
    answer: true,
    explanation: '正确。这首诗歌颂了母爱的伟大。',
    difficulty: 4
  },
  {
    id: 'judge-4-14',
    question: '孟郊是唐代诗人。',
    answer: true,
    explanation: '正确。孟郊是唐代诗人，与韩愈并称"韩孟"。',
    difficulty: 4
  },
  {
    id: 'judge-4-15',
    question: '"谁知盘中餐，粒粒皆辛苦"是李绅的诗句。',
    answer: true,
    explanation: '正确。这是李绅《悯农》中的名句。',
    difficulty: 4
  },
  {
    id: 'judge-4-16',
    question: '"春眠不觉晓，处处闻啼鸟"是孟浩然的诗。',
    answer: true,
    explanation: '正确。这是孟浩然《春晓》中的诗句。',
    difficulty: 4
  },
  {
    id: 'judge-4-17',
    question: '"夜来风雨声，花落知多少"描写的是春天的景象。',
    answer: true,
    explanation: '正确。这句诗描写了春夜风雨后的景象。',
    difficulty: 4
  },
  {
    id: 'judge-4-18',
    question: '"少小离家老大回，乡音无改鬓毛衰"是贺知章的诗。',
    answer: true,
    explanation: '正确。这是贺知章《回乡偶书》中的诗句。',
    difficulty: 4
  },
  {
    id: 'judge-4-19',
    question: '"儿童相见不相识，笑问客从何处来"表达思乡之情。',
    answer: true,
    explanation: '正确。这两句表达了诗人久别还乡的感慨。',
    difficulty: 4
  },
  {
    id: 'judge-4-20',
    question: '"离离原上草，一岁一枯荣"是白居易的诗句。',
    answer: true,
    explanation: '正确。这是白居易《赋得古原草送别》中的诗句。',
    difficulty: 4
  },
  // 难度5补充
  {
    id: 'judge-5-6',
    question: '"采菊东篱下，悠然见南山"是陶渊明的诗句。',
    answer: true,
    explanation: '正确。这是陶渊明《饮酒》中的名句，表现了隐逸情怀。',
    difficulty: 5
  },
  {
    id: 'judge-5-7',
    question: '"慈母手中线，游子身上衣"出自孟郊的《游子吟》。',
    answer: true,
    explanation: '正确。这首诗歌颂了母爱的伟大。',
    difficulty: 5
  },
  {
    id: 'judge-5-8',
    question: '"商女不知亡国恨，隔江犹唱后庭花"是杜牧的诗句。',
    answer: true,
    explanation: '正确。这是杜牧《泊秦淮》中的诗句，表达了忧国之情。',
    difficulty: 5
  },
  {
    id: 'judge-5-9',
    question: '刘禹锡被称为"诗豪"。',
    answer: true,
    explanation: '正确。刘禹锡的诗风豪放，被称为"诗豪"。',
    difficulty: 5
  },
  {
    id: 'judge-5-10',
    question: '"国破山河在，城春草木深"表达了诗人对国家的忧虑。',
    answer: true,
    explanation: '正确。这是杜甫《春望》中的名句，表达了对国破家亡的悲痛。',
    difficulty: 5
  },
  {
    id: 'judge-5-11',
    question: '"春蚕到死丝方尽，蜡炬成灰泪始干"描写的是蚕和蜡烛。',
    answer: false,
    explanation: '错误。这是李商隐《无题》中的名句，借物喻人，表达至死不渝的爱情。',
    difficulty: 5
  },
  {
    id: 'judge-5-12',
    question: '"相见时难别亦难"是李商隐的诗句。',
    answer: true,
    explanation: '正确。这是李商隐《无题》中的名句。',
    difficulty: 5
  },
  {
    id: 'judge-5-13',
    question: '"落红不是无情物，化作春泥更护花"是龚自珍的诗句。',
    answer: true,
    explanation: '正确。这是龚自珍《己亥杂诗》中的名句。',
    difficulty: 5
  },
  {
    id: 'judge-5-14',
    question: '"落红"指落花。',
    answer: true,
    explanation: '正确。"落红"指落花，比喻辞官归隐。',
    difficulty: 5
  },
  {
    id: 'judge-5-15',
    question: '陶渊明开创了田园诗派。',
    answer: true,
    explanation: '正确。陶渊明是东晋诗人，开创了田园诗派。',
    difficulty: 5
  },
  {
    id: 'judge-5-16',
    question: '"不为五斗米折腰"是陶渊明的故事。',
    answer: true,
    explanation: '正确。陶渊明不愿为五斗米俸禄向权贵低头。',
    difficulty: 5
  },
  {
    id: 'judge-5-17',
    question: '"桃花源记》是陶渊明的作品。',
    answer: true,
    explanation: '正确。《桃花源记》是陶渊明描绘的理想社会。',
    difficulty: 5
  },
  {
    id: 'judge-5-18',
    question: '"世外桃源"出自《桃花源记》。',
    answer: true,
    explanation: '正确。这个成语出自陶渊明的《桃花源记》。',
    difficulty: 5
  },
  {
    id: 'judge-5-19',
    question: '"黄四娘家花满蹊，千朵万朵压枝低"是杜甫的诗。',
    answer: true,
    explanation: '正确。这是杜甫《江畔独步寻花》中的诗句。',
    difficulty: 5
  },
  {
    id: 'judge-5-20',
    question: '"留连戏蝶时时舞，自在娇莺恰恰啼"是杜甫的诗句。',
    answer: true,
    explanation: '正确。这是杜甫《江畔独步寻花》中的诗句。',
    difficulty: 5
  },
  // 难度6补充
  {
    id: 'judge-6-6',
    question: '"八仙过海"中的八仙是道教传说人物。',
    answer: true,
    explanation: '正确。八仙是道教传说中的八位仙人。',
    difficulty: 6
  },
  {
    id: 'judge-6-7',
    question: '"卧薪尝胆"讲的是勾践的故事。',
    answer: true,
    explanation: '正确。越王勾践卧薪尝胆，最终复国成功。',
    difficulty: 6
  },
  {
    id: 'judge-6-8',
    question: '"精卫填海"是关于女娲的神话。',
    answer: false,
    explanation: '错误。精卫是炎帝女儿死后化身而成的鸟，不是女娲。',
    difficulty: 6
  },
  {
    id: 'judge-6-9',
    question: '"女娲补天"是关于补天的神话传说。',
    answer: true,
    explanation: '正确。女娲补天是中国古代著名神话。',
    difficulty: 6
  },
  {
    id: 'judge-6-10',
    question: '"完璧归赵"的主人公是蔺相如。',
    answer: true,
    explanation: '正确。蔺相如将和氏璧完好无损地送回赵国。',
    difficulty: 6
  },
  {
    id: 'judge-6-11',
    question: '"入木三分"形容书法笔力强劲。',
    answer: true,
    explanation: '正确。这个成语形容书法笔力强劲，也比喻见解深刻。',
    difficulty: 6
  },
  {
    id: 'judge-6-12',
    question: '"程门立雪"讲的是程颢和程颐的故事。',
    answer: true,
    explanation: '正确。杨时在程颐门前立雪等待请教。',
    difficulty: 6
  },
  {
    id: 'judge-6-13',
    question: '"高山流水"讲的是伯牙和子期的故事。',
    answer: true,
    explanation: '正确。这个故事比喻知己难寻。',
    difficulty: 6
  },
  {
    id: 'judge-6-14',
    question: '"破釜沉舟"的主人公是项羽。',
    answer: true,
    explanation: '正确。巨鹿之战中，项羽命令士兵砸锅沉船，表示不胜利不回头的决心。',
    difficulty: 6
  },
  {
    id: 'judge-6-15',
    question: '"背水一战"的主人公是韩信。',
    answer: true,
    explanation: '正确。韩信在井陉之战中背水列阵，置之死地而后生。',
    difficulty: 6
  },
  {
    id: 'judge-6-16',
    question: '"四面楚歌"的主人公是项羽。',
    answer: true,
    explanation: '正确。楚汉相争中，项羽被汉军包围，听到四面楚歌，知道大势已去。',
    difficulty: 6
  },
  {
    id: 'judge-6-17',
    question: '"乌江自刎"的主人公是项羽。',
    answer: true,
    explanation: '正确。项羽兵败后，在乌江边自刎而死。',
    difficulty: 6
  },
  {
    id: 'judge-6-18',
    question: '"三顾茅庐"的主人公是刘备和诸葛亮。',
    answer: true,
    explanation: '正确。刘备三顾茅庐请诸葛亮出山辅佐。',
    difficulty: 6
  },
  {
    id: 'judge-6-19',
    question: '"草船借箭"的主人公是诸葛亮。',
    answer: true,
    explanation: '正确。诸葛亮利用草船借来十万支箭。',
    difficulty: 6
  },
  {
    id: 'judge-6-20',
    question: '"空城计"的主人公是诸葛亮。',
    answer: true,
    explanation: '正确。诸葛亮在城门大开的情况下，抚琴吓退司马懿大军。',
    difficulty: 6
  },
  // 难度7补充
  {
    id: 'judge-7-6',
    question: '"大江东去，浪淘尽"出自苏轼的《念奴娇·赤壁怀古》。',
    answer: true,
    explanation: '正确。这是苏轼豪放词的代表作。',
    difficulty: 7
  },
  {
    id: 'judge-7-7',
    question: '"寻寻觅觅，冷冷清清，凄凄惨惨戚戚"是李清照的词句。',
    answer: true,
    explanation: '正确。这是李清照《声声慢》中的名句。',
    difficulty: 7
  },
  {
    id: 'judge-7-8',
    question: '岳飞的《满江红》是词牌名。',
    answer: true,
    explanation: '正确。《满江红》是词牌名，岳飞用这个词牌写了著名的爱国词。',
    difficulty: 7
  },
  {
    id: 'judge-7-9',
    question: '"醉卧沙场君莫笑"写的是江南战场。',
    answer: false,
    explanation: '错误。这是王翰《凉州词》中的诗句，描写的是西北边塞。',
    difficulty: 7
  },
  {
    id: 'judge-7-10',
    question: '辛弃疾的《青玉案·元夕》描写的是元宵节。',
    answer: true,
    explanation: '正确。这首词描写了元宵节的景象。',
    difficulty: 7
  },
  {
    id: 'judge-7-11',
    question: '"莫道不销魂，帘卷西风，人比黄花瘦"是李清照的词。',
    answer: true,
    explanation: '正确。这是李清照《醉花阴》中的名句。',
    difficulty: 7
  },
  {
    id: 'judge-7-12',
    question: '"无可奈何花落去，似曾相识燕归来"是晏殊的词。',
    answer: true,
    explanation: '正确。这是晏殊《浣溪沙》中的名句。',
    difficulty: 7
  },
  {
    id: 'judge-7-13',
    question: '"问君能有几多愁，恰似一江春水向东流"是李煜的词。',
    answer: true,
    explanation: '正确。这是李煜《虞美人》中的名句，表达亡国之痛。',
    difficulty: 7
  },
  {
    id: 'judge-7-14',
    question: '"曾经沧海难为水"是刘禹锡的诗句。',
    answer: false,
    explanation: '错误。这是元稹《离思》中的诗句。',
    difficulty: 7
  },
  {
    id: 'judge-7-15',
    question: '"曾经沧海难为水"是元稹悼念亡妻的诗句。',
    answer: true,
    explanation: '正确。这是元稹《离思》中的名句，表达对亡妻的深切怀念。',
    difficulty: 7
  },
  {
    id: 'judge-7-16',
    question: '"剪不断，理还乱，是离愁"是李煜的词句。',
    answer: true,
    explanation: '正确。这是李煜《相见欢》中的名句。',
    difficulty: 7
  },
  {
    id: 'judge-7-17',
    question: '李煜被称为"词帝"。',
    answer: true,
    explanation: '正确。李煜是南唐后主，被称为"词帝"。',
    difficulty: 7
  },
  {
    id: 'judge-7-18',
    question: '李清照是宋代女词人。',
    answer: true,
    explanation: '正确。李清照是宋代著名女词人，婉约词派代表人物。',
    difficulty: 7
  },
  {
    id: 'judge-7-19',
    question: '辛弃疾是宋代词人。',
    answer: true,
    explanation: '正确。辛弃疾是南宋豪放派词人代表。',
    difficulty: 7
  },
  {
    id: 'judge-7-20',
    question: '苏轼是北宋词人。',
    answer: true,
    explanation: '正确。苏轼是北宋文学家，豪放词派的开创者之一。',
    difficulty: 7
  },
  // 难度8补充
  {
    id: 'judge-8-6',
    question: '"竹杖芒鞋轻胜马，谁怕"是苏轼的词。',
    answer: true,
    explanation: '正确。这是苏轼《定风波》中的句子。',
    difficulty: 8
  },
  {
    id: 'judge-8-7',
    question: '黄庭坚是江西诗派的开创者。',
    answer: true,
    explanation: '正确。黄庭坚是江西诗派的开创者之一。',
    difficulty: 8
  },
  {
    id: 'judge-8-8',
    question: '秦观的词风以豪放著称。',
    answer: false,
    explanation: '错误。秦观是婉约派词人代表，词风婉约清丽。',
    difficulty: 8
  },
  {
    id: 'judge-8-9',
    question: '"昨夜西风凋碧树，独上高楼"是晏几道的词。',
    answer: false,
    explanation: '错误。这是晏殊《蝶恋花》中的句子。',
    difficulty: 8
  },
  {
    id: 'judge-8-10',
    question: '范成大是"南宋四大家"之一。',
    answer: true,
    explanation: '正确。南宋四大家是尤袤、杨万里、范成大、陆游。',
    difficulty: 8
  },
  {
    id: 'judge-8-11',
    question: '杨万里的诗风清新自然，被称为"诚斋体"。',
    answer: true,
    explanation: '正确。杨万里，号诚斋，创立了"诚斋体"。',
    difficulty: 8
  },
  {
    id: 'judge-8-12',
    question: '陆游是中国历史上存诗最多的诗人之一。',
    answer: true,
    explanation: '正确。陆游一生创作诗歌近万首，是中国历史上存诗最多的诗人之一。',
    difficulty: 8
  },
  {
    id: 'judge-8-13',
    question: '"小楼一夜听春雨，深巷明朝卖杏花"是陆游的诗句。',
    answer: true,
    explanation: '正确。这是陆游《临安春雨初霁》中的名句。',
    difficulty: 8
  },
  {
    id: 'judge-8-14',
    question: '"山重水复疑无路，柳暗花明又一村"是陆游的诗句。',
    answer: true,
    explanation: '正确。这是陆游《游山西村》中的名句。',
    difficulty: 8
  },
  {
    id: 'judge-8-15',
    question: '尤袤是南宋诗人。',
    answer: true,
    explanation: '正确。尤袤是南宋四大家之一。',
    difficulty: 8
  },
  {
    id: 'judge-8-16',
    question: '柳永是北宋婉约派词人。',
    answer: true,
    explanation: '正确。柳永是北宋婉约派词人代表。',
    difficulty: 8
  },
  {
    id: 'judge-8-17',
    question: '"杨柳岸，晓风残月"是柳永的词句。',
    answer: true,
    explanation: '正确。这是柳永《雨霖铃》中的名句。',
    difficulty: 8
  },
  {
    id: 'judge-8-18',
    question: '"执手相看泪眼，竟无语凝噎"是柳永的词句。',
    answer: true,
    explanation: '正确。这是柳永《雨霖铃》中的句子。',
    difficulty: 8
  },
  {
    id: 'judge-8-19',
    question: '"多情自古伤离别，更那堪，冷落清秋节"是柳永的词句。',
    answer: true,
    explanation: '正确。这是柳永《雨霖铃》中的名句。',
    difficulty: 8
  },
  {
    id: 'judge-8-20',
    question: '"今宵酒醒何处?杨柳岸，晓风残月"是柳永的词句。',
    answer: true,
    explanation: '正确。这是柳永《雨霖铃》中的名句。',
    difficulty: 8
  },
  // 难度9补充
  {
    id: 'judge-9-6',
    question: '《牡丹亭》的作者是汤显祖。',
    answer: true,
    explanation: '正确。汤显祖是明代戏曲家，代表作有《牡丹亭》等。',
    difficulty: 9
  },
  {
    id: 'judge-9-7',
    question: '《西厢记》的作者是王实甫。',
    answer: true,
    explanation: '正确。王实甫是元代戏曲家，代表作《西厢记》。',
    difficulty: 9
  },
  {
    id: 'judge-9-8',
    question: '《桃花扇》的作者是关汉卿。',
    answer: false,
    explanation: '错误。《桃花扇》的作者是清代孔尚任，关汉卿是元代戏曲家，代表作《窦娥冤》。',
    difficulty: 9
  },
  {
    id: 'judge-9-9',
    question: '"落霞与孤鹜齐飞，秋水共长天一色"出自《岳阳楼记》。',
    answer: false,
    explanation: '错误。这是王勃《滕王阁序》中的名句。',
    difficulty: 9
  },
  {
    id: 'judge-9-10',
    question: '"先天下之忧而忧，后天下之乐而乐"是范仲淹的名言。',
    answer: true,
    explanation: '正确。这是范仲淹《岳阳楼记》中的名句，表达了以天下为己任的情怀。',
    difficulty: 9
  },
  {
    id: 'judge-9-11',
    question: '"醉翁之意不在酒，在乎山水之间也"出自《醉翁亭记》。',
    answer: true,
    explanation: '正确。这是欧阳修《醉翁亭记》中的名句。',
    difficulty: 9
  },
  {
    id: 'judge-9-12',
    question: '《水经注》的作者是郦道元。',
    answer: true,
    explanation: '正确。《水经注》是北魏郦道元为《水经》作的注，是中国古代地理名著。',
    difficulty: 9
  },
  {
    id: 'judge-9-13',
    question: '《文心雕龙》是中国古代文学理论著作。',
    answer: true,
    explanation: '正确。《文心雕龙》是刘勰所著的文学理论著作。',
    difficulty: 9
  },
  {
    id: 'judge-9-14',
    question: '《世说新语》的作者是刘义庆。',
    answer: true,
    explanation: '正确。《世说新语》是南朝刘义庆编撰的志人小说。',
    difficulty: 9
  },
  {
    id: 'judge-9-15',
    question: '《搜神记》是志怪小说的代表作品。',
    answer: true,
    explanation: '正确。《搜神记》是东晋干宝编撰的志怪小说集。',
    difficulty: 9
  },
  {
    id: 'judge-9-16',
    question: '"大珠小珠落玉盘"描写的是琵琶声。',
    answer: true,
    explanation: '正确。这是白居易《琵琶行》中的诗句，用珍珠落盘比喻琵琶声。',
    difficulty: 9
  },
  {
    id: 'judge-9-17',
    question: '"同是天涯沦落人，相逢何必曾相识"表达了诗人与歌女的共鸣。',
    answer: true,
    explanation: '正确。这是白居易《琵琶行》中的名句，表达了同病相怜的情感。',
    difficulty: 9
  },
  {
    id: 'judge-9-18',
    question: '白居易的《琵琶行》是长篇叙事诗。',
    answer: true,
    explanation: '正确。《琵琶行》是白居易的长篇叙事诗代表作。',
    difficulty: 9
  },
  {
    id: 'judge-9-19',
    question: '《长恨歌》是白居易的作品。',
    answer: true,
    explanation: '正确。《长恨歌》是白居易的长篇叙事诗，描写唐玄宗和杨贵妃的爱情故事。',
    difficulty: 9
  },
  {
    id: 'judge-9-20',
    question: '"天长地久有时尽，此恨绵绵无绝期"是《长恨歌》的结尾句。',
    answer: true,
    explanation: '正确。这是《长恨歌》的结尾句，表达了无穷无尽的遗憾。',
    difficulty: 9
  },
  // 难度10：高难度扩展
  {
    id: 'judge-10-6',
    question: '《资治通鉴》是编年体通史。',
    answer: true,
    explanation: '正确。《资治通鉴》是北宋司马光主编的编年体通史。',
    difficulty: 10
  },
  {
    id: 'judge-10-7',
    question: '"王孙归不归?春草碧色"出自王维的诗。',
    answer: false,
    explanation: '错误。这是江淹《别赋》中的句子。',
    difficulty: 10
  },
  {
    id: 'judge-10-8',
    question: '谢灵运开创了山水诗派。',
    answer: true,
    explanation: '正确。谢灵运是南朝诗人，开创了山水诗派。',
    difficulty: 10
  },
  {
    id: 'judge-10-9',
    question: '鲍照是南朝著名诗人，与谢灵运并称"鲍谢"。',
    answer: true,
    explanation: '正确。鲍照和谢灵运并称"鲍谢"，是南朝诗坛的代表人物。',
    difficulty: 10
  },
  {
    id: 'judge-10-10',
    question: '"可怜无定河边骨，犹是春闺梦里人"是王昌龄的诗句。',
    answer: false,
    explanation: '错误。这是陈陶《陇西行》中的诗句。',
    difficulty: 10
  },
  {
    id: 'judge-10-11',
    question: '"忽如一夜春风来，千树万树梨花开"描写的是春天的梨花。',
    answer: false,
    explanation: '错误。这是岑参《白雪歌送武判官归京》中的诗句，描写的是冬雪。',
    difficulty: 10
  },
  {
    id: 'judge-10-12',
    question: '"人生得意须尽欢，莫使金樽空对月"是李白的诗句。',
    answer: true,
    explanation: '正确。这是李白《将进酒》中的名句。',
    difficulty: 10
  },
  {
    id: 'judge-10-13',
    question: '杜荀鹤是晚唐诗人。',
    answer: true,
    explanation: '正确。杜荀鹤是晚唐诗人，代表作有《山窗小史》等。',
    difficulty: 10
  },
  {
    id: 'judge-10-14',
    question: '"枯藤老树昏鸦，小桥流水人家"是马致远的曲。',
    answer: true,
    explanation: '正确。这是马致远《天净沙·秋思》中的名句。',
    difficulty: 10
  },
  {
    id: 'judge-10-15',
    question: '关汉卿是元代杂剧作家，被誉为"曲圣"。',
    answer: true,
    explanation: '正确。关汉卿是元代杂剧的奠基人，代表作《窦娥冤》。',
    difficulty: 10
  },
  {
    id: 'judge-10-16',
    question: '"古道西风瘦马"出自《天净沙·秋思》。',
    answer: true,
    explanation: '正确。这是马致远《天净沙·秋思》中的句子。',
    difficulty: 10
  },
  {
    id: 'judge-10-17',
    question: '张养浩是元代散曲作家。',
    answer: true,
    explanation: '正确。张养浩是元代散曲作家，代表作《山坡羊·潼关怀古》。',
    difficulty: 10
  },
  {
    id: 'judge-10-18',
    question: '"兴，百姓苦；亡，百姓苦"出自《山坡羊·潼关怀古》。',
    answer: true,
    explanation: '正确。这是张养浩的名句，深刻揭示了封建统治的本质。',
    difficulty: 10
  },
  {
    id: 'judge-10-19',
    question: '纳兰性德是清代词人。',
    answer: true,
    explanation: '正确。纳兰性德是清代著名词人，词风哀婉凄绝。',
    difficulty: 10
  },
  {
    id: 'judge-10-20',
    question: '"人生若只如初见，何事秋风悲画扇"是纳兰性德的词。',
    answer: true,
    explanation: '正确。这是纳兰性德《木兰花·拟古决绝词柬友》中的名句。',
    difficulty: 10
  },
  {
    id: 'judge-10-21',
    question: '袁枚是清代诗人，主张"性灵说"。',
    answer: true,
    explanation: '正确。袁枚是清代诗人，倡导"性灵说"，强调诗歌要抒发真情实感。',
    difficulty: 10
  },
  {
    id: 'judge-10-22',
    question: '赵翼是清代诗人，提出"江山代有人才出，各领风骚数百年"。',
    answer: true,
    explanation: '正确。这是赵翼《论诗》中的名句，表达了对文学发展的见解。',
    difficulty: 10
  },
  {
    id: 'judge-10-23',
    question: '龚自珍是近代思想家，提出"我劝天公重抖擞，不拘一格降人才"。',
    answer: true,
    explanation: '正确。这是龚自珍《己亥杂诗》中的名句。',
    difficulty: 10
  },
  {
    id: 'judge-10-24',
    question: '"九州生气恃风雷"出自龚自珍的诗。',
    answer: true,
    explanation: '正确。这是龚自珍《己亥杂诗》中的名句。',
    difficulty: 10
  },
  {
    id: 'judge-10-25',
    question: '黄遵宪是近代诗人，倡导"诗界革命"。',
    answer: true,
    explanation: '正确。黄遵宪是近代诗人，主张"我手写我口"，倡导诗界革命。',
    difficulty: 10
  },
  {
    id: 'judge-10-26',
    question: '"举大计亦死"中的"大计"指起义。',
    answer: true,
    explanation: '正确。这句话出自《陈涉世家》，"大计"指发动起义。',
    difficulty: 10
  },
  {
    id: 'judge-10-27',
    question: '"等死，死国可乎"中的"等"意思是等待。',
    answer: false,
    explanation: '错误。"等"在这里是"同样"的意思，指同样是死。',
    difficulty: 10
  },
  {
    id: 'judge-10-28',
    question: '"借第令毋斩"中的"第"意思是府第。',
    answer: false,
    explanation: '错误。"第"在这里是连词，意思是"即使"、"假如"。',
    difficulty: 10
  },
  {
    id: 'judge-10-29',
    question: '"徒属皆曰"中的"徒"意思是徒劳。',
    answer: false,
    explanation: '错误。"徒"在这里是名词，指部下、徒众。',
    difficulty: 10
  },
  {
    id: 'judge-10-30',
    question: '"辍耕之垄上"中的"之"是代词。',
    answer: false,
    explanation: '错误。"之"在这里是动词，意思是"去"、"往"。',
    difficulty: 10
  },
  {
    id: 'judge-10-31',
    question: '"怀怒未发"中的"怀"意思是怀念。',
    answer: false,
    explanation: '错误。"怀"在这里是动词，意思是"怀藏"、"怀有"。',
    difficulty: 10
  },
  {
    id: 'judge-10-32',
    question: '"休祲降于天"中的"休"意思是休息。',
    answer: false,
    explanation: '错误。"休"在这里指吉祥，"休祲"指吉凶的征兆。',
    difficulty: 10
  },
  {
    id: 'judge-10-33',
    question: '"天下缟素"中的"缟素"指白色的丝绸。',
    answer: false,
    explanation: '错误。"缟素"在这里指丧服，比喻天下穿丧服，为国君服丧。',
    difficulty: 10
  },
  {
    id: 'judge-10-34',
    question: '"长跪而谢之"中的"谢"意思是感谢。',
    answer: false,
    explanation: '错误。"谢"在这里是道歉、认错的意思。',
    difficulty: 10
  },
  {
    id: 'judge-10-35',
    question: '"徒以有先生也"中的"徒"意思是徒弟。',
    answer: false,
    explanation: '错误。"徒"在这里是副词，意思是"只"、"仅仅"。',
    difficulty: 10
  },
  {
    id: 'judge-10-36',
    question: '《三国演义》是中国第一部长篇章回体历史演义小说。',
    answer: true,
    explanation: '正确。《三国演义》是中国第一部长篇历史演义小说。',
    difficulty: 10
  },
  {
    id: 'judge-10-37',
    question: '《水浒传》的作者是施耐庵。',
    answer: true,
    explanation: '正确。《水浒传》是施耐庵所著的农民起义题材小说。',
    difficulty: 10
  },
  {
    id: 'judge-10-38',
    question: '《西游记》成书于明代。',
    answer: true,
    explanation: '正确。《西游记》是明代吴承恩所著的神魔小说。',
    difficulty: 10
  },
  {
    id: 'judge-10-39',
    question: '《金瓶梅》的作者是兰陵笑笑生。',
    answer: true,
    explanation: '正确。《金瓶梅》的作者署名为兰陵笑笑生，真实身份不详。',
    difficulty: 10
  },
  {
    id: 'judge-10-40',
    question: '《儒林外史》是清代吴敬梓的讽刺小说。',
    answer: true,
    explanation: '正确。《儒林外史》是中国古代讽刺小说的巅峰之作。',
    difficulty: 10
  },
  {
    id: 'judge-10-41',
    question: '《聊斋志异》是清代蒲松龄的文言短篇小说集。',
    answer: true,
    explanation: '正确。《聊斋志异》是蒲松龄所著的文言短篇小说集。',
    difficulty: 10
  },
  {
    id: 'judge-10-42',
    question: '《镜花缘》是清代李汝珍的小说。',
    answer: true,
    explanation: '正确。《镜花缘》是清代李汝珍所著的神魔小说。',
    difficulty: 10
  },
  {
    id: 'judge-10-43',
    question: '《老残游记》的作者是刘鹗。',
    answer: true,
    explanation: '正确。《老残游记》是清末刘鹗所著的谴责小说。',
    difficulty: 10
  },
  {
    id: 'judge-10-44',
    question: '《孽海花》的作者是曾朴。',
    answer: true,
    explanation: '正确。《孽海花》是清末曾朴所著的谴责小说。',
    difficulty: 10
  },
  {
    id: 'judge-10-45',
    question: '"晚清四大谴责小说"包括《官场现形记》。',
    answer: true,
    explanation: '正确。晚清四大谴责小说是《官场现形记》《二十年目睹之怪现状》《老残游记》《孽海花》。',
    difficulty: 10
  },
  {
    id: 'judge-10-46',
    question: '"会当凌绝顶，一览众山小"出自杜甫的《望岳》。',
    answer: true,
    explanation: '正确。这是杜甫早年登泰山时所作，表达了不怕困难、勇于攀登的雄心。',
    difficulty: 10
  },
  {
    id: 'judge-10-47',
    question: '"无边落木萧萧下，不尽长江滚滚来"出自杜甫的《登高》。',
    answer: true,
    explanation: '正确。这是杜甫《登高》中的名句，被推为古今七言律诗之首。',
    difficulty: 10
  },
  {
    id: 'judge-10-48',
    question: '"万里悲秋常作客，百年多病独登台"表达了杜甫的忧国之情。',
    answer: false,
    explanation: '错误。这两句表达的是杜甫个人漂泊无依、老病孤独的悲哀。',
    difficulty: 10
  },
  {
    id: 'judge-10-49',
    question: '"锦瑟无端五十弦，一弦一柱思华年"中的"华年"指美好的年华。',
    answer: true,
    explanation: '正确。这是李商隐《锦瑟》中的诗句，"华年"指青春年华。',
    difficulty: 10
  },
  {
    id: 'judge-10-50',
    question: '"沧海月明珠有泪"引用了鲛人泣珠的典故。',
    answer: true,
    explanation: '正确。这一句引用了鲛人泣珠成珠的传说。',
    difficulty: 10
  },
  {
    id: 'judge-10-51',
    question: '"蓝田日暖玉生烟"引用了良玉生烟的典故。',
    answer: true,
    explanation: '正确。这一句引用了蓝田良玉在阳光下生烟的传说。',
    difficulty: 10
  },
  {
    id: 'judge-10-52',
    question: '"此情可待成追忆，只是当时已惘然"表达的是现在的追忆之情。',
    answer: false,
    explanation: '错误。这两句表达的是这段感情在当时就已怅惘，如今更成追忆。',
    difficulty: 10
  },
  {
    id: 'judge-10-53',
    question: '"春江潮水连海平，海上明月共潮生"是张若虚的诗句。',
    answer: true,
    explanation: '正确。这是张若虚《春江花月夜》中的名句，被誉为"孤篇盖全唐"。',
    difficulty: 10
  },
  {
    id: 'judge-10-54',
    question: '《春江花月夜》是唐诗的巅峰之作。',
    answer: true,
    explanation: '正确。张若虚的《春江花月夜》意境优美，被誉为"孤篇压倒全唐"。',
    difficulty: 10
  },
  {
    id: 'judge-10-55',
    question: '"江畔何人初见月?江月何年初照人?"表达的是对宇宙的思考。',
    answer: true,
    explanation: '正确。这两句诗表达了诗人对宇宙起源、人生意义的哲学思考。',
    difficulty: 10
  },
  {
    id: 'judge-10-56',
    question: '"杨柳岸，晓风残月"是柳永的词句。',
    answer: true,
    explanation: '正确。这是柳永《雨霖铃》中的名句，描写离别之景。',
    difficulty: 10
  },
  {
    id: 'judge-10-57',
    question: '柳永是北宋婉约派词人的代表。',
    answer: true,
    explanation: '正确。柳永是北宋婉约派词人代表，词风婉约凄美。',
    difficulty: 10
  },
  {
    id: 'judge-10-58',
    question: '"多情自古伤离别，更那堪，冷落清秋节"表达了离别之苦。',
    answer: true,
    explanation: '正确。这是柳永《雨霖铃》中的名句，表达离别之苦。',
    difficulty: 10
  },
  {
    id: 'judge-10-59',
    question: '"今宵酒醒何处?杨柳岸，晓风残月"是设问句。',
    answer: true,
    explanation: '正确。这是词中的设问，引出想象中的离别场景。',
    difficulty: 10
  },
  {
    id: 'judge-10-60',
    question: '"执手相看泪眼，竟无语凝噎"描写的是告别的场景。',
    answer: true,
    explanation: '正确。这是柳永《雨霖铃》中的句子，描写恋人告别的场景。',
    difficulty: 10
  },
  {
    id: 'judge-10-61',
    question: '"念去去，千里烟波，暮霭沉沉楚天阔"中的"去去"意思是"去啊"。',
    answer: false,
    explanation: '错误。"去去"在这里是叠词，意思是"越走越远"。',
    difficulty: 10
  },
  {
    id: 'judge-10-62',
    question: '"楚天阔"指的是天空辽阔。',
    answer: true,
    explanation: '正确。"楚天"指南方的天空，"楚天阔"指天空辽阔无边。',
    difficulty: 10
  },
  {
    id: 'judge-10-63',
    question: '中国古代的"三省六部制"中，三省指中书省、门下省、尚书省。',
    answer: true,
    explanation: '正确。隋唐实行三省六部制，三省指中书省、门下省、尚书省。',
    difficulty: 10
  },
  {
    id: 'judge-10-64',
    question: '六部指吏部、户部、礼部、兵部、刑部、工部。',
    answer: true,
    explanation: '正确。六部分别掌管官员选拔、财政、礼仪、军事、司法、工程。',
    difficulty: 10
  },
  {
    id: 'judge-10-65',
    question: '"科举制度"始于隋朝。',
    answer: true,
    explanation: '正确。科举制度始于隋朝，结束于清末，存在了1300多年。',
    difficulty: 10
  },
  {
    id: 'judge-10-66',
    question: '科举考试的最高级别是殿试。',
    answer: true,
    explanation: '正确。科举考试的程序是:乡试→会试→殿试，殿试是最高级别。',
    difficulty: 10
  },
  {
    id: 'judge-10-67',
    question: '状元、榜眼、探花是殿试的前三名。',
    answer: true,
    explanation: '正确。殿试第一名称状元，第二名称榜眼，第三名称探花。',
    difficulty: 10
  },
  {
    id: 'judge-10-68',
    question: '会试录取的称为"贡士"。',
    answer: true,
    explanation: '正确。会试录取的称为"贡士"，贡士才能参加殿试。',
    difficulty: 10
  },
  {
    id: 'judge-10-69',
    question: '乡试录取的称为"举人"。',
    answer: true,
    explanation: '正确。乡试录取的称为"举人"，举人有资格参加会试。',
    difficulty: 10
  },
  {
    id: 'judge-10-70',
    question: '秀才是科举考试的最低级别功名。',
    answer: true,
    explanation: '正确。秀才是县试、府试、院试合格后取得的功名。',
    difficulty: 10
  },
  {
    id: 'judge-10-71',
    question: '丝绸之路是古代东西方贸易的重要通道。',
    answer: true,
    explanation: '正确。丝绸之路连接了东西方文明，促进了经济文化交流。',
    difficulty: 10
  },
  {
    id: 'judge-10-72',
    question: '张骞出使西域开辟了丝绸之路。',
    answer: true,
    explanation: '正确。西汉张骞出使西域，开辟了东西方贸易通道。',
    difficulty: 10
  },
  {
    id: 'judge-10-73',
    question: '郑和下西洋发生在明朝。',
    answer: true,
    explanation: '正确。郑和七次下西洋发生在明成祖时期。',
    difficulty: 10
  },
  {
    id: 'judge-10-74',
    question: '郑和下西洋比哥伦布发现新大陆早。',
    answer: true,
    explanation: '正确。郑和下西洋始于1405年，比哥伦布1492年发现新大陆早87年。',
    difficulty: 10
  },
  {
    id: 'judge-10-75',
    question: '明朝修建的紫禁城是现在的故宫。',
    answer: true,
    explanation: '正确。紫禁城是明清两朝的皇宫，现为故宫博物院。',
    difficulty: 10
  },
  {
    id: 'judge-10-76',
    question: '长城的修筑始于秦始皇。',
    answer: false,
    explanation: '错误。长城的修筑始于战国，秦统一后将各段长城连接起来。',
    difficulty: 10
  },
  {
    id: 'judge-10-77',
    question: '京杭大运河是世界上最早、最长的人工运河。',
    answer: true,
    explanation: '正确。京杭大运河是世界上开凿最早、最长的人工运河。',
    difficulty: 10
  },
  {
    id: 'judge-10-78',
    question: '京杭大运河开凿于隋朝。',
    answer: true,
    explanation: '正确。隋朝开凿了贯通南北的京杭大运河。',
    difficulty: 10
  },
  {
    id: 'judge-10-79',
    question: '"四面楚歌"的主人公是项羽。',
    answer: true,
    explanation: '正确。楚汉相争中，项羽被汉军包围，听到四面楚歌，知道大势已去。',
    difficulty: 10
  },
  {
    id: 'judge-10-80',
    question: '"江郎才尽"指的是江淹的才华耗尽。',
    answer: true,
    explanation: '正确。江郎指江淹，原指江淹文思枯竭，后比喻才华减退。',
    difficulty: 10
  },
  {
    id: 'judge-10-81',
    question: '"东山再起"的主人公是谢安。',
    answer: true,
    explanation: '正确。谢安隐居东山，后出山担任宰相，挽救了东晋危局。',
    difficulty: 10
  },
  {
    id: 'judge-10-82',
    question: '"投笔从戎"的主人公是班超。',
    answer: true,
    explanation: '正确。班超扔下笔去参军，后来出使西域，功绩卓著。',
    difficulty: 10
  },
  {
    id: 'judge-10-83',
    question: '"闻鸡起舞"中的"鸡"是公鸡。',
    answer: true,
    explanation: '正确。祖逖和刘琨听到鸡叫就起床练武，形容勤奋刻苦。',
    difficulty: 10
  },
  {
    id: 'judge-10-84',
    question: '"凿壁偷光"的主人公是匡衡。',
    answer: true,
    explanation: '正确。匡衡家贫，凿壁借光读书，形容刻苦学习。',
    difficulty: 10
  },
  {
    id: 'judge-10-85',
    question: '"悬梁刺股"的主人公是苏秦和孙敬。',
    answer: true,
    explanation: '正确。孙敬悬梁读书，苏秦刺股读书，都是刻苦学习的典故。',
    difficulty: 10
  },
  {
    id: 'judge-10-86',
    question: '"囊萤映雪"的主人公是车胤和孙康。',
    answer: true,
    explanation: '正确。车胤用萤火虫照明，孙康利用雪光反射照明，都是勤学的典故。',
    difficulty: 10
  },
  {
    id: 'judge-10-87',
    question: '"行到水穷处，坐看云起时"是王维的诗句。',
    answer: true,
    explanation: '正确。这是王维《终南别业》中的名句，表达禅意和豁达。',
    difficulty: 10
  },
  {
    id: 'judge-10-88',
    question: '"行到水穷处"的"水穷处"指水流尽头。',
    answer: true,
    explanation: '正确。"水穷处"指溪水的源头或尽头。',
    difficulty: 10
  },
  {
    id: 'judge-10-89',
    question: '"坐看云起时"表达的是随遇而安的豁达。',
    answer: true,
    explanation: '正确。这句话表达了诗人顺应自然、随遇而安的豁达心境。',
    difficulty: 10
  },
  {
    id: 'judge-10-90',
    question: '"蝉噪林逾静，鸟鸣山更幽"运用了以动衬静的手法。',
    answer: true,
    explanation: '正确。王籍的这句诗通过蝉噪和鸟鸣来衬托山的幽静。',
    difficulty: 10
  },
  {
    id: 'judge-10-91',
    question: '"蝉噪林逾静"出自王籍的《入若耶溪》。',
    answer: true,
    explanation: '正确。这是王籍《入若耶溪》中的名句。',
    difficulty: 10
  },
  {
    id: 'judge-10-92',
    question: '"鸟鸣山更幽"的反衬手法被称为"以动衬静"。',
    answer: true,
    explanation: '正确。这是古典诗歌常用的表现手法。',
    difficulty: 10
  },
  {
    id: 'judge-10-93',
    question: '"风急天高猿啸哀，渚清沙白鸟飞回"是杜甫的诗句。',
    answer: true,
    explanation: '正确。这是杜甫《登高》首联，描写秋景。',
    difficulty: 10
  },
  {
    id: 'judge-10-94',
    question: '"无边落木萧萧下"中的"落木"指落叶。',
    answer: true,
    explanation: '正确。"落木"即落叶，在古诗中常用"落木"代替"落叶"。',
    difficulty: 10
  },
  {
    id: 'judge-10-95',
    question: '"不尽长江滚滚来"中的"滚滚"形容江水翻腾的样子。',
    answer: true,
    explanation: '正确。这是《登高》颔联的下句，描写江水奔流不息的景象。',
    difficulty: 10
  },
  {
    id: 'judge-10-96',
    question: '"万里悲秋常作客"中的"悲秋"指悲凉的秋天。',
    answer: true,
    explanation: '正确。这是杜甫晚年流寓他乡，面对秋景引发的悲愁。',
    difficulty: 10
  },
  {
    id: 'judge-10-97',
    question: '"百年多病独登台"中的"百年"指一百年的时间。',
    answer: false,
    explanation: '错误。"百年"在这里指一生、暮年，不是确指一百年。',
    difficulty: 10
  },
  {
    id: 'judge-10-98',
    question: '"艰难苦恨繁霜鬓"中的"霜鬓"指两鬓斑白。',
    answer: true,
    explanation: '正确。"霜鬓"比喻白发，形容年老。',
    difficulty: 10
  },
  {
    id: 'judge-10-99',
    question: '"潦倒新停浊酒杯"中的"潦倒"指贫穷失意。',
    answer: true,
    explanation: '正确。"潦倒"形容处境窘迫，失意潦倒。',
    difficulty: 10
  },
  {
    id: 'judge-10-100',
    question: '杜甫的《登高》被称为"古今七言律诗之首"。',
    answer: true,
    explanation: '正确。这首诗格律严谨，意境深远，被誉为古今七言律诗之冠。',
    difficulty: 10
  },
  {
    id: 'judge-10-101',
    question: '"莫道不销魂，帘卷西风，人比黄花瘦"出自李清照《醉花阴》。',
    answer: true,
    explanation: '正确。这是李清照《醉花阴·薄雾浓云愁永昼》中的名句。',
    difficulty: 10
  },
  {
    id: 'judge-10-102',
    question: '"人比黄花瘦"中的"黄花"指菊花。',
    answer: true,
    explanation: '正确。"黄花"是菊花的别称，这里用菊花比喻人的消瘦。',
    difficulty: 10
  },
  {
    id: 'judge-10-103',
    question: '"帘卷西风"的意思是西风吹卷珠帘。',
    answer: true,
    explanation: '正确。这句话描绘了秋风吹拂帘幕的景象。',
    difficulty: 10
  },
  {
    id: 'judge-10-104',
    question: '"寻寻觅觅，冷冷清清，凄凄惨惨戚戚"运用了叠词。',
    answer: true,
    explanation: '正确。七组叠词构成独特的音韵美，营造了凄清的氛围。',
    difficulty: 10
  },
  {
    id: 'judge-10-105',
    question: '"乍暖还寒时候，最难将息"出自李清照《声声慢》。',
    answer: true,
    explanation: '正确。这是李清照晚年所作的词，表达国破家亡的悲痛。',
    difficulty: 10
  },
  {
    id: 'judge-10-106',
    question: '"三杯两盏淡酒，怎敌他、晚来风急"描写的是借酒消愁。',
    answer: true,
    explanation: '正确。李清照想借酒消愁，但酒力不敌秋风。',
    difficulty: 10
  },
  {
    id: 'judge-10-107',
    question: '"雁过也，正伤心，却是旧时相识"中的雁是鸿雁。',
    answer: true,
    explanation: '正确。鸿雁是候鸟，南飞北归，常用来寄托思乡之情。',
    difficulty: 10
  },
  {
    id: 'judge-10-108',
    question: '"满地黄花堆积"中的黄花是菊花。',
    answer: true,
    explanation: '正确。菊花秋天开放，象征孤独凄凉。',
    difficulty: 10
  },
  {
    id: 'judge-10-109',
    question: '"梧桐更兼细雨"描写的是秋雨梧桐的景象。',
    answer: true,
    explanation: '正确。梧桐细雨是古典诗词中常见的愁苦意象。',
    difficulty: 10
  },
  {
    id: 'judge-10-110',
    question: '"这次第，怎一个愁字了得"中的"这次第"指这种光景。',
    answer: true,
    explanation: '正确。"这次第"指这种情景、这种光景。',
    difficulty: 10
  },
  {
    id: 'judge-10-111',
    question: '"大江东去，浪淘尽，千古风流人物"出自苏轼《念奴娇·赤壁怀古》。',
    answer: true,
    explanation: '正确。这是苏轼豪放词的代表作。',
    difficulty: 10
  },
  {
    id: 'judge-10-112',
    question: '"故垒西边，人道是，三国周郎赤壁"中的"周郎"指周瑜。',
    answer: true,
    explanation: '正确。周瑜年轻有为，人称周郎。',
    difficulty: 10
  },
  {
    id: 'judge-10-113',
    question: '"乱石穿空，惊涛拍岸，卷起千堆雪"描写的是江景。',
    answer: true,
    explanation: '正确。这三句描绘了江边险要的地势和壮观的景象。',
    difficulty: 10
  },
  {
    id: 'judge-10-114',
    question: '"卷起千堆雪"中的"雪"指浪花。',
    answer: true,
    explanation: '正确。"千堆雪"比喻白色的浪花。',
    difficulty: 10
  },
  {
    id: 'judge-10-115',
    question: '"江山如画，一时多少豪杰"是议论句。',
    answer: true,
    explanation: '正确。这两句由写景转为议论，赞叹江山壮丽，豪杰辈出。',
    difficulty: 10
  },
  {
    id: 'judge-10-116',
    question: '"遥想公瑾当年，小乔初嫁了"中的"公瑾"是周瑜的字。',
    answer: true,
    explanation: '正确。周瑜，字公瑾，三国时期吴国名将。',
    difficulty: 10
  },
  {
    id: 'judge-10-117',
    question: '"雄姿英发，羽扇纶巾"描写的是周瑜的形象。',
    answer: true,
    explanation: '正确。这几句描绘了周瑜从容儒雅、英姿勃发的形象。',
    difficulty: 10
  },
  {
    id: 'judge-10-118',
    question: '"羽扇纶巾"是武将的装束。',
    answer: false,
    explanation: '错误。羽扇纶巾本是文人雅士的装束，这里用来表现周瑜的儒将风度。',
    difficulty: 10
  },
  {
    id: 'judge-10-119',
    question: '"谈笑间，樯橹灰飞烟灭"描写的是赤壁之战的场面。',
    answer: true,
    explanation: '正确。这几句描写了周瑜在谈笑之间，曹军樯橹化为灰烬。',
    difficulty: 10
  },
  {
    id: 'judge-10-120',
    question: '"人生如梦，一尊还酹江月"中的"酹"是酒祭的意思。',
    answer: true,
    explanation: '正确。"酹"是将酒洒在地上或江中祭奠，这里指洒酒祭月。',
    difficulty: 10
  },
  {
    id: 'judge-10-121',
    question: '"醉里挑灯看剑，梦回吹角连营"出自辛弃疾《破阵子》。',
    answer: true,
    explanation: '正确。这是辛弃疾《破阵子·为陈同甫赋壮词以寄之》中的句子。',
    difficulty: 10
  },
  {
    id: 'judge-10-122',
    question: '"八百里分麾下炙"中的"八百里"指牛。',
    answer: true,
    explanation: '正确。"八百里"是牛的代称，语出《世说新语》。',
    difficulty: 10
  },
  {
    id: 'judge-10-123',
    question: '"五十弦翻塞外声"中的"五十弦"指瑟。',
    answer: true,
    explanation: '正确。"五十弦"原指瑟，这里泛指各种乐器。',
    difficulty: 10
  },
  {
    id: 'judge-10-124',
    question: '"马作的卢飞快"中的"的卢"是名马。',
    answer: true,
    explanation: '正确。"的卢"是名马名，曾载刘备逃离险境。',
    difficulty: 10
  },
  {
    id: 'judge-10-125',
    question: '"弓如霹雳弦惊"描写的是射箭。',
    answer: true,
    explanation: '正确。这句形容弓弦发出的声音如霹雳，形容箭势迅猛。',
    difficulty: 10
  },
  {
    id: 'judge-10-126',
    question: '"了却君王天下事"中的"天下事"指收复中原。',
    answer: true,
    explanation: '正确。"天下事"指收复中原、统一天下的国家大事。',
    difficulty: 10
  },
  {
    id: 'judge-10-127',
    question: '"赢得生前身后名"中的"身后名"指死后的名声。',
    answer: true,
    explanation: '正确。"身后名"指人死后的声望、名誉。',
    difficulty: 10
  },
  {
    id: 'judge-10-128',
    question: '"可怜白发生"表达了壮志未酬的悲凉。',
    answer: true,
    explanation: '正确。这句表达了诗人虽然壮志满怀，但已白发苍苍的悲凉。',
    difficulty: 10
  },
  {
    id: 'judge-10-129',
    question: '"以子之矛，陷子之盾"出自《韩非子·难一》。',
    answer: true,
    explanation: '正确。这是"自相矛盾"成语的出处。',
    difficulty: 10
  },
  {
    id: 'judge-10-130',
    question: '"自相矛盾"讲的是一个卖矛和盾的人的故事。',
    answer: true,
    explanation: '正确。这个人夸赞自己的矛和盾，结果被问住了，陷入矛盾。',
    difficulty: 10
  },
  {
    id: 'judge-10-131',
    question: '"宁信度，无自信也"出自《韩非子》。',
    answer: false,
    explanation: '错误。这句出自《郑人买履》，是《韩非子·外储说左上》中的故事。',
    difficulty: 10
  },
  {
    id: 'judge-10-132',
    question: '"郑人买履"讽刺的是墨守成规的人。',
    answer: true,
    explanation: '正确。这个寓言讽刺那些只相信教条、不顾实际的人。',
    difficulty: 10
  },
  {
    id: 'judge-10-133',
    question: '"刻舟求剑"出自《吕氏春秋》。',
    answer: true,
    explanation: '正确。这个寓言出自《吕氏春秋·察今》。',
    difficulty: 10
  },
  {
    id: 'judge-10-134',
    question: '"揠苗助长"出自《孟子》。',
    answer: true,
    explanation: '正确。这个寓言出自《孟子·公孙丑上》。',
    difficulty: 10
  },
  {
    id: 'judge-10-135',
    question: '"揠苗助长"中的"揠"是拔的意思。',
    answer: true,
    explanation: '正确。"揠"同"拔"，意思是拔起。',
    difficulty: 10
  },
  {
    id: 'judge-10-136',
    question: '"守株待兔"出自《韩非子·五蠹》。',
    answer: true,
    explanation: '正确。这个寓言出自《韩非子·五蠹》。',
    difficulty: 10
  },
  {
    id: 'judge-10-137',
    question: '"兔走触株，折颈而死"中的"走"是跑的意思。',
    answer: true,
    explanation: '正确。在古文中，"走"是跑的意思，"行"才是走的意思。',
    difficulty: 10
  },
  {
    id: 'judge-10-138',
    question: '"因释其耒而守株"中的"耒"是农具。',
    answer: true,
    explanation: '正确。"耒"是古代的翻土农具。',
    difficulty: 10
  },
  {
    id: 'judge-10-139',
    question: '"因释其耒而守株"中的"释"是解释的意思。',
    answer: false,
    explanation: '错误。"释"在这里是放下、搁下的意思。',
    difficulty: 10
  },
  {
    id: 'judge-10-140',
    question: '"冀复得兔"中的"冀"是希望的意思。',
    answer: true,
    explanation: '正确。"冀"意思是希望、期待。',
    difficulty: 10
  },
  {
    id: 'judge-10-141',
    question: '"桃李不言，下自成蹊"出自《史记》。',
    answer: true,
    explanation: '正确。这是《史记·李将军列传》中的赞语。',
    difficulty: 10
  },
  {
    id: 'judge-10-142',
    question: '"桃李不言，下自成蹊"说的是李广的故事。',
    answer: true,
    explanation: '正确。李广为人真诚，不用自我宣传，自然受人敬重。',
    difficulty: 10
  },
  {
    id: 'judge-10-143',
    question: '"桃李不言，下自成蹊"中的"蹊"是道路的意思。',
    answer: true,
    explanation: '正确。"蹊"指小路，意思是桃李虽不说话，但树下自然走出一条路。',
    difficulty: 10
  },
  {
    id: 'judge-10-144',
    question: '"燕雀安知鸿鹄之志哉"出自《陈涉世家》。',
    answer: true,
    explanation: '正确。这是陈胜起义前的豪言壮语。',
    difficulty: 10
  },
  {
    id: 'judge-10-145',
    question: '"燕雀安知鸿鹄之志哉"中的"燕雀"指麻雀。',
    answer: true,
    explanation: '正确。"燕雀"指小鸟，比喻见识短浅的人。',
    difficulty: 10
  },
  {
    id: 'judge-10-146',
    question: '"燕雀安知鸿鹄之志哉"中的"鸿鹄"指大雁。',
    answer: false,
    explanation: '错误。"鸿鹄"指天鹅，比喻志向远大的人。',
    difficulty: 10
  },
  {
    id: 'judge-10-147',
    question: '"王侯将相宁有种乎"是陈胜说的。',
    answer: true,
    explanation: '正确。这是陈胜号召农民起义时提出的口号。',
    difficulty: 10
  },
  {
    id: 'judge-10-148',
    question: '"王侯将相宁有种乎"中的"宁"是难道的意思。',
    answer: true,
    explanation: '正确。"宁"在这里表示反问，意思是"难道"。',
    difficulty: 10
  },
  {
    id: 'judge-10-149',
    question: '"嗟乎，燕雀安知鸿鹄之志哉"中的"嗟乎"是感叹词。',
    answer: true,
    explanation: '正确。"嗟乎"是古文中的感叹词，相当于现代的"唉"。',
    difficulty: 10
  },
  {
    id: 'judge-10-150',
    question: '"苟富贵，无相忘"表达了陈胜对同伴的承诺。',
    answer: true,
    explanation: '正确。这是陈胜做雇工时对同伴说的话，表达了对情义的重视。',
    difficulty: 10
  }
];

// 根据当前层数获取判断题
export function getJudgeQuestionByLevel(level: number): JudgeQuestion {
  // 确保难度在1-10之间
  const difficulty = Math.min(Math.max(level, 1), 10);
  
  // 获取对应难度的题目
  const questions = judgeQuestions.filter(q => q.difficulty === difficulty);
  
  // 如果没有对应难度的题目，使用最低难度
  if (questions.length === 0) {
    const allQuestions = [...judgeQuestions];
    return shuffleArray(allQuestions)[0];
  }
  
  // 随机返回一道题
  return shuffleArray(questions)[0];
}

// 获取判断题总数
export function getJudgeQuestionCount(): number {
  return judgeQuestions.length;
}

