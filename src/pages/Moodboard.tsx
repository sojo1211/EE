import { useState } from 'react';
import { LayoutGrid, Heart, Sun, Layers, Grid3X3, Image as ImageIcon } from 'lucide-react';
import type { BrandData } from '../utils/mockGenerator';

interface MoodboardProps {
  brand: BrandData;
  onShowToast: (message: string) => void;
}

export default function Moodboard({ brand, onShowToast }: MoodboardProps) {
  const [savedImages, setSavedImages] = useState<string[]>([]);
  const board = brand.moodboard;

  const toggleSave = (url: string, index: number) => {
    setSavedImages(prev => {
      const isSaved = prev.includes(url);
      if (isSaved) {
        onShowToast(`레퍼런스 이미지 #${index + 1}이(가) 해제되었습니다.`);
        return prev.filter(item => item !== url);
      } else {
        onShowToast(`레퍼런스 이미지 #${index + 1}이(가) 저장 컬렉션에 추가되었습니다! ❤️`);
        return [...prev, url];
      }
    });
  };

  return (
    <div className="space-y-8 font-sans">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <LayoutGrid className="h-6 w-6 text-indigo-600" />
          브랜드 비주얼 무드보드 (Moodboard Generator)
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          브랜드의 핵심 정체성 가치를 시각적으로 투영하는 이미지, 질감, 그리고 그리드 지침입니다.
        </p>
      </div>

      {/* Visual Directions Specs */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Style & Atmosphere */}
        <div className="bg-white border border-slate-150 p-5 rounded-2xl shadow-sm flex items-start space-x-3">
          <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
            <ImageIcon className="h-4.5 w-4.5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-xs text-slate-700">비주얼 스타일</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">{board.styleText}</p>
          </div>
        </div>

        {/* Textures & Materials */}
        <div className="bg-white border border-slate-150 p-5 rounded-2xl shadow-sm flex items-start space-x-3">
          <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
            <Layers className="h-4.5 w-4.5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-xs text-slate-700">추천 질감/소재</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">{board.textureText}</p>
          </div>
        </div>

        {/* Lighting & Contrast */}
        <div className="bg-white border border-slate-150 p-5 rounded-2xl shadow-sm flex items-start space-x-3">
          <div className="p-2 rounded-lg bg-cyan-50 text-cyan-700">
            <Sun className="h-4.5 w-4.5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-xs text-slate-700">권장 조명</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">{board.lightingText}</p>
          </div>
        </div>
      </div>

      {/* Pinterest-style Masonry Layout */}
      <div className="space-y-4">
        <h3 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
          <Grid3X3 className="h-4.5 w-4.5 text-indigo-600" />
          이미지 컬렉션 (Pinterest-style Masonry)
        </h3>

        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
          {board.images.map((img, idx) => {
            const isSaved = savedImages.includes(img.url);
            return (
              <div 
                key={idx}
                className="break-inside-avoid bg-white border border-slate-150 rounded-2xl shadow-sm overflow-hidden group relative transition-all duration-300 hover:shadow-md hover:border-slate-200"
              >
                {/* Image element */}
                <img 
                  src={img.url} 
                  alt={img.desc}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-103"
                  loading="lazy"
                />

                {/* Hover overlay with details */}
                <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[9px] bg-slate-100 text-slate-400 font-bold px-1.5 py-0.5 rounded uppercase">
                      {img.category}
                    </span>
                    <p className="text-[10px] text-slate-500 line-clamp-1">{img.desc}</p>
                  </div>

                  {/* Heart button */}
                  <button
                    onClick={() => toggleSave(img.url, idx)}
                    className={`p-2 rounded-xl border transition-colors ${
                      isSaved 
                        ? 'bg-rose-50 border-rose-100 text-rose-500 hover:bg-rose-100' 
                        : 'bg-slate-50 border-slate-100 text-slate-400 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-100'
                    }`}
                    title="저장 리스트 토글"
                  >
                    <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
