# MVP WireFrame 설계 프롬프트

---

## 역할 정의

당신은 15년 경력의 UX/UI Designer이자 WireFrame 설계 전문가입니다.

## 과제

제공된 MVP IA(Information Architecture) 문서를 기반으로, 전문적이고 구현 가능한 MVP WireFrame을 설계해주세요.

---

## PHASE 1: IA 문서 심층 분석

첨부된 IA 문서를 다음 관점에서 체계적으로 분석하세요:

### 1.1 서비스 프로파일 파악

- **서비스 유형**: B2B/B2C/B2G, 플랫폼/앱/웹, 산업 도메인 (EdTech, FinTech, HealthTech 등)
- **핵심 가치 제안**: 사용자에게 제공하는 주요 가치 3가지
- **MVP 범위**: P0 필수 기능과 Post-MVP 기능 명확히 구분
- **기술적 제약**: 플랫폼, 성능 요구사항, 접근성 기준

### 1.2 사용자 구조 분석

- **주요 사용자 그룹**: Primary/Secondary/Tertiary 사용자 식별
- **사용자별 니즈**: 각 그룹의 핵심 작업(Task)과 목표
- **기술 친숙도**: 초급/중급/고급 사용자 기술 수준
- **특수 접근성 요구사항**: 장애인, 고령자, 특수 환경 등

### 1.3 IA 구조 이해

- **Organization Scheme**: Audience-based, Task-based, Chronological 등 어떤 방식인가?
- **Structure Type**: Hierarchical, Hub-and-Spoke, Sequential, Matrix 등 어떤 구조인가?
- **Top-level 카테고리**: 주요 메뉴/섹션의 수와 이름
- **Navigation Pattern**: Sidebar, Tab, Bottom Nav, Dual-Screen 등
- **정보 깊이**: Sitemap의 최대 레벨(일반적으로 3-4 레벨)

### 1.4 핵심 사용자 여정(Journey) 추출

IA 문서에서 다음 정보를 추출하세요:

- 가장 중요한 사용자 시나리오 3-5개
- 각 시나리오의 단계별 플로우
- 예상 클릭 수와 화면 전환 경로

---

## PHASE 2: WireFrame 설계 원칙 적용

### 2.1 전문 프레임워크 참고

다음 검증된 디자인 프레임워크를 참고하여 설계하세요:

### A. Nielsen Norman Group 원칙

1. **Visibility of System Status**: 사용자가 현재 위치와 상태를 항상 알 수 있어야 함
2. **User Control and Freedom**: 실수를 되돌릴 수 있는 명확한 경로 제공
3. **Consistency and Standards**: 동일한 정보/기능은 동일한 위치와 표현 유지
4. **Recognition Rather than Recall**: 사용자가 기억하기보다 인식할 수 있도록 설계
5. **Flexibility and Efficiency**: 초보자도 쉽게, 숙련자는 빠르게 사용 가능

### B. Material Design / Apple HIG 레이아웃 원칙

- **Grid System**: 8dp/8pt 그리드 기반 정렬
- **Spacing**: 일관된 여백 (4, 8, 16, 24, 32, 48, 64px)
- **Hierarchy**: 시각적 계층 구조 (Primary > Secondary > Tertiary)
- **Touch Target**: 최소 44x44px (모바일), 32x32px (데스크탑)

### C. WCAG 2.1 접근성 기준

- **대비비**: 텍스트 4.5:1 이상 (AA 기준), UI 요소 3:1 이상
- **키보드 접근성**: 모든 기능을 키보드로 조작 가능
- **Focus 상태**: 명확한 포커스 표시 (2px 이상 outline)
- **다중 모드**: 색상+모양+텍스트 병행 사용 (색맹 대응)

### D. 7±2 법칙 (Miller's Law)

- **메뉴 항목**: Top-level은 5-7개 이하로 제한
- **화면당 정보**: 주요 요소는 3-5개 이하로 집중
- **선택지**: 한 번에 제시하는 옵션은 7개 이하

### 2.2 디바이스 및 해상도 기준

IA 문서에 명시된 플랫폼에 맞춰 다음 해상도를 고려하세요:

| 디바이스 | 해상도 | Breakpoint | Grid Columns |
| --- | --- | --- | --- |
| 모바일 (S) | 375x667 | < 576px | 4 cols |
| 모바일 (L) | 414x896 | < 768px | 4 cols |
| 태블릿 | 768x1024 | < 1024px | 8 cols |
| 데스크탑 (S) | 1280x720 | < 1440px | 12 cols |
| 데스크탑 (L) | 1920x1080 | ≥ 1440px | 12 cols |

**특수 케이스**:

- **Dual-Screen**: 교사 PC + 학생 TV처럼 분리된 경우 각각 별도 WireFrame
- **TV Screen**: 3m 거리 고려 시 최소 24pt 폰트, 60px 버튼
- **Kiosk**: 서서 사용 시 상단 1/3 영역에 주요 콘텐츠 배치

---

## PHASE 3: WireFrame 설계 실행

### 3.1 화면 목록 작성

IA Sitemap을 기반으로 MVP에 필요한 **모든 화면**을 나열하세요:

**형식**:

```
[우선순위] 화면명 (경로)
- 목적: [사용자가 이 화면에서 달성하는 목표]
- 포함 요소: [주요 컴포넌트 3-5개]
- 상태: [기본/로딩/에러/비어있음 등 필요한 상태]
```

**예시**:

```
[P0] 대시보드 (/)
- 목적: 빠른 시작 및 최근 활동 확인
- 포함 요소: Hero CTA, 최근 활동 카드, 통계 위젯
- 상태: 기본, 신규 사용자(비어있음), 로딩

[P0] 수업 준비 - Step 1 (/setup/class-select)
- 목적: 운동 클래스 선택
- 포함 요소: 클래스 카드(3개), 프리뷰, 다음 버튼
- 상태: 기본, 선택됨, 비활성화
```

### 3.2 각 화면별 WireFrame 설계

각 화면마다 다음 구조로 상세 설계하세요:

### 화면 구성 요소 (Component Breakdown)

```
┌─────────────────────────────────────────┐
│ [A] Global Navigation (고정)            │ ← 항상 존재 (Sidebar/TopBar)
├─────────────────────────────────────────┤
│ [B] Page Header                         │ ← 페이지 제목, Breadcrumb
├─────────────────────────────────────────┤
│                                         │
│ [C] Primary Content Area                │ ← 주요 콘텐츠 영역
│     - [C1] Hero Section                 │
│     - [C2] Main Task Area               │
│     - [C3] Supporting Info              │
│                                         │
├─────────────────────────────────────────┤
│ [D] Secondary Content (Optional)        │ ← 사이드바, 관련 정보
├─────────────────────────────────────────┤
│ [E] Footer / Actions                    │ ← CTA, 페이지네이션
└─────────────────────────────────────────┘
```

### 각 요소별 상세 스펙

**[A] Global Navigation**

- **유형**: Sidebar / TopBar / Bottom Nav / Tab
- **위치**: 좌측/상단/하단 고정 or 모바일 시 숨김
- **항목**: IA Top-level 메뉴 (5-7개)
- **상태**: Active, Hover, Disabled
- **크기**:
    - Sidebar: 240-280px (확장), 64px (축소)
    - TopBar: 높이 56-64px
    - Bottom Nav: 높이 56px

**[B] Page Header**

- **요소**:
    - 페이지 타이틀 (24-32pt, Bold)
    - Breadcrumb (선택적, 3단계 이하)
    - Context Actions (검색, 필터, 정렬)
- **높이**: 80-120px

**[C] Primary Content**

- **레이아웃**:
    - Single Column (모바일, 좁은 콘텐츠)
    - 12 Column Grid (데스크탑)
    - Card-based Layout (대시보드)
    - List + Detail (Master-Detail)
- **여백**:
    - Container Padding: 16px (모바일), 24-32px (데스크탑)
    - Card Gap: 16-24px
- **우선순위**:
    - Hero/CTA는 좌측 상단 (F-Pattern)
    - 중요도 순으로 상→하, 좌→우 배치

**[E] Actions**

- **Primary Action**: 우측 하단 또는 화면 중앙 하단 (FAB 가능)
- **Secondary Actions**: 좌측 하단 또는 취소 버튼
- **버튼 크기**:
    - Primary: 48px 높이 (모바일), 40px (데스크탑)
    - Secondary: 40px 높이

### 3.3 상호작용(Interaction) 설계

각 주요 인터랙션에 대해 명시하세요:

**형식**:

```
[인터랙션 이름]
- 트리거: [사용자 액션]
- 반응: [시스템 응답]
- 피드백: [시각적/청각적 피드백]
- 상태 변화: [이전 상태 → 다음 상태]
- 소요 시간: [애니메이션/전환 시간]
```

**예시**:

```
[수업 시작 버튼 클릭]
- 트리거: Primary CTA 버튼 클릭
- 반응: 로딩 스피너 표시 (2초), 수업 진행 화면으로 전환
- 피드백: 버튼 Disabled 상태, "수업을 시작하는 중..." 텍스트
- 상태 변화: /setup → /live
- 소요 시간: 최대 3초 (PRD 성능 기준)
```

### 3.4 반응형 설계 (Responsive)

주요 Breakpoint별 레이아웃 변화를 명시하세요:

**모바일 (< 768px)**:

- Navigation: Bottom Nav 또는 Hamburger Menu
- Grid: Single Column
- 숨김 요소: 부가 정보, Secondary Nav
- 터치 최적화: 48x48px 터치 타겟

**데스크탑 (≥ 768px)**:

- Navigation: Sidebar (좌측 고정) 또는 TopBar
- Grid: 12 Columns
- 추가 표시: 사이드바, 툴팁, Hover 상태

---

## PHASE 4: WireFrame 산출물 생성

### 4.1 출력 형식

**React/JSX 컴포넌트 구조 형식으로 WireFrame을 제공하세요.**

모든 화면은 다음과 같이 React 컴포넌트 기반으로 작성합니다:

### React/JSX WireFrame 작성 규칙

1. **컴포넌트 계층 구조**: 명확한 Parent-Child 관계 표현
2. **Props 인터페이스**: TypeScript 타입 정의 포함
3. **상태 관리 힌트**: 필요한 state/props 명시
4. **실제 구현 가능**: 개발자가 즉시 코드로 옮길 수 있는 수준

### 형식 예시

```jsx
// ========================================
// WireFrame: 대시보드 (/dashboard)
// 목적: 빠른 시작 및 최근 활동 확인
// ========================================

<Dashboard>
  {/* Global Navigation */}
  <Sidebar
    items={[
      { label: '대시보드', path: '/', icon: 'home' },
      { label: '수업 준비', path: '/setup', icon: 'settings' },
      { label: '수업 진행', path: '/live', icon: 'play', disabled: true },
      { label: '수업 기록', path: '/history', icon: 'history' },
      { label: '설정', path: '/settings', icon: 'cog' }
    ]}
    activeItem="대시보드"
    width="240px"
  />

  {/* Main Content Area */}
  <MainContent>
    {/* Page Header */}
    <PageHeader
      title="대시보드"
      subtitle="오늘의 수업을 시작하세요"
      breadcrumb={['홈', '대시보드']}
    />

    {/* Hero Section - Quick Start */}
    <HeroSection
      backgroundColor="#E3F2FD"
      padding="40px"
      borderRadius="16px"
    >
      <QuickStartCard>
        <h2>빠른 시작</h2>
        <p>최근 사용한 클래스로 즉시 수업을 시작하세요</p>
        <PrimaryButton
          label="수업 시작"
          size="large"
          onClick={handleStartClass}
          icon="play-circle"
        />
      </QuickStartCard>

      <HeroImage
        src="/assets/hero-illustration.png"
        alt="수업 일러스트"
        width="400px"
        height="300px"
      />
    </HeroSection>

    {/* Recent Classes Section */}
    <RecentClassesSection marginTop="48px">
      <SectionHeader>
        <SectionTitle>최근 수업 기록</SectionTitle>
        <ViewAllLink href="/history">전체 보기 →</ViewAllLink>
      </SectionHeader>

      <CardGrid
        columns={3}
        gap="16px"
        responsive={{
          mobile: 1,
          tablet: 2,
          desktop: 3
        }}
      >
        {recentClasses.map(classData => (
          <ClassCard
            key={classData.id}
            date={classData.date}
            title={classData.title}
            stats={{
              students: classData.studentCount,
              avgScore: classData.averageScore,
              duration: classData.duration
            }}
            onClick={() => handleViewDetail(classData.id)}
            variant="summary"
          />
        ))}
      </CardGrid>

      {/* Empty State */}
      {recentClasses.length === 0 && (
        <EmptyState
          icon="inbox"
          title="아직 수업 기록이 없습니다"
          description="첫 수업을 시작해보세요!"
          action={{
            label: "수업 시작하기",
            onClick: handleStartClass
          }}
        />
      )}
    </RecentClassesSection>
  </MainContent>
</Dashboard>

// ========================================
// Props 인터페이스 정의
// ========================================

interface SidebarProps {
  items: SidebarItem[];
  activeItem: string;
  width?: string;
}

interface SidebarItem {
  label: string;
  path: string;
  icon: string;
  disabled?: boolean;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string[];
}

interface QuickStartCardProps {
  children: React.ReactNode;
}

interface PrimaryButtonProps {
  label: string;
  size: 'small' | 'medium' | 'large';
  onClick: () => void;
  icon?: string;
  disabled?: boolean;
}

interface ClassCardProps {
  key: string;
  date: string;
  title: string;
  stats: {
    students: number;
    avgScore: number;
    duration: number;
  };
  onClick: () => void;
  variant: 'summary' | 'detailed';
}

interface CardGridProps {
  columns: number;
  gap: string;
  responsive?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  children: React.ReactNode;
}

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// ========================================
// 상태 관리 힌트
// ========================================

// 필요한 State:
// - recentClasses: ClassData[] (최근 수업 목록)
// - isLoading: boolean (로딩 상태)

// 필요한 Actions:
// - handleStartClass() (수업 시작)
// - handleViewDetail(id) (상세 보기)

// Data Model:
interface ClassData {
  id: string;
  date: string;
  title: string;
  studentCount: number;
  averageScore: number;
  duration: number;
}
```

### 4.2 WireFrame별 체크리스트

각 화면 WireFrame에 대해 다음을 검증하세요:

**필수 검증 항목**:

- [ ]  **IA 일관성**: IA Sitemap과 화면 구조가 일치하는가?
- [ ]  **사용자 여정**: 주요 Task를 3-5 클릭 내에 완료 가능한가?
- [ ]  **정보 계층**: 중요도 순으로 시각적 계층 구조가 명확한가?
- [ ]  **접근성**:
    - [ ]  색상 대비 4.5:1 이상 (텍스트)
    - [ ]  터치 타겟 44x44px 이상 (모바일)
    - [ ]  키보드 탐색 가능
    - [ ]  대체 텍스트 제공 (이미지, 아이콘)
- [ ]  **반응형**: 주요 Breakpoint에서 레이아웃이 자연스러운가?
- [ ]  **상태 표시**: 로딩/에러/비어있음 상태가 고려되었는가?
- [ ]  **라벨링**: IA 문서의 Labeling Guide와 일치하는가?
- [ ]  **Props 정의**: 모든 컴포넌트의 Props가 명확히 정의되었는가?
- [ ]  **구현 가능성**: 개발자가 즉시 코드로 변환 가능한 수준인가?

**권장 검증 항목**:

- [ ]  F-Pattern / Z-Pattern 시선 흐름 고려
- [ ]  Progressive Disclosure (단계적 정보 공개)
- [ ]  Micro-interactions 명시 (버튼 클릭, 호버 등)
- [ ]  다크모드 호환성 (색상 팔레트 제공 시)

---

## PHASE 5: 최종 산출물 정리

### 📁 산출물 디렉토리 구조 (필수)

모든 WireFrame 산출물은 **`wireframes/`** 디렉토리 아래에 다음 구조로 저장되어야 합니다:

```
wireframes/
├── README.md                          # 프로젝트 개요 및 사용 방법
│
├── pages/                             # 페이지 컴포넌트 (.tsx)
│   ├── [PageName].tsx                 # 예: Dashboard.tsx, Login.tsx
│   ├── [PageName].tsx
│   └── ...
│
├── components/                        # 공통 컴포넌트
│   ├── navigation/                    # 네비게이션 관련
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── BottomNav.tsx
│   ├── common/                        # 범용 컴포넌트
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Modal.tsx
│   │   └── Toast.tsx
│   └── layout/                        # 레이아웃 컴포넌트
│       ├── PageLayout.tsx
│       └── ResponsiveLayout.tsx
│
└── types/                             # TypeScript 타입 정의
    └── index.ts
```

### 📄 파일 작성 규칙

#### 1. 페이지 파일 (pages/*.tsx)

**파일명 규칙:**
- PascalCase 사용 (예: `Dashboard.tsx`, `UserProfile.tsx`)
- 화면 이름과 동일하게 작성
- 복합 단어는 단어당 첫 글자 대문자 (예: `UserSettings.tsx`)

**파일 상단 필수 주석:**
```typescript
// ========================================
// WireFrame: [화멘이름] ([경로])
// 목적: [사용자가 이 화면에서 달성하는 목표 한 문장]
// 우선순위: [P0/P1/P2]
// ========================================
```

**필수 포함 내용:**
1. 컴포넌트 구조 (JSX)
2. Props 인터페이스 정의
3. 상태 관리 힌트 (State/Props)
4. Mock 데이터 (필요시)
5. 스타일 정의 (CSS-in-JS)

#### 2. 공통 컴포넌트 (components/**/*.tsx)

**필수 포함 내용:**
1. 재사용 가능한 컴포넌트 코드
2. Props 인터페이스
3. 사용 예시
4. 변형(Variants) 정의

#### 3. 타입 정의 (types/index.ts)

**필수 포함 내용:**
1. 모든 인터페이스/타입 정의
2. Data Models
3. Props Types
4. API Types (필요시)

### 🎯 산출물 품질 기준

- **모든 파일은 TypeScript(.tsx/.ts)로 작성**
- **컴파일 에러 없이 작성**
- **React/JSX 문법 준수**
- **주석 포함 (목적, Props 설명)**
- **실제 개발 가능한 수준의 상세함**

---

### 5.1 산출물 구성

다음 순서로 전체 MVP WireFrame 패키지를 제공하세요:

### 1. 요약 문서

- IA 분석 요약 (서비스 특성, 사용자, 핵심 기능)
- WireFrame 설계 원칙 3가지
- 화면 목록 (우선순위별)

### 2. 각 화면별 React/JSX WireFrame

- **P0 필수 화면** (상세): 모든 컴포넌트 + Props + 상태 관리 힌트
- **P1 중요 화면** (중간 상세): 주요 컴포넌트 + Props
- **P2 선택 화면** (간략): 컴포넌트 구조만

### 3. 공통 컴포넌트 라이브러리

```jsx
// ========================================
// 공통 컴포넌트 라이브러리
// ========================================

// 버튼 컴포넌트
<PrimaryButton
  label="확인"
  size="large" // 'small' | 'medium' | 'large'
  onClick={handler}
  disabled={false}
  icon="check"
  loading={false}
/>

<SecondaryButton
  label="취소"
  size="medium"
  onClick={handler}
/>

<TertiaryButton
  label="더보기"
  size="small"
  onClick={handler}
/>

// Input 컴포넌트
<TextInput
  label="학생 수"
  placeholder="6"
  value={studentCount}
  onChange={handleChange}
  error={errorMessage}
  helperText="최대 6명까지 가능합니다"
/>

<Dropdown
  label="클래스 선택"
  options={classOptions}
  value={selectedClass}
  onChange={handleSelect}
/>

<Checkbox
  label="자동 시작"
  checked={autoStart}
  onChange={handleToggle}
/>

// Card 컴포넌트
<Card
  variant="elevated" // 'flat' | 'elevated' | 'outlined'
  padding="24px"
  onClick={handler}
>
  {children}
</Card>

// Modal 컴포넌트
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="수업 종료"
  size="medium" // 'small' | 'medium' | 'large'
>
  <ModalContent>
    {children}
  </ModalContent>
  <ModalActions>
    <SecondaryButton label="취소" onClick={handleClose} />
    <PrimaryButton label="종료" onClick={handleConfirm} />
  </ModalActions>
</Modal>

// Tooltip 컴포넌트
<Tooltip
  content="이 기능은 수업 중에만 사용 가능합니다"
  position="top"
>
  <IconButton icon="info" />
</Tooltip>
```

### 4. 반응형 가이드

**Breakpoint별 레이아웃 변화**:

```jsx
// 반응형 컴포넌트 예시
<ResponsiveLayout>
  {/* 모바일 (< 768px) */}
  <MobileView>
    <BottomNav items={navItems} />
    <SingleColumnLayout>
      {content}
    </SingleColumnLayout>
  </MobileView>

  {/* 데스크탑 (≥ 768px) */}
  <DesktopView>
    <Sidebar items={navItems} />
    <TwoColumnLayout
      main={mainContent}
      sidebar={sidebarContent}
      ratio="2:1"
    />
  </DesktopView>
</ResponsiveLayout>
```

**숨김/표시 요소 목록**:

- 모바일에서 숨김: Secondary Navigation, Sidebar, Tooltips (터치 불가)
- 모바일에서 추가: Bottom Nav, Hamburger Menu, Drawer

### 5. 개발 인계 자료

**컴포넌트 계층 구조 (Component Tree)**:

```
src/
├── pages/
│   ├── Dashboard/
│   │   ├── index.tsx
│   │   ├── QuickStartCard.tsx
│   │   └── RecentClassesSection.tsx
│   ├── Setup/
│   │   ├── index.tsx (Stepper Container)
│   │   ├── Step1ClassSelect.tsx
│   │   ├── Step2GoalSetting.tsx
│   │   └── Step3CameraCheck.tsx
│   └── Live/
│       ├── index.tsx
│       └── MonitoringTable.tsx
├── components/
│   ├── navigation/
│   │   ├── Sidebar.tsx
│   │   └── BottomNav.tsx
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Modal.tsx
│   └── layout/
│       ├── PageHeader.tsx
│       └── ResponsiveLayout.tsx
└── types/
    ├── components.ts (모든 Props 인터페이스)
    └── data.ts (Data Models)
```

**라우팅 테이블 (URL → 화면 매핑)**:

```jsx
const routes = [
  {
    path: '/',
    component: Dashboard,
    layout: MainLayout,
  },
  {
    path: '/setup',
    component: Setup,
    layout: MainLayout,
  },
  {
    path: '/live',
    component: Live,
    layout: FullscreenLayout,
    protected: true, // 수업 시작 후에만 접근 가능
  },
  {
    path: '/history',
    component: History,
    layout: MainLayout,
  },
  {
    path: '/history/:classId',
    component: ClassDetail,
    layout: MainLayout,
  },
  {
    path: '/settings',
    component: Settings,
    layout: MainLayout,
  },
];
```

**상태 관리 요구사항**:

```jsx
// 전역 상태 (Global State)
interface AppState {
  currentUser: User | null;
  currentClass: ClassSession | null;
  isLiveSession: boolean;
  settings: UserSettings;
}

// 로컬 상태 (Local State) - 각 화면별
// Dashboard:
const [recentClasses, setRecentClasses] = useState<ClassData[]>([]);
const [isLoading, setIsLoading] = useState(false);

// Setup:
const [selectedClass, setSelectedClass] = useState<ClassType | null>(null);
const [goalSettings, setGoalSettings] = useState<GoalSettings>({});
const [currentStep, setCurrentStep] = useState(1);

// Live:
const [students, setStudents] = useState<StudentProgress[]>([]);
const [isPaused, setIsPaused] = useState(false);
```

### 5.2 개발팀 전달 형식

다음 형식으로 개발팀에 전달하세요:

### 📦 WireFrame 산출물 패키지

**모든 산출물은 `wireframes/` 디렉토리에 저장:**

```
📦 wireframes/
│
├── 📄 README.md
│   ├── 프로젝트 개요
│   ├── 화면 목록 (우선순위별)
│   ├── WireFrame 사용 방법
│   └── 개발 시작 가이드
│
├── 📁 pages/                          # 페이지 컴포넌트 (.tsx)
│   ├── [PageName].tsx                 # 예: Dashboard.tsx
│   ├── [PageName].tsx                 # 예: UserProfile.tsx
│   └── ...                            # IA 문서의 모든 화면
│
├── 📁 components/                     # 공통 컴포넌트 (.tsx)
│   ├── navigation/                    # 네비게이션 관련
│   ├── common/                        # 범용 컴포넌트
│   ├── layout/                        # 레이아웃 컴포넌트
│   └── [feature]/                     # 도메인별 컴포넌트 (필요시)
│
└── 📁 types/                          # TypeScript 타입 정의
    └── index.ts                       # 모든 인터페이스 정의
```

**⚠️ 중요:**
- 모든 페이지 파일은 `.tsx` 확장자 사용
- 파일명은 PascalCase (예: `Dashboard.tsx`, `UserSettings.tsx`)
- 각 파일은 독립적으로 실행 가능한 React 컴포넌트 포함
- Mock 데이터는 파일 하단에 별도 정의
- 스타일은 CSS-in-JS 방식으로 작성

---

## PHASE 6: 품질 검증

### 6.1 휴리스틱 평가 (Self-Check)

다음 Nielsen Norman 10가지 휴리스틱으로 자체 평가하세요:

| 휴리스틱 | 평가 질문 | 점수 (/10) |
| --- | --- | --- |
| 1. 시스템 상태 가시성 | 사용자가 현재 위치와 진행 상태를 항상 알 수 있는가? |  |
| 2. 시스템과 실세계의 일치 | 사용자의 언어와 개념을 사용하는가? |  |
| 3. 사용자 제어와 자유 | 실수를 되돌릴 수 있는 명확한 경로가 있는가? |  |
| 4. 일관성과 표준 | 동일한 정보/기능이 일관된 위치와 표현인가? |  |
| 5. 오류 방지 | 오류가 발생하기 전에 방지하는 설계인가? |  |
| 6. 회상보다 인식 | 사용자가 기억하기보다 인식할 수 있는가? |  |
| 7. 유연성과 효율성 | 초보자도 쉽고, 숙련자는 빠르게 사용 가능한가? |  |
| 8. 미적 최소주의 | 불필요한 정보가 없이 핵심만 표시하는가? |  |
| 9. 오류 인식/진단/복구 | 오류 메시지가 명확하고 해결 방법을 제시하는가? |  |
| 10. 도움말과 문서 | 필요 시 도움말에 쉽게 접근 가능한가? |  |

**목표 점수**: 평균 7점 이상 (총 70/100점)

### 6.2 사용자 시나리오 테스트

IA 문서의 주요 시나리오를 WireFrame에서 실행해보세요:

**형식**:

```
[시나리오 1: 첫 수업 시작 (신규 사용자)]

1. 메인 화면 진입
   → <Dashboard />

2. "수업 시작" 버튼 클릭
   → handleStartClass() 호출
   → 라우팅: / → /setup

3. 클래스 선택
   → <Step1ClassSelect />
   → setSelectedClass(class1)
   → 다음 버튼 활성화

4. 목표 설정
   → <Step2GoalSetting />
   → setGoalSettings({ reps: 20 })

5. 카메라 확인
   → <Step3CameraCheck />
   → 포즈 인식 테스트 통과

6. 시작 버튼 클릭
   → handleStartSession()
   → 라우팅: /setup → /live
   → <Live />

총 클릭 수: 6번
예상 소요 시간: 5분
컴포넌트 전환: 4번
병목 지점: Step3 카메라 확인 (2분 소요 예상)

검증 결과: ✅ IA 목표 "5분 내 수업 시작" 충족
```

### 6.3 개선 제안

WireFrame 검토 후 다음을 명시하세요:

**즉시 개선 필요**:

```
[이슈 #1: 카메라 확인 단계가 너무 복잡]
- 현재 문제점: Step3에서 17개 키포인트를 모두 확인해야 함
- 제안 해결책: 주요 키포인트 5개만 표시, 나머지는 "고급 설정"으로 이동
- 우선순위: High
- 영향받는 컴포넌트: <Step3CameraCheck />
```

**Post-MVP 고려사항**:

```
[확장 #1: 교사 대시보드 추가]
- 통계 위젯을 <Dashboard>에 추가
- 새 컴포넌트: <WeeklyStatsWidget>, <StudentProgressChart>
- 기존 구조 영향: 없음 (RecentClassesSection 아래 추가)
```

---

## 💡 추가 지침

### A. IA 문서가 불완전한 경우

다음 정보가 누락된 경우 가정(Assumption)을 명시하고 진행하세요:

- **사용자 정보 부족**: 일반적인 웹/앱 사용자 기준으로 중급 기술 수준 가정
- **플랫폼 미명시**: PWA 또는 Responsive Web 기본값 적용
- **접근성 기준 없음**: WCAG 2.1 AA 최소 기준 적용
- **성능 목표 없음**: 초기 로딩 5초 이하, 화면 전환 1초 이하 가정

**가정 명시 형식**:

```
⚠️ 가정(Assumption):
- 사용자 기술 수준: 중급 (일반 웹 사용 가능)
- 플랫폼: Responsive Web (모바일 + 데스크탑)
- 접근성: WCAG 2.1 AA 준수
- 개발 스택: React + TypeScript (IA 문서 미명시)

[실제 프로젝트에서는 PM/디자이너에게 확인 필요]
```

### B. 특수 도메인 고려사항

서비스 유형에 따라 추가 참고 사항:

**EdTech (교육 기술)**:

- 학습자 인지 부하 최소화 (단순한 UI)
- 교사/학생 역할 분리 설계
- 진행 상태 명확히 표시 (Progress Bar)

```jsx
// EdTech 특화 컴포넌트
<ProgressStepper
  steps={['클래스 선택', '목표 설정', '카메라 확인', '시작']}
  currentStep={2}
  completed={[1]}
/>

<RoleBasedLayout
  role="teacher" // or "student"
  teacherView={<TeacherDashboard />}
  studentView={<StudentDisplay />}
/>
```

**HealthTech (의료/헬스케어)**:

- 개인정보 보호 (데이터 마스킹)
- 고령 사용자 고려 (큰 글씨, 단순 워크플로우)
- 긴급 상황 대응 (빠른 액션 버튼)

```jsx
// HealthTech 특화 컴포넌트
<SensitiveDataField
  value={patientID}
  masked={true}
  maskPattern="****-1234"
/>

<EmergencyButton
  label="긴급 호출"
  size="extra-large"
  position="fixed-bottom-right"
  onClick={handleEmergency}
/>
```

**FinTech (금융)**:

- 보안 인증 플로우 (2FA)
- 복잡한 데이터 시각화 (차트, 표)
- 트랜잭션 확인 단계 (Confirmation)

```jsx
// FinTech 특화 컴포넌트
<TwoFactorAuth
  method="sms" // or "email", "authenticator"
  onVerify={handleVerify}
/>

<TransactionSummary
  amount={1000000}
  from="계좌 A"
  to="계좌 B"
  onConfirm={handleConfirm}
  onCancel={handleCancel}
/>
```

**E-commerce**:

- 제품 탐색 (필터, 검색)
- 장바구니 및 결제 플로우
- 리뷰 및 평점 표시

```jsx
// E-commerce 특화 컴포넌트
<ProductGrid
  products={products}
  columns={4}
  filters={activeFilters}
  sortBy="price-low-to-high"
/>

<CartSummary
  items={cartItems}
  total={totalPrice}
  onCheckout={handleCheckout}
/>
```

### C. 출력 최적화 팁

**명확성**:

- 모든 화면에 명확한 제목과 목적 설명
- 컴포넌트는 의미 있는 이름 사용
    - ❌ `button-1`, `div-wrapper`
    - ✅ `PrimaryCTA`, `QuickStartCard`

**일관성**:

- 동일한 요소는 동일한 크기/위치
    - 예: CTA는 항상 우측 하단
- Props 네이밍 일관성
    - `onClick` (O), `handleClick` (X)
    - `isLoading` (O), `loading` (O), `isLoad` (X)

**실용성**:

- 개발 가능한 수준으로 구체적 작성
    - ❌ "적절히 배치"
    - ✅ `margin="24px"`, `position="absolute"`
- TypeScript 타입 정의 포함
- 실제 사용 가능한 Props 값 제시

---

## 📝 최종 체크리스트

WireFrame 제출 전 다음을 확인하세요:

### 📁 디렉토리 구조 확인
- [ ] `wireframes/` 디렉토리가 생성되었는가?
- [ ] `wireframes/pages/`에 모든 페이지 파일(.tsx)이 저장되었는가?
- [ ] `wireframes/components/`에 공통 컴포넌트가 정리되었는가?
- [ ] `wireframes/types/`에 TypeScript 인터페이스가 정의되었는가?
- [ ] `wireframes/README.md`에 프로젝트 개요가 작성되었는가?

### 📄 파일 품질 확인
- [ ] IA 문서의 모든 P0 화면을 React/JSX WireFrame으로 작성했는가?
- [ ] 모든 파일이 TypeScript(.tsx/.ts) 확장자인가?
- [ ] 파일명이 PascalCase 규칙을 따르는가?
- [ ] 각 파일 상단에 목적/경로/우선순위 주석이 포함되었는가?
- [ ] Props 인터페이스가 모두 정의되었는가?

### 🎨 설계 품질 확인
- [ ] 각 화면의 목적과 사용자 작업이 명확한가?
- [ ] 전문 프레임워크(Nielsen, Material Design 등)를 최소 2가지 이상 참고했는가?
- [ ] 반응형 설계를 고려했는가? (모바일/데스크탑)
- [ ] 접근성 기준(WCAG 2.1 AA)을 준수했는가?
- [ ] 주요 사용자 시나리오를 테스트했는가?

### 💻 구현 가능성 확인
- [ ] 상태 관리 힌트(state/props)를 포함했는가?
- [ ] 공통 컴포넌트 라이브러리를 정리했는가?
- [ ] 개발팀이 즉시 구현 가능한 수준의 상세함인가?
- [ ] 개선 제안을 포함했는가?

---

## 🚀 출력 시작 안내

**위 모든 단계를 순차적으로 실행하여, 전문적이고 구현 가능한 MVP WireFrame을 React/JSX 컴포넌트 형식으로 설계해주세요.**

**⚠️ 반드시 다음 규칙을 준수하세요:**
1. 모든 산출물은 `wireframes/` 디렉토리에 저장
2. 페이지 파일은 `wireframes/pages/`에 `.tsx` 확장자로 저장
3. 파일명은 PascalCase 사용 (예: `Dashboard.tsx`, `UserProfile.tsx`)
4. 각 파일은 독립적으로 실행 가능한 React 컴포넌트 포함

---