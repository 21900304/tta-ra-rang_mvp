# Claude Code Prompt: 따라랑 MVP GUI 구현

## Role
당신은 Senior Frontend Engineer이자 UI/UX 디자이너입니다. 특수학급 AI 체육 플랫폼 '따라랑'의 MVP GUI를 React + TypeScript + Tailwind CSS + shadcn/ui로 구현합니다.

## Context
- **프로젝트**: 따라랑 (Tta-ra-rang) - "선생님 따라, 화면 따라"
- **타겟**: 특수학급 체육교사 및 학생 (5-7명)
- **기술**: React PWA, TensorFlow.js MoveNet MultiPose
- **특징**: 영상 로컬 처리, 브라우저 기반, 설치 불필요

## Design System (필수 준수)

### Color Palette
```
Primary:    #005EB8 (Energy Royal Blue) - 서비스 브랜딩, 구조적 요소
Point:      #FFB81C (Action Amber)      - 진행 상태, 카운팅, 강조
Success:    #D5281B (Primary Red)       - 성공 피드백 (제한적 사용)
Background: #F3F3F3 (Neutral Light Grey) - 전체 배경
Text:       #212B32 (Dark Charcoal)     - 메인 텍스트
```

### Usage Ratio (60-30-10 법칙)
- 60%: Neutral Light Grey (배경)
- 30%: Energy Royal Blue (구조)
- 10%: Action Amber + Primary Red (강조)

### Typography
- 폰트 크기: 최소 16px (모바일), 18-24px (데스크톱)
- 텍스트-배경 대비: WCAG AA 4.5:1 이상
- 한국어 위주, 친근한 어조

---

## Page Structure (4단계 플로우)

### Page 1: Home (Landing)
**목적**: 서비스 소개 및 수업 시작 진입점

**필수 요소**:
- [ ] 서비스 로고/네임 "따라랑"
- [ ] 슬로건 "선생님 따라, 화면 따라 - 따라랑" (강조 표시)
- [ ] 서비스 소개 문구 (1-2문장)
- [ ] "수업 시작하기" CTA 버튼 (Primary Blue, 큰 사이즈)

**UI/UX 가이드**:
- 중앙 정렬, 여백 넉넉히
- 버튼은 56px 이상 높이 (터치 friendly)

---

### Page 2: Class Setup (수업 준비)
**목적**: 운��� 종류 및 학생 수 설정

**필수 요소**:
- [ ] **욕동 선택 섹션**: 
  - Class 1 카드 (스쿼트 → 푸쉬업 → 버피 시퀀스)
  - 카드 내: 욕동 아이콘, 순서 리스트, 예상 소요시간
  
- [ ] **학생 인원 설정**:
  - 1~6명 선택 가능한 Number Picker 또는 버튼 그룹
  - 현재 선택값 시각적 강조 (Action Amber)
  
- [ ] **화면 확장 설정**:
  - "학생용 창 열기 (TV용)" 버튼
  - 클릭 시 팝업/새 창 오픈 안내

**UI/UX 가이드**:
- 카드형 UI, 그림자 효과로 입체감
- 선택 상태는 Blue 테두리 + Amber 강조
- 하단 고정 "다음" 버튼

---

### Page 3: Calibration (캘리브레이션)
**목적**: 침궤 인식 및 학생-캐릭터 매칭

**필수 요소**:
- [ ] **웹캠 영역**:
  - Video placeholder (16:9 비율)
  - 학생 위치 가이드라인 (왼쪽→오른쪽 배치 안내)
  - 로딩 상태: "침궤 연결 중..."
  
- [ ] **캐릭터 매칭 섹션**:
  - 인식된 인원 수 표시 (Badge)
  - 캐릭터 슬롯 6개 (미인식 시 Grey, 인식 시 Color)
  - 캐릭터 Placeholder: 원형 아바타 (shadcn Avatar 컴포넌트)
  
- [ ] **확인 안내**:
  - "학생들이 손을 들어 본인 캐릭터를 확인해주세요"
  - 체크리스트: 위치 확인 → 캐릭터 확인 → 준비 완료

**UI/UX 가이드**:
- 웹캠 영역은 테두리로 강조 (Blue)
- 실시간 인식 상태 표시 (Online/Offline dot)
- 하단 고정 "욕동 시작" 버튼 (모두 인식 시 활성화)

---

### Page 4: Play Mode (이원화 화면)

#### 4.1 Teacher View (교사용 - 메인 창)
**목적**: 수업 제어 및 모니터링

**필수 요소**:
- [ ] **헤더**: 현재 욕동명 (ex: "스쿼트 1/3"), 전체 진행률

- [ ] **제어 버튼 그룹**:
  - "시작/일시정지" (Play/Pause 아이콘)
  - "다음 욕동" (Skip 아이콘)
  - "수업 종료" (Stop 아이콘, Red)
  
- [ ] **학생 모니터링 리스트**:
  ```
  [캐릭터] [이름/번호] [현재 욕동] [카운트] [진행률 바]
  ```
  - 6명 동시 표시
  - 카드형 또는 테이블형
  - 실시간 카운트 업데이트 (Mock data로 시뮬레이션)
  
- [ ] **피드백 로그**:
  - 최근 AI 피드백 메시지 (ex: "1번 학생: 자세가 좋아요!")
  - 시간 순서대로 스크롤

**UI/UX 가이드**:
- 정보 밀도 높음 (Blue/Grey 기반)
- 버튼은 아이콘 + 텍스트 조합
- 리스트 아이템은 hover 효과

---

#### 4.2 Student View (학생용 - TV/확장 창)
**목적**: 학생 참여 및 동기부여

**필수 요소**:
- [ ] **헤더**: 큰 욕동명 (ex: "스쿼트")

- [ ] **캐릭터 영역**:
  - 6개 캐릭터 슬롯 (좌→우 배치)
  - 각 캐릭터 아래: 번호/이름 + 카운트
  - 활성 캐릭터: 애니메이션 효과 (scale up, bounce)
  
- [ ] **중앙 카운트 디스플레이**:
  - 현재 욕동 카운트 (Action Amber, 72px+ 폰트)
  - "/ 목표" 표시 (ex: "12 / 20")
  
- [ ] **진행 바**:
  - 전체 클래스 진행률 (Blue → Amber gradient)
  - 세그먼트로 스쿼트/푸쉬업/버피 구분
  
- [ ] **피드백 오버레이**:
  - 성공 시: "참 잘했어요!" + 별 모양 (Red)
  - 자세 피드백: "무릎을 더 굽혀보세요"
  - 3초 후 자동 fade out

**UI/UX 가이드**:
- TV 가독성 고려: 큰 글씨, 고대비
- 애니메이션: 부드러운 전환, 과하지 않게
- Positive reinforcement 중심

---

## Technical Requirements

### Stack
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Library**: shadcn/ui
- **Icons**: Lucide React
- **State**: React hooks (useState, useContext) 또는 Zustand

### File Structure
```
src/
├── pages/
│   ├── Home.tsx
│   ├── Setup.tsx
│   ├── Calibration.tsx
│   └── Play/
│       ├── TeacherView.tsx
│       └── StudentView.tsx
├── components/
│   ├── layout/
│   │   └── Layout.tsx
│   ├── ui/
│   │   └── (shadcn components)
│   └── features/
│       ├── ExerciseCard.tsx
│       ├── StudentSlot.tsx
│       ├── CountDisplay.tsx
│       ├── ControlButtons.tsx
│       └── ProgressBar.tsx
├── hooks/
│   └── useMockPoseData.ts
├── types/
│   └── index.ts
└── lib/
    └── utils.ts
```

### Mock Data (개발용)
```typescript
// Mock pose detection data
const mockStudents = [
  { id: 1, name: "학생 1", character: "🦁", count: 12, target: 20, isActive: true },
  { id: 2, name: "학생 2", character: "🐯", count: 10, target: 20, isActive: true },
  // ... 6명
];

// Mock exercise sequence
const classSequence = [
  { type: "squat", name: "스쿼트", target: 20, order: 1 },
  { type: "pushup", name: "푸쉬업", target: 20, order: 2 },
  { type: "burpee", name: "버피", target: 20, order: 3 },
];
```

### 인터랙션 시뮬레이션
- [ ] 카운트 증가: 2초마다 랜덤 학생 카운트 +1
- [ ] 피드백 표시: 5초마다 랜덤 피드백 메시지
- [ ] 욕동 전환: "다음 욕동" 버튼 클릭 시 시퀀스 변경

---

## Implementation Steps

### Phase 1: Setup & Layout
1. [ ] Vite + React + TypeScript 프로젝트 생성
2. [ ] Tailwind CSS 설정 (Color palette custom config)
3. [ ] shadcn/ui 초기화 및 필요 컴포넌트 설치
4. [ ] 전역 Layout 컴포넌트 생성
5. [ ] React Router 또는 Step-based 상태 관리 설정

### Phase 2: Page Implementation
1. [ ] Home 페이지 구현
2. [ ] Setup 페이지 구현 (Class 선택, 인원 설정)
3. [ ] Calibration 페이지 구현 (웹캠 placeholder, 캐릭터 슬롯)
4. [ ] Teacher View 구현 (제어판, 모니터링 리스트)
5. [ ] Student View 구현 (캐릭터, 카운트, 진행바)

### Phase 3: Interactions & Polish
1. [ ] Mock data hook 생성
2. [ ] 카운트 증가 애니메이션
3. [ ] 페이지 전환 애니메이션
4. [ ] 반응형 디자인 (Desktop/TV 모드)
5. [ ] Keyboard shortcut (Space: 일시정지, N: 다음 욕동)

### Phase 4: Testing
1. [ ] Chrome DevTools에서 모바일/데스크톱 테스트
2. [ ] 확장 화면 시뮬레이션 (window.open 대신 탭 분리)
3. [ ] 색상 대비 체크 (WCAG)

---

## Component Specifications

### ExerciseCard
```typescript
interface ExerciseCardProps {
  sequence: Exercise[];  // [{type: "squat", name: "스쿼트", target: 20}]
  isSelected: boolean;
  onSelect: () => void;
}
```
- 카드 형태로 시퀀스 표시
- 선택 시 Blue 테두리 + 그림자
- 욕동 아이콘 (Lucide: Dumbbell, Activity, Zap)

### StudentSlot
```typescript
interface StudentSlotProps {
  student: {
    id: number;
    character: string;
    isDetected: boolean;
    count?: number;
  };
  isActive?: boolean;
}
```
- 원형 아바타 (shadcn Avatar)
- 인식 상태 dot (Green/Red)
- 카운트 숫자 (Student View용)

### CountDisplay
```typescript
interface CountDisplayProps {
  current: number;
  target: number;
  size?: 'sm' | 'md' | 'lg';
}
```
- 큰 숫자 표시 (lg: 72px, md: 48px)
- Action Amber 색상
- /target 텍스트

### ProgressBar
```typescript
interface ProgressBarProps {
  current: number;
  total: number;
  segments?: { name: string; value: number }[];
}
```
- Blue → Amber gradient
- 세그먼트 표시 (전체 욕동 중 현재 위치)
- 퍼센트 텍스트

---

## Accessibility Requirements

- [ ] 모든 버튼에 aria-label 제공
- [ ] 키보드 네비게이션 지원 (Tab, Enter, Space)
- [ ] 색상만으로 정보 전달 금지 (아이콘/텍스트 병행)
- [ ] 충분한 색상 대비 (4.5:1 이상)
- [ ] 학생용 화면: 5m 거리에서 가독성 확보

---

## Output Requirements

### 코드 산출물
- [ ] 완전한 React TypeScript 프로젝트
- [ ] 모든 페이지/컴포넌트 구현
- [ ] Mock 데이터로 동작하는 인터랙션
- [ ] shadcn/ui 컴포넌트 활용

### 문서
- [ ] README.md (실행 방법, 프로젝트 구조)
- [ ] 컴포넌트 설계 문서 (선택)

---

## 실행 명령어

```bash
# 프로젝트 생성
echo "my-app" | npx shadcn@latest init --yes --template vite --base-color gray

# shadcn 컴포넌트 설치
npx shadcn add button card badge progress avatar alert dialog

# 개발 서버 실행
npm run dev
```

---

## Success Criteria

- [ ] 4단계 페이지 플로우 완성 (Home → Setup → Calibration → Play)
- [ ] 색상 시스템 100% 적용 (Design System 준수)
- [ ] 교사용/학생용 화면 분리 구조 설계
- [ ] Mock 데이터로 카운트 증가 시뮬레이션 동작
- [ ] 반응형 레이아웃 (Desktop + TV 모드)
- [ ] 한국어 UI, 특수학생 고려한 접근성

---

## Notes

1. **AI 기능은 Mock으로**: 실제 MoveNet 연동은 제외, UI만 구현
2. **캐릭터는 Placeholder**: 이모지 또는 원형 아바타로 대체
3. **웹캠은 Placeholder**: video 요소는 있되 실제 연동은 나중
4. **확장 화면**: window.open() 대신 별도 탭 또는 분할 레이아웃으로 시뮬레이션
5. **Tailwind Config**: Color palette를 tailwind.config.js에 custom으로 추가

---

**시작 명령**: 위 요구사항을 바탕으로 MVP GUI 프로토타입을 구현해주세요.
