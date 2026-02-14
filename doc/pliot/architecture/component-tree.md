# 컴포넌트 계층 구조

## 📁 디렉토리 구조

```
src/
├── pages/                          # 페이지 컴포넌트
│   ├── Dashboard/
│   │   ├── index.tsx               # 대시보드 메인
│   │   ├── QuickStartCard.tsx      # 빠른 시작 카드
│   │   └── ClassCard.tsx           # 클래스 카드
│   │
│   ├── Session/
│   │   ├── index.tsx               # 세션 레이아웃
│   │   ├── TeacherView.tsx         # 교사용 뷰
│   │   ├── StudentView.tsx         # 학생용 뷰
│   │   ├── StudentGrid.tsx         # 학생 그리드
│   │   ├── ControlBar.tsx          # 제어 바
│   │   ├── FeedbackLog.tsx         # 피드백 로그
│   │   └── ExerciseDisplay.tsx     # 운영 표시
│   │
│   ├── Calibration/
│   │   ├── index.tsx               # 캘리브레이션 메인
│   │   ├── CameraView.tsx          # 침궤 뷰
│   │   └── CharacterSlots.tsx      # 캐릭터 슬롯
│   │
│   ├── Results/
│   │   ├── index.tsx               # 결과 메인
│   │   ├── SummarySection.tsx      # 요약 섹션
│   │   └── StudentResultCard.tsx   # 학생 결과 카드
│   │
│   ├── Classes/
│   │   ├── index.tsx               # 클래스 목록
│   │   └── ClassEditor.tsx         # 클래스 편집
│   │
│   └── Settings/
│       ├── index.tsx               # 설정 메인
│       └── SettingsSection.tsx     # 설정 섹션
│
├── components/                     # 재사용 컴포넌트
│   ├── navigation/
│   │   ├── Sidebar.tsx             # 사이드바
│   │   ├── Header.tsx              # 헤더
│   │   └── BottomNav.tsx           # 하단 네비게이션 (모바일)
│   │
│   ├── common/
│   │   ├── Button.tsx              # 버튼
│   │   ├── Card.tsx                # 카드
│   │   ├── Input.tsx               # 입력 필드
│   │   ├── Select.tsx              # 선택 필드
│   │   ├── Toggle.tsx              # 토글
│   │   ├── ProgressBar.tsx         # 프로그레스 바
│   │   ├── Modal.tsx               # 모달
│   │   └── Toast.tsx               # 토스트
│   │
│   ├── layout/
│   │   ├── PageLayout.tsx          # 페이지 레이아웃
│   │   ├── ResponsiveLayout.tsx    # 반응형 레이아웃
│   │   └── Grid.tsx                # 그리드
│   │
│   ├── session/
│   │   ├── CharacterAvatar.tsx     # 캐릭터 아바타
│   │   ├── StudentCard.tsx         # 학생 카드
│   │   ├── ExerciseDisplay.tsx     # 운영 표시
│   │   └── FeedbackBubble.tsx      # 피드백 버블
│   │
│   └── calibration/
│       ├── PoseOverlay.tsx         # 포즈 오버레이
│       └── MatchingStatus.tsx      # 매칭 상태
│
├── hooks/                          # 커스텀 훅
│   ├── usePoseDetection.ts         # 포즈 감지
│   ├── useExerciseCounter.ts       # 운영 카운터
│   ├── useCalibration.ts           # 캘리브레이션
│   ├── useSession.ts               # 세션 관리
│   └── useResponsive.ts            # 반응형
│
├── context/                        # 상태 관리
│   ├── SessionContext.tsx          # 세션 상태
│   ├── SettingsContext.tsx         # 설정 상태
│   └── AuthContext.tsx             # 인증 상태
│
├── types/                          # 타입 정의
│   ├── components.ts               # 컴포넌트 타입
│   ├── data.ts                     # 데이터 타입
│   └── api.ts                      # API 타입
│
└── utils/                          # 유틸리티
    ├── constants.ts                # 상수
    ├── helpers.ts                  # 헬퍼 함수
    └── validators.ts               # 유효성 검사
```

---

## 🧩 컴포넌트 계층도

### 1. 페이지 레벨

```
App
├── Routes
│   ├── Dashboard (/
│   │   ├── PageLayout
│   │   │   ├── Sidebar
│   │   │   ├── Header
│   │   │   └── MainContent
│   │   │       ├── QuickStartCard
│   │   │       └── ClassCard[]
│   │
│   ├── Calibration (/calibration
│   │   ├── SimpleLayout
│   │   │   ├── Header
│   │   │   └── MainContent
│   │   │       ├── CameraView
│   │   │       ├── CharacterSlots
│   │   │       └── ActionButtons
│   │
│   ├── Session (/session
│   │   ├── SessionLayout
│   │   │   ├── TeacherView (/session/teacher
│   │   │   │   ├── TopBar
│   │   │   │   ├── StudentGrid
│   │   │   │   │   └── StudentCard[6]
│   │   │   │   ├── RightSidebar
│   │   │   │   │   ├── MiniCameraView
│   │   │   │   │   └── FeedbackLog
│   │   │   │   └── ControlBar
│   │   │   │
│   │   │   └── StudentView (/session/student
│   │   │       ├── TopSection
│   │   │       ├── CharacterSection
│   │   │       │   └── CharacterDisplay[6]
│   │   │       └── BottomSection
│   │   │           └── FeedbackArea
│   │
│   ├── Results (/results
│   │   ├── PageLayout
│   │   │   ├── SummarySection
│   │   │   ├── StudentResultsList
│   │   │   │   └── StudentResultCard[]
│   │   │   └── ActionButtons
│   │
│   ├── Classes (/classes
│   │   ├── PageLayout
│   │   │   ├── ClassList
│   │   │   │   └── ClassCard[]
│   │   │   └── CreateClassCard
│   │
│   └── Settings (/settings
│       ├── PageLayout
│       └── SettingsSection[]
```

### 2. 공통 컴포넌트 계층

```
Common Components
├── Button
│   ├── PrimaryButton
│   ├── SecondaryButton
│   └── IconButton
│
├── Input
│   ├── TextInput
│   ├── NumberInput
│   └── Select
│
├── Feedback
│   ├── ProgressBar
│   ├── Toast
│   └── Modal
│
└── Layout
    ├── Card
    ├── Grid
    └── Container
```

---

## 📦 컴포넌트 의존성

### 핵심 의존성 흐름

```
┌─────────────────────────────────────────────┐
│              Page Components                │
│  (Dashboard, Session, Calibration, etc.)    │
└─────────────────┬───────────────────────────┘
                  │ imports
                  ▼
┌─────────────────────────────────────────────┐
│           Feature Components                │
│  (StudentCard, CharacterAvatar, etc.)       │
└─────────────────┬───────────────────────────┘
                  │ imports
                  ▼
┌─────────────────────────────────────────────┐
│            Common Components                │
│  (Button, Card, Input, ProgressBar)         │
└─────────────────┬───────────────────────────┘
                  │ imports
                  ▼
┌─────────────────────────────────────────────┐
│               Base/UI                       │
│  (HTML primitives, CSS utilities)           │
└─────────────────────────────────────────────┘
```

### Context 의존성

```
SessionContext
├── TeacherView
├── StudentView
└── Calibration

SettingsContext
├── Dashboard
├── Session
└── Settings

AuthContext
├── All Pages (protected routes)
```

---

## 🎨 컴포넌트 Props 인터페이스

### Button Props
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  width?: string;
  height?: string;
}
```

### Card Props
```typescript
interface CardProps {
  variant?: 'flat' | 'elevated' | 'outlined';
  padding?: string;
  borderRadius?: string;
  backgroundColor?: string;
  onClick?: () => void;
  children: React.ReactNode;
}
```

### StudentCard Props
```typescript
interface StudentCardProps {
  student: Student;
  currentReps: number;
  targetReps: number;
  isDetected: boolean;
  status: 'waiting' | 'doing' | 'completed' | 'struggling';
}
```

### ProgressBar Props
```typescript
interface ProgressBarProps {
  value: number;
  max: number;
  height?: string;
  backgroundColor?: string;
  fillColor?: string;
  showLabel?: boolean;
}
```

---

## 🔄 상태 관리 연결

### 전역 상태 (Context)

```typescript
// SessionContext
interface SessionState {
  students: StudentProgress[];
  currentExercise: Exercise;
  isPaused: boolean;
  startTime: Date;
}

// SettingsContext
interface SettingsState {
  camera: string;
  resolution: string;
  volume: number;
  highContrast: boolean;
  largeText: boolean;
}
```

### 로컬 상태 (useState)

```typescript
// Dashboard
const [selectedClass, setSelectedClass] = useState<Class | null>(null);

// Calibration
const [matchedStudents, setMatchedStudents] = useState<(Student | null)[]>([]);

// Session
const [isPaused, setIsPaused] = useState(false);
const [volume, setVolume] = useState(80);
```

---

## 📝 구현 우선순위

### Phase 1: Core (P0)
- [x] PageLayout, Sidebar, Header
- [x] Button, Card, ProgressBar
- [x] Dashboard
- [x] Calibration
- [x] TeacherSession (StudentGrid, ControlBar)
- [x] StudentSession (CharacterDisplay)
- [x] Results

### Phase 2: Management (P1)
- [x] Classes (ClassList, ClassEditor)

### Phase 3: Utility (P2)
- [x] Settings
- [x] Toast, Modal
- [x] ResponsiveLayout

---

## 🔗 참조 관계

| 컴포넌트 | 의존 컴포넌트 | 의존 Hook | 의존 Context |
|----------|---------------|-----------|--------------|
| Dashboard | Sidebar, Header, Card, Button | - | SettingsContext |
| Calibration | CameraView, CharacterSlots, Button | useCalibration | SessionContext |
| TeacherSession | StudentGrid, ControlBar, FeedbackLog | useSession | SessionContext |
| StudentSession | CharacterAvatar, ProgressBar | useSession | SessionContext |
| Results | StudentResultCard, ProgressBar | - | - |
| Classes | ClassCard, Button | - | - |
| Settings | Toggle, Input | - | SettingsContext |
