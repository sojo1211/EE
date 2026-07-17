import React from 'react';
import { Download, FileJson, Copy, Check, FileText, Image as ImageIcon, Wind } from 'lucide-react';
import type { BrandData } from '../utils/mockGenerator';

interface ExportPageProps {
  brand: BrandData;
  onShowToast: (message: string) => void;
}

export default function ExportPage({ brand, onShowToast }: ExportPageProps) {
  const [copiedFigma, setCopiedFigma] = React.useState(false);
  const [copiedJson, setCopiedJson] = React.useState(false);

  // W3C Design Token JSON structure
  const tokenJson = {
    "color": {
      "primary": { "$value": brand.colors.primary.hex, "$type": "color", "description": brand.colors.primary.reason },
      "secondary": { "$value": brand.colors.secondary.hex, "$type": "color", "description": brand.colors.secondary.reason },
      "accent": { "$value": brand.colors.accent.hex, "$type": "color", "description": brand.colors.accent.reason },
      "neutral-dark": { "$value": brand.colors.neutralDark.hex, "$type": "color", "description": brand.colors.neutralDark.reason },
      "neutral-light": { "$value": brand.colors.neutralLight.hex, "$type": "color", "description": brand.colors.neutralLight.reason }
    },
    "font": {
      "heading": { "$value": brand.typography.heading.name, "$type": "fontFamily" },
      "body": { "$value": brand.typography.body.name, "$type": "fontFamily" }
    },
    "spacing": {
      "scale-base": { "$value": "8px", "$type": "dimension" }
    }
  };

  const figmaPayload = {
    "name": brand.name,
    "version": "1.0.0",
    "theme": brand.styleStyle,
    "variables": [
      { "name": "Brand/Primary", "type": "COLOR", "value": brand.colors.primary.hex },
      { "name": "Brand/Secondary", "type": "COLOR", "value": brand.colors.secondary.hex },
      { "name": "Brand/Accent", "type": "COLOR", "value": brand.colors.accent.hex },
      { "name": "Brand/NeutralDark", "type": "COLOR", "value": brand.colors.neutralDark.hex },
      { "name": "Brand/NeutralLight", "type": "COLOR", "value": brand.colors.neutralLight.hex }
    ]
  };

  const handleCopyFigma = () => {
    navigator.clipboard.writeText(JSON.stringify(figmaPayload, null, 2));
    setCopiedFigma(true);
    onShowToast('Figma API 페이로드가 클립보드에 복사되었습니다! 📤');
    setTimeout(() => setCopiedFigma(false), 1500);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(tokenJson, null, 2));
    setCopiedJson(true);
    onShowToast('W3C 디자인 토큰 JSON이 복사되었습니다! 💻');
    setTimeout(() => setCopiedJson(false), 1500);
  };

  const triggerDownload = (type: string) => {
    onShowToast(`${type} 파일 다운로드를 준비하고 있습니다...`);
    setTimeout(() => {
      // Mock direct file download anchor
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tokenJson, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `${brand.name.toLowerCase()}_tokens.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      onShowToast(`${brand.name}_${type} 다운로드가 완료되었습니다.`);
    }, 1000);
  };

  return (
    <div className="space-y-8 font-sans">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Download className="h-6 w-6 text-indigo-600" />
          브랜드 에셋 반출 (Export Studio)
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          피그마 연동용 디자인 변수 데이터셋 또는 인쇄/웹 배포 패키지 에셋을 내보냅니다.
        </p>
      </div>

      {/* Grid for visual export items */}
      <div className="grid md:grid-cols-4 gap-6">
        {/* PDF Manual */}
        <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="h-10 w-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <FileText className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-800">PDF 가이드북</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              스토리, 미션, 비전, 서체, 5색 컬러 규칙을 인쇄 가능한 한 페이지 가이드북 책자 형태로 패키징합니다.
            </p>
          </div>
          <button
            onClick={() => triggerDownload('Guideline_Booklet.pdf')}
            className="w-full flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-xl text-xs transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>PDF 다운로드</span>
          </button>
        </div>

        {/* PNG Assets */}
        <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="h-10 w-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <ImageIcon className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-800">PNG 소스 묶음</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              배색 팔레트의 칩 칩 이미지 및 로고 클리어 에리어 규격을 해상도별 투명 이미지 ZIP으로 보냅니다.
            </p>
          </div>
          <button
            onClick={() => triggerDownload('Color_Chips.png')}
            className="w-full flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-xl text-xs transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>PNG ZIP 받기</span>
          </button>
        </div>

        {/* SVG Wireframe */}
        <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Wind className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-800">SVG 로고 템플릿</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              워드마크 형태로 자동 제안된 로고의 벡터 와이어프레임 파일(SVG)을 추출합니다.
            </p>
          </div>
          <button
            onClick={() => triggerDownload('Logo_Vector.svg')}
            className="w-full flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-xl text-xs transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>SVG 다운로드</span>
          </button>
        </div>

        {/* Figma REST */}
        <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <FileJson className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-800">Figma API Payload</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Figma REST API 호출 본문에 직접 주입 가능한 로고 칩 및 스타일 변수 바인딩 포맷입니다.
            </p>
          </div>
          <button
            onClick={handleCopyFigma}
            className="w-full flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-xl text-xs transition-colors"
          >
            {copiedFigma ? <Check className="h-3.5 w-3.5 text-indigo-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>JSON Payload 복사</span>
          </button>
        </div>
      </div>

      {/* Code view box for W3C Design Tokens JSON */}
      <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
            <FileJson className="h-4.5 w-4.5 text-indigo-600" />
            W3C Design Token JSON (W3C 공식 토큰 규격)
          </h3>
          <button
            onClick={handleCopyJson}
            className="text-xs text-indigo-600 font-bold hover:text-indigo-700 flex items-center gap-1"
          >
            {copiedJson ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            디자인 토큰 복사
          </button>
        </div>
        
        <div className="rounded-xl overflow-hidden bg-slate-900 text-slate-100 p-5 text-xs font-mono max-h-72 overflow-y-auto leading-relaxed shadow-inner">
          <pre>{JSON.stringify(tokenJson, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
