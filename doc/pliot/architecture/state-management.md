# 상태 관리 (State Management)

## 🏗️ 상태 관리 아키텍처

### 전역 상태 (Context API)

```
┌─────────────────────────────────────────────┐
│           Context Providers                 │
├─────────────────────────────────────────────┤
│  AuthContext     - 인증 상태               │
│  SessionContext  - 세션 상태               │
│  SettingsContext - 설정 상태               │
└─────────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│            Consumer Components              │
│  (Dashboard, Session, Calibration, etc.)   │
└─────────────────────────────────────────────┘
```

### 지역 상태 (useState)

```
Page Components
├── Local State (useState)
│   ├── Form inputs
│   ├── UI state (modals, toggles)
│   └── Temporary data
│
└── Feature Components
    └── Internal state
```

---

## 📦 Context 정의

### 1. AuthContext

```typescript
// context/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'teacher' | 'student';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 초기 인증 상태 확인
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    // API 호출
    const response = await api.login(email, password);
    setUser(response.user);
    localStorage.setItem('user', JSON.stringify(response.user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

### 2. SessionContext

```typescript
// context/SessionContext.tsx

import React, { createContext, useContext, useState, useCallback } from 'react';

interface Student {
  id: string;
  name: string;
  characterId: string;
  poseId?: string;
}

interface Exercise {
  id: string;
  name: string;
  targetReps: number;
}

interface StudentProgress {
  studentId: string;
  currentReps: number;
  isDetected: boolean;
  isMoving: boolean;
  lastFeedback?: {
    type: 'positive' | 'correction';
    message: string;
  };
}

interface SessionState {
  sessionId: string | null;
  classId: string | null;
  students: Student[];
  exercises: Exercise[];
  currentExerciseIndex: number;
  studentProgress: StudentProgress[];
  isPaused: boolean;
  isCalibrated: boolean;
  startTime: Date | null;
}

interface SessionContextType extends SessionState {
  // Actions
  startSession: (classId: string, students: Student[]) => void;
  endSession: () => void;
  pauseSession: () => void;
  resumeSession: () => void;
  updateStudentProgress: (studentId: string, progress: Partial<StudentProgress>) => void;
  nextExercise: () => void;
  setCalibrationComplete: (complete: boolean) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<SessionState>({
    sessionId: null,
    classId: null,
    students: [],
    exercises: [],
    currentExerciseIndex: 0,
    studentProgress: [],
    isPaused: false,
    isCalibrated: false,
    startTime: null
  });

  const startSession = useCallback((classId: string, students: Student[]) => {
    setState({
      sessionId: generateSessionId(),
      classId,
      students,
      exercises: [], // TODO: Load from class
      currentExerciseIndex: 0,
      studentProgress: students.map(s => ({
        studentId: s.id,
        currentReps: 0,
        isDetected: false,
        isMoving: false
      })),
      isPaused: false,
      isCalibrated: false,
      startTime: new Date()
    });
  }, []);

  const endSession = useCallback(() => {
    // Save session data
    setState({
      sessionId: null,
      classId: null,
      students: [],
      exercises: [],
      currentExerciseIndex: 0,
      studentProgress: [],
      isPaused: false,
      isCalibrated: false,
      startTime: null
    });
  }, []);

  const pauseSession = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: true }));
  }, []);

  const resumeSession = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: false }));
  }, []);

  const updateStudentProgress = useCallback((studentId: string, progress: Partial<StudentProgress>) => {
    setState(prev => ({
      ...prev,
      studentProgress: prev.studentProgress.map(p =>
        p.studentId === studentId ? { ...p, ...progress } : p
      )
    }));
  }, []);

  const nextExercise = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentExerciseIndex: prev.currentExerciseIndex + 1
    }));
  }, []);

  const setCalibrationComplete = useCallback((complete: boolean) => {
    setState(prev => ({ ...prev, isCalibrated: complete }));
  }, []);

  return (
    <SessionContext.Provider value={{
      ...state,
      startSession,
      endSession,
      pauseSession,
      resumeSession,
      updateStudentProgress,
      nextExercise,
      setCalibrationComplete
    }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within SessionProvider');
  }
  return context;
};
```

### 3. SettingsContext

```typescript
// context/SettingsContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Settings {
  // Camera & Audio
  camera: string;
  resolution: '720p' | '1080p';
  volume: number;
  
  // Accessibility
  highContrast: boolean;
  largeText: boolean;
  voiceFeedback: boolean;
}

interface SettingsContextType extends Settings {
  updateSettings: (settings: Partial<Settings>) => void;
  resetSettings: () => void;
}

const defaultSettings: Settings = {
  camera: 'default',
  resolution: '720p',
  volume: 80,
  highContrast: false,
  largeText: false,
  voiceFeedback: true
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(() => {
    const stored = localStorage.getItem('settings');
    return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <SettingsContext.Provider value={{
      ...settings,
      updateSettings,
      resetSettings
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};
```

---

## 🎯 상태 사용 패턴

### 1. 인증 상태 사용

```typescript
// pages/Dashboard.tsx

import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>안녕하세요, {user?.name}님</h1>
    </div>
  );
};
```

### 2. 세션 상태 사용

```typescript
// pages/Session/TeacherView.tsx

import { useSession } from '../context/SessionContext';

const TeacherView = () => {
  const { 
    students, 
    studentProgress, 
    isPaused, 
    pauseSession, 
    resumeSession 
  } = useSession();

  return (
    <div>
      {students.map(student => {
        const progress = studentProgress.find(p => p.studentId === student.id);
        return (
          <StudentCard
            key={student.id}
            student={student}
            progress={progress}
          />
        );
      })}
      
      <button onClick={isPaused ? resumeSession : pauseSession}>
        {isPaused ? '계속하기' : '일시정지'}
      </button>
    </div>
  );
};
```

### 3. 설정 상태 사용

```typescript
// components/common/ProgressBar.tsx

import { useSettings } from '../../context/SettingsContext';

const ProgressBar = ({ value, max }) => {
  const { highContrast } = useSettings();

  return (
    <div 
      style={{
        backgroundColor: highContrast ? '#000' : '#E8EDEE',
        // ...
      }}
    >
      {/* ... */}
    </div>
  );
};
```

---

## 🔄 데이터 흐름

### 1. 단방향 데이터 흐름

```
Action → Dispatcher → Store → View
   ↑                            │
   └──────── Response ──────────┘
```

### 2. 비동기 작업 처리

```typescript
// 비동기 액션 예시

const handleStartSession = async () => {
  try {
    // 1. 로딩 상태 설정
    setIsLoading(true);
    
    // 2. API 호출
    const classData = await api.getClass(selectedClassId);
    
    // 3. 세션 시작
    startSession(classData.id, classData.students);
    
    // 4. 페이지 이동
    navigate('/calibration');
  } catch (error) {
    // 5. 에러 처리
    setError(error.message);
  } finally {
    // 6. 로딩 상태 해제
    setIsLoading(false);
  }
};
```

---

## 💾 영구 저장 (Persistence)

### localStorage 사용

```typescript
// utils/storage.ts

export const storage = {
  get: <T>(key: string): T | null => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  
  set: <T>(key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  
  remove: (key: string): void => {
    localStorage.removeItem(key);
  }
};

// 사용 예시
const saveSessionData = (data: SessionData) => {
  storage.set('session_backup', data);
};

const loadSessionData = (): SessionData | null => {
  return storage.get('session_backup');
};
```

---

## ⚡ 성능 최적화

### 1. 메모이제이션

```typescript
import { useMemo, useCallback } from 'react';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState('');

  // 필터링된 학생 목록 메모이제이션
  const filteredStudents = useMemo(() => {
    return students.filter(s => s.name.includes(filter));
  }, [students, filter]);

  // 콜백 함수 메모이제이션
  const handleFilterChange = useCallback((value: string) => {
    setFilter(value);
  }, []);

  return (
    <StudentList 
      students={filteredStudents}
      onFilterChange={handleFilterChange}
    />
  );
};
```

### 2. Context 분리

```typescript
// 상태 변경이 잦은 컨텍스트 분리
const PoseContext = createContext(null);
const UIContext = createContext(null);

// PoseContext는 실시간 업데이트
// UIContext는 드물게 변경
```

---

## 🧪 테스트

### Context 테스트

```typescript
// context/__tests__/SessionContext.test.tsx

import { renderHook, act } from '@testing-library/react';
import { SessionProvider, useSession } from '../SessionContext';

describe('SessionContext', () => {
  it('should start session correctly', () => {
    const { result } = renderHook(() => useSession(), {
      wrapper: SessionProvider
    });

    act(() => {
      result.current.startSession('class1', [
        { id: '1', name: '철수', characterId: 'bear' }
      ]);
    });

    expect(result.current.sessionId).toBeTruthy();
    expect(result.current.students).toHaveLength(1);
    expect(result.current.isCalibrated).toBe(false);
  });

  it('should update student progress', () => {
    const { result } = renderHook(() => useSession(), {
      wrapper: SessionProvider
    });

    act(() => {
      result.current.startSession('class1', [
        { id: '1', name: '철수', characterId: 'bear' }
      ]);
    });

    act(() => {
      result.current.updateStudentProgress('1', {
        currentReps: 5,
        isDetected: true
      });
    });

    const progress = result.current.studentProgress.find(p => p.studentId === '1');
    expect(progress?.currentReps).toBe(5);
    expect(progress?.isDetected).toBe(true);
  });
});
```

---

## 📊 상태 관리 요약

| Context | 상태 | 업데이트 빈도 | 저장 |
|---------|------|---------------|------|
| AuthContext | 사용자 정보 | 드묾 | localStorage |
| SessionContext | 세션 데이터 | 실시간 | localStorage (백업) |
| SettingsContext | 설정 | 드묾 | localStorage |

**상태 관리 전략**:
1. **전역 상태**: 사용자 인증, 세션, 설정
2. **지역 상태**: UI 상태, 폼 입력, 임시 데이터
3. **영구 저장**: localStorage를 통한 설정 및 세션 백업
4. **실시간 동기화**: WebSocket을 통한 교사-학생 화면 동기화

---

**상태 관리 문서 완료**  
**작성일: 2026년 2월 14일**
