import React, { useState } from 'react';
import { Type, ExternalLink, RefreshCw, TextCursorInput } from 'lucide-react';
import type { BrandData } from '../utils/mockGenerator';

interface TypographyRecommendationProps {
  brand: BrandData;
  onShowToast: (message: string) => void;
}

export default function TypographyRecommendation({ brand, onShowToast }: TypographyRecommendationProps) {
  const [customText, setCustomText] = useState('가장 완벽한 디자인은 더 이상 더할 것이 없을 때가 아니라, 빼낼 것이 없을 때 완성된다.');
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);

  const headingFont = brand.typography.heading;
  const bodyFont = brand.typography.body;

  // Dynamically load Google Fonts if we are styling
  React.useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${headingFont.name.replace(' ', '+')}:wght@700;800&family=${bodyFont.name.replace(' ', '+')}:wght@400;500;600&display=swap`;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [headingFont.name, bodyFont.name]);

  return (
    <div className="space-y-8 font-sans">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Type className="h-6 w-6 text-indigo-600" />
          서체 시스템 매칭 (Typography Recommendation)
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          브랜드의 본질적 인상과 정보 전달의 효율성을 고려하여 매칭된 웹 폰트 세트입니다.
        </p>
      </div>

      {/* Font Spec Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Heading Font */}
        <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-[10px] bg-indigo-50 text-indigo-600 font-bold px-2 py-1 rounded-md">
              헤드라인 타이틀 서체 (Display)
            </span>
            <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
              Google Fonts
              <ExternalLink className="h-3 w-3" />
            </span>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-extrabold text-slate-800" style={{ fontFamily: headingFont.name }}>
              {headingFont.name}
            </h3>
            <span className="text-xs text-slate-400 font-medium">{headingFont.category} Class</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
            {headingFont.description}
          </p>
        </div>

        {/* Body Font */}
        <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-[10px] bg-cyan-50 text-cyan-700 font-bold px-2 py-1 rounded-md">
              본문 텍스트 서체 (Body Copy)
            </span>
            <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
              Google Fonts
              <ExternalLink className="h-3 w-3" />
            </span>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-bold text-slate-800" style={{ fontFamily: bodyFont.name }}>
              {bodyFont.name}
            </h3>
            <span className="text-xs text-slate-400 font-medium">{bodyFont.category} Class</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
            {bodyFont.description}
          </p>
        </div>
      </div>

      {/* Interactive Typography scale preview */}
      <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <TextCursorInput className="h-4.5 w-4.5 text-indigo-600" />
            실시간 렌더링 검사기 (Interactive Preview Typometer)
          </h3>
          <div className="flex items-center gap-3">
            {/* Scale controls */}
            <div className="flex items-center bg-slate-100 rounded-xl p-1 text-xs">
              <button 
                onClick={() => setFontSizeMultiplier(prev => Math.max(0.8, prev - 0.1))}
                className="px-2.5 py-1 text-slate-500 hover:text-slate-800 font-extrabold"
              >
                A-
              </button>
              <span className="px-2 font-bold text-slate-700">{Math.round(fontSizeMultiplier * 100)}%</span>
              <button 
                onClick={() => setFontSizeMultiplier(prev => Math.min(1.5, prev + 0.1))}
                className="px-2.5 py-1 text-slate-500 hover:text-slate-800 font-extrabold"
              >
                A+
              </button>
            </div>
            <button 
              onClick={() => {
                setCustomText('가장 완벽한 디자인은 더 이상 더할 것이 없을 때가 아니라, 빼낼 것이 없을 때 완성된다.');
                setFontSizeMultiplier(1);
                onShowToast('폰트 테스터가 기본값으로 초기화되었습니다.');
              }}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50"
              title="리셋"
            >
              <RefreshCw className="h-3.5 w-3.5 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Input box for test */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">직접 문장 입력해보기</label>
          <input 
            type="text"
            value={customText}
            onChange={e => setCustomText(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-xs focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Scaled previews */}
        <div className="space-y-6 pt-4 border-t border-slate-50">
          {/* H1 Headline */}
          <div className="grid md:grid-cols-4 items-start gap-4">
            <div className="text-[10px] text-slate-400 font-bold uppercase pt-1">
              H1 Display (Scale: {brand.typography.scaling.h1})
            </div>
            <div className="md:col-span-3">
              <h1 
                className="font-extrabold tracking-tight leading-none text-slate-900 break-words" 
                style={{ 
                  fontFamily: headingFont.name,
                  fontSize: `calc(${brand.typography.scaling.h1} * ${fontSizeMultiplier})`
                }}
              >
                {customText.substring(0, 30)}
              </h1>
            </div>
          </div>

          {/* H2 Subtitle */}
          <div className="grid md:grid-cols-4 items-start gap-4 pt-4 border-t border-slate-50">
            <div className="text-[10px] text-slate-400 font-bold uppercase pt-1">
              H2 Headline (Scale: {brand.typography.scaling.h2})
            </div>
            <div className="md:col-span-3">
              <h2 
                className="font-bold leading-snug text-slate-800 break-words" 
                style={{ 
                  fontFamily: headingFont.name,
                  fontSize: `calc(${brand.typography.scaling.h2} * ${fontSizeMultiplier})`
                }}
              >
                {customText}
              </h2>
            </div>
          </div>

          {/* Body Copy */}
          <div className="grid md:grid-cols-4 items-start gap-4 pt-4 border-t border-slate-50">
            <div className="text-[10px] text-slate-400 font-bold uppercase pt-1">
              Body Text (Scale: {brand.typography.scaling.body})
            </div>
            <div className="md:col-span-3">
              <p 
                className="leading-relaxed text-slate-600 break-words" 
                style={{ 
                  fontFamily: bodyFont.name,
                  fontSize: `calc(${brand.typography.scaling.body} * ${fontSizeMultiplier})`
                }}
              >
                {customText} {customText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
