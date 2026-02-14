# 라우팅 테이블

## 🛣️ URL 구조

```
/                                   # 대시보드 (메인)
/calibration                        # 캘리브레이션
/session/teacher                    # 수업 진행 - 교사용
/session/student                    # 수업 진행 - 학생용 (TV)
/results                            # 수업 결과
/classes                            # 클래스 목록
/classes/edit/:id                   # 클래스 편집 (생성/수정)
/settings                           # 설정
```

---

## 📋 라우트 정의

```typescript
// routes/index.ts

import { RouteConfig } from './types';

export const routes: RouteConfig[] = [
  {
    path: '/',
    component: 'Dashboard',
    layout: 'MainLayout',
    meta: {
      requiresAuth: true,
      role: 'teacher',
      title: '대시보드'
    }
  },
  {
    path: '/calibration',
    component: 'Calibration',
    layout: 'SimpleLayout',
    meta: {
      requiresAuth: true,
      role: 'teacher',
      title: '자리 맞추기'
    }
  },
  {
    path: '/session',
    component: 'SessionLayout',
    layout: null,
    children: [
      {
        path: 'teacher',
        component: 'TeacherView',
        meta: {
          requiresAuth: true,
          role: 'teacher',
          requiresSession: true,
          title: '수업 진행'
        }
      },
      {
        path: 'student',
        component: 'StudentView',
        meta: {
          isTVView: true,
          title: '따라랑'
        }
      }
    ]
  },
  {
    path: '/results',
    component: 'Results',
    layout: 'MainLayout',
    meta: {
      requiresAuth: true,
      role: 'teacher',
      title: '수업 결과'
    }
  },
  {
    path: '/classes',
    component: 'Classes',
    layout: 'MainLayout',
    meta: {
      requiresAuth: true,
      role: 'teacher',
      title: '클스 관리'
    }
  },
  {
    path: '/classes/edit/:id',
    component: 'ClassEditor',
    layout: 'MainLayout',
    meta: {
      requiresAuth: true,
      role: 'teacher',
      title: '클스 편집'
    }
  },
  {
    path: '/settings',
    component: 'Settings',
    layout: 'MainLayout',
    meta: {
      requiresAuth: true,
      role: 'teacher',
      title: '설정'
    }
  },
  {
    path: '*',
    component: 'NotFound',
    layout: 'SimpleLayout',
    meta: {
      title: '페이지를 찾을 수 없습니다'
    }
  }
];
```

---

## 🔐 권한 및 접근 제어

### 메타 데이터 정의

```typescript
interface RouteMeta {
  // 인증 필요 여부
  requiresAuth?: boolean;
  
  // 사용자 역할
  role?: 'teacher' | 'student';
  
  // 활성 세션 필요 여부
  requiresSession?: boolean;
  
  // TV 뷰 여부
  isTVView?: boolean;
  
  // 페이지 제목
  title: string;
  
  // 사이드바 표시 여부
  showSidebar?: boolean;
  
  // 헤더 표시 여부
  showHeader?: boolean;
}
```

### 접근 제어 로직

```typescript
// router/guards.ts

export const authGuard = (route: RouteConfig, user: User | null) => {
  // 인증 필요한 경로
  if (route.meta?.requiresAuth && !user) {
    return { allowed: false, redirect: '/login' };
  }
  
  // 역할 체크
  if (route.meta?.role && user?.role !== route.meta.role) {
    return { allowed: false, redirect: '/unauthorized' };
  }
  
  // 세션 체크
  if (route.meta?.requiresSession && !isSessionActive()) {
    return { allowed: false, redirect: '/calibration' };
  }
  
  return { allowed: true };
};
```

---

## 🔄 네비게이션 흐름

### 주요 사용자 여정

```
1. 로그인 → 대시보드
   /
   └── Dashboard

2. 대시보드 → 캘리브레이션
   /
   └── Dashboard
       └── handleStartClass()
           └── /calibration
               └── Calibration

3. 캘리브레이션 → 수업 진행 (교사용)
   /calibration
   └── Calibration
       └── handleConfirm()
           └── /session/teacher
               └── TeacherView

4. 수업 진행 → 결과
   /session/teacher
   └── TeacherView
       └── handleEndSession()
           └── /results
               └── Results

5. 결과 → 대시보드 (새 수업)
   /results
   └── Results
       └── handleNewSession()
           └── /
               └── Dashboard
```

### 뒤로가기 처리

| 현재 페이지 | 뒤로가기 시 |
|-------------|-------------|
| 캘리브레이션 | 대시보드 (홈) |
| 수업 진행 | 확인 모달 표시 (수업 중단?) |
| 결과 | 대시보드 (홈) |
| 클래스 편집 | 클래스 목록 |

---

## 🎯 깊은 링크 (Deep Linking)

### 공유 가능한 URL

```typescript
// 수업 결과 공유
`/results?sessionId=abc123`

// 특정 클래스 편집
`/classes/edit/${classId}`

// 학생용 뷰 (TV 연결용)
`/session/student?sessionId=abc123`
```

### URL 파라미터 처리

```typescript
// useParams 훅
const { id } = useParams<{ id: string }>();

// useSearchParams 훅
const [searchParams] = useSearchParams();
const sessionId = searchParams.get('sessionId');
```

---

## 📱 반응형 라우팅

### 모바일 대응

```typescript
// 모바일에서 특정 경로 리다이렉트
const mobileRedirects = {
  '/session/student': '/mobile-not-supported', // TV 뷰는 모바일 미지원
};

export const handleMobileRouting = (path: string, isMobile: boolean) => {
  if (isMobile && mobileRedirects[path]) {
    return mobileRedirects[path];
  }
  return path;
};
```

---

## 🔧 React Router 설정

```typescript
// App.tsx

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Layouts
import MainLayout from './layouts/MainLayout';
import SimpleLayout from './layouts/SimpleLayout';
import SessionLayout from './layouts/SessionLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Calibration from './pages/Calibration';
import TeacherView from './pages/Session/TeacherView';
import StudentView from './pages/Session/StudentView';
import Results from './pages/Results';
import Classes from './pages/Classes';
import ClassEditor from './pages/Classes/ClassEditor';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* 대시보드 */}
          <Route path="/" element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          } />

          {/* 캘리브레이션 */}
          <Route path="/calibration" element={
            <ProtectedRoute>
              <SimpleLayout>
                <Calibration />
              </SimpleLayout>
            </ProtectedRoute>
          } />

          {/* 수업 진행 */}
          <Route path="/session" element={<SessionLayout />}>
            <Route path="teacher" element={
              <ProtectedRoute requireSession>
                <TeacherView />
              </ProtectedRoute>
            } />
            <Route path="student" element={<StudentView />} />
          </Route>

          {/* 결과 */}
          <Route path="/results" element={
            <ProtectedRoute>
              <MainLayout>
                <Results />
              </MainLayout>
            </ProtectedRoute>
          } />

          {/* 클래스 관리 */}
          <Route path="/classes" element={
            <ProtectedRoute>
              <MainLayout>
                <Classes />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/classes/edit/:id" element={
            <ProtectedRoute>
              <MainLayout>
                <ClassEditor />
              </MainLayout>
            </ProtectedRoute>
          } />

          {/* 설정 */}
          <Route path="/settings" element={
            <ProtectedRoute>
              <MainLayout>
                <Settings />
              </MainLayout>
            </ProtectedRoute>
          } />

          {/* 404 */}
          <Route path="*" element={
            <SimpleLayout>
              <NotFound />
            </SimpleLayout>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
```

---

## 📝 페이지 메타데이터

### 동적 제목 설정

```typescript
// hooks/usePageTitle.ts

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} | 따라랑`;
    
    return () => {
      document.title = '따라랑';
    };
  }, [title]);
};

// 사용 예시
const Dashboard = () => {
  usePageTitle('대시보드');
  // ...
};
```

---

## 📊 라우트별 우선순위

| 우선순위 | 경로 | 페이지 | 설명 |
|----------|------|--------|------|
| P0 | `/` | Dashboard | 메인 진입점 |
| P0 | `/calibration` | Calibration | 수업 시작 전 필수 |
| P0 | `/session/teacher` | TeacherView | 핵심 기능 |
| P0 | `/session/student` | StudentView | TV 출력 |
| P0 | `/results` | Results | 수업 종료 후 |
| P1 | `/classes` | Classes | 클래스 관리 |
| P1 | `/classes/edit/:id` | ClassEditor | 클래스 편집 |
| P2 | `/settings` | Settings | 환경 설정 |

---

## 🎭 역할별 라우트 접근

### 교사 (Teacher)
- ✅ `/` - 대시보드
- ✅ `/calibration` - 캘리브레이션
- ✅ `/session/teacher` - 수업 진행 (교사용)
- ✅ `/results` - 수업 결과
- ✅ `/classes` - 클래스 관리
- ✅ `/classes/edit/:id` - 클래스 편집
- ✅ `/settings` - 설정

### 학생 (Student - TV)
- ✅ `/session/student` - 수업 진행 (학생용)
- ❌ 다른 모든 경로 접근 불가

---

**라우팅 테이블 완료**  
**작성일: 2026년 2월 14일**
