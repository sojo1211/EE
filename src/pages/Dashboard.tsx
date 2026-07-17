import { Sparkles, Palette, Type, MessageSquare, Compass, FileText, ArrowRight } from 'lucide-react';
import type { BrandData } from '../utils/mockGenerator';

interface DashboardProps {
  brand: BrandData;
  onNavigate: (view: string) => void;
}

export default function Dashboard({ brand, onNavigate }: DashboardProps) {
  const ratings = brand.toneVoice.ratings || { friendly: 50, professional: 80, modern: 90, emotional: 60 };

  return (
    <div className="space-y-8 font-sans">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-[60px] pointer-events-none"></div>
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">
            <Sparkles className="h-3 w-3 animate-pulse" />
            AI 전략 매칭 수립 완료
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight">브랜드 {brand.name}의 디자인 스튜디오</h1>
            <p className="text-sm text-indigo-100 max-w-xl">
              지향하는 <strong className="text-white">{brand.styleStyle}</strong> 비주얼 가이드를 바탕으로, 미디어 디자인 이론과 접근성을 결합한 브랜드 에셋이 계산되었습니다.
            </p>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Brand Summary Card */}
        <div className="md:col-span-2 bg-white border border-slate-150 p-6 rounded-2xl shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
              <FileText className="h-5 w-5 text-indigo-600" />
              브랜드 에센스 & 스토리
            </h3>
            <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-1 rounded-md uppercase">
              {brand.industry}
            </span>
          </div>

          <div className="space-y-4 text-xs leading-relaxed text-slate-600">
            <p className="font-medium text-slate-800 bg-slate-50 p-4 rounded-xl border border-slate-100 whitespace-pre-line">
              {brand.brandStory}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-800 block mb-1">미션 (Mission)</span>
                <p className="text-[11px] leading-relaxed">{brand.mission}</p>
              </div>
              <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-800 block mb-1">비전 (Vision)</span>
                <p className="text-[11px] leading-relaxed">{brand.vision}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tone & Voice Scale Card */}
        <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-indigo-600" />
              보이스 앤 톤 매트릭스
            </h3>
          </div>

          <div className="space-y-5">
            {/* Friendly vs Professional */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-bold text-slate-500">
                <span>친밀함 (Friendly)</span>
                <span>전문성 (Professional)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden relative">
                <div 
                  className="bg-indigo-600 h-full rounded-full" 
                  style={{ width: `${ratings.professional}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[9px] text-slate-400">
                <span>{100 - ratings.professional}%</span>
                <span>{ratings.professional}%</span>
              </div>
            </div>

            {/* Modern vs Classic */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-bold text-slate-500">
                <span>클래식 (Classic)</span>
                <span>모던함 (Modern)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden relative">
                <div 
                  className="bg-indigo-600 h-full rounded-full" 
                  style={{ width: `${ratings.modern}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[9px] text-slate-400">
                <span>{100 - ratings.modern}%</span>
                <span>{ratings.modern}%</span>
              </div>
            </div>

            {/* Rational vs Emotional */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-bold text-slate-500">
                <span>이성적 (Rational)</span>
                <span>감성적 (Emotional)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden relative">
                <div 
                  className="bg-indigo-600 h-full rounded-full" 
                  style={{ width: `${ratings.emotional}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[9px] text-slate-400">
                <span>{100 - ratings.emotional}%</span>
                <span>{ratings.emotional}%</span>
              </div>
            </div>
            
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[10px] text-slate-500 leading-relaxed">
              <strong className="text-slate-700 block mb-0.5">AI 페르소나 매칭 의견:</strong>
              "{brand.toneVoice.attitude}"을 중심으로 고객 소통 매뉴얼을 수립할 것을 제안합니다.
            </div>
          </div>
        </div>

        {/* Color Mini-recommendation Card */}
        <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Palette className="h-4 w-4 text-purple-600" />
              컬러 팔레트
            </h3>
            <div className="flex items-center gap-2">
              <div 
                className="h-10 flex-1 rounded-lg border border-slate-200/50 shadow-inner" 
                style={{ backgroundColor: brand.colors.primary.hex }}
                title={`Primary: ${brand.colors.primary.name}`}
              ></div>
              <div 
                className="h-10 flex-1 rounded-lg border border-slate-200/50 shadow-inner" 
                style={{ backgroundColor: brand.colors.secondary.hex }}
                title={`Secondary: ${brand.colors.secondary.name}`}
              ></div>
              <div 
                className="h-10 flex-1 rounded-lg border border-slate-200/50 shadow-inner" 
                style={{ backgroundColor: brand.colors.accent.hex }}
                title={`Accent: ${brand.colors.accent.name}`}
              ></div>
              <div 
                className="h-10 flex-1 rounded-lg border border-slate-200/50 shadow-inner" 
                style={{ backgroundColor: brand.colors.neutralDark.hex }}
                title={`Neutral Dark: ${brand.colors.neutralDark.name}`}
              ></div>
              <div 
                className="h-10 flex-1 rounded-lg border border-slate-200/50 shadow-inner" 
                style={{ backgroundColor: brand.colors.neutralLight.hex }}
                title={`Neutral Light: ${brand.colors.neutralLight.name}`}
              ></div>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
              {brand.colors.primary.name} 및 {brand.colors.secondary.name} 등 대비 분석을 거친 5색 팔레트가 생성되었습니다.
            </p>
          </div>
          <button
            onClick={() => onNavigate('colors')}
            className="flex items-center justify-between text-xs text-indigo-600 font-bold hover:text-indigo-700 pt-3 border-t border-slate-100 group"
          >
            <span>상세 대비율 분석 보기</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Typography Mini Card */}
        <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Type className="h-4 w-4 text-cyan-600" />
              서체 매칭 가이드
            </h3>
            <div className="space-y-2 py-1.5">
              <div>
                <span className="text-[9px] text-slate-400 block font-semibold">Heading Font</span>
                <span className="text-base font-extrabold text-slate-800">{brand.typography.heading.name}</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-400 block font-semibold">Body Font</span>
                <span className="text-sm font-medium text-slate-600">{brand.typography.body.name}</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
              {brand.typography.heading.name}와 {brand.typography.body.name} 조합으로 가독성과 브랜드 아이덴티티를 융합했습니다.
            </p>
          </div>
          <button
            onClick={() => onNavigate('typography')}
            className="flex items-center justify-between text-xs text-cyan-600 font-bold hover:text-cyan-700 pt-3 border-t border-slate-100 group"
          >
            <span>타이포 스케일 보기</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Logo Direction Mini Card */}
        <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Compass className="h-4 w-4 text-indigo-600" />
              로고 가이드라인
            </h3>
            <div className="space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-[9px] text-slate-400 font-semibold block">Aesthetic Structure</span>
              <span className="text-xs font-bold text-slate-800">{brand.logoDirection.aesthetic}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {brand.logoDirection.symbols.map(sym => (
                <span key={sym} className="text-[9px] bg-indigo-50 border border-indigo-100 text-indigo-600 px-2 py-0.5 rounded">
                  {sym}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={() => onNavigate('style-guide')}
            className="flex items-center justify-between text-xs text-indigo-600 font-bold hover:text-indigo-700 pt-3 border-t border-slate-100 group"
          >
            <span>스타일 가이드 가기</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
