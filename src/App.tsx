import { useState, useEffect } from 'react';
import { 
  Sparkles, Palette, Type, LayoutGrid, Eye, 
  Download, Award, MessageSquare, Menu, X, Home, ArrowLeft
} from 'lucide-react';

// Subcomponents
import LandingPage from './pages/LandingPage';
import BrandWizard from './pages/BrandWizard';
import Dashboard from './pages/Dashboard';
import ColorRecommendation from './pages/ColorRecommendation';
import TypographyRecommendation from './pages/TypographyRecommendation';
import Moodboard from './pages/Moodboard';
import BrandVoice from './pages/BrandVoice';
import AIDesignFeedback from './pages/AIDesignFeedback';
import StyleGuide from './pages/StyleGuide';
import ExportPage from './pages/ExportPage';
import AIAssistant from './components/AIAssistant';

import type { BrandData } from './utils/mockGenerator';

type PageView = 
  | 'landing' 
  | 'wizard' 
  | 'dashboard' 
  | 'colors' 
  | 'typography' 
  | 'moodboard' 
  | 'voice' 
  | 'feedback' 
  | 'style-guide' 
  | 'export';

interface Toast {
  id: string;
  message: string;
}

export default function App() {
  const [view, setView] = useState<PageView>('landing');
  const [activeBrand, setActiveBrand] = useState<BrandData | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load brand from localStorage if present
  useEffect(() => {
    const saved = localStorage.getItem('brandmate_active_brand');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setActiveBrand(parsed);
        setView('dashboard');
      } catch (err) {
        console.error('Failed to parse saved brand', err);
      }
    }
  }, []);

  const handleShowToast = (message: string) => {
    const id = Math.random().toString();
    setToast({ id, message });
    setTimeout(() => {
      setToast(current => current?.id === id ? null : current);
    }, 3000);
  };

  const handleBrandGenerated = (data: BrandData) => {
    setActiveBrand(data);
    localStorage.setItem('brandmate_active_brand', JSON.stringify(data));
    setView('dashboard');
    handleShowToast(`새로운 브랜드 [${data.name}]이(가) 성공적으로 구축되었습니다! ✨`);
  };

  const handleUpdateBrand = (updated: BrandData) => {
    setActiveBrand(updated);
    localStorage.setItem('brandmate_active_brand', JSON.stringify(updated));
  };

  const handleResetBrand = () => {
    if (window.confirm('현재 구축된 브랜드 데이터를 초기화하고 처음으로 돌아가시겠습니까?')) {
      localStorage.removeItem('brandmate_active_brand');
      setActiveBrand(null);
      setView('landing');
      handleShowToast('브랜드 정보가 초기화되었습니다.');
    }
  };

  const menuItems = [
    { id: 'dashboard', label: '디렉토리 개요', icon: <Home className="h-4.5 w-4.5" /> },
    { id: 'colors', label: '컬러 시스템', icon: <Palette className="h-4.5 w-4.5" /> },
    { id: 'typography', label: '타이포그래피', icon: <Type className="h-4.5 w-4.5" /> },
    { id: 'moodboard', label: '비주얼 무드보드', icon: <LayoutGrid className="h-4.5 w-4.5" /> },
    { id: 'voice', label: '보이스 & 카피라이팅', icon: <MessageSquare className="h-4.5 w-4.5" /> },
    { id: 'style-guide', label: '스타일 가이드', icon: <Award className="h-4.5 w-4.5" /> },
    { id: 'feedback', label: 'AI 디자인 피드백', icon: <Eye className="h-4.5 w-4.5" /> },
    { id: 'export', label: '에셋 내보내기', icon: <Download className="h-4.5 w-4.5" /> }
  ];

  // Routing renderer
  const renderContent = () => {
    if (view === 'landing') {
      return <LandingPage onStart={() => setView(activeBrand ? 'dashboard' : 'wizard')} />;
    }
    
    if (view === 'wizard') {
      return (
        <BrandWizard 
          onComplete={handleBrandGenerated} 
          onBackToLanding={() => setView('landing')} 
        />
      );
    }

    if (!activeBrand) {
      return <LandingPage onStart={() => setView('wizard')} />;
    }

    switch (view) {
      case 'dashboard':
        return <Dashboard brand={activeBrand} onNavigate={(target) => setView(target as PageView)} />;
      case 'colors':
        return <ColorRecommendation brand={activeBrand} onShowToast={handleShowToast} />;
      case 'typography':
        return <TypographyRecommendation brand={activeBrand} onShowToast={handleShowToast} />;
      case 'moodboard':
        return <Moodboard brand={activeBrand} onShowToast={handleShowToast} />;
      case 'voice':
        return (
          <BrandVoice 
            brand={activeBrand} 
            onUpdateBrand={handleUpdateBrand} 
            onShowToast={handleShowToast} 
          />
        );
      case 'feedback':
        return <AIDesignFeedback onShowToast={handleShowToast} />;
      case 'style-guide':
        return <StyleGuide brand={activeBrand} />;
      case 'export':
        return <ExportPage brand={activeBrand} onShowToast={handleShowToast} />;
      default:
        return <Dashboard brand={activeBrand} onNavigate={(target) => setView(target as PageView)} />;
    }
  };

  const isSidebarLayout = view !== 'landing' && view !== 'wizard';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      
      {/* Sidebar Layout Core */}
      {isSidebarLayout ? (
        <div className="flex-1 flex overflow-hidden">
          
          {/* Desktop Sidebar */}
          <aside className="hidden md:flex md:flex-col md:w-64 border-r border-slate-150 bg-white p-6 justify-between h-screen sticky top-0">
            <div className="space-y-8">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm">B</div>
                <span className="font-extrabold text-sm tracking-tight text-slate-800">BrandMate Studio</span>
              </div>

              {activeBrand && (
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                  <span className="text-[9px] text-slate-400 font-bold block uppercase">Active Brand</span>
                  <span className="text-xs font-bold text-slate-800">{activeBrand.name}</span>
                </div>
              )}

              <nav className="space-y-1.5">
                {menuItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setView(item.id as PageView)}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                      view === item.id 
                        ? 'bg-indigo-50 border border-indigo-100 text-indigo-700' 
                        : 'border border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setView('landing')}
                className="w-full flex items-center space-x-2.5 px-3 py-2 text-slate-400 hover:text-slate-700 text-xs font-semibold transition-colors"
              >
                <ArrowLeft className="h-4.5 w-4.5" />
                <span>시작 페이지로</span>
              </button>
              <button
                onClick={handleResetBrand}
                className="w-full flex items-center space-x-2.5 px-3 py-2 text-rose-500 hover:text-rose-700 text-xs font-semibold transition-colors"
              >
                <X className="h-4.5 w-4.5" />
                <span>브랜드 초기화</span>
              </button>
            </div>
          </aside>

          {/* Mobile Navigation Header */}
          <div className="flex-1 flex flex-col min-w-0">
            <header className="md:hidden flex items-center justify-between border-b border-slate-150 bg-white px-6 py-4 sticky top-0 z-30">
              <div className="flex items-center space-x-2">
                <div className="flex h-7 w-7 items-center justify-center rounded bg-indigo-600 text-white font-bold text-xs">B</div>
                <span className="font-extrabold text-sm tracking-tight text-slate-800">{activeBrand?.name}</span>
              </div>
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-1 text-slate-500 hover:bg-slate-50 rounded-lg"
              >
                <Menu className="h-6 w-6" />
              </button>
            </header>

            {/* Mobile Sidebar overlay Drawer */}
            {sidebarOpen && (
              <div className="fixed inset-0 z-50 flex md:hidden">
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
                <div className="relative flex flex-col w-64 max-w-xs bg-white p-6 justify-between h-full border-r border-slate-100 animate-slide-in">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-slate-800">Menu</span>
                      <button onClick={() => setSidebarOpen(false)} className="text-slate-400">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <nav className="space-y-1">
                      {menuItems.map(item => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setView(item.id as PageView);
                            setSidebarOpen(false);
                          }}
                          className={`w-full flex items-center space-x-2 px-3 py-2.5 rounded-lg text-xs font-semibold ${
                            view === item.id ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500'
                          }`}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </nav>
                  </div>
                  <button
                    onClick={() => {
                      setSidebarOpen(false);
                      handleResetBrand();
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-rose-600 text-xs font-semibold"
                  >
                    <X className="h-4.5 w-4.5" />
                    <span>브랜드 초기화</span>
                  </button>
                </div>
              </div>
            )}

            {/* Main scrollable body content */}
            <main className="flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-10 max-w-6xl w-full mx-auto">
              {renderContent()}
            </main>
          </div>
        </div>
      ) : (
        /* Flat Layout for Landing & Wizard */
        <div className="flex-1">
          {renderContent()}
        </div>
      )}

      {/* Global Float AI assistant */}
      {view !== 'landing' && view !== 'wizard' && (
        <AIAssistant activeBrand={activeBrand} />
      )}

      {/* Global Toast Notification System */}
      {toast && (
        <div className="fixed bottom-6 left-6 z-50 bg-slate-900 text-white rounded-xl px-4 py-3 text-xs shadow-xl flex items-center space-x-2.5 animate-slide-up border border-slate-800">
          <Sparkles className="h-4 w-4 text-indigo-400" />
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
