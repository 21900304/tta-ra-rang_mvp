# Project: 특수학급 AI 체육 플랫폼 '따라랑' Prototype 개발

당신은 Senior Frontend Engineer이자 UI/UX 디자이너입니다. 제공하는 IA와 PRD 핵심 가치를 바탕으로 React, Tailwind CSS, shadcn/ui를 사용하여 MVP 프로토타입의 GUI를 설계하고 코드로 구현해주세요.

## 1. 기술 스택 및 디자인 시스템
- Framework: React (Next.js 또는 Vite)
- Styling: Tailwind CSS
- UI Components: shadcn/ui (Card, Button, Progress, Dialog, Badge, Alert 등 사용)
- Icons: Lucide-react
- Color Palette (PRD 기반): 
  - Primary: Sky Blue (#87CEEB) - 신뢰와 청결함
  - Point: Sunny Yellow (#FFD700) - 학생들의 활기
  - Success: Mint Green (#98FB98) - 긍정적인 피드백
  - Background: Soft Grey (#F8F9FA) - 눈의 피로도 감소

## 2. 핵심 UI/UX 원칙
- 대상: 특수학급 교사(운영) 및 학생(시청)
- 접근성: 큰 버튼, 직관적인 아이콘, 고대비 텍스트 사용
- 화면 이원화: 교사용(Dashboard)과 학생용(Display) 창이 분리되는 구조를 고려하여 레이아웃 설계

## 3. IA 기반 페이지별 상세 설계 요구사항

### [Page 1: Home]
- 서비스 슬로건 "선생님 따라, 화면 따라 - 따라랑" 강조
- 로그인이 없는 구조이므로 바로 '수업 시작하기' 버튼 노출

### [Page 2: Setup]
- 운동 선택: 스쿼트-푸쉬업-버피 시퀀스 카드형 UI
- 인원 설정: 1~6명 선택 가능한 넘버 피커 또는 버튼 그룹
- 화면 제어: '학생용 창 열기' 버튼 (클릭 시 window.open()을 모방한 알림 또는 팝업 레이아웃 노출)

### [Page 3: Calibration]
- 웹캠 영역 (Placeholder)과 학생 위치 가이드라인 표시
- 캐릭터 매칭 섹션: 인식된 인원별로 캐릭터가 할당되는 시각적 피드백 제공

### [Page 4: Play Mode (Dual Layout)]
- Teacher View: 운동 제어 버튼(Pause/Resume/Next), 학생별 실시간 달성도 리스트
- Student View (TV): 큰 캐릭터 애니메이션 영역, 상단 중앙에 큰 운동 카운트 숫자, 하단에 진행바

## 4. 구현 요청 사항
- 위 모든 페이지를 SPA 형태의 Route로 구성하거나, Step별 조건부 렌더링으로 구현해줘.
- 실제 AI(MoveNet) 기능은 Mock 데이터와 Placeholder로 대체하되, UI상에서 데이터가 변하는 모습(카운트 증가 등)을 확인할 수 있게 인터랙션을 추가해줘.