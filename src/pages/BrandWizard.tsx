import { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Check, Compass } from 'lucide-react';
import { generateBrand } from '../utils/mockGenerator';
import type { BrandData } from '../utils/mockGenerator';
import confetti from 'canvas-confetti';

interface BrandWizardProps {
  onComplete: (data: BrandData) => void;
  onBackToLanding: () => void;
}

export default function BrandWizard({ onComplete, onBackToLanding }: BrandWizardProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const personality = 'Modern';
  const [keywordInput, setKeywordInput] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [goals, setGoals] = useState('');
  const [competitors, setCompetitors] = useState('');
  const [styleStyle, setStyleStyle] = useState('Modern');

  // AI loading phase states
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('브랜드 정보를 분석하는 중...');

  const styleOptions = [
    { value: 'Minimal', label: 'Minimal', desc: '절제된 미학, 여백의 활용, 본질에 집중' },
    { value: 'Luxury', label: 'Luxury', desc: '클래식한 품격, 독보적 권위, 프리미엄 터치' },
    { value: 'Playful', label: 'Playful', desc: '생동감 넘치는 위트, 활기찬 컬러, 개성 표현' },
    { value: 'Tech', label: 'Tech', desc: '지성적 디지털 솔루션, 혁신성, 신뢰도 최우선' },
    { value: 'Organic', label: 'Organic', desc: '자연 친화적 지속 가능성, 웰빙, 편안함' },
    { value: 'Modern', label: 'Modern', desc: '동시대적 세련미, 균형감, 트렌디 감각' }
  ];

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords(prev => [...prev, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  const handleRemoveKeyword = (kw: string) => {
    setKeywords(prev => prev.filter(k => k !== kw));
  };

  // Run mock generation progress
  useEffect(() => {
    if (step !== 3) return;

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 4;
      setProgress(Math.min(currentProgress, 100));

      if (currentProgress < 25) {
        setLoadingText('핵심 입력을 바탕으로 브랜드 정체성 아키텍처 구축 중...');
      } else if (currentProgress < 50) {
        setLoadingText('색채 심리학 알고리즘 분석 및 WCAG AA 대비율 검증 필터 계산 중...');
      } else if (currentProgress < 75) {
        setLoadingText('구글 폰트 데이터베이스 최적의 타이포 페어링 탐색 중...');
      } else if (currentProgress < 95) {
        setLoadingText('Unsplash 비주얼 무드보드 에셋 선별 큐레이션 매핑 중...');
      } else {
        setLoadingText('브랜드 마크 규격 설계 및 Figma 토큰 변환 준비 완료!');
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          // Trigger confetti celebration
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 }
          });

          // Live API Call to Render Backend
          fetch('https://ee-avnj.onrender.com/api/v1/brands/wizard', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name,
              industry,
              targetAudience,
              personality,
              keywords,
              goals,
              competitors,
              styleStyle
            })
          })
          .then(res => res.json())
          .then(apiData => {
            const localFallback = generateBrand({
              name,
              industry,
              targetAudience,
              personality,
              keywords,
              goals,
              competitors,
              styleStyle
            });

            // Merge server-synthesized copy with visual templates
            const mergedBrand: BrandData = {
              ...localFallback,
              brandStory: apiData.brandStory || localFallback.brandStory,
              mission: apiData.mission || localFallback.mission,
              vision: apiData.vision || localFallback.vision,
              colors: apiData.colors || localFallback.colors,
              typography: apiData.typography || localFallback.typography,
              styleStyle: apiData.styleStyle || localFallback.styleStyle,
            };
            onComplete(mergedBrand);
          })
          .catch(err => {
            console.warn("Backend fetch failed, falling back to local simulation:", err);
            const generated = generateBrand({
              name,
              industry,
              targetAudience,
              personality,
              keywords,
              goals,
              competitors,
              styleStyle
            });
            onComplete(generated);
          });
        }, 600);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [step]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="absolute top-8 left-8 flex items-center space-x-2 pointer-events-none">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm">B</div>
        <span className="font-extrabold text-sm tracking-tight text-slate-800">BrandMate AI</span>
      </div>

      <div className="w-full max-w-2xl bg-white border border-slate-150 rounded-2xl shadow-xl overflow-hidden p-8 md:p-10 relative">
        {step !== 3 && (
          <div className="mb-8">
            {/* Stepper Header */}
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">
              <span>Step {step} of 2</span>
              <span>{step === 1 ? '브랜드 기본 정보' : '비주얼 선호 정렬'}</span>
            </div>
            {/* Stepper Progress Bar */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-600 h-full transition-all duration-300"
                style={{ width: `${step === 1 ? '50%' : '100%'}` }}
              ></div>
            </div>
          </div>
        )}

        {/* Step 1: Basics */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <Compass className="h-5 w-5 text-indigo-600" />
                브랜드의 본질을 입력해 주세요
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                AI 에이전트가 스토리 구축과 컬러 분석에 필요한 핵심 뼈대를 작성합니다.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">브랜드 이름 *</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  placeholder="예: Greenship" 
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">업종/분야 *</label>
                <input 
                  type="text" 
                  value={industry} 
                  onChange={e => setIndustry(e.target.value)} 
                  placeholder="예: 친환경 뷰티 / 유기농 화장품" 
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">타겟 오디언스 (고객층) *</label>
              <input 
                type="text" 
                value={targetAudience} 
                onChange={e => setTargetAudience(e.target.value)} 
                placeholder="예: 미니멀 라이프와 지속가능성을 실천하는 2030 직장인 여성" 
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">키워드 (엔터로 추가)</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={keywordInput} 
                  onChange={e => setKeywordInput(e.target.value)} 
                  onKeyDown={handleKeywordKeyPress}
                  placeholder="예: 유기농, 슬로우 에이징, 무독성" 
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={handleAddKeyword}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 rounded-xl text-xs transition-colors"
                >
                  추가
                </button>
              </div>
              {keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {keywords.map(kw => (
                    <span 
                      key={kw} 
                      className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-xs font-medium"
                    >
                      {kw}
                      <button 
                        type="button" 
                        onClick={() => handleRemoveKeyword(kw)}
                        className="hover:text-indigo-900 font-extrabold text-sm"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={onBackToLanding}
                className="text-xs font-semibold text-slate-400 hover:text-slate-600 flex items-center gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                첫 화면으로
              </button>
              <button
                type="button"
                disabled={!name || !industry || !targetAudience}
                onClick={() => setStep(2)}
                className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none text-white font-semibold px-6 py-3.5 rounded-xl text-xs transition-all shadow-sm hover:shadow"
              >
                <span>다음 단계</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Styling Preferences */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <Compass className="h-5 w-5 text-indigo-600" />
                지향하는 비주얼 스타일은 무엇인가요?
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                스타일 선호도에 매핑되어 폰트 자간, 컬러 팔레트 심리가 커스텀 생성됩니다.
              </p>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-700 block">선호 스타일 테마 (택 1) *</label>
              <div className="grid grid-cols-2 gap-3">
                {styleOptions.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setStyleStyle(opt.value)}
                    className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                      styleStyle === opt.value
                        ? 'border-indigo-600 bg-indigo-50/40 shadow-sm'
                        : 'border-slate-150 hover:border-slate-200 bg-white'
                    }`}
                  >
                    <div className="font-bold text-sm text-slate-800 flex items-center justify-between">
                      {opt.label}
                      {styleStyle === opt.value && <Check className="h-4 w-4 text-indigo-600" />}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">브랜드 목표 / 지향점</label>
                <input 
                  type="text" 
                  value={goals} 
                  onChange={e => setGoals(e.target.value)} 
                  placeholder="예: 클린뷰티의 글로벌 스탠다드 확립" 
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">주요 경쟁사</label>
                <input 
                  type="text" 
                  value={competitors} 
                  onChange={e => setCompetitors(e.target.value)} 
                  placeholder="예: 이솝, 논픽션" 
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-slate-400 hover:text-slate-600 flex items-center gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                이전 단계로
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3.5 rounded-xl text-xs transition-all shadow-md shadow-indigo-150 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles className="h-4 w-4" />
                <span>브랜드 정체성 빌드</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Loading AI Generation */}
        {step === 3 && (
          <div className="py-12 text-center space-y-8">
            <div className="relative w-24 h-24 mx-auto">
              {/* Spinner */}
              <div className="absolute inset-0 rounded-full border-4 border-slate-100 border-t-indigo-600 animate-spin"></div>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center shadow-inner">
                <Sparkles className="h-8 w-8 text-indigo-600 animate-pulse" />
              </div>
            </div>

            <div className="space-y-3 max-w-md mx-auto">
              <h3 className="font-extrabold text-lg text-slate-800">BrandMate AI 에이전트 연동</h3>
              <p className="text-xs text-slate-500 leading-relaxed min-h-[36px]">{loadingText}</p>
            </div>

            {/* Progress indicator */}
            <div className="w-full max-w-xs mx-auto bg-slate-100 h-2 rounded-full overflow-hidden shadow-inner">
              <div 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-[10px] text-indigo-600 font-bold block">{progress}% 완료됨</span>
          </div>
        )}
      </div>
    </div>
  );
}
