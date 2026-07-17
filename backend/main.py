import os
import uuid
import logging
from typing import List, Optional, Dict, Any
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("brandmate-backend")

app = FastAPI(
    title="BrandMate API",
    description="AI-Powered Branding Design Assistant Backend API",
    version="1.0.0"
)

# Enable CORS for frontend requests (essential for GitHub Pages cross-origin calls)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, restrict this to specific frontend domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Schemas
class BrandWizardRequest(BaseModel):
    name: str = Field(..., example="Greenship")
    industry: str = Field(..., example="Eco Cosmetics")
    targetAudience: str = Field(..., example="Clean beauty lovers")
    personality: Optional[str] = Field("Modern", example="Modern")
    keywords: List[str] = Field(default_factory=list, example=["Organic", "Minimal"])
    goals: Optional[str] = Field("", example="Launch eco skin solution")
    competitors: Optional[str] = Field("", example="Aesop")
    styleStyle: str = Field("Modern", example="Modern")

class ColorRecommendRequest(BaseModel):
    brand_id: str
    mood: str

# -----------------
# Mock Data Presets (Matching Frontend Engine for consistency)
# -----------------
COLOR_PRESETS = {
    "Minimal": {
        "primary": { "hex": "#0F172A", "rgb": "rgb(15, 23, 42)", "name": "Deep Charcoal", "reason": "Provides a solid, unyielding anchor of sophistication." },
        "secondary": { "hex": "#475569", "rgb": "rgb(71, 85, 105)", "name": "Slate Gray", "reason": "Acts as a muted secondary anchor without distracting." },
        "accent": { "hex": "#6366F1", "rgb": "rgb(99, 102, 241)", "name": "Electric Indigo", "reason": "Adds a modern, digital spark of focus and interaction." },
        "neutralDark": { "hex": "#1E293B", "rgb": "rgb(30, 41, 59)", "name": "Ink Blue", "reason": "Used for main heading contrast and premium text depth." },
        "neutralLight": { "hex": "#F8FAFC", "rgb": "rgb(248, 250, 252)", "name": "Pure Alabaster", "reason": "Forms the canvas backdrop, ensuring ultimate whitespace cleanliness." }
    },
    "Luxury": {
        "primary": { "hex": "#1C1917", "rgb": "rgb(28, 25, 23)", "name": "Ebony Stone", "reason": "Understated dark tone representing timeless authority." },
        "secondary": { "hex": "#78716C", "rgb": "rgb(120, 113, 108)", "name": "Warm Taupe", "reason": "Refined neutral that speaks to premium texture and craftsmanship." },
        "accent": { "hex": "#D97706", "rgb": "rgb(217, 119, 6)", "name": "Muted Brass", "reason": "Evokes gold accents and exclusivity without being overly flashy." },
        "neutralDark": { "hex": "#292524", "rgb": "rgb(41, 37, 36)", "name": "Obsidian Black", "reason": "Delivers a soft, high-end editorial typography contrast." },
        "neutralLight": { "hex": "#FAF9F6", "rgb": "rgb(250, 249, 246)", "name": "Soft Ivory", "reason": "Gives the background an editorial paper-like texture and warmth." }
    },
    "Playful": {
        "primary": { "hex": "#EC4899", "rgb": "rgb(236, 72, 153)", "name": "Hot Magenta", "reason": "Bursting with energy, instantly commands youth attention." },
        "secondary": { "hex": "#F59E0B", "rgb": "rgb(245, 158, 11)", "name": "Marigold Yellow", "reason": "Brings sunniness and optimistic contrast." },
        "accent": { "hex": "#10B981", "rgb": "rgb(16, 185, 129)", "name": "Bright Emerald", "reason": "Highlights interactive items with fresh, vibrant clarity." },
        "neutralDark": { "hex": "#1F2937", "rgb": "rgb(31, 41, 55)", "name": "Night Charcoal", "reason": "Keeps headings readable and grounded." },
        "neutralLight": { "hex": "#FFFBEB", "rgb": "rgb(255, 251, 235)", "name": "Warm Honey-Cream", "reason": "Adds a soft, friendly, and non-sterile background glow." }
    },
    "Tech": {
        "primary": { "hex": "#2563EB", "rgb": "rgb(37, 99, 235)", "name": "Cyber Blue", "reason": "Represents technological stability, trust, and API fidelity." },
        "secondary": { "hex": "#0EA5E9", "rgb": "rgb(14, 165, 233)", "name": "Sky Cyan", "reason": "Adds an expansive, future-forward secondary tint." },
        "accent": { "hex": "#10B981", "rgb": "rgb(16, 185, 129)", "name": "Terminal Green", "reason": "Accents status nodes and micro-interactive cues." },
        "neutralDark": { "hex": "#0B0F19", "rgb": "rgb(11, 15, 25)", "name": "Deep Space", "reason": "Gives a modern developer-centric, high-contrast dark text anchor." },
        "neutralLight": { "hex": "#F0F4F8", "rgb": "rgb(240, 244, 248)", "name": "Cloud Gray", "reason": "Imitates premium digital dashboards and clean layouts." }
    },
    "Organic": {
        "primary": { "hex": "#15803D", "rgb": "rgb(21, 128, 61)", "name": "Forest Moss", "reason": "Grounds the brand in environmental sustainability and wellness." },
        "secondary": { "hex": "#16A34A", "rgb": "rgb(22, 163, 74)", "name": "Meadow Green", "reason": "Adds a brighter leaf-like tone for product accents." },
        "accent": { "hex": "#C2410C", "rgb": "rgb(194, 65, 12)", "name": "Terracotta Soil", "reason": "Complements the green shades with warm, earthy vitality." },
        "neutralDark": { "hex": "#142215", "rgb": "rgb(20, 34, 21)", "name": "Deep Pine", "reason": "Very dark green-tinted charcoal for natural typographical reading." },
        "neutralLight": { "hex": "#F4F8F4", "rgb": "rgb(244, 248, 244)", "name": "Mist White", "reason": "Softly tinted off-white background with organic calmness." }
    },
    "Modern": {
        "primary": { "hex": "#4F46E5", "rgb": "rgb(79, 70, 229)", "name": "Indigo Core", "reason": "The gold standard of modern SaaS and digital product design." },
        "secondary": { "hex": "#7C3AED", "rgb": "rgb(124, 58, 237)", "name": "Royal Violet", "reason": "Flows beautifully into gradients alongside the primary Indigo." },
        "accent": { "hex": "#06B6D4", "rgb": "rgb(6, 182, 212)", "name": "Cyber Teal", "reason": "Instantly grabs attention for dynamic highlights." },
        "neutralDark": { "hex": "#0F172A", "rgb": "rgb(15, 23, 42)", "name": "Slate Slate", "reason": "Highly readable neutral for UI elements and text blocks." },
        "neutralLight": { "hex": "#F8FAFC", "rgb": "rgb(248, 250, 252)", "name": "Studio Slate-White", "reason": "Clean studio background to emphasize layout structures." }
    }
}

TYPOGRAPHY_PRESETS = {
    "Minimal": {
        "heading": { "name": "Inter", "provider": "Google Fonts", "category": "Sans-Serif", "description": "Highly legible geometric sans-serif that remains neutral and clean at massive weights." },
        "body": { "name": "Inter", "provider": "Google Fonts", "category": "Sans-Serif", "description": "Clean body font ensuring a neutral, content-first layout." },
        "scaling": { "h1": "3.5rem", "h2": "2rem", "h3": "1.25rem", "body": "1rem" }
    },
    "Luxury": {
        "heading": { "name": "Playfair Display", "provider": "Google Fonts", "category": "Serif", "description": "Elegant, high-contrast serif typeface that evokes editorial high-fashion and luxury." },
        "body": { "name": "Inter", "provider": "Google Fonts", "category": "Sans-Serif", "description": "Muted geometric body sans to ensure content remains legible under serif headings." },
        "scaling": { "h1": "4rem", "h2": "2.25rem", "h3": "1.5rem", "body": "0.95rem" }
    },
    "Tech": {
        "heading": { "name": "Space Grotesk", "provider": "Google Fonts", "category": "Sans-Serif", "description": "Quirky, technical geometric sans-serif with a digital edge." },
        "body": { "name": "Inter", "provider": "Google Fonts", "category": "Sans-Serif", "description": "Stable, clean default text framework." },
        "scaling": { "h1": "3.5rem", "h2": "2.1rem", "h3": "1.3rem", "body": "0.95rem" }
    },
    "Modern": {
        "heading": { "name": "Plus Jakarta Sans", "provider": "Google Fonts", "category": "Sans-Serif", "description": "Modern, wide-set sans-serif with active terminals, highly popular in creative agency mockups." },
        "body": { "name": "Inter", "provider": "Google Fonts", "category": "Sans-Serif", "description": "Standard clean body text pairing perfectly with modern sans headings." },
        "scaling": { "h1": "3.75rem", "h2": "2rem", "h3": "1.25rem", "body": "1rem" }
    }
}

# -----------------
# API Routes
# -----------------

@app.get("/")
def read_root():
    return {
        "message": "Welcome to the BrandMate API Server!",
        "status": "online",
        "endpoints": [
            "/api/v1/brands/wizard",
            "/api/v1/colors/recommend",
            "/api/v1/design/feedback"
        ]
    }

@app.post("/api/v1/brands/wizard")
def generate_brand_wizard(req: BrandWizardRequest):
    logger.info(f"Generating brand guideline for: {req.name}")
    
    style = req.styleStyle if req.styleStyle in COLOR_PRESETS else "Modern"
    keywords_str = ", ".join(req.keywords) if req.keywords else "혁신, 디자인, 가치"
    
    # Simulate LLM Brand Identity Story Synthesis
    brand_story = (
        f"{req.name}은(는) {req.industry} 분야에서 {req.targetAudience} 고객군을 감동시키기 위해 탄생했습니다. "
        f"우리는 단순함과 효율의 균형 아래 {keywords_str} 가치관을 주춧돌로 삼아 제품과 경험을 전개합니다. "
        f"고객과의 모든 접점에서 신뢰와 감동을 주고자 디자인 시스템과 아이덴티티를 조화롭게 가꾸어 갑니다."
    )
    
    mission = f"우리는 독창적인 가치와 신뢰를 결합하여 {req.targetAudience}에게 삶의 긍정적인 가치 변화를 전파한다."
    vision = f"{req.industry} 분야의 독보적인 비주얼 철학을 전파하여, 글로벌 스탠다드로 활약하는 것."
    
    colors = COLOR_PRESETS.get(style, COLOR_PRESETS["Modern"])
    typo = TYPOGRAPHY_PRESETS.get(style, TYPOGRAPHY_PRESETS["Modern"])
    
    return {
        "brand_id": str(uuid.uuid4()),
        "name": req.name,
        "industry": req.industry,
        "styleStyle": style,
        "brandStory": brand_story,
        "mission": mission,
        "vision": vision,
        "colors": colors,
        "typography": typo,
        "toneVoice": {
            "attitude": f"{style} 기반의 매력적인 어조",
            "tone": "신뢰할 수 있고 명료한 커뮤니케이션 스타일"
        }
    }

@app.post("/api/v1/colors/recommend")
def recommend_colors(req: ColorRecommendRequest):
    # Simply returns a palette based on mood keywords
    logger.info(f"Analyzing color mood for: {req.mood}")
    style = "Modern"
    if "eco" in req.mood.lower() or "nature" in req.mood.lower() or "친환경" in req.mood:
        style = "Organic"
    elif "luxury" in req.mood.lower() or "premium" in req.mood.lower() or "고급" in req.mood:
        style = "Luxury"
    elif "minimal" in req.mood.lower() or "simple" in req.mood.lower() or "미니멀" in req.mood:
        style = "Minimal"
        
    return {
        "colors": COLOR_PRESETS.get(style, COLOR_PRESETS["Modern"]),
        "explainable_reason": f"입력하신 '{req.mood}' 분위기를 색채 심리학 관점에서 정량 분석한 결과, 이에 대응하는 매칭 팔레트를 추천해 드립니다."
    }

@app.post("/api/v1/design/feedback")
async def analyze_design_feedback(
    brand_id: str = Form(...),
    file: UploadFile = File(...)
):
    logger.info(f"Analyzing design feedback for brand: {brand_id}, file: {file.filename}")
    
    filename_lower = file.filename.lower()
    is_logo = "logo" in filename_lower or "로고" in filename_lower
    
    # High-quality mock visual response scores
    if is_logo:
        score = 82
        hierarchy = { "score": 85, "critique": "로고의 비주얼 계층구조는 훌륭하나, 모바일 아이콘 16x16px 스케일에서 세부 라인이 뭉개질 위험이 감지되었습니다.", "suggestion": "가장 얇은 드로잉 라인의 두께를 최소 1px 상향 조정하여 모바일 해상도 가독성을 보장하십시오." }
        alignment = { "score": 90, "critique": "로고와 마크의 중앙 좌표 축 정렬이 완벽하게 일치합니다.", "suggestion": "현재의 축 고정 좌표를 시그니처 배치의 표준 가이드로 설정하십시오." }
        spacing = { "score": 75, "critique": "심볼 마크와 텍스트 타이틀 간의 여백이 다소 좁아 가독 간섭이 생깁니다.", "suggestion": "두 요소 간의 마진(Margin)을 현재 대비 8px 더 이격하십시오." }
    else:
        score = 80
        hierarchy = { "score": 80, "critique": "본문 텍스트와 타이틀의 크기 비례가 다소 불명확합니다.", "suggestion": "타이틀 폰트 크기(Font-size)를 본문 대비 최소 2.5배 이상 크게 배정하십시오." }
        alignment = { "score": 85, "critique": "8px 그리드 정렬 규칙에 근접하여 깨끗한 레이아웃 축을 유지 중입니다.", "suggestion": "우측 배치된 카드의 패딩 치수 또한 8의 배수로 맞춰 정렬 균형을 완료하세요." }
        spacing = { "score": 78, "critique": "전반적으로 넉넉한 공백율을 품었으나 하단 버튼 영역의 상하 패딩이 비좁습니다.", "suggestion": "CTA 버튼 높이를 48px 이상으로 끌어올려 사용자의 모바일 터치 편의성을 개선하십시오." }
        
    return {
        "score": score,
        "feedback": {
            "hierarchy": hierarchy,
            "alignment": alignment,
            "spacing": spacing,
            "colors": { "score": 85, "critique": "배합된 색상이 3색 이내로 시각적 피로도가 낮고 브랜드 메인 인디고 톤을 잘 인용하고 있습니다.", "suggestion": "대비 등급이 조금 부족한 옅은 그레이 요소의 명도를 한 단계 올려 가독성을 보강하세요." },
            "accessibility": { "score": 78, "critique": "배경 딤(Dim) 처리 오버레이 강도가 20%로 부족하여, 텍스트가 부분적으로 흐려 보이는 영역이 관측됩니다.", "suggestion": "텍스트 뒷배경의 암전 그라디언트 불투명도를 35%로 조정하십시오." }
        }
    }
