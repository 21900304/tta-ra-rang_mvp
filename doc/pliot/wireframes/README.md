# 따라랑 MVP WireFrame 문서

## 📋 개요

본 문서는 **따라랑 (특수학급 AI 체육 수업 플랫폼)**의 MVP WireFrame 설계를 담고 있습니다.

### 서비스 특성
- **유형**: B2B EdTech + 헬스케어 (특수교육 체육)
- **플랫폼**: PWA (Progressive Web App) - Desktop Web 기반, TV 출력 지원
- **핵심 가치**: "설치 없이 즉시 사용 가능한 AI 체육 수업 도우미"

### 사용자 구조
| 역할 | 특성 | 기술 수준 |
|------|------|-----------|
| **특수체육교사** | 행정업무 과다, 개별지도 시간 부족 | 중급 |
| **학생(5-7명)** | 지적장애, 발달장애, 높은 시각적 의존 | 초보 |

---

## 📁 문서 구조

```
wireframes/
├── README.md                    # 이 문서 (개요)
├── 01-overview.md               # 설계 원칙 및 요약
├── 02-dashboard.md              # 대시보드 화면
├── 03-calibration.md            # 캘리브레이션 화면
├── 04-session-teacher.md        # 수업 진행 - 교사용
├── 05-session-student.md        # 수업 진행 - 학생용/TV
├── 06-results.md                # 수업 결과 화면
├── 07-classes.md                # 클래스 관리 화면
└── 08-settings.md               # 설정 화면

components/
├── common-components.md         # 공통 컴포넌트 라이브러리
└── types.md                     # TypeScript 인터페이스

architecture/
├── component-tree.md            # 컴포넌트 계층 구조
├── routing.md                   # 라우팅 테이블
├── state-management.md          # 상태 관리 가이드
└── responsive-guide.md          # 반응형 설계 가이드

checklist.md                     # 구현 체크리스트
quality-assurance.md             # 품질 검증 및 개선 제안
```

---

## 🎨 디자인 시스템

### 색상 팔레트

```css
/* Primary Colors */
--energy-royal-blue: #005EB8;    /* 주요 액션, 네비게이션 */
--action-amber: #FFB81C;          /* 강조, 게이미피케이션 */
--primary-red: #D5281B;           /* 피드백, 경고 */

/* Neutral Colors */
--dark-charcoal: #212B32;         /* 주요 텍스트 */
--secondary-text: #425563;        /* 보조 텍스트 */
--muted-text: #768692;            /* 비활성 텍스트 */
--border-light: #E8EDEE;          /* 테두리 */
--background-grey: #F3F3F3;       /* 배경 */

/* Semantic Colors */
--success-green: #4CAF50;         /* 완료, 성공 */
--warning-orange: #FF9800;        /* 주의, 진행 중 */
```

### 타이포그래피

| 레벨 | 크기 | 굵기 | 용도 |
|------|------|------|------|
| H1 | 32px | Bold (700) | 페이지 제목 |
| H2 | 28px | Bold (700) | 섹션 제목 |
| H3 | 20px | SemiBold (600) | 카드 제목 |
| Body | 16px | Regular (400) | 본문 |
| Caption | 14px | Regular (400) | 캡션, 메타 |
| Display | 48px | Bold (700) | 학생용 큰 글씨 |

---

## 🚀 빠른 시작

### 1. 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 2. 컴포넌트 구조 이해

```
src/
├── pages/           # 화면 컴포넌트
├── components/      # 재사용 컴포넌트
├── hooks/           # 커스텀 훅
├── context/         # 상태 관리
└── types/           # 타입 정의
```

### 3. 주요 화면 확인

1. **대시보드** (`/`) - 수업 시작점
2. **캘리브레이션** (`/calibration`) - 학생 매칭
3. **수업 진행** (`/session/teacher`, `/session/student`) - 실시간 수업
4. **결과** (`/results`) - 수업 종료 후 성과 확인

---

## 📋 WireFrame 설계 원칙

### 1. Dual-Screen First
- 교사용(제어/모니터링)과 학생용(피드백/게이미피케이션) 화면 완전 분리

### 2. Zero-Depth Navigation
- 특수학생 인지 부하 최소화를 위해 모든 핵심 기능을 1-2클릭 내 접근

### 3. High Contrast & Large Touch Targets
- 지적장애 학생 고려하여 색상+모양 병행, 44px 이상 터치 영역

---

## ✅ 구현 체크리스트

### P0 필수 화면
- [ ] 대시보드 (`/`)
- [ ] 캘리브레이션 (`/calibration`)
- [ ] 수업 진행 - 교사용 (`/session/teacher`)
- [ ] 수업 진행 - 학생용 (`/session/student`)
- [ ] 수업 결과 (`/results`)

### P1 중요 화면
- [ ] 클래스 관리 (`/classes`)
- [ ] 클래스 편집 (`/classes/edit/:id`)

### P2 선택 화면
- [ ] 설정 (`/settings`)

---

## 📞 지원

- **문의**: 개발팀 슬랙 채널
- **버그 리포트**: GitHub Issues
- **문서 업데이트**: 본 저장소 Pull Request

---

**버전**: 1.0 MVP  
**작성일**: 2026년 2월 14일  
**작성자**: UX/UI Design Team
