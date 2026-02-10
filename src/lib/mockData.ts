import { Exercise, Student } from '@/types'

export const classSequence: Exercise[] = [
  { type: 'squat', name: '스쿼트', target: 20, order: 1 },
  { type: 'pushup', name: '푸쉬업', target: 20, order: 2 },
  { type: 'burpee', name: '버피', target: 20, order: 3 },
]

export const createMockStudents = (count: number): Student[] => {
  const characters = ['🦁', '🐯', '🐻', '🦊', '🐰', '🐼']
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `학생 ${i + 1}`,
    character: characters[i],
    count: 0,
    target: 20,
    isActive: true,
    isDetected: i < count,
  }))
}

export const feedbackMessages = [
  '자세가 좋아요!',
  '잘하고 있어요!',
  '힘내세요!',
  '완벽해요!',
  '무릎을 조금 더 굽혀보세요',
  '등을 곧게 펴보세요',
  '천천히 해보세요',
  '참 잘했어요!',
]
