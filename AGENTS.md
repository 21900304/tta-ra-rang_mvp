# AGENTS.md - Coding Guidelines for 따라랑 (Ttararang)

> AI camera-based special education PE platform - PWA using React + TypeScript + TensorFlow.js

## Project Overview
- **Framework**: React + TypeScript PWA
- **Pose Detection**: TensorFlow.js + MoveNet MultiPose Lightning
- **Styling**: TailwindCSS + shadcn/ui
- **Target**: Special education classes (5-7 students), real-time pose tracking
- **Color System**: Energy Royal Blue (#005EB8), Action Amber (#FFB81C), Primary Red (#D5281B)

---

## Communication Guidelines (한국어 지침)

**모든 답변은 한국어로 작성**합니다. 기술 용어나 코드 변수명은 원문(영어)을 유지하되, 설명은 친절한 한국어로 작성합니다.

```
// Good
"MoveNet MultiPose 모델을 로드하는 중입니다."
"`poseDetector` 변수는 TensorFlow.js의 포즈 감지기 인스턴스를 저장합니다."

// Avoid
"Loading the MoveNet model..."
"`자세감지기` 변수를 사용하세요"  // Don't translate variable names!
```

---

## Build Commands

```bash
# Development
npm run dev              # Start development server (Vite)
npm run preview          # Preview production build locally

# Build
npm run build            # Production build
npm run build:sw         # Build service worker

# Testing
npm test                 # Run all tests
npm test -- --watch      # Watch mode
npm test -- <pattern>    # Run specific test (e.g., npm test -- PoseDetector)

# Linting & Type Checking
npm run lint             # ESLint check
npm run lint:fix         # ESLint fix auto-fixable issues
npm run typecheck        # TypeScript type checking
```

---

## Code Style Guidelines

### Imports
- Group imports: React/external libs → internal modules → styles/assets
- Use absolute imports with `@/` prefix for src directory
- Named imports preferred over default imports

```typescript
import { useState, useCallback } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import { usePoseDetector } from '@/hooks/usePoseDetector';
import type { Pose, Keypoint } from '@/types/pose';
```

### Types
- Always use explicit TypeScript types
- Prefer `type` over `interface` for object shapes
- Use strict null checks - handle undefined explicitly

```typescript
type PoseKeypoint = {
  x: number;
  y: number;
  score?: number;  // Optional fields marked with ?
};
```

### Naming Conventions
- **Components**: PascalCase (e.g., `PoseDetector.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `usePoseDetector.ts`)
- **Utilities**: camelCase (e.g., `calculateAngle.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `DEFAULT_FPS = 30`)
- **Types**: PascalCase (e.g., `PoseKeypoint`, `ExerciseType`)

### Component Structure
```typescript
type Props = {
  onPoseDetected: (poses: Pose[]) => void;
  maxPoses?: number;
};

export function PoseDetector({ onPoseDetected, maxPoses = 6 }: Props) {
  // Implementation
}
```

### Error Handling
- Use try/catch for async operations
- Provide user-friendly error messages in Korean
- Log errors for debugging but don't expose internals to UI

```typescript
try {
  await detector.estimatePoses(video);
} catch (error) {
  console.error('Pose detection failed:', error);
  setError('침궤 추적에 실패했습니다. 침궤 권한을 확인해주세요.');
}
```

### Tailwind CSS
- Use utility classes, avoid custom CSS when possible
- Group related classes with template literals for readability
- Use arbitrary values sparingly (e.g., `w-[720px]`)
- Follow color system: bg-[#005EB8], text-[#FFB81C], etc.

```tsx
<div className={`
  flex items-center justify-center
  bg-[#005EB8] text-white
  rounded-lg px-4 py-2
`}>
```

### Performance
- Use `useMemo` for expensive calculations (angle computations)
- Use `useCallback` for function props
- Throttle pose detection updates to target FPS (20-30)
- Avoid re-renders with React.memo for pure components

### TensorFlow.js Specific
- Load models once, reuse detector instance
- Dispose tensors properly to prevent memory leaks
- Use `tf.tidy()` for temporary tensor operations
- Monitor memory with `tf.memory()` in development

### Accessibility (a11y)
- All interactive elements must be keyboard accessible
- Provide aria-labels for icon-only buttons
- Ensure color contrast meets WCAG AA standards
- Support screen reader announcements for exercise counts
- Use Lucide-react icons from shadcn/ui

---

## Testing Guidelines

- Test files: `ComponentName.test.tsx` next to component
- Use React Testing Library
- Mock TensorFlow.js and Web APIs (getUserMedia)
- Test key user flows: camera permission, pose detection, counting logic

---

## Git Workflow

```bash
# Feature branches
feature/pose-detection
design/character-ui
fix/camera-permission

# Commit message format
type(scope): subject in Korean

feat(pose): MoveNet MultiPose Lightning 통합
fix(counter): 스쿼트 각도 계산 버그 수정
docs(readme): 설치 가이드 추가
```

---

## Key Constraints

- **Max 6 students**: MoveNet MultiPose limit
- **FPS Target**: 20-30 FPS on Intel i3 + integrated graphics
- **Privacy**: No video storage, local processing only
- **Browser**: Chrome 90+, Edge 90+ (HTTPS required for camera)
- **Model Size**: < 12MB for service worker caching

---

## Environment Variables

```bash
VITE_API_URL=              # Backend API (Post-MVP)
VITE_SENTRY_DSN=           # Error tracking
VITE_FIREBASE_CONFIG=      # Firebase config (JSON string)
```
