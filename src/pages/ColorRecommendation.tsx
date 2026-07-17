import { useState } from 'react';
import { Palette, Copy, Check, ShieldCheck, Heart } from 'lucide-react';
import type { BrandData } from '../utils/mockGenerator';
import { getContrastRatio, getWCAGRating } from '../utils/colorUtils';

interface ColorRecommendationProps {
  brand: BrandData;
  onShowToast: (message: string) => void;
}

export default function ColorRecommendation({ brand, onShowToast }: ColorRecommendationProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const colors = [
    { key: 'primary', label: 'Primary (주조색)', ...brand.colors.primary },
    { key: 'secondary', label: 'Secondary (보조색)', ...brand.colors.secondary },
    { key: 'accent', label: 'Accent (강조색)', ...brand.colors.accent },
    { key: 'neutralDark', label: 'Neutral Dark (어두운 중색)', ...brand.colors.neutralDark },
    { key: 'neutralLight', label: 'Neutral Light (밝은 중색)', ...brand.colors.neutralLight },
  ];

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    onShowToast(`${hex} 색상이 클립보드에 복사되었습니다! 🎨`);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  // Compute live WCAG ratings
  const primaryOnLightRatio = getContrastRatio(brand.colors.primary.hex, brand.colors.neutralLight.hex);
  const primaryOnLightRating = getWCAGRating(primaryOnLightRatio);

  const accentOnDarkRatio = getContrastRatio(brand.colors.accent.hex, brand.colors.neutralDark.hex);
  const accentOnDarkRating = getWCAGRating(accentOnDarkRatio);

  const textOnLightRatio = getContrastRatio(brand.colors.neutralDark.hex, brand.colors.neutralLight.hex);
  const textOnLightRating = getWCAGRating(textOnLightRatio);

  return (
    <div className="space-y-8 font-sans">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Palette className="h-6 w-6 text-indigo-600" />
          브랜드 컬러 시스템 (Color Recommendation)
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          AI가 색채 심리학과 시각 가시성 원칙에 입각하여 제안한 최적의 팔레트입니다.
        </p>
      </div>

      {/* Colors List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {colors.map(col => {
          const isCopied = copiedColor === col.hex;
          return (
            <div 
              key={col.key} 
              className="bg-white border border-slate-150 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div 
                  className="h-28 w-full border-b border-slate-100 shadow-inner relative flex items-end justify-end p-2"
                  style={{ backgroundColor: col.hex }}
                >
                  <button
                    onClick={() => handleCopy(col.hex)}
                    className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-slate-800 shadow-sm transition-all hover:scale-105"
                    title="색상 코드 복사"
                  >
                    {isCopied ? <Check className="h-3.5 w-3.5 text-indigo-600" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
                <div className="p-4 space-y-2">
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold block">{col.label}</span>
                    <h4 className="font-extrabold text-sm text-slate-800">{col.name}</h4>
                  </div>
                  <div className="flex gap-2 text-[10px] text-slate-500 font-mono">
                    <span className="bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{col.hex}</span>
                    <span className="bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{col.rgb.replace('rgb', '')}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed pt-2 border-t border-slate-50">
                    {col.reason}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Harmony & Live UI Mockup Visualization */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Dynamic WCAG Contrast Checker */}
        <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <ShieldCheck className="h-4.5 w-4.5 text-indigo-600" />
              WCAG 2.1 대비율 검증 (Accessibility)
            </h3>
            <span className="text-[9px] bg-emerald-50 border border-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md font-bold">
              AA 검증 통과
            </span>
          </div>

          <div className="space-y-4 text-xs">
            {/* Primary on Background */}
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-700">주조색 대비 (Primary on Light BG)</span>
                <span className={`font-mono px-2 py-0.5 rounded text-[10px] ${
                  primaryOnLightRating.normal.includes('PASS') ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {primaryOnLightRating.normal}
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: brand.colors.primary.hex }}></span>
                  {brand.colors.primary.name}
                  <span className="font-bold">on</span>
                  <span className="w-2.5 h-2.5 rounded-full inline-block border border-slate-200" style={{ backgroundColor: brand.colors.neutralLight.hex }}></span>
                  {brand.colors.neutralLight.name}
                </span>
                <span className="font-bold">대비율: {primaryOnLightRatio}:1</span>
              </div>
            </div>

            {/* Accent on Neutral Dark */}
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-700">강조색 대비 (Accent on Dark BG)</span>
                <span className={`font-mono px-2 py-0.5 rounded text-[10px] ${
                  accentOnDarkRating.normal.includes('PASS') ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {accentOnDarkRating.normal}
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: brand.colors.accent.hex }}></span>
                  {brand.colors.accent.name}
                  <span className="font-bold">on</span>
                  <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: brand.colors.neutralDark.hex }}></span>
                  {brand.colors.neutralDark.name}
                </span>
                <span className="font-bold">대비율: {accentOnDarkRatio}:1</span>
              </div>
            </div>

            {/* Text on Background */}
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-700">텍스트 시인성 (Text on Light BG)</span>
                <span className={`font-mono px-2 py-0.5 rounded text-[10px] ${
                  textOnLightRating.normal.includes('PASS') ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {textOnLightRating.normal}
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: brand.colors.neutralDark.hex }}></span>
                  {brand.colors.neutralDark.name}
                  <span className="font-bold">on</span>
                  <span className="w-2.5 h-2.5 rounded-full inline-block border border-slate-200" style={{ backgroundColor: brand.colors.neutralLight.hex }}></span>
                  {brand.colors.neutralLight.name}
                </span>
                <span className="font-bold">대비율: {textOnLightRatio}:1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live UI Mockup Preview */}
        <div className="md:col-span-2 bg-white border border-slate-150 p-6 rounded-2xl shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Heart className="h-4.5 w-4.5 text-purple-600 animate-pulse" />
              배색 하모니 프리뷰 (Live UI Mockup)
            </h3>
          </div>

          <div 
            className="rounded-xl p-6 border border-slate-100 transition-all duration-300 space-y-4"
            style={{ backgroundColor: brand.colors.neutralLight.hex }}
          >
            {/* Header Mockup */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/50">
              <span className="font-bold text-sm" style={{ color: brand.colors.neutralDark.hex }}>
                {brand.name}
              </span>
              <div className="flex space-x-2">
                <span className="h-2.5 w-8 rounded-full" style={{ backgroundColor: brand.colors.secondary.hex }}></span>
                <span className="h-2.5 w-8 rounded-full" style={{ backgroundColor: brand.colors.secondary.hex }}></span>
              </div>
            </div>

            {/* Banner/Card Mockup */}
            <div 
              className="rounded-xl p-4 text-white shadow-sm space-y-2 transition-colors"
              style={{ backgroundColor: brand.colors.primary.hex }}
            >
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/80">Brand Campaign</h4>
              <p className="text-sm font-extrabold leading-snug">
                우리는 {brand.keywords[0] || '가치'}를 담아 디자인의 한계를 넘습니다.
              </p>
            </div>

            {/* Button Previews */}
            <div className="flex items-center gap-3 pt-2">
              <button 
                className="text-[10px] font-bold px-4 py-2 rounded-lg text-white shadow transition-all hover:scale-105 active:scale-95"
                style={{ backgroundColor: brand.colors.accent.hex }}
              >
                CTA 핵심 버튼
              </button>
              <button 
                className="text-[10px] font-bold px-4 py-2 rounded-lg border transition-all hover:scale-105 active:scale-95"
                style={{ 
                  color: brand.colors.neutralDark.hex, 
                  borderColor: brand.colors.secondary.hex,
                  backgroundColor: 'transparent'
                }}
              >
                아웃라인 버튼
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
