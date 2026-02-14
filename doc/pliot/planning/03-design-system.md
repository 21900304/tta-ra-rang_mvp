# 03. 디자인 시스템

## 🎨 색상 팔레트

### Primary Colors
```css
--color-primary: #005EB8;          /* Energy Royal Blue - 주요 액션, 네비게이션 */
--color-primary-hover: #004C96;    /* Primary Dark - 호버 상태 */
--color-primary-light: #E8F4FD;    /* Primary Light - 배경 강조 */
```

### Secondary Colors
```css
--color-secondary: #FFB81C;        /* Action Amber - 강조, 게이미피케이션 */
--color-secondary-hover: #E5A519;  /* Secondary Dark - 호버 상태 */
--color-secondary-light: #FFF8E1;  /* Secondary Light - 배경 강조 */
```

### Accent Colors
```css
--color-accent: #D5281B;           /* Primary Red - 피드백, 경고 */
--color-success: #4CAF50;          /* Success Green - 완료, 성공 */
--color-warning: #FF9800;          /* Warning Orange - 주의, 진행 중 */
```

### Neutral Colors
```css
--color-text-primary: #212B32;     /* Dark Charcoal - 주요 텍스트 */
--color-text-secondary: #425563;   /* Secondary Text - 보조 텍스트 */
--color-text-muted: #768692;       /* Muted Text - 비활성 텍스트 */
--color-border: #E8EDEE;           /* Border Light - 테두리 */
--color-background: #F8F9FA;       /* Background Grey - 배경 */
--color-white: #FFFFFF;            /* White - 카드 배경 */
```

### 색상 사용 가이드

| 용도 | 색상 | 예시 |
|------|------|------|
| 주요 버튼 | #005EB8 | "수업 시작하기" |
| 강조 텍스트 | #FFB81C | 학생용 카운트 숫자 |
| 성공 상태 | #4CAF50 | 완료 배지 |
| 경고 상태 | #FF9800 | 진행 중 표시 |
| 에러 상태 | #D5281B | 오류 메시지 |
| 배경 | #F8F9FA | 페이지 배경 |
| 카드 배경 | #FFFFFF | 컴포넌트 배경 |

---

## 🔤 타이포그래피

### Font Stack
```css
--font-primary: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-display: 'Pretendard', sans-serif;  /* 학생용 큰 글씨 */
```

### Type Scale

| 레벨 | 크기 | 굵기 | 행간 | 용도 |
|------|------|------|------|------|
| **Display** | 48px | 700 (Bold) | 1.2 | 학생용 카운트, 축하 메시지 |
| **H1** | 32px | 700 (Bold) | 1.3 | 페이지 제목 |
| **H2** | 28px | 700 (Bold) | 1.3 | 섹션 제목 |
| **H3** | 20px | 600 (SemiBold) | 1.4 | 카드 제목 |
| **H4** | 18px | 600 (SemiBold) | 1.4 | 서브섹션 제목 |
| **Body Large** | 18px | 400 (Regular) | 1.6 | 강조 본문 |
| **Body** | 16px | 400 (Regular) | 1.6 | 기본 본문 |
| **Caption** | 14px | 400 (Regular) | 1.5 | 캡션, 메타 정보 |
| **Small** | 12px | 400 (Regular) | 1.4 | 타임스탬프, 라벨 |

### 타이포그래피 사용 예시

```
Display (48px Bold):      15 / 20    [학생용 카운터]
H1 (32px Bold):           수업 결과   [페이지 제목]
H2 (28px Bold):           빠른 시작   [섹션 제목]
H3 (20px SemiBold):       Class 1    [카드 제목]
Body (16px Regular):      클래스를 선택하세요 [본문]
Caption (14px Regular):   마지막 사용: 2일 전 [메타]
```

---

## 📐 레이아웃 & 그리드

### Grid System
- **Desktop**: 12열 그리드
- **Tablet**: 8열 그리드
- **Mobile**: 4열 그리드

### Spacing Scale
```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
--space-3xl: 64px;
```

### Container Widths
```css
--container-sm: 640px;    /* 모바일 */
--container-md: 768px;    /* 태블릿 */
--container-lg: 1024px;   /* 작은 데스크탑 */
--container-xl: 1280px;   /* 데스크탑 */
--container-2xl: 1440px;  /* 큰 데스크탑 */
```

### 레이아웃 구성 요소

#### Page Layout
```
┌─────────────────────────────────────┐
│ Header (64px)                       │
├──────────┬──────────────────────────┤
│          │                          │
│ Sidebar  │    Main Content          │
│ (240px)  │    (flex: 1)             │
│          │                          │
│          │                          │
└──────────┴──────────────────────────┘
```

#### Card Layout
```
┌─────────────────────────────┐
│ Padding: 24px               │
│                             │
│  [Content]                  │
│                             │
│                             │
└─────────────────────────────┘
Border Radius: 12px
Background: #FFFFFF
Border: 1px solid #E8EDEE (선택적)
```

---

## 🎛️ 컴포넌트 스펙

### Buttons

#### Primary Button
```
Height: 48px (default), 56px (large), 40px (small)
Padding: 0 24px
Border Radius: 8px
Background: #005EB8
Color: #FFFFFF
Font Size: 16px (default), 18px (large), 14px (small)
Font Weight: 600

Hover: Background #004C96
Active: Background #003D78
Disabled: Background #E8EDEE, Color #768692
```

#### Secondary Button
```
Height: 48px (default)
Padding: 0 24px
Border Radius: 8px
Background: #FFFFFF
Border: 1px solid #005EB8
Color: #005EB8

Hover: Background #E8F4FD
Active: Background #D6E9F8
```

#### Icon Button
```
Size: 40px (default), 48px (large), 32px (small)
Border Radius: 8px
Background: transparent
Icon Size: 20px (default), 24px (large), 16px (small)

Hover: Background #F3F3F3
```

### Inputs

#### Text Input
```
Height: 48px
Padding: 0 16px
Border Radius: 8px
Border: 1px solid #E8EDEE
Background: #FFFFFF
Font Size: 16px

Focus: Border #005EB8, Box Shadow 0 0 0 3px rgba(0, 94, 184, 0.1)
Error: Border #D5281B, Background #FEF2F2
```

#### Dropdown
```
Height: 48px
Padding: 0 16px
Border Radius: 8px
Border: 1px solid #E8EDEE
Background: #FFFFFF
Font Size: 16px

Dropdown Menu:
- Background: #FFFFFF
- Border: 1px solid #E8EDEE
- Border Radius: 8px
- Box Shadow: 0 4px 12px rgba(0,0,0,0.1)
```

### Cards

#### Default Card
```
Padding: 24px
Border Radius: 12px
Background: #FFFFFF
Border: 1px solid #E8EDEE

Hover (선택적):
- Box Shadow: 0 4px 12px rgba(0,0,0,0.1)
- Transform: translateY(-2px)
```

#### Elevated Card
```
Padding: 24px
Border Radius: 12px
Background: #FFFFFF
Box Shadow: 0 2px 8px rgba(0,0,0,0.08)
```

### Progress Bar

#### Default Progress Bar
```
Height: 8px (default), 12px (large), 16px (extra large)
Border Radius: 4px (height/2)
Background: #E8EDEE
Fill: #005EB8

Animated: transition width 0.3s ease
```

#### Student Progress (Circular)
```
Size: 64px (default), 80px (large)
Stroke Width: 6px
Background Track: #E8EDEE
Fill: #005EB8 (또는 상태에 따라 #4CAF50, #FF9800)
```

---

## 🖼️ 아이콘 & 이미지

### Icon System
- **Library**: Lucide React (shadcn/ui 기본)
- **Size**: 16px (sm), 20px (md), 24px (lg), 32px (xl)
- **Stroke Width**: 2px

### 주요 아이콘

| 용도 | 아이콘 | 이름 |
|------|--------|------|
| 대시보드 | 🏠 | Home |
| 수업 시작 | ▶️ | Play |
| 일시정지 | ⏸️ | Pause |
| 종료 | ⏹️ | Square |
| 설정 | ⚙️ | Settings |
| 사용자 | 👤 | User |
| 침궤 | 📷 | Camera |
| 완료 | ✅ | Check |
| 경고 | ⚠️ | Alert |
| 정보 | ℹ️ | Info |

### 캐릭터 아바타

#### Size Variants
```
XS: 40px (모바일 목록)
SM: 56px (카드 내)
MD: 64px (기본)
LG: 80px (학생 카드)
XL: 120px (학생용 TV)
```

#### Character Set (6개)
1. 🐻 곰돌이 (갈색)
2. 🐰 토끼 (흰색)
3. 🐱 고양이 (주황색)
4. 🐶 강아지 (갈색)
5. 🐼 판다 (흑백)
6. 🦊 여우 (주황색)

---

## 📱 반응형 브레이크포인트

### Breakpoint Definitions
```css
--breakpoint-sm: 576px;   /* 모바일 (S) */
--breakpoint-md: 768px;   /* 모바일 (L) */
--breakpoint-lg: 1024px;  /* 태블릿 */
--breakpoint-xl: 1280px;  /* 데스크탑 (S) */
--breakpoint-2xl: 1440px; /* 데스크탑 (L) */
```

### 레이아웃 변화

#### Desktop (≥ 1024px)
```
- Sidebar: 240px (전체 표시)
- Main Content: 12열 그리드
- Student Grid: 3x2
- Right Sidebar: 320px (표시)
```

#### Tablet (768px ~ 1023px)
```
- Sidebar: 64px (축소, 아이콘만)
- Main Content: 8열 그리드
- Student Grid: 3x2
- Right Sidebar: 숨김
```

#### Mobile (< 768px)
```
- Sidebar: 숨김 (햄버거 메뉴)
- Main Content: 4열 그리드
- Student Grid: 2x3 (스크롤)
- Bottom Nav: 표시
```

---

## ♿ 접근성 가이드라인

### 색상 대비 (WCAG AA)
- **일반 텍스트**: 4.5:1 이상
- **큰 텍스트 (18pt+)**: 3:1 이상
- **UI 구성요소**: 3:1 이상

#### 검증된 조합
```
#005EB8 on #FFFFFF: 5.2:1 ✅
#212B32 on #FFFFFF: 12.5:1 ✅
#FFFFFF on #005EB8: 5.2:1 ✅
#FFB81C on #212B32: 7.8:1 ✅
```

### 키보드 접근성
- **Tab 순서**: 논리적, 왼쪽→오른쪽, 위→아래
- **Focus 표시**: 2px outline 또는 box-shadow
- **단축키**: 
  - Space: 일시정지/재개
  - ESC: 모달 닫기
  - Enter: 버튼 활성화

### 터치 타겟
- **최소 크기**: 44x44px
- **권장 크기**: 48x48px
- **간격**: 최소 8px

### 스크린 리더
- **ARIA 레이블**: 모든 인터랙티브 요소에 제공
- **상태 변경**: aria-live 영역으로 알림
- **역할**: 적절한 ARIA role 사용

---

## 🎬 애니메이션 & 트랜지션

### Timing Functions
```css
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Durations
```css
--duration-fast: 150ms;
--duration-normal: 200ms;
--duration-slow: 300ms;
--duration-slower: 500ms;
```

### 주요 애니메이션

#### Button Hover
```css
transition: background-color 200ms ease, transform 150ms ease;
hover: transform: scale(1.02);
active: transform: scale(0.98);
```

#### Card Hover
```css
transition: box-shadow 300ms ease, transform 300ms ease;
hover: 
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transform: translateY(-2px);
```

#### Page Transition
```css
transition: opacity 300ms ease, transform 300ms ease;
enter: opacity: 0, transform: translateX(20px);
enter-active: opacity: 1, transform: translateX(0);
```

#### Progress Bar
```css
transition: width 300ms ease-out;
```

#### Character Animation (학생용)
```css
/* 카운트 증가 시 */
@keyframes countUp {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
duration: 300ms;

/* 완료 시 */
@keyframes celebrate {
  0% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1.2) rotate(-10deg); }
  50% { transform: scale(1.2) rotate(10deg); }
  75% { transform: scale(1.2) rotate(-10deg); }
  100% { transform: scale(1) rotate(0deg); }
}
duration: 600ms;
```

---

## 🎯 사용 예시

### 예시 1: Primary CTA
```jsx
<Button
  variant="primary"
  size="large"
  onClick={handleStartClass}
>
  수업 시작하기
</Button>

// 결과:
// - Height: 56px
// - Background: #005EB8
// - Font: 18px Bold
// - Hover: #004C96
```

### 예시 2: Student Card
```jsx
<Card
  padding="24px"
  borderRadius="12px"
  elevation="1"
>
  <CharacterAvatar size="80px" character="bear" />
  <Text size="16px" weight="600">철수</Text>
  <ProgressBar value={15} max={20} />
</Card>

// 결과:
// - 배경: #FFFFFF
// - 테두리: 1px solid #E8EDEE
// - 그림자: 0 2px 8px rgba(0,0,0,0.08)
```

### 예시 3: Error State
```jsx
<Input
  state="error"
  errorMessage="학생을 인식할 수 없습니다"
/>

// 결과:
// - Border: 1px solid #D5281B
// - Background: #FEF2F2
// - Error text: #D5281B, 14px
```
