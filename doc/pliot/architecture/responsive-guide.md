# 반응형 설계 가이드

## 📱 브레이크포인트 정의

| 디바이스 | 해상도 | Breakpoint | Grid Columns | 주요 특징 |
|----------|--------|------------|--------------|-----------|
| 모바일 (S) | 375x667 | < 576px | 4 cols | 터치 우선, 단일 컬럼 |
| 모바일 (L) | 414x896 | 576px - 767px | 4 cols | 큰 폰트 |
| 태블릿 | 768x1024 | 768px - 1023px | 8 cols | 축소 사이드바 |
| 데스크탑 (S) | 1280x720 | 1024px - 1439px | 12 cols | 전체 기능 |
| 데스크탑 (L) | 1920x1080 | ≥ 1440px | 12 cols | 최대 활용 |

```css
/* CSS Variables */
:root {
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1440px;
}
```

---

## 🎨 레이아웃 변화

### 1. 사이드바 네비게이션

```
Desktop (≥ 1024px):
┌──────────┬──────────────────────────┐
│ Sidebar  │                          │
│ (240px)  │    Main Content          │
│  - 확장  │                          │
│  - 아이콘│                          │
│  + 텍스트│                          │
│          │                          │
└──────────┴──────────────────────────┘

Tablet (768px - 1023px):
┌──────┬────────────────────────────────┐
│ Side │                                │
│(64px)│      Main Content              │
│-아이 │                                │
│ 콘만 │                                │
└──────┴────────────────────────────────┘

Mobile (< 768px):
┌───────────────────────────────────────┐
│ Hamburger │       Main Content        │
│   Menu    │                           │
│  (숨김)   │                           │
│           │                           │
├───────────────────────────────────────┤
│     Bottom Navigation (56px)          │
│  [홈]  [수업]  [클스]  [설정]        │
└───────────────────────────────────────┘
```

### 2. 학생 모니터링 그리드

```
Desktop (≥ 1024px):
┌────────┬────────┬────────┐
│학생 1  │학생 2  │학생 3  │
├────────┼────────┼────────┤
│학생 4  │학생 5  │학생 6  │
└────────┴────────┴────────┘
3x2 그리드

Tablet (768px - 1023px):
┌────────┬────────┬────────┐
│학생 1  │학생 2  │학생 3  │
├────────┼────────┼────────┤
│학생 4  │학생 5  │학생 6  │
└────────┴────────┴────────┘
3x2 그리드 (유지)

Mobile (< 768px):
┌────────┬────────┐
│학생 1  │학생 2  │
├────────┼────────┤
│학생 3  │학생 4  │
├────────┼────────┤
│학생 5  │학생 6  │
└────────┴────────┘
2x3 그리드 (스크롤)
```

### 3. 학생용 TV 화면

**TV 화면은 고정 해상도로 설계 (반응형 불필요)**

```
TV 화면 (1920x1080):
┌───────────────────────────────────────┐
│ [현재 운영 정보 - 상단 15%]          │
├───────────────────────────────────────┤
│                                       │
│  [6개 캐릭터 - 중앙 65%]             │
│                                       │
├───────────────────────────────────────┤
│ [피드백 영역 - 하단 20%]             │
└───────────────────────────────────────┘

최소 폰트 크기: 24px
캐릭터 크기: 120px
버튼 크기: 60px 이상
```

---

## 🔄 컴포넌트별 반응형 대응

### Dashboard 반응형

```typescript
// Dashboard.tsx

const Dashboard = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');

  return (
    <div style={styles.container}>
      {/* 모바일: BottomNav, 데스크탑: Sidebar */}
      {isMobile ? <BottomNav /> : <Sidebar collapsed={isTablet} />}
      
      <main style={{
        ...styles.mainContent,
        marginLeft: isMobile ? 0 : isTablet ? 64 : 240
      }}>
        {/* 히어로 섹션 */}
        <div style={{
          ...styles.heroSection,
          flexDirection: isMobile ? 'column' : 'row'
        }}>
          <div style={styles.quickStart}>
            {/* ... */}
          </div>
          
          {/* 모바일에서는 이미지 숨김 */}
          {!isMobile && (
            <div style={styles.heroImage}>
              {/* ... */}
            </div>
          )}
        </div>

        {/* 클래스 카드 그리드 */}
        <div style={{
          ...styles.cardGrid,
          gridTemplateColumns: isMobile 
            ? '1fr' 
            : isTablet 
              ? 'repeat(2, 1fr)' 
              : 'repeat(3, 1fr)'
        }}>
          {/* ... */}
        </div>
      </main>
    </div>
  );
};
```

### Session (Teacher) 반응형

```typescript
// TeacherSession.tsx

const TeacherSession = () => {
  const isTablet = useMediaQuery('(max-width: 1023px)');
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <div style={styles.container}>
      {/* Top Bar */}
      <header style={styles.topBar}>
        {/* ... */}
      </header>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Student Grid */}
        <div style={{
          ...styles.studentGrid,
          gridTemplateColumns: isMobile 
            ? 'repeat(2, 1fr)' 
            : 'repeat(3, 1fr)'
        }}>
          {/* ... */}
        </div>

        {/* Right Sidebar - 태블릿 이하에서는 숨김 */}
        {!isTablet && (
          <aside style={styles.rightSidebar}>
            {/* ... */}
          </aside>
        )}
      </div>

      {/* Control Bar */}
      <footer style={{
        ...styles.controlBar,
        flexDirection: isMobile ? 'column' : 'row',
        height: isMobile ? 'auto' : 80
      }}>
        {/* ... */}
      </footer>
    </div>
  );
};
```

---

## 📏 CSS 미디어 쿼리

### 기본 미디어 쿼리 템플릿

```css
/* Mobile First Approach */

/* Base styles (Mobile) */
.container {
  padding: 16px;
}

.sidebar {
  display: none;
}

.bottom-nav {
  display: flex;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    padding: 24px;
  }
  
  .sidebar {
    display: block;
    width: 64px;
  }
  
  .bottom-nav {
    display: none;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: 32px;
  }
  
  .sidebar {
    width: 240px;
  }
}

/* Large Desktop */
@media (min-width: 1440px) {
  .container {
    max-width: 1440px;
    margin: 0 auto;
  }
}
```

### React CSS-in-JS

```typescript
// hooks/useResponsive.ts

import { useMediaQuery } from 'react-responsive';

export const useResponsive = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isLargeDesktop = useMediaQuery({ minWidth: 1440 });

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    // 편의를 위한 조합
    isTouch: isMobile || isTablet,
    hasSidebar: isDesktop || isLargeDesktop
  };
};

// 사용 예시
const MyComponent = () => {
  const { isMobile, hasSidebar } = useResponsive();

  return (
    <div style={{
      padding: isMobile ? 16 : 32,
      marginLeft: hasSidebar ? 240 : 0
    }}>
      {/* ... */}
    </div>
  );
};
```

---

## 🎨 반응형 스타일 상수

```typescript
// styles/responsive.ts

export const breakpoints = {
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1440
};

export const containerWidths = {
  sm: '100%',
  md: '720px',
  lg: '960px',
  xl: '1140px',
  '2xl': '1320px'
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48
};

export const responsiveSpacing = {
  mobile: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24
  },
  desktop: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  }
};

export const fontSizes = {
  mobile: {
    h1: 24,
    h2: 20,
    h3: 18,
    body: 14,
    caption: 12
  },
  desktop: {
    h1: 32,
    h2: 28,
    h3: 20,
    body: 16,
    caption: 14
  }
};
```

---

## 📱 특수 케이스

### 1. TV 화면 (학생용)

```typescript
// 학생용 화면은 고정 크기로 설계
const TVView = () => {
  // TV 화면은 반응형이 아닌 고정 레이아웃
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      fontSize: '24px', // 최소 폰트 크기
      // ...
    }}>
      {/* ... */}
    </div>
  );
};
```

### 2. 모바일에서 제한된 기능

```typescript
// 모바일에서는 일부 기능 비활성화
const SessionPage = () => {
  const { isMobile } = useResponsive();

  if (isMobile) {
    return (
      <MobileNotSupported 
        message="수업 진행 기능은 PC에서만 사용 가능합니다"
      />
    );
  }

  return <TeacherView />;
};
```

### 3. 터치 vs 마우스

```typescript
// 터치 디바이스 최적화
const TouchOptimized = () => {
  const isTouch = useMediaQuery('(pointer: coarse)');

  return (
    <button style={{
      minHeight: isTouch ? 48 : 40,
      minWidth: isTouch ? 48 : 40
    }}>
      클릭
    </button>
  );
};
```

---

## ✅ 반응형 체크리스트

### 레이아웃
- [ ] 모바일: 단일 컬럼 레이아웃
- [ ] 태블릿: 축소 사이드바 (64px)
- [ ] 데스크탑: 전체 사이드바 (240px)
- [ ] 모바일: 하단 네비게이션
- [ ] TV: 고정 1920x1080

### 타이포그래피
- [ ] 모바일: 14-24px
- [ ] 데스크탑: 16-32px
- [ ] TV: 최소 24px

### 컴포넌트
- [ ] 터치 타겟: 최소 44x44px
- [ ] 버튼: 모바일 48px, 데스크탑 40px
- [ ] 카드: 모바일 전폭, 데스크탑 그리드

### 기능
- [ ] 모바일에서 TV 뷰 비활성화
- [ ] 터치 제스처 지원 (스와이프)
- [ ] 키보드 단축키 (데스크탑)

---

## 🧪 테스트 체크리스트

### 브라우저 테스트
- [ ] Chrome (Desktop)
- [ ] Chrome (Mobile)
- [ ] Safari (iOS)
- [ ] Samsung Internet

### 디바이스 테스트
- [ ] iPhone SE (375px)
- [ ] iPhone 12/13/14 (390px)
- [ ] iPad (768px)
- [ ] Desktop (1920px)
- [ ] TV (1920x1080)

### 기능 테스트
- [ ] 사이드바 토글
- [ ] 그리드 레이아웃 변경
- [ ] 터치 스크롤
- [ ] 키보드 네비게이션

---

**반응형 설계 가이드 완료**  
**작성일: 2026년 2월 14일**
