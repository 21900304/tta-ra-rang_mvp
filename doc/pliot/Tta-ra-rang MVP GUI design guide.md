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