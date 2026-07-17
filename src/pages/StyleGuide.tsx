import { useState } from 'react';
import { Award, AlignLeft, Layout, Sparkles, Palette } from 'lucide-react';
import type { BrandData } from '../utils/mockGenerator';

interface StyleGuideProps {
  brand: BrandData;
}

export default function StyleGuide({ brand }: StyleGuideProps) {
  const [activeTab, setActiveTab] = useState<'visual' | 'colors' | 'typography' | 'components'>('visual');

  return (
    <div className="space-y-8 font-sans">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Award className="h-6 w-6 text-indigo-600" />
          브랜드 스타일 가이드 (Style Guide)
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          AI가 생성한 비주얼 정체성을 현실적인 웹/인쇄 디자인 시스템 규격으로 이식한 설계서입니다.
        </p>
      </div>

      {/* Navigation tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-6 text-xs font-semibold" aria-label="Tabs">
          {[
            { id: 'visual', label: '1. 비주얼 로고 규격' },
            { id: 'colors', label: '2. 컬러 시스템 토큰' },
            { id: 'typography', label: '3. 타이포그래피 스케일' },
            { id: 'components', label: '4. UI 컴포넌트 라이브러리' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 border-b-2 font-bold transition-all px-1 ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Contents */}
      {activeTab === 'visual' && (
        <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm space-y-6">
          <div className="space-y-2">
            <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5">
              <Layout className="h-4.5 w-4.5 text-indigo-600" />
              로고 적용 및 안정 영역 (Clear Space Rules)
            </h3>
            <p className="text-xs text-slate-500">
              로고의 가시성과 형태적 독립성을 보장하기 위해 주변 여백 및 제한 사항을 준수해야 합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 pt-4 border-t border-slate-50">
            {/* Visual Clear Space Simulation */}
            <div className="border border-slate-100 bg-slate-50 rounded-xl p-8 flex flex-col items-center justify-center relative min-h-[200px]">
              {/* Outer boundary lines */}
              <div className="absolute inset-4 border border-dashed border-indigo-300/60 rounded flex items-center justify-center">
                <span className="absolute top-1 left-1 text-[8px] text-indigo-500 font-bold">X (Clear Space Margin)</span>
                {/* Logo Mark mockup */}
                <div 
                  className="px-6 py-3 rounded-lg text-white font-extrabold text-lg shadow-sm"
                  style={{ backgroundColor: brand.colors.primary.hex }}
                >
                  {brand.name}
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-bold mt-20 block">로고 주변 최소 여백 시뮬레이션</span>
            </div>

            {/* AI Rules list */}
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="font-bold text-slate-800 block mb-1">Aesthetic Type</span>
                <p className="text-slate-500 leading-relaxed">{brand.logoDirection.aesthetic}</p>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-slate-800 block">AI 디자인 배치 가이드</span>
                <ul className="list-disc pl-4 space-y-1.5 text-slate-500 leading-relaxed">
                  {brand.logoDirection.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                  <li>배경 이미지 위에 로고를 놓을 경우, 이미지 명도를 최소 40% 이상 낮추어 고대비를 수립하십시오.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'colors' && (
        <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm space-y-6">
          <div className="space-y-2">
            <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5">
              <Palette className="h-4.5 w-4.5 text-indigo-600" />
              디자인 토큰 컬러 매핑
            </h3>
            <p className="text-xs text-slate-500">
              코딩 및 개발자가 Figma 토큰 및 CSS Variable로 사용 가능하도록 규격화된 색상 리스트입니다.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-50">
            {[
              { name: 'color-brand-primary', hex: brand.colors.primary.hex, reason: brand.colors.primary.reason },
              { name: 'color-brand-secondary', hex: brand.colors.secondary.hex, reason: brand.colors.secondary.reason },
              { name: 'color-brand-accent', hex: brand.colors.accent.hex, reason: brand.colors.accent.reason },
              { name: 'color-neutral-dark', hex: brand.colors.neutralDark.hex, reason: brand.colors.neutralDark.reason },
              { name: 'color-neutral-light', hex: brand.colors.neutralLight.hex, reason: brand.colors.neutralLight.reason },
            ].map(token => (
              <div 
                key={token.name} 
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 gap-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-lg border border-slate-200 shadow-inner" style={{ backgroundColor: token.hex }}></div>
                  <div>
                    <span className="font-mono text-xs font-bold text-slate-800">--{token.name}</span>
                    <p className="text-[10px] text-slate-400">{token.reason}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs font-bold text-indigo-600 bg-white border border-indigo-100 px-3 py-1 rounded-lg">
                    {token.hex}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'typography' && (
        <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm space-y-6">
          <div className="space-y-2">
            <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5">
              <AlignLeft className="h-4.5 w-4.5 text-indigo-600" />
              타이포그래피 스케일 가이드 (CSS Scale Variables)
            </h3>
            <p className="text-xs text-slate-500">
              디자인 일관성 배치를 보장하기 위한 폰트 스케일 목록입니다.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-50 text-xs">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100">
                <thead>
                  <tr className="text-left text-[10px] font-bold text-slate-400 uppercase">
                    <th className="pb-3">토큰명</th>
                    <th className="pb-3">폰트 패밀리</th>
                    <th className="pb-3">두께 (Weight)</th>
                    <th className="pb-3">기본 크기 (Size)</th>
                    <th className="pb-3">행간 (Line Height)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-600 font-mono">
                  <tr>
                    <td className="py-3 font-bold text-slate-800">--font-size-h1</td>
                    <td className="py-3">{brand.typography.heading.name}</td>
                    <td className="py-3">800 (Extra Bold)</td>
                    <td className="py-3">{brand.typography.scaling.h1}</td>
                    <td className="py-3">1.1</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold text-slate-800">--font-size-h2</td>
                    <td className="py-3">{brand.typography.heading.name}</td>
                    <td className="py-3">700 (Bold)</td>
                    <td className="py-3">{brand.typography.scaling.h2}</td>
                    <td className="py-3">1.2</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold text-slate-800">--font-size-body</td>
                    <td className="py-3">{brand.typography.body.name}</td>
                    <td className="py-3">400 (Regular)</td>
                    <td className="py-3">{brand.typography.scaling.body}</td>
                    <td className="py-3">1.6</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'components' && (
        <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm space-y-6">
          <div className="space-y-2">
            <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5">
              <Sparkles className="h-4.5 w-4.5 text-indigo-600" />
              UI 컴포넌트 실물 자산 라이브러리
            </h3>
            <p className="text-xs text-slate-500">
              브랜드 디자인에 맞추어 활성(Hover), 활성화(Active), 비활성(Disabled) 상태의 UI 요소를 시연합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 pt-4 border-t border-slate-50 text-xs space-y-6 md:space-y-0">
            {/* Buttons Component Showcase */}
            <div className="space-y-4">
              <span className="font-bold text-slate-800 block border-b border-slate-50 pb-2">1. 공통 버튼 라이브러리 (Buttons)</span>
              
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <span className="w-24 text-slate-400 font-mono text-[10px]">Primary Active</span>
                  <button 
                    className="px-4 py-2 text-[10px] rounded-lg text-white font-bold transition-all"
                    style={{ backgroundColor: brand.colors.primary.hex }}
                  >
                    확인
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <span className="w-24 text-slate-400 font-mono text-[10px]">Accent Callout</span>
                  <button 
                    className="px-4 py-2 text-[10px] rounded-lg text-white font-bold transition-all shadow hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: brand.colors.accent.hex }}
                  >
                    구독하기
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <span className="w-24 text-slate-400 font-mono text-[10px]">Disabled</span>
                  <button 
                    disabled
                    className="px-4 py-2 text-[10px] rounded-lg bg-slate-100 text-slate-400 border border-slate-200/50 font-bold cursor-not-allowed"
                  >
                    선택 불가능
                  </button>
                </div>
              </div>
            </div>

            {/* Input fields Showcase */}
            <div className="space-y-4">
              <span className="font-bold text-slate-800 block border-b border-slate-50 pb-2">2. 입력 폼 제어 (Input Forms)</span>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Input Active/Focus</label>
                  <input
                    type="text"
                    defaultValue="활성화된 입력값"
                    className="w-full text-xs text-slate-700 px-3 py-2 border rounded-xl focus:outline-none"
                    style={{ borderColor: brand.colors.primary.hex, outlineColor: brand.colors.primary.hex }}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Placeholder Empty</label>
                  <input
                    type="text"
                    placeholder="이메일을 입력해주세요"
                    className="w-full text-xs text-slate-700 px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
