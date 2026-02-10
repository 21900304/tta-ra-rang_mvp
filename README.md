# 따라랑 (Tta-ra-rang) MVP

> "선생님 따라, 화면 따라" - 특수학급 AI 체육 플랫폼

## 프로젝트 소개

따라랑은 특수학급 체육 교사와 학생(5-7명)을 위한 AI 기반 체육 플랫폼입니다. React PWA로 구현되어 브라우저에서 바로 실행되며, 별도 설치가 필요 없습니다.

### 주요 기능

- **4단계 플로우**: Home → Setup → Calibration → Play Mode
- **이원화 화면**: 교사용 제어 화면 + 학생용 TV 화면
- **실시간 모니터링**: 학생별 운동 진행도 추적
- **Mock 데이터**: AI 기능은 Mock으로 시뮬레이션

## 기술 스택

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (수동 구현)
- **Routing**: React Router DOM
- **Icons**: Emoji 기반

## 디자인 시스템

### 색상 팔레트

- **Primary**: `#005EB8` (Energy Royal Blue) - 서비스 브랜딩, 구조적 요소
- **Accent**: `#FFB81C` (Action Amber) - 진행 상태, 카운팅, 강조
- **Success**: `#D5281B` (Primary Red) - 성공 피드백
- **Background**: `#F3F3F3` (Neutral Light Grey) - 전체 배경
- **Text**: `#212B32` (Dark Charcoal) - 메인 텍스트

## 시작하기

### 필수 요구사항

- Node.js 18.x 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 미리보기
npm run preview
```

### 개발 서버 실행 후

1. 브라우저에서 `http://localhost:5173` 접속
2. "수업 시작하기" 버튼 클릭
3. 운동 선택 및 학생 인원 설정 (1-6명)
4. "학생용 창 열기" 버튼으로 TV 화면 오픈 (선택)
5. 캘리브레이션 대기 (자동으로 진행)
6. 교사용 화면에서 운동 시작

## 프로젝트 구조

```
src/
├── pages/              # 페이지 컴포넌트
│   ├── Home.tsx
│   ├── Setup.tsx
│   ├── Calibration.tsx
│   └── Play/
│       ├── TeacherView.tsx
│       └── StudentView.tsx
├── components/
│   ├── ui/            # shadcn/ui 스타일 기본 컴포넌트
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── progress.tsx
│   │   └── avatar.tsx
│   └── features/      # 기능별 컴포넌트
│       ├── ExerciseCard.tsx
│       ├── StudentSlot.tsx
│       ├── CountDisplay.tsx
│       ├── ControlButtons.tsx
│       └── ProgressBar.tsx
├── types/             # TypeScript 타입 정의
│   └── index.ts
├── lib/              # 유틸리티 및 Mock 데이터
│   ├── utils.ts
│   └── mockData.ts
├── App.tsx           # 라우팅 설정
└── main.tsx          # 엔트리 포인트
```

## 페이지별 설명

### 1. Home (/)

- 서비스 소개 및 시작 화면
- "수업 시작하기" CTA 버튼

### 2. Setup (/setup)

- **운동 선택**: Class 1 (스쿼트 → 푸쉬업 → 버피)
- **학생 인원 설정**: 1-6명 선택
- **화면 확장**: 학생용 창 열기 (TV용)

### 3. Calibration (/calibration)

- **웹캠 Placeholder**: 카메라 연결 시뮬레이션
- **캐릭터 매칭**: 학생별 캐릭터 할당
- **자동 진행**: 0.8초마다 학생 인식

### 4. Play Mode

#### Teacher View (/play/teacher)

- 운동 제어 버튼 (시작/일시정지, 다음, 종료)
- 학생별 모니터링 리스트
- 실시간 피드백 로그
- 전체 진행률 표시

#### Student View (/play/student)

- 큰 캐릭터 슬롯 (6개)
- 중앙 카운트 디스플레이 (대형 폰트)
- 진행 바
- 피드백 오버레이 (3초 자동 사라짐)

## Mock 데이터 시뮬레이션

### 카운트 증가

- 2초마다 랜덤 학생의 카운트 +1
- 목표치 도달 시 증가 중지

### 피드백 메시지

- 5초마다 랜덤 피드백 표시
- 8개 메시지 풀 사용

### 캐릭터

- 6개 이모지 캐릭터: 🦁 🐯 🐻 🦊 🐰 🐼

## 접근성

- 최소 폰트 크기: 16px (모바일), 18-24px (데스크톱)
- 버튼 최소 높이: 56px (터치 friendly)
- 색상 대비: WCAG AA 4.5:1 이상
- 키보드 네비게이션 지원

## 향후 개발 계획

- [ ] 실제 TensorFlow.js MoveNet 연동
- [ ] 웹캠 실시간 스트리밍
- [ ] PWA 설치 기능
- [ ] 다양한 운동 클래스 추가
- [ ] 운동 기록 저장 기능

## 라이선스

MIT

## 문의

프로젝트 관련 문의사항은 이슈를 통해 남겨주세요.
