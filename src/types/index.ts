export interface Exercise {
  type: 'squat' | 'pushup' | 'burpee';
  name: string;
  target: number;
  order: number;
}

export interface Student {
  id: number;
  name: string;
  character: string;
  count: number;
  target: number;
  isActive: boolean;
  isDetected: boolean;
}

export interface ClassSequence {
  exercises: Exercise[];
  studentCount: number;
}

export interface FeedbackMessage {
  id: string;
  studentId: number;
  message: string;
  timestamp: Date;
  type: 'success' | 'info' | 'warning';
}

export type PlayState = 'idle' | 'playing' | 'paused' | 'completed';
