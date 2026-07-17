export interface BrandData {
  name: string;
  industry: string;
  targetAudience: string;
  personality: string;
  keywords: string[];
  goals: string;
  competitors: string;
  styleStyle: string; // Luxury, Minimal, Playful, Tech, Organic, Modern
  
  // AI Generated fields
  brandStory: string;
  mission: string;
  vision: string;
  coreValues: string[];
  toneVoice: {
    attitude: string;
    tone: string;
    guidelines: string[];
    ratings: {
      friendly: number; // 0 to 100
      professional: number;
      modern: number;
      emotional: number;
    }
  };
  colors: {
    primary: { hex: string; rgb: string; name: string; reason: string };
    secondary: { hex: string; rgb: string; name: string; reason: string };
    accent: { hex: string; rgb: string; name: string; reason: string };
    neutralDark: { hex: string; rgb: string; name: string; reason: string };
    neutralLight: { hex: string; rgb: string; name: string; reason: string };
  };
  typography: {
    heading: { name: string; provider: string; category: string; description: string };
    body: { name: string; provider: string; category: string; description: string };
    scaling: {
      h1: string;
      h2: string;
      h3: string;
      body: string;
    };
  };
  moodboard: {
    styleText: string;
    textureText: string;
    lightingText: string;
    layoutText: string;
    images: { url: string; category: string; desc: string }[];
  };
  logoDirection: {
    aesthetic: string;
    symbols: string[];
    tips: string[];
  };
}

// Preset color combinations based on style
const colorPresets: Record<string, BrandData['colors']> = {
  Minimal: {
    primary: { hex: '#0F172A', rgb: 'rgb(15, 23, 42)', name: 'Deep Charcoal', reason: 'Provides a solid, unyielding anchor of sophistication.' },
    secondary: { hex: '#475569', rgb: 'rgb(71, 85, 105)', name: 'Slate Gray', reason: 'Acts as a muted secondary anchor without distracting.' },
    accent: { hex: '#6366F1', rgb: 'rgb(99, 102, 241)', name: 'Electric Indigo', reason: 'Adds a modern, digital spark of focus and interaction.' },
    neutralDark: { hex: '#1E293B', rgb: 'rgb(30, 41, 59)', name: 'Ink Blue', reason: 'Used for main heading contrast and premium text depth.' },
    neutralLight: { hex: '#F8FAFC', rgb: 'rgb(248, 250, 252)', name: 'Pure Alabaster', reason: 'Forms the canvas backdrop, ensuring ultimate whitespace cleanliness.' },
  },
  Luxury: {
    primary: { hex: '#1C1917', rgb: 'rgb(28, 25, 23)', name: 'Ebony Stone', reason: 'Understated dark tone representing timeless authority.' },
    secondary: { hex: '#78716C', rgb: 'rgb(120, 113, 108)', name: 'Warm Taupe', reason: 'Refined neutral that speaks to premium texture and craftsmanship.' },
    accent: { hex: '#D97706', rgb: 'rgb(217, 119, 6)', name: 'Muted Brass', reason: 'Evokes gold accents and exclusivity without being overly flashy.' },
    neutralDark: { hex: '#292524', rgb: 'rgb(41, 37, 36)', name: 'Obsidian Black', reason: 'Delivers a soft, high-end editorial typography contrast.' },
    neutralLight: { hex: '#FAF9F6', rgb: 'rgb(250, 249, 246)', name: 'Soft Ivory', reason: 'Gives the background an editorial paper-like texture and warmth.' },
  },
  Playful: {
    primary: { hex: '#EC4899', rgb: 'rgb(236, 72, 153)', name: 'Hot Magenta', reason: 'Bursting with energy, instantly commands youth attention.' },
    secondary: { hex: '#F59E0B', rgb: 'rgb(245, 158, 11)', name: 'Marigold Yellow', reason: 'Brings sunniness and optimistic contrast.' },
    accent: { hex: '#10B981', rgb: 'rgb(16, 185, 129)', name: 'Bright Emerald', reason: 'Highlights interactive items with fresh, vibrant clarity.' },
    neutralDark: { hex: '#1F2937', rgb: 'rgb(31, 41, 55)', name: 'Night Charcoal', reason: 'Keeps headings readable and grounded.' },
    neutralLight: { hex: '#FFFBEB', rgb: 'rgb(255, 251, 235)', name: 'Warm Honey-Cream', reason: 'Adds a soft, friendly, and non-sterile background glow.' },
  },
  Tech: {
    primary: { hex: '#2563EB', rgb: 'rgb(37, 99, 235)', name: 'Cyber Blue', reason: 'Represents technological stability, trust, and API fidelity.' },
    secondary: { hex: '#0EA5E9', rgb: 'rgb(14, 165, 233)', name: 'Sky Cyan', reason: 'Adds an expansive, future-forward secondary tint.' },
    accent: { hex: '#10B981', rgb: 'rgb(16, 185, 129)', name: 'Terminal Green', reason: 'Accents status nodes and micro-interactive cues.' },
    neutralDark: { hex: '#0B0F19', rgb: 'rgb(11, 15, 25)', name: 'Deep Space', reason: 'Gives a modern developer-centric, high-contrast dark text anchor.' },
    neutralLight: { hex: '#F0F4F8', rgb: 'rgb(240, 244, 248)', name: 'Cloud Gray', reason: 'Imitates premium digital dashboards and clean layouts.' },
  },
  Organic: {
    primary: { hex: '#15803D', rgb: 'rgb(21, 128, 61)', name: 'Forest Moss', reason: 'Grounds the brand in environmental sustainability and wellness.' },
    secondary: { hex: '#16A34A', rgb: 'rgb(22, 163, 74)', name: 'Meadow Green', reason: 'Adds a brighter leaf-like tone for product accents.' },
    accent: { hex: '#C2410C', rgb: 'rgb(194, 65, 12)', name: 'Terracotta Soil', reason: 'Complements the green shades with warm, earthy vitality.' },
    neutralDark: { hex: '#142215', rgb: 'rgb(20, 34, 21)', name: 'Deep Pine', reason: 'Very dark green-tinted charcoal for natural typographical reading.' },
    neutralLight: { hex: '#F4F8F4', rgb: 'rgb(244, 248, 244)', name: 'Mist White', reason: 'Softly tinted off-white background with organic calmness.' },
  },
  Modern: {
    primary: { hex: '#4F46E5', rgb: 'rgb(79, 70, 229)', name: 'Indigo Core', reason: 'The gold standard of modern SaaS and digital product design.' },
    secondary: { hex: '#7C3AED', rgb: 'rgb(124, 58, 237)', name: 'Royal Violet', reason: 'Flows beautifully into gradients alongside the primary Indigo.' },
    accent: { hex: '#06B6D4', rgb: 'rgb(6, 182, 212)', name: 'Cyber Teal', reason: 'Instantly grabs attention for dynamic highlights.' },
    neutralDark: { hex: '#0F172A', rgb: 'rgb(15, 23, 42)', name: 'Slate Slate', reason: 'Highly readable neutral for UI elements and text blocks.' },
    neutralLight: { hex: '#F8FAFC', rgb: 'rgb(248, 250, 252)', name: 'Studio Slate-White', reason: 'Clean studio background to emphasize layout structures.' },
  }
};

// Preset typography combos
const typographyPresets: Record<string, BrandData['typography']> = {
  Minimal: {
    heading: { name: 'Inter', provider: 'Google Fonts', category: 'Sans-Serif', description: 'Highly legible geometric sans-serif that remains neutral and clean at massive weights.' },
    body: { name: 'Inter', provider: 'Google Fonts', category: 'Sans-Serif', description: 'Clean body font ensuring a neutral, content-first layout.' },
    scaling: { h1: '3.5rem', h2: '2rem', h3: '1.25rem', body: '1rem' }
  },
  Luxury: {
    heading: { name: 'Playfair Display', provider: 'Google Fonts', category: 'Serif', description: 'Elegant, high-contrast serif typeface that evokes editorial high-fashion and luxury.' },
    body: { name: 'Inter', provider: 'Google Fonts', category: 'Sans-Serif', description: 'Muted geometric body sans to ensure content remains legible under serif headings.' },
    scaling: { h1: '4rem', h2: '2.25rem', h3: '1.5rem', body: '0.95rem' }
  },
  Playful: {
    heading: { name: 'Outfit', provider: 'Google Fonts', category: 'Sans-Serif', description: 'Warm, friendly, circular shapes that create an inviting and playful display vibe.' },
    body: { name: 'Inter', provider: 'Google Fonts', category: 'Sans-Serif', description: 'Standard sans that tempers the roundness for seamless readability.' },
    scaling: { h1: '3.25rem', h2: '1.85rem', h3: '1.2rem', body: '1.05rem' }
  },
  Tech: {
    heading: { name: 'Space Grotesk', provider: 'Google Fonts', category: 'Sans-Serif', description: 'Quirky, technical geometric sans-serif with a digital edge.' },
    body: { name: 'Inter', provider: 'Google Fonts', category: 'Sans-Serif', description: 'Stable, clean default text framework.' },
    scaling: { h1: '3.5rem', h2: '2.1rem', h3: '1.3rem', body: '0.95rem' }
  },
  Organic: {
    heading: { name: 'Fraunces', provider: 'Google Fonts', category: 'Serif', description: 'Soft, organic serif with rounded curves and warm craft aesthetics.' },
    body: { name: 'Inter', provider: 'Google Fonts', category: 'Sans-Serif', description: 'A neutral container that doesn\'t compete with the organic serif details.' },
    scaling: { h1: '3.75rem', h2: '2rem', h3: '1.4rem', body: '1rem' }
  },
  Modern: {
    heading: { name: 'Plus Jakarta Sans', provider: 'Google Fonts', category: 'Sans-Serif', description: 'Modern, wide-set sans-serif with active terminals, highly popular in creative agency mockups.' },
    body: { name: 'Inter', provider: 'Google Fonts', category: 'Sans-Serif', description: 'Standard clean body text pairing perfectly with modern sans headings.' },
    scaling: { h1: '3.75rem', h2: '2rem', h3: '1.25rem', body: '1rem' }
  }
};

// Preset images for moodboards (Unsplash high-quality creative assets)
const moodboardImagePresets: Record<string, string[]> = {
  Minimal: [
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&auto=format&fit=crop&q=80',
  ],
  Luxury: [
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1537832816519-689ad163238b?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&auto=format&fit=crop&q=80',
  ],
  Playful: [
    'https://images.unsplash.com/photo-1515488042361-404e9250afef?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1518887570146-0612132dd618?w=600&auto=format&fit=crop&q=80',
  ],
  Tech: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=80',
  ],
  Organic: [
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1532324208855-48b7a42c1112?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&auto=format&fit=crop&q=80',
  ],
  Modern: [
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1618005198143-d366800e49de?w=600&auto=format&fit=crop&q=80',
  ]
};

export function generateBrand(input: {
  name: string;
  industry: string;
  targetAudience: string;
  personality: string;
  keywords: string[];
  goals: string;
  competitors: string;
  styleStyle: string;
}): BrandData {
  const style = input.styleStyle || 'Modern';
  const name = input.name || 'BrandMate';
  const industry = input.industry || 'Tech';
  const keywords = input.keywords && input.keywords.length > 0 ? input.keywords : ['혁신', '디자인', '간결성'];
  
  // Custom Dynamic Brand Story
  const brandStory = `${name}은(는) ${industry} 분야에서 ${input.targetAudience || '소비자'}들을 사로잡기 위해 탄생했습니다. 우리는 기존의 복잡함과 단조로움을 허물고, ${keywords.join(', ')}이라는 핵심 가치를 바탕으로 고객 경험의 새로운 지평을 열고자 합니다. 단순히 제품을 제공하는 것을 넘어 하나의 고유한 문화와 신뢰를 나누는 파트너로서 ${name}은(는) 새로운 미래를 구축해 나갈 것입니다.`;
  
  const mission = `우리는 ${keywords[0] || '혁신'}적인 기술과 독창적인 미학을 융합하여, ${input.targetAudience || '사람들'}에게 삶의 긍정적인 가치 변화와 차별화된 영감을 제공한다.`;
  
  const vision = `${industry} 시장에서 ${keywords.join(' · ')} 가치를 가장 잘 실현하는 대표적인 크리에이티브 리딩 브랜드로 자리매김하는 것.`;

  const coreValues = [
    `${keywords[0] || '진정성'}: 브랜드가 말하는 약속을 신뢰할 수 있는 방식으로 이행합니다.`,
    `${keywords[1] || '지속성'}: 단기적 흥미가 아닌 오랜 가치를 품은 디자인을 지향합니다.`,
    `${keywords[2] || '차별성'}: 일반적인 기준을 뛰어넘어, 오직 우리만이 제공할 수 있는 의외성과 감각적 깊이를 전합니다.`
  ];

  // Ratings preset by style style
  let ratings = { friendly: 75, professional: 80, modern: 90, emotional: 60 };
  if (style === 'Minimal') ratings = { friendly: 50, professional: 95, modern: 95, emotional: 40 };
  else if (style === 'Luxury') ratings = { friendly: 40, professional: 98, modern: 75, emotional: 80 };
  else if (style === 'Playful') ratings = { friendly: 95, professional: 50, modern: 90, emotional: 85 };
  else if (style === 'Tech') ratings = { friendly: 60, professional: 90, modern: 98, emotional: 45 };
  else if (style === 'Organic') ratings = { friendly: 85, professional: 75, modern: 70, emotional: 90 };

  const toneVoice = {
    attitude: style === 'Minimal' ? '극도의 절제와 투명함' : style === 'Luxury' ? '권위 있고 정중한 환대' : style === 'Playful' ? '친근하고 통통 튀는 위트' : '진보적이고 명료한 지성',
    tone: style === 'Minimal' ? '차분하고 정중한 어조' : style === 'Playful' ? '생동감 넘치는 구어체' : '정직하고 지적인 격조',
    guidelines: [
      `불필요한 과장 광고 문구는 일절 배제하고, 사실에 기반한 정량적 가치를 조용히 제시합니다.`,
      `고객에게 무조건적인 동조보다, ${name}이(가) 가진 철학과 깊이에 동참할 수 있도록 조언하는 격조 높은 대화 형태를 유지합니다.`,
      `모든 문맥에서 친밀함을 유지하되, 마침표 하나에도 브랜드의 완결성을 담아 간결하게 문장을 마무리지어 신뢰도를 확보합니다.`
    ],
    ratings
  };

  const colors = colorPresets[style] || colorPresets['Modern'];
  const typography = typographyPresets[style] || typographyPresets['Modern'];
  const moodboardImages = moodboardImagePresets[style] || moodboardImagePresets['Modern'];

  const moodboard = {
    styleText: style === 'Minimal' ? '미니멀리스틱, 여백의 극대화, 정제된 기하학적 그리드' : style === 'Luxury' ? '고전적 기품, 고대비 조명, 비대칭적 레이아웃' : style === 'Playful' ? '팝하고 볼드한 셰이프, 네온 하이라이팅, 활력 넘치는 구도' : '모던 미학, 선과 면의 교차, 시각적 균형',
    textureText: style === 'Minimal' ? '매트한 종이, 금속 표면, 매끄러운 알루미늄' : style === 'Organic' ? '거친 리넨, 마티에르가 살아있는 토기, 자연석 무늬' : '매끄러운 아크릴, 반투명 유리, 모던 합성 플라스틱',
    lightingText: style === 'Minimal' ? '확산된 부드러운 산란광, 그림자 최소화' : style === 'Luxury' ? '스포트라이트와 섀도우의 강렬한 셰이핑 데이광' : '생기 가득하고 조도가 높은 화사한 스튜디오 조명',
    layoutText: '그리드 비율 3:5, 이미지 주변 여백 최소 24px 이상 유지, 컴포넌트 간 간격의 8px 배수 엄수',
    images: moodboardImages.map((url, i) => ({
      url,
      category: ['Texture', 'Packaging', 'Typography', 'Space', 'Product', 'Graphic'][i % 6],
      desc: `${style} 브랜딩을 시각적으로 투영하는 레퍼런스 이미지 #${i + 1}`
    }))
  };

  const logoDirection = {
    aesthetic: style === 'Minimal' ? '워드마크 기반의 타이포 브랜딩' : style === 'Luxury' ? '헤리티지와 모노그램 융합형' : style === 'Tech' ? '플랫한 픽토그램과 기하학적 볼륨' : '추상적 라인아트와 현대적 심볼',
    symbols: style === 'Minimal' ? ['선(Line)', '원(Circle)', '정방형(Square)'] : style === 'Organic' ? ['나무결', '대지(Earth)', '나뭇잎'] : ['네트워크 도트', '글로브', '화살표 디테일'],
    tips: [
      '로고 마크 주변에 로고 높이의 1.5배만큼 비주얼 클리어 에어리어(Margin)를 필수적으로 확보하십시오.',
      '1도 인쇄 및 다크모드 화면에서도 그래픽 왜곡 없이 실루엣만으로 완벽한 인지가 가능한지 검증해야 합니다.'
    ]
  };

  return {
    name,
    industry,
    targetAudience: input.targetAudience,
    personality: input.personality,
    keywords,
    goals: input.goals,
    competitors: input.competitors,
    styleStyle: style,
    brandStory,
    mission,
    vision,
    coreValues,
    toneVoice,
    colors,
    typography,
    moodboard,
    logoDirection
  };
}

// Helper to analyze uploaded image for design feedback (simulates Vision API review)
export interface FeedbackReport {
  score: number;
  hierarchy: { score: number; critique: string; suggestion: string };
  alignment: { score: number; critique: string; suggestion: string };
  spacing: { score: number; critique: string; suggestion: string };
  colors: { score: number; critique: string; suggestion: string };
  accessibility: { score: number; critique: string; suggestion: string };
}

export function generateDesignFeedback(fileName: string): FeedbackReport {
  // Return realistic constructive critique based on standard layouts
  const isLogo = fileName.toLowerCase().includes('logo') || fileName.toLowerCase().includes('로고');
  const isWeb = fileName.toLowerCase().includes('web') || fileName.toLowerCase().includes('page') || fileName.toLowerCase().includes('웹') || fileName.toLowerCase().includes('화면');

  if (isLogo) {
    return {
      score: 78,
      hierarchy: {
        score: 80,
        critique: "심볼과 브랜드 타이틀(텍스트) 간의 크기 비례가 우수하나, 서브텍스트의 가독성이 작아 모바일 디바이스에서 소실될 우려가 있습니다.",
        suggestion: "서브 타이틀 폰트 크기를 약 15% 키우고 자간(Letter spacing)을 넓혀 가시성을 보장하세요."
      },
      alignment: {
        score: 85,
        critique: "정중앙 정렬이 완벽하게 고정되어 안정적인 브랜딩 앵커 역할을 하고 있습니다.",
        suggestion: "현재 중앙 비주얼 밸런스가 매우 뛰어나므로 기하학적 그리드 비례를 유지하십시오."
      },
      spacing: {
        score: 72,
        critique: "마크와 텍스트의 간격이 너무 협소하여 인쇄물 축소 인쇄 시 뭉쳐 보일 수 있는 간섭 구간이 발견되었습니다.",
        suggestion: "텍스트 상단 여백을 현재 값보다 8px 늘려 비주얼 숨구멍을 확보하세요."
      },
      colors: {
        score: 85,
        critique: "2가지 이내의 핵심 컬러 사용으로 고유 이미지 전달도가 높고 복잡하지 않습니다.",
        suggestion: "다크 브랜딩 백그라운드용 컬러 리버스(Reversed white) 버전을 추가로 수립하십시오."
      },
      accessibility: {
        score: 68,
        critique: "배경과 로고 심볼의 색상 고대비율이 2.8:1 수준으로 다소 낮아 저시력자 접근성(WCAG AA 4.5:1)에 걸립니다.",
        suggestion: "로고 심볼의 채도를 소폭 높이거나 배경의 명도를 더 어둡게 끌어내려 고대비 구조를 강화하세요."
      }
    };
  } else if (isWeb) {
    return {
      score: 84,
      hierarchy: {
        score: 90,
        critique: "상단 H1 타이틀과 본문 간의 폰트 웨이트 대비가 명확하여 유저의 핵심 메시지 인지 속도가 매우 빠릅니다.",
        suggestion: "CTA 버튼으로 유도하는 시선의 흐름을 위해 버튼의 배경색 채도를 조금 더 극대화해 주십시오."
      },
      alignment: {
        score: 88,
        critique: "8px 그리드 시스템에 기반하여 좌측 정렬 라인이 깔끔하게 맞아떨어집니다.",
        suggestion: "카드 레이아웃들의 상하 높이값 편차가 존재하므로 높이를 통일시키는 Flex Box 설정을 고정하십시오."
      },
      spacing: {
        score: 80,
        critique: "요소 간의 여백이 균등하여 복잡함을 덜어냈으나, 헤드라인과 상단 내비게이션(GNB)의 마진 여백이 좁아 답답함을 유발합니다.",
        suggestion: "GNB 하단 패딩(Padding)을 16px 늘려 공기감을 주입하세요."
      },
      colors: {
        score: 82,
        critique: "브랜드 Primary 컬러인 인디고 계열이 CTA 버튼과 활성 탭에 적절하게 녹아들어 일관성이 돋보입니다.",
        suggestion: "에러 메시지나 보조 경고에 사용되는 서브 옐로우 컬러의 명도를 조정하여 배경색 슬레이트 그레이와 충돌하지 않도록 하십시오."
      },
      accessibility: {
        score: 80,
        critique: "글꼴 대비도는 통과(PASS)했으나, 입력 폼(Input)의 플레이스홀더 텍스트 색상이 너무 흐려 폼 입력 유도가 불분명합니다.",
        suggestion: "플레이스홀더 색상(#CBD5E1)의 명도를 #94A3B8로 한 단계 상향 조정하십시오."
      }
    };
  } else {
    // Default feedback
    return {
      score: 81,
      hierarchy: {
        score: 82,
        critique: "상하위 정보의 시각적 위계(Visual Hierarchy)는 잘 정의되어 정보 습득이 순조롭습니다.",
        suggestion: "가장 중요한 핵심 키워드 1가지를 볼드하거나 포인트 컬러를 주어 강조하세요."
      },
      alignment: {
        score: 80,
        critique: "전체적인 축 정렬은 무난하나 미세한 픽셀 어긋남이 레이아웃 카드 가장자리에서 보입니다.",
        suggestion: "요소들의 X축 정렬 좌표를 8의 배수로 강제 고정하십시오."
      },
      spacing: {
        score: 85,
        critique: "전반적으로 넉넉한 여백이 현대적이며 고급스러운 브랜드 아이덴티티를 배가시켜 줍니다.",
        suggestion: "여백의 비율을 이대로 유지하되, 모바일 뷰포트 전환 시에도 적응형 패딩이 정상 작동하는지 확인하세요."
      },
      colors: {
        score: 78,
        critique: "컬러 조합이 다소 밋밋하여 유저가 어디를 먼저 보아야 할지 지침을 놓치기 쉽습니다.",
        suggestion: "보조 포인트 액센트 컬러를 하나 정하여 강조 영역에만 극소량(5% 내외) 배분하세요."
      },
      accessibility: {
        score: 80,
        critique: "주요 버튼 텍스트의 대비율은 우수하나 이미지 위를 덮고 있는 화이트 텍스트 밑에 반투명 딤(Dim) 처리가 필요합니다.",
        suggestion: "이미지 컨테이너에 검은색 그라디언트 오버레이(Opacity 30%)를 씌워 텍스트 시인성을 개선하십시오."
      }
    };
  }
}
