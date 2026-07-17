import { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import type { BrandData } from '../utils/mockGenerator';

interface AIAssistantProps {
  activeBrand: BrandData | null;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: Date;
}

export default function AIAssistant({ activeBrand }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: '안녕하세요! BrandMate AI 어시스턴트입니다. 브랜드 가이드라인 수립, 디자인 피드백, 또는 컬러 및 타이포그래피 추천 이유에 대해 궁금한 점을 물어보세요. ✨',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const rawText = textToSend || input;
    if (!rawText.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: rawText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Simulate thinking delay
    setTimeout(() => {
      let aiResponse = '질문하신 부분에 대해 분석 중입니다. 브랜딩 전략이나 디자인 팁에 대해 더 구체적으로 말씀해주시면 최상의 답변을 드릴 수 있습니다.';
      const query = rawText.toLowerCase();

      if (query.includes('컬러') || query.includes('색상') || query.includes('색')) {
        if (activeBrand) {
          aiResponse = `현재 브랜드 [${activeBrand.name}]의 추천 컬러 전략은 다음과 같습니다:
• 메인 컬러: ${activeBrand.colors.primary.name} (${activeBrand.colors.primary.hex}) - ${activeBrand.colors.primary.reason}
• 서브 컬러: ${activeBrand.colors.secondary.name} (${activeBrand.colors.secondary.hex})
• 대비 강도: 배경과 메인 컬러의 대비율은 우수하며, WCAG 2.1 AA 기준을 만족하도록 설계되었습니다.`;
        } else {
          aiResponse = '브랜드 컬러는 기업의 가치를 각인시키는 핵심 시각 요소입니다. 파란색 계열은 전문성과 신뢰를, 녹색은 지속 가능성을, 무채색과 베이지는 럭셔리함과 미니멀을 대변합니다. 브랜드 위저드(Wizard)를 시작해 맞춤형 컬러를 제안받아 보세요.';
        }
      } else if (query.includes('폰트') || query.includes('서체') || query.includes('글꼴') || query.includes('타이포')) {
        if (activeBrand) {
          aiResponse = `현재 추천 타이포그래피 조합은 [${activeBrand.typography.heading.name}]와 [${activeBrand.typography.body.name}]입니다.
• 헤드라인 (${activeBrand.typography.heading.name}): ${activeBrand.typography.heading.description}
• 본문 (${activeBrand.typography.body.name}): 가독성을 극대화한 ${activeBrand.typography.body.category} 계열입니다.`;
        } else {
          aiResponse = '브랜드 서체는 브랜드의 목소리 톤을 전달합니다. 세리프(Serif) 폰트는 클래식하고 신뢰성 높은 인상을 주며, 산세리프(Sans-Serif)는 현대적이고 전문적인 느낌을 선사합니다.';
        }
      } else if (query.includes('접근성') || query.includes('wcag') || query.includes('대비')) {
        aiResponse = 'WCAG(웹 콘텐츠 접근성 지침) 2.1에 따르면 일반 텍스트는 4.5:1, 큰 텍스트(18pt 이상)는 3:1 이상의 명도 대비를 만족해야 시각적 인지가 원활합니다. BrandMate는 이를 실시간 자동 분석해 드립니다.';
      } else if (query.includes('피드백') || query.includes('디자인 분석')) {
        aiResponse = 'AI 디자인 피드백 메뉴에서 로고나 레이아웃 시안 이미지를 업로드해 주세요! GPT Vision API 기반 분석기가 여백, 폰트 비율, 시선 흐름을 분석하여 100점 만점 기준 리포트를 즉시 발행합니다.';
      } else if (query.includes('피그마') || query.includes('figma')) {
        aiResponse = 'Figma Export 탭에서 W3C 호환 디자인 토큰 JSON 파일을 받으시거나, 피그마 API 스펙 규격 데이터를 클립보드에 복사해 Figma Design System Variables로 즉시 이식할 수 있습니다.';
      } else if (query.includes('스토리') || query.includes('철학') || query.includes('미션')) {
        if (activeBrand) {
          aiResponse = `브랜드 [${activeBrand.name}]의 미션 철학:
"${activeBrand.mission}"
우리는 단순한 비주얼 완성을 넘어, 브랜드가 가질 지속성 있는 이야기를 에이전트 프롬프팅을 통해 가이드라인화합니다.`;
        } else {
          aiResponse = '브랜드 스토리는 마케팅적 포장을 넘어 디자이너가 디자인 요소(심볼, 컬러 등)를 일관성 있게 전개할 수 있도록 지탱해주는 척추 역할을 수행합니다.';
        }
      }

      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        sender: 'ai',
        text: aiResponse,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  const quickQuestions = [
    '🎨 추천 컬러 설명해줘',
    '🖋️ 타이포 조합의 근거는?',
    '⚖️ WCAG 접근성 검사 기준',
    '📤 Figma 토큰 내보내기 방법'
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-xl hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all duration-200"
          title="AI 디자인 어시스턴트 열기"
        >
          <Sparkles className="h-6 w-6 animate-pulse-subtle" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="flex h-[500px] w-96 flex-col rounded-2xl bg-white border border-slate-200 shadow-2xl transition-all duration-300 transform scale-100 ease-out origin-bottom-right">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 p-4 rounded-t-2xl">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-sm">BrandMate AI</h3>
                <span className="text-[10px] text-emerald-500 font-medium flex items-center">
                  <span className="mr-1 h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  실시간 디자인 가이드 활성화
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none shadow-sm'
                      : 'bg-slate-100 text-slate-800 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <span
                    className={`block mt-1 text-[9px] ${
                      msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'
                    } text-right`}
                  >
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-100 text-slate-400 rounded-2xl rounded-bl-none px-4 py-3 text-xs flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompt tags */}
          <div className="px-4 py-2 border-t border-slate-50 overflow-x-auto flex space-x-2 scrollbar-none whitespace-nowrap bg-slate-50/50">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q.replace(/[🎨🖋️⚖️📤]/g, '').trim())}
                className="text-[10px] bg-white border border-slate-200 hover:border-indigo-400 hover:text-indigo-600 text-slate-600 px-2.5 py-1 rounded-full transition-colors shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat input */}
          <div className="border-t border-slate-100 p-3 flex space-x-2 bg-white rounded-b-2xl">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="질문 내용을 입력하세요..."
              className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none transition-colors"
            />
            <button
              onClick={() => handleSend()}
              className="flex items-center justify-center rounded-xl bg-indigo-600 text-white p-2.5 hover:bg-indigo-700 transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
