# 따라랑 MVP WireFrame 프로젝트

> 특수학급 AI 체육 수업 플랫폼 - WireFrame & 기획 문서

---

## 📋 프로젝트 개요

### 서비스 정보
- **서비스명**: 따라랑 (Tta-ra-rang)
- **유형**: B2B EdTech + 헬스케어 (특수교육 체육 플랫폼)
- **플랫폼**: PWA (Progressive Web App)
- **핵심 가치**: "설치 없이 즉시 사용 가능한 AI 체육 수업 도우미"

### 사용자
| 역할 | 특성 | 기술 수준 |
|------|------|-----------|
| **특수체육교사** | 행정업무 과다, 개별지도 시간 부족 | 중급 |
| **학생(5-7명)** | 지적장애, 발달장애, 높은 시각적 의존 | 초보 |

---

## 📁 프로젝트 구조

```
doc/pliot/
├── README.md                          # 프로젝트 개요 (이 파일)
│
├── planning/                          # 기획 문서 (Markdown)
│   ├── 01-overview.md                 # 설계 개요 및 원칙
│   ├── 02-user-journey.md             # 사용자 여정
│   ├── 03-design-system.md            # 디자인 시스템
│   ├── 04-information-architecture.md # 정보 구조
│   └── 05-quality-assurance.md        # 품질 검증
│
├── wireframes/                        # WireFrame 코드 (React/TSX)
│   ├── pages/                         # 페이지 컴포넌트
│   │   ├── Dashboard.tsx              # 대시보드
│   │   ├── Calibration.tsx            # 캘리브레이션
│   │   ├── TeacherSession.tsx         # 수업 진행 - 교사용
│   │   ├── StudentSession.tsx         # 수업 진행 - 학생용
│   │   ├── Results.tsx                # 수업 결과
│   │   ├── Classes.tsx                # 클래스 관리
│   │   └── Settings.tsx               # 설정
│   │
│   ├── components/                    # 공통 컴포넌트
│   │   ├── navigation/
│   │   │   ├── Sidebar.tsx
│   │   │   └── Header.tsx
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── ProgressBar.tsx
│   │   └── layout/
│   │       └── PageLayout.tsx
│   │
│   └── types/                         # TypeScript 타입
│       └── index.ts
│
└── architecture/                      # 아키텍처 문서
    ├── component-tree.md              # 컴포넌트 계층 구조
    ├── routing.md                     # 라우팅 테이블
    ├── state-management.md            # 상태 관리
    └── responsive-guide.md            # 반응형 가이드
```

---

## 🚀 시작하기

### 1. WireFrame 코드 확인

```bash
# WireFrame 페이지 컴포넌트
wireframes/pages/Dashboard.tsx          # 대시보드 화면
wireframes/pages/Calibration.tsx        # 캘리브레이션 화면
wireframes/pages/TeacherSession.tsx     # 수업 진행 (교사용)
wireframes/pages/StudentSession.tsx     # 수업 진행 (학생용/TV)
wireframes/pages/Results.tsx            # 수업 결과
wireframes/pages/Classes.tsx            # 클래스 관리
wireframes/pages/Settings.tsx           # 설정
```

### 2. 기획 문서 확인

```bash
# 기획 문서 (Markdown)
planning/01-overview.md                 # 설계 개요
planning/02-user-journey.md             # 사용자 여정
planning/03-design-system.md            # 디자인 시스템
planning/04-information-architecture.md # 정보 구조
planning/05-quality-assurance.md        # 품질 검증
```

### 3. 아키텍처 문서 확인

```bash
# 아키텍처 문서
architecture/component-tree.md          # 컴포넌트 구조
architecture/routing.md                 # 라우팅 설정
architecture/state-management.md        # 상태 관리
architecture/responsive-guide.md        # 반응형 설계
```

---

## 🎯 WireFrame 설계 원칙

### 1. Dual-Screen First
교사용(제어/모니터링)과 학생용(피드백/게이미피케이션) 화면 완전 분리

### 2. Zero-Depth Navigation
특수학생 인지 부하 최소화를 위해 모든 핵심 기능을 1-2클릭 내 접근

### 3. High Contrast & Large Touch Targets
지적장애 학생 고려하여 색상+모양 병행, 44px 이상 터치 영역

---

## 📝 화면 목록

| 우선순위 | 화면 | 파일 | 경로 |
|---------|------|------|------|
| P0 | 대시보드 | `Dashboard.tsx` | `/` |
| P0 | 캘리브레이션 | `Calibration.tsx` | `/calibration` |
| P0 | 수업 진행 - 교사용 | `TeacherSession.tsx` | `/session/teacher` |
| P0 | 수업 진행 - 학생용 | `StudentSession.tsx` | `/session/student` |
| P0 | 수업 결과 | `Results.tsx` | `/results` |
| P1 | 클래스 관리 | `Classes.tsx` | `/classes` |
| P2 | 설정 | `Settings.tsx` | `/settings` |

---

## 🎨 디자인 시스템

### 색상 팔레트
```
Primary:     #005EB8 (Energy Royal Blue)
Secondary:   #FFB81C (Action Amber)
Accent:      #D5281B (Primary Red)
Text:        #212B32 (Dark Charcoal)
Background:  #F8F9FA (Light Grey)
Success:     #4CAF50
Warning:     #FF9800
```

### 타이포그래피
- **H1**: 32px Bold
- **H2**: 28px Bold
- **H3**: 20px SemiBold
- **Body**: 16px Regular
- **Caption**: 14px Regular
- **Display (학생용)**: 48px Bold

---

## ✅ 구현 체크리스트

### P0 필수 화면
- [ ] Dashboard.tsx
- [ ] Calibration.tsx
- [ ] TeacherSession.tsx
- [ ] StudentSession.tsx
- [ ] Results.tsx

### P1 중요 화면
- [ ] Classes.tsx

### P2 선택 화면
- [ ] Settings.tsx

### 공통 컴포넌트
- [ ] Button.tsx
- [ ] Card.tsx
- [ ] Input.tsx
- [ ] ProgressBar.tsx
- [ ] Sidebar.tsx

---

## 📞 문의

- **버그 리포트**: GitHub Issues
- **문서 업데이트**: Pull Request
- **문의사항**: 개발팀 슬랙 채널

---

**버전**: 1.0 MVP  
**작성일**: 2026년 2월 14일  
**작성자**: UX/UI Design Team
