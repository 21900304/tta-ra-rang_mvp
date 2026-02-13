# 📋 GUI Design Guide

## 1. 기술 스택

| 항목 | 선택 |
| --- | --- |
| Framework | React (Next.js 또는 Vite) |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui (Card, Button, Progress, Dialog, Badge, Alert etc) |
| Icons | Lucide-react |

---

## 2. 컬러 팔레트 (PRD 기반)

| 역할 | 이름 | Hex | 용도 |
| --- | --- | --- | --- |
| Primary | Energy Royal Blue | `#005EB8` | 신뢰와 청결함 |
| Point | Action Amber | `#FFB81C` | 학생들의 활기 |
| Success | Primary Red | `#D5281B` | 긍정적인 피드백 (제한적 사용) |
| Background | Soft Grey | `#F3F3F3` | 눈의 피로도 감소 |

---

## 3. 캐릭터 시스템

### 3.1 동물 캐릭터 목록

1. 사자
2. 코끼리
3. 백호
4. 원숭이
5. 펭귄
6. 판다

---

## 4. 학생 디스플레이 화면

### 4.1 화면 스타일

- **벨트스크롤 액션 게임 형태**의 디스플레이 디자인
- 게임 화면처럼 캐릭터들이 배경 위에 배치된 구성

### 4.2 콘텐츠 영역

- 캐릭터 배치: 2행 × 3열 그리드
    - 캐릭터 6마리가 겹치지 않게 배치

### 4.3 배경화면

- 레퍼런스: https://www.nintendo.com/my/switch/al3p/assets/img/adv/hero_bg_1_pc.jpg
- 위 이미지 스타일을 참고하여 디자인

---

## 5. MVP 디자인 구현 범위

### 5.1 MVP 범위

| 화면 | 구현 수준 |
| --- | --- |
| 1.0 Home | IA 설명대로 전체 구현 |
| 2.0 Class Setup | IA 설명대로 전체 구현 |
| 3.0 Play Mode | UI 디자인만 (기술 이원화, 포즈 디텍션 미구현) |

### 5.2 제한 대상 화면

- 3.0 Play Mode 화면
    - 포즈 디텍션 미구현 → **UI 디자인만 구축**
    - 실제 개발에서는 화면이 이원화되지만, MVP에서는 UI만 설계

| 화면 | 구현 내용 |
| --- | --- |
| 3.1 교사 제어판 | 실시간 데이터 없이 UI만 디자인 |
| 3.2 학생 디스플레이 | 섹션 4 기준으로 UI만 디자인 |

### 5.3 네비게이션

- 각 페이지 간 이동 가능하도록 버튼/라우터 추가
- 화면 전환 확인용 인터랙션만 구현

---

## 📋 IA 상세 구조 설명

### **1.0 Home (랜딩 페이지)**

- **1.1 서비스 소개**: AI 인식 기반 특수학급 체육 안내
- **1.2 수업 시작 (Start)**: 즉시 설정 단계로 진입 (로그인 생략)
- **컴포넌트 배치**
    - **헤더 (Royal Blue 바)**: 플렉스 행으로 로고(img 태그, "따라랑" SVG)와 슬로건 텍스트(h1, Dark Charcoal). Lucide-info 아이콘으로 전체 서비스 개요 모달 Dialog 연결(PRD 섹션 1).
    - **메인 섹션 (중앙 Card)**: shadcn Card 컴포넌트 내부:
        - 소개 텍스트(p 태그): "웹캠으로 학생 동작 추적, 자동 카운팅과 피드백! 특수학급 체육 수업을 혁신하세요." PRD 가치 제안 불릿 포인트 포함.
        - 시각 보조: 작은 임베디드 이미지 또는 Canvas로 샘플 캐릭터 미리보기(섹션 3.1 동물 아바타 2x3 그리드).
    - **콜투액션**: 큰 shadcn Button (variant="primary", Royal Blue) "수업 시작". 클릭 시 React Router로 Class Setup 이동.
    - **푸터**: shadcn Alert (variant="default")로 시스템 체크: "최적 브라우저: Chrome 90+. 카메라 준비됐나요?" FAQ(모달)와 연락처 링크(a 태그).

### **2.0 Class Setup (수업 준비)**

- **2.1 클래스 선택**: MVP용 단일 클래스(스쿼트 20회, 푸쉬업 20회, 버피 20회) 선택 및 설명 확인
- **2.2 학생 인원 설정**: 참여 학생 수(1~6명) 입력
- **2.3 화면 확장 설정**: '학생용 창 열기(TV용)' 버튼
    - *클릭 시 별도 팝업/윈도우가 생성되어 TV로 드래그 가능하게 설계*
- **컴포넌트 배치** :
    - **헤더 (Royal Blue)**: shadcn Progress 컴포넌트로 수평 바(단계: Class, Students, Display). 현재 단계 Action Amber 강조.
    - **Step 1: 클래스 선택 (Card 그룹)**: shadcn Select(드롭다운)로 MVP 단일 클래스("Class 1: 스쿼트 20회 → 푸쉬업 20회 → 버피 20회"). 아래 Card에 운동 상세—Table 컴포넌트로 시퀀스(컬럼: 운동, 횟수, 설명), Lucide 아이콘(덤벨 등).
    - **Step 2: 학생 수 (Input 섹션)**: shadcn Input(숫자 타입, min=1, max=6) 또는 Slider. 선택 수 Badges 표시("3명 선택"). 미리보기: 작은 2x3 그리드 Canvas 또는 div로 동물 이미지(랜덤 할당: 사자=학생1 등). 캐릭터 이름 Tooltips(shadcn).
    - **Step 3: 디스플레이 설정 (Button + Dialog)**: shadcn Button("학생용 창 열기")로 window.open() 트리거. Dialog 모달로 카메라 설정: getUserMedia 미리보기(video 태그)와 권한 버튼. 팁 Alert("TV로 드래그하세요").
    - **액션 바 (하단 고정)**: Button 그룹—Secondary("뒤로" Home로), Primary("시작" Play Mode로, Amber 액센트). 모든 단계 완료 전 "시작" 비활성화.

### **3.0 Play Mode (운동 진행 - 이원화)**

- **3.1 교사 제어판 (PC 모니터용)**
    - **4.1.1 진행 제어**: 시작, 일시정지, 다음 운동 강제 전환
    - **4.1.2 실시간 모니터링**: 학생별 인식 상태 및 카운트 수치 리스트
    - **(PC 뷰) 컴포넌트** :
        - **헤더 (Royal Blue)**: 현재 운동 Badge("스쿼트: 0/20"). Lucide 시계로 타이머. 전체 클래스 시퀀스 Progress 바.
        - **모니터링 영역 (Table/Card 리스트)**: shadcn Table 학생별 행: 컬럼—캐릭터 아이콘(img), 이름(옵션), 횟수(Amber Progress 바), 상태(Badge: "좋아요!" Red/Green), 피드백(이슈 Alert).
        - **컨트롤 (Button 툴바)**: 툴바에 Buttons: 시작(재생 아이콘), 일시정지(정지 아이콘), 다음 운동(스킵 포워드), 리셋(Dialog 확인). 종료(파괴적 variant, 요약으로).
        - **미리보기**: 작은 video 요소로 카메라 피드, Canvas 노란 점 오버레이로 모크 키포인트(PRD 가이드).
        - **푸터**: 요약 통계 Card("평균 달성: 50%").
- **3.2 학생 디스플레이 (TV 확장용)**
    - **4.2.1 캐릭터 애니메이션**: 실시간 동작 반영 캐릭터
    - **4.2.2 게이지 및 이펙트**: 목표 달성도 시각화 및 피드백 문구/
    - **(TV/팝업 뷰) 컴포넌트** :
        - **배경**: 전체 div에 벨트 스크롤 이미지(CSS 배경, 가이드 참조: Nintendo 스타일 어드벤처 배경).
        - **캐릭터 그리드**: 2x3 플렉스 그리드 Canvas 요소로 아바타(스쿼트하는 사자 애니메이션). 오버레이: 큰 h2 횟수("15/20" Amber), 피드백 팝업 Badges("조금 더 깊게!" 아이콘).
        - **중앙 게이지**: shadcn Progress(원형 또는 바)로 클래스 진행, 성공 효과(CSS 애니메이션, Red 별).
        - **운동 표시**: 상단 중앙 h1("스쿼트 해보자!") 큰 Dark Charcoal 텍스트.
        - **인터랙티비티 없음**: 패시브 뷰, 교사 패널과 자동 동기화.

---