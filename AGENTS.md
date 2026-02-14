# AGENTS.md - Coding Guidelines for 따라랑 (Ttararang)

> AI camera-based special education PE platform - PWA using React + TypeScript + TensorFlow.js

## Communication Guidelines (한국어 지침)

**모든 답변은 한국어로 작성**합니다. 기술 용어나 코드 변수명은 원문(영어)을 유지하되, 설명은 친절한 한국어로 작성합니다.

```
// Good
"MoveNet 모델을 로드하는 중입니다."
"`poseDetector` 변수는 포즈 감지기 인스턴스를 저장합니다."

// Avoid
"Loading the MoveNet model..."
"`자세감지기` 변수를 사용하세요"  // 변수명 번역 금지!
```

---

## Build Commands

```bash
# Development
npm run dev              # Start development server (Vite)
npm run preview          # Preview production build locally

# Build
npm run build            # Production build

# Testing
npm test                 # Run all tests
npm test -- --watch      # Watch mode
npm test -- PoseDetector # Run specific test file
npm test -- --testNamePattern="should calculate angle"  # Run specific test

# Linting & Type Checking
npm run lint             # ESLint check
npm run lint:fix         # Auto-fix ESLint issues
npm run typecheck        # TypeScript type checking
```

---

## Code Style Guidelines

### Imports
- Group imports: React/external libs → internal modules → styles/assets
- Use absolute imports with `@/` prefix for src directory
- Named imports preferred

```typescript
import { useState, useCallback } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import { usePoseDetector } from '@/hooks/usePoseDetector';
import type { Pose, Keypoint } from '@/types/pose';
```

### Types
- Always use explicit TypeScript types
- Prefer `type` over `interface` for object shapes
- Use strict null checks

```typescript
type PoseKeypoint = {
  x: number;
  y: number;
  score?: number;  // Optional fields marked with ?
};
```

### Naming Conventions
- **Components**: PascalCase (`PoseDetector.tsx`)
- **Hooks**: camelCase with `use` prefix (`usePoseDetector.ts`)
- **Utilities**: camelCase (`calculateAngle.ts`)
- **Constants**: UPPER_SNAKE_CASE (`DEFAULT_FPS = 30`)
- **Types**: PascalCase (`PoseKeypoint`, `ExerciseType`)

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

```typescript
try {
  await detector.estimatePoses(video);
} catch (error) {
  console.error('Pose detection failed:', error);
  setError('포즈 추적에 실패했습니다. 침궤 권한을 확인해주세요.');
}
```

### Tailwind CSS
- Use utility classes, avoid custom CSS when possible
- Group related classes with template literals
- Follow color system: bg-[#005EB8], text-[#FFB81C], border-[#D5281B]

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
- Throttle pose detection to 20-30 FPS
- Use React.memo for pure components

### TensorFlow.js Specific
- Load models once, reuse detector instance
- Dispose tensors properly to prevent memory leaks
- Use `tf.tidy()` for temporary operations
- Monitor memory with `tf.memory()` in development

### Accessibility
- All interactive elements keyboard accessible
- Provide aria-labels for icon-only buttons
- Ensure WCAG AA color contrast
- Use Lucide-react icons from shadcn/ui

---

## Testing Guidelines

- Test files: `ComponentName.test.tsx` next to component
- Use React Testing Library
- Mock TensorFlow.js and Web APIs
- Test key flows: camera permission, pose detection, counting logic

---

## Git Workflow

```bash
# Feature branches
feature/pose-detection
fix/camera-permission
design/character-ui

# Commit message format (Korean)
type(scope): subject

feat(pose): MoveNet MultiPose Lightning 통합
fix(counter): 스쿼트 각도 계산 버그 수정
```

---

## Key Constraints

- **Max 6 students**: MoveNet MultiPose limit
- **FPS Target**: 20-30 FPS on Intel i3 + integrated graphics
- **Privacy**: No video storage, local processing only
- **Browser**: Chrome 90+, Edge 90+ (HTTPS required)

---

## Environment Variables

```bash
VITE_API_URL=              # Backend API (Post-MVP)
VITE_SENTRY_DSN=           # Error tracking
VITE_FIREBASE_CONFIG=      # Firebase config (JSON string)
```
