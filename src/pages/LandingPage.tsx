
import { Sparkles, ArrowRight, Palette, Type, LayoutGrid, Eye, Download, Code, Shield } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  const features = [
    {
      icon: <Sparkles className="h-5 w-5 text-indigo-600" />,
      title: "AI Brand Strategy",
      desc: "브랜드 철학과 미션, 스토리, 그리고 페르소나에 맞춰 브랜드 보이스 톤을 즉시 도출해 냅니다."
    },
    {
      icon: <Palette className="h-5 w-5 text-purple-600" />,
      title: "Color Recommendation",
      desc: "브랜드 감성에 따른 색 조합 추천, 상세 심리학적 분석 및 WCAG 2.1 대비율 검사를 병행합니다."
    },
    {
      icon: <Type className="h-5 w-5 text-cyan-600" />,
      title: "Typography Recommendation",
      desc: "헤드라인과 본문에 최적화된 구글 폰트 매칭 및 타이포 스케일 가이드를 자동으로 빌드합니다."
    },
    {
      icon: <LayoutGrid className="h-5 w-5 text-indigo-600" />,
      title: "Moodboard Generator",
      desc: "브랜드 에센스 키워드를 기반으로 Unsplash 연동 및 고품질 비주얼 분위기 보드를 추천합니다."
    },
    {
      icon: <Eye className="h-5 w-5 text-purple-600" />,
      title: "AI Design Feedback",
      desc: "완성된 시안 포스터나 디자인 화면을 Vision API로 업로드하여 여백, 계층 구조, 가독성 피드백을 수신합니다."
    },
    {
      icon: <Download className="h-5 w-5 text-cyan-600" />,
      title: "Figma Export & Tokens",
      desc: "W3C 디자인 토큰 스펙을 준수한 JSON 파일과 Figma REST API 호환 페이로드를 즉각 내보냅니다."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden font-sans">
      {/* Navbar */}
      <nav className="border-b border-slate-100 bg-white/70 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold text-lg shadow-md shadow-indigo-200">
              B
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-800">
              Brand<span className="text-indigo-600">Mate</span>
            </span>
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="#features" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">주요 기능</a>
            <a href="#philosophy" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">개발 철학</a>
            <button
              onClick={onStart}
              className="text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl transition-all shadow-sm hover:shadow active:scale-95"
            >
              대시보드 진입
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-6 max-w-7xl mx-auto text-center">
        {/* Soft Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-purple-200/20 rounded-full blur-[100px] pointer-events-none z-0"></div>

        <div className="relative z-10 space-y-8">
          <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide">
            <Sparkles className="h-3.5 w-3.5" />
            <span>디자이너의 사고를 확장하는 AI 어시스턴트</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Build Your Brand <br className="hidden md:inline" />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
              with BrandMate AI
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            브랜드 키워드 입력만으로 브랜드 스토리, 미션, 로고 방향성부터 색상 대비 접근성 검사를 마친 컬러 시스템, 구글 폰트 페어링, 무드보드 및 Figma 연동 에셋까지 한 번에 도출합니다.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onStart}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg shadow-indigo-100 hover:shadow-xl hover:shadow-indigo-200 transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-98"
            >
              <span>브랜드 구축 시작하기</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={onStart}
              className="w-full sm:w-auto bg-white border border-slate-200 hover:border-slate-300 text-slate-600 font-semibold px-8 py-4 rounded-2xl transition-all shadow-sm hover:bg-slate-50 active:scale-98"
            >
              대시보드 둘러보기
            </button>
          </div>
        </div>
      </section>

      {/* Philosophy Banner */}
      <section id="philosophy" className="px-6 py-12 max-w-5xl mx-auto">
        <div className="bg-gradient-to-tr from-slate-900 to-indigo-950 text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-indigo-600/20 rounded-full blur-[60px]"></div>
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs text-indigo-400 font-bold tracking-widest uppercase block mb-3">BrandMate Philosophy</span>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4 tracking-tight">
              "AI는 디자이너를 대체하는 것이 아닌, 디자이너의 사고를 확장하는 파트너입니다."
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              결과물만 툭 던지는 단순 생성형 API 껍데기가 아닙니다. 디자인 프로세스 자체를 보조하며 왜 특정 색조를 제안했는지 명확한 근거(Explainable AI)를 대시보드에서 투명하게 설명합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">디자이너를 위한 고지능 브랜딩 프로세스</h2>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            삼성디자인멤버십(SDM) 및 실무 스케일 가이드라인을 준수하는 검증 모듈을 갖추었습니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-100 p-8 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-200/80 transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-indigo-50 transition-colors">
                {feat.icon}
              </div>
              <h3 className="font-bold text-lg text-slate-800 mb-2">{feat.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* UI Quality Badging */}
      <footer className="border-t border-slate-100 bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-sm tracking-tight text-slate-800">BrandMate AI Studio</span>
          </div>
          <div className="flex flex-wrap gap-4 items-center text-xs text-slate-400">
            <span className="flex items-center gap-1 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-md">
              <Shield className="h-3 w-3 text-emerald-500" />
              WCAG 2.1 AA 대비율 검증 필터 적용
            </span>
            <span className="flex items-center gap-1 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-md">
              <Code className="h-3 w-3 text-indigo-500" />
              W3C Design Token JSON 규격 완벽 대응
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
