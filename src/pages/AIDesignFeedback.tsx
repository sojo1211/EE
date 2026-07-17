import { useState } from 'react';
import { Eye, Upload, Sparkles, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { generateDesignFeedback } from '../utils/mockGenerator';
import type { FeedbackReport } from '../utils/mockGenerator';

interface AIDesignFeedbackProps {
  onShowToast: (message: string) => void;
}

export default function AIDesignFeedback({ onShowToast }: AIDesignFeedbackProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<FeedbackReport | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        triggerAnalysis(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  // Simulating dragging files
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        triggerAnalysis(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerAnalysis = (filename: string) => {
    setIsAnalyzing(true);
    setReport(null);
    onShowToast('디자인 파일을 수신했습니다. 분석을 시작합니다...');

    // Mock 2 second analysis delay
    setTimeout(() => {
      const res = generateDesignFeedback(filename);
      setReport(res);
      setIsAnalyzing(false);
      onShowToast('AI 디자인 비주얼 피드백 리포트가 완성되었습니다! 📊');
    }, 2000);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setReport(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-500 border-emerald-200 bg-emerald-50';
    if (score >= 70) return 'text-amber-500 border-amber-200 bg-amber-50';
    return 'text-rose-500 border-rose-200 bg-rose-50';
  };

  return (
    <div className="space-y-8 font-sans">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Eye className="h-6 w-6 text-indigo-600" />
          AI 디자인 피드백 (Design Feedback Studio)
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          로고, 배너, 패키지, 또는 웹 UI 시안을 업로드하여 여백, 계층구조, 정렬 및 WCAG 접근성 스코어 피드백을 받아보세요.
        </p>
      </div>

      {!previewUrl ? (
        /* Upload Area */
        <div 
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="border-2 border-dashed border-slate-200 hover:border-indigo-400 bg-white rounded-2xl p-12 text-center transition-all cursor-pointer relative"
        >
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <div className="max-w-sm mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-sm">
              <Upload className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-slate-800">디자인 시안 업로드하기</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                PNG, JPG, WebP 등의 이미지를 여기에 드래그 앤 드롭하거나 클릭하여 선택하세요.
              </p>
            </div>
            <div className="text-[10px] bg-slate-50 border border-slate-100 p-2 rounded-xl text-slate-400 font-medium">
              💡 파일명에 'logo' 또는 'web' 키워드가 들어가면 맞춤형 특화 분석이 실행됩니다.
            </div>
          </div>
        </div>
      ) : (
        /* Preview & Report View */
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left: Image preview & status */}
          <div className="space-y-4">
            <div className="bg-white border border-slate-150 p-4 rounded-2xl shadow-sm space-y-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">업로드된 파일 프리뷰</span>
              <div className="rounded-xl overflow-hidden border border-slate-100 bg-slate-50 max-h-80 flex items-center justify-center">
                <img src={previewUrl} alt="Design preview" className="max-h-full object-contain" />
              </div>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                <span className="font-medium text-slate-500 truncate max-w-[150px]">{selectedFile?.name}</span>
                <button
                  onClick={handleReset}
                  className="text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  재업로드
                </button>
              </div>
            </div>
          </div>

          {/* Right: AI Report analysis */}
          <div className="md:col-span-2 space-y-6">
            {isAnalyzing && (
              <div className="bg-white border border-slate-150 p-8 rounded-2xl shadow-sm text-center py-16 space-y-4">
                <div className="h-10 w-10 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-800 text-sm">GPT Vision API 이미지 분석 중...</h3>
                  <p className="text-xs text-slate-400">여백 레이아웃, 컬러 조화도, 시선 흐름 궤적 검출기를 구동하고 있습니다.</p>
                </div>
              </div>
            )}

            {report && (
              <div className="space-y-6">
                {/* Score Header */}
                <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center gap-6 justify-between">
                  <div className="space-y-2 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-bold">
                      <Sparkles className="h-3 w-3" />
                      Vision AI 진단 리포트
                    </div>
                    <h3 className="font-extrabold text-lg text-slate-800">종합 UX 비주얼 피드백 스코어</h3>
                    <p className="text-xs text-slate-500">
                      레이아웃 위계와 시인성 분석을 바탕으로 산출된 종합 점수입니다.
                    </p>
                  </div>
                  
                  {/* Score circle */}
                  <div className={`h-24 w-24 rounded-full border-4 flex flex-col items-center justify-center ${getScoreColor(report.score)}`}>
                    <span className="text-3xl font-black">{report.score}</span>
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">UX SCORE</span>
                  </div>
                </div>

                {/* Analysis breakdown list */}
                <div className="space-y-4">
                  {[
                    { title: "비주얼 계층 구조 (Visual Hierarchy)", data: report.hierarchy },
                    { title: "축 정렬 및 그리드 (Alignment)", data: report.alignment },
                    { title: "요소별 여백 설계 (Spacing)", data: report.spacing },
                    { title: "컬러 조화 및 톤앤매너 (Color Balance)", data: report.colors },
                    { title: "웹 접근성 가독성 (Accessibility)", data: report.accessibility }
                  ].map((cat, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white border border-slate-150 p-5 rounded-2xl shadow-sm space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                        <h4 className="font-bold text-xs text-slate-800">{cat.title}</h4>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          cat.data.score >= 85 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {cat.data.score}점
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-xs">
                        <div className="flex items-start gap-2 text-slate-600 leading-relaxed">
                          <AlertCircle className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                          <p><strong className="text-slate-700 font-bold">진단:</strong> {cat.data.critique}</p>
                        </div>
                        <div className="flex items-start gap-2 text-indigo-700 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100/30 leading-relaxed">
                          <CheckCircle2 className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                          <p><strong className="text-indigo-900 font-extrabold">개선 제안:</strong> {cat.data.suggestion}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
