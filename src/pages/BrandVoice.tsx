import { useState } from 'react';
import { MessageSquare, Edit2, Save, Plus, X } from 'lucide-react';
import type { BrandData } from '../utils/mockGenerator';

interface BrandVoiceProps {
  brand: BrandData;
  onUpdateBrand: (updated: BrandData) => void;
  onShowToast: (message: string) => void;
}

export default function BrandVoice({ brand, onUpdateBrand, onShowToast }: BrandVoiceProps) {
  const [isEditingStory, setIsEditingStory] = useState(false);
  const [storyText, setStoryText] = useState(brand.brandStory);

  const [isEditingMission, setIsEditingMission] = useState(false);
  const [missionText, setMissionText] = useState(brand.mission);

  const [isEditingVision, setIsEditingVision] = useState(false);
  const [visionText, setVisionText] = useState(brand.vision);

  const [newKeyword, setNewKeyword] = useState('');

  const handleSaveStory = () => {
    onUpdateBrand({
      ...brand,
      brandStory: storyText
    });
    setIsEditingStory(false);
    onShowToast('브랜드 스토리가 성공적으로 업데이트되었습니다.');
  };

  const handleSaveMissionVision = () => {
    onUpdateBrand({
      ...brand,
      mission: missionText,
      vision: visionText
    });
    setIsEditingMission(false);
    setIsEditingVision(false);
    onShowToast('브랜드 미션 및 비전이 저장되었습니다.');
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !brand.keywords.includes(newKeyword.trim())) {
      onUpdateBrand({
        ...brand,
        keywords: [...brand.keywords, newKeyword.trim()]
      });
      setNewKeyword('');
      onShowToast(`키워드 [${newKeyword.trim()}]이(가) 추가되었습니다.`);
    }
  };

  const handleRemoveKeyword = (kw: string) => {
    onUpdateBrand({
      ...brand,
      keywords: brand.keywords.filter(k => k !== kw)
    });
    onShowToast(`키워드 [${kw}]이(가) 삭제되었습니다.`);
  };

  // Generate marketing copy samples dynamically based on tone style
  const toneStyle = brand.styleStyle;
  const copies = {
    SNS: toneStyle === 'Minimal' 
      ? `단순함은 궁극의 정교함입니다. ${brand.name}은 본질에 충집합니다. #본질 #미니멀`
      : toneStyle === 'Luxury'
      ? `시간이 흘러도 변치 않는 헤리티지. 오직 당신을 위해 설계된 ${brand.name}의 가치관을 공유합니다. #럭셔리 #에디션`
      : toneStyle === 'Playful'
      ? `오늘 하루 어땠어? 짜릿한 영감이 필요하다면 ${brand.name}이랑 같이 놀자! 🎉 #꿀잼 #데일리`
      : `${brand.name}이 제시하는 미래형 디지털 커넥션. 지금 합류해 보십시오. #테크 #미래`,
    
    Ad: toneStyle === 'Minimal'
      ? '장식을 거두고 기능에 집중합니다.'
      : toneStyle === 'Luxury'
      ? '가치를 알아보는 소수를 위하여.'
      : toneStyle === 'Playful'
      ? '일상에 맛있는 상상력을 한 스푼!'
      : '지능형 알고리즘이 돕는 완벽한 일상.',

    Intro: toneStyle === 'Minimal'
      ? `${brand.name}은 기능의 단순화를 통해 군더더기 없는 삶의 밸런스를 돕는 미니멀 디자인 브랜드입니다.`
      : toneStyle === 'Luxury'
      ? `${brand.name}은 타협 없는 소재와 최상의 장인정신으로 품격을 드높이는 최고급 라이프스타일 큐레이터입니다.`
      : toneStyle === 'Playful'
      ? `${brand.name}은 지루하고 경직된 일상에 다채로운 스파크와 위트를 더해주는 디자인 플레이그라운드입니다.`
      : `${brand.name}은 차세대 디지털 테크놀로지를 기반으로 삶의 속도를 배가시켜 주는 효율성 네비게이터입니다.`
  };

  return (
    <div className="space-y-8 font-sans">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-indigo-600" />
          브랜드 보이스 & 카피라이팅 (Brand Voice)
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          브랜드 철학을 표현하는 문장들과 SNS 마케팅에 적용 가능한 카피 페르소나 가이드라인입니다. (수정 가능)
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Brand Story Box (Editable) */}
        <div className="md:col-span-2 bg-white border border-slate-150 p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-800 text-sm">스토리 가이드라인</h3>
            {!isEditingStory ? (
              <button 
                onClick={() => setIsEditingStory(true)}
                className="text-xs text-indigo-600 font-bold hover:text-indigo-700 flex items-center gap-1.5"
              >
                <Edit2 className="h-3.5 w-3.5" />
                스토리 수정
              </button>
            ) : (
              <button 
                onClick={handleSaveStory}
                className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-3 py-1 rounded-lg flex items-center gap-1.5"
              >
                <Save className="h-3.5 w-3.5" />
                저장
              </button>
            )}
          </div>

          {isEditingStory ? (
            <textarea
              value={storyText}
              onChange={e => setStoryText(e.target.value)}
              rows={6}
              className="w-full text-xs text-slate-600 p-4 border border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-none leading-relaxed"
            />
          ) : (
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 whitespace-pre-line">
              {brand.brandStory}
            </p>
          )}
        </div>

        {/* Brand Keywords Box */}
        <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-800 text-sm">브랜드 핵심 키워드</h3>
          </div>

          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newKeyword}
                onChange={e => setNewKeyword(e.target.value)}
                placeholder="키워드 입력"
                className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs focus:outline-none"
              />
              <button
                onClick={handleAddKeyword}
                className="p-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {brand.keywords.map(kw => (
                <span 
                  key={kw} 
                  className="inline-flex items-center gap-1 bg-indigo-50 border border-indigo-100 text-indigo-700 px-2.5 py-1 rounded-lg text-[10px] font-semibold"
                >
                  {kw}
                  <button onClick={() => handleRemoveKeyword(kw)} className="hover:text-indigo-900 font-extrabold">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Mission & Vision Edit */}
        <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-800 text-sm">미션 및 비전</h3>
            {!(isEditingMission || isEditingVision) ? (
              <button 
                onClick={() => {
                  setIsEditingMission(true);
                  setIsEditingVision(true);
                }}
                className="text-xs text-indigo-600 font-bold hover:text-indigo-700 flex items-center gap-1.5"
              >
                <Edit2 className="h-3.5 w-3.5" />
                수정
              </button>
            ) : (
              <button 
                onClick={handleSaveMissionVision}
                className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-3 py-1 rounded-lg flex items-center gap-1.5"
              >
                <Save className="h-3.5 w-3.5" />
                저장
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Mission</label>
              {isEditingMission ? (
                <input
                  type="text"
                  value={missionText}
                  onChange={e => setMissionText(e.target.value)}
                  className="w-full text-xs text-slate-700 px-3 py-2 border border-slate-200 rounded-xl"
                />
              ) : (
                <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium">
                  {brand.mission}
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Vision</label>
              {isEditingVision ? (
                <input
                  type="text"
                  value={visionText}
                  onChange={e => setVisionText(e.target.value)}
                  className="w-full text-xs text-slate-700 px-3 py-2 border border-slate-200 rounded-xl"
                />
              ) : (
                <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium">
                  {brand.vision}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PR Copywriting Templates */}
        <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-800 text-sm">보이스 매칭 카피 템플릿 (AI copywriting)</h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <span className="text-[9px] bg-slate-100 text-slate-400 font-bold px-1.5 py-0.5 rounded">SNS 마케팅 카피</span>
              <p className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 italic">
                "{copies.SNS}"
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] bg-slate-100 text-slate-400 font-bold px-1.5 py-0.5 rounded">광고 슬로건</span>
              <p className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 font-bold">
                "{copies.Ad}"
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] bg-slate-100 text-slate-400 font-bold px-1.5 py-0.5 rounded">원라인 소개글</span>
              <p className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 leading-relaxed">
                "{copies.Intro}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
