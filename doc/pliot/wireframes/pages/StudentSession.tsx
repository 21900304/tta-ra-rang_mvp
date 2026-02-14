// ========================================
// WireFrame: StudentSession.tsx
// 목적: 학생이 자신의 캐릭터와 운영 진행을 직관적으로 인지하고 동기부여 받음
// 경로: /session/student
// 사용처: TV 화면 출력
// ========================================

import React, { useState } from 'react';

// 타입 정의
interface StudentDisplay {
  id: string;
  name: string;
  character: {
    id: string;
    emoji: string;
  };
  currentReps: number;
  targetReps: number;
  isDetected: boolean;
  isMoving: boolean;
  lastFeedback?: {
    type: 'positive' | 'correction';
    message: string;
  };
}

interface RecentFeedback {
  studentName: string;
  message: string;
  type: 'positive' | 'correction';
}

// Mock 데이터
const mockStudents: StudentDisplay[] = [
  { 
    id: '1', 
    name: '철수', 
    character: { id: 'bear', emoji: '🐻' }, 
    currentReps: 15, 
    targetReps: 20, 
    isDetected: true, 
    isMoving: true,
    lastFeedback: { type: 'positive', message: '자세가 좋아요!' }
  },
  { 
    id: '2', 
    name: '영희', 
    character: { id: 'rabbit', emoji: '🐰' }, 
    currentReps: 20, 
    targetReps: 20, 
    isDetected: true, 
    isMoving: false,
    lastFeedback: { type: 'correction', message: '무릎을 더 굽혀볼까요?' }
  },
  { 
    id: '3', 
    name: '민수', 
    character: { id: 'cat', emoji: '🐱' }, 
    currentReps: 20, 
    targetReps: 20, 
    isDetected: true, 
    isMoving: false,
    lastFeedback: { type: 'positive', message: '잘하고 있어요!' }
  },
  { 
    id: '4', 
    name: '지영', 
    character: { id: 'dog', emoji: '🐶' }, 
    currentReps: 14, 
    targetReps: 20, 
    isDetected: true, 
    isMoving: true 
  },
  { 
    id: '5', 
    name: '현우', 
    character: { id: 'panda', emoji: '🐼' }, 
    currentReps: 10, 
    targetReps: 20, 
    isDetected: true, 
    isMoving: true 
  },
  { 
    id: '6', 
    name: '수진', 
    character: { id: 'fox', emoji: '🦊' }, 
    currentReps: 8, 
    targetReps: 20, 
    isDetected: true, 
    isMoving: false 
  }
];

const mockFeedbacks: RecentFeedback[] = [
  { studentName: '철수', message: '자세가 좋아요!', type: 'positive' },
  { studentName: '영희', message: '조금만 더!', type: 'correction' }
];

export default function StudentSession() {
  // 상태 관리
  const [students] = useState<StudentDisplay[]>(mockStudents);
  const [recentFeedbacks] = useState<RecentFeedback[]>(mockFeedbacks);
  const [currentExercise] = useState({ name: '스쿼트', icon: '🏃' });
  const completedReps = 15;
  const targetReps = 20;

  // 헬퍼 함수
  const getEncouragementMessage = () => {
    const messages = [
      '모두 화이팅! 💪',
      '잘하고 있어요! ⭐',
      '조금만 더 힘내요! 🌟',
      '멋져요! 🎉'
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div style={styles.container}>
      {/* Top Section - Exercise Info */}
      <header style={styles.topSection}>
        <div style={styles.exerciseInfo}>
          <span style={styles.exerciseIcon}>{currentExercise.icon}</span>
          <div style={styles.exerciseDetails}>
            <p style={styles.exerciseLabel}>지금 하는 운영</p>
            <h1 style={styles.exerciseName}>{currentExercise.name}</h1>
          </div>
        </div>

        <div style={styles.overallProgress}>
          <p style={styles.progressText}>
            {completedReps}/{targetReps}
          </p>
          <div style={styles.progressBarContainer}>
            <div style={styles.progressBarBg}>
              <div
                style={{
                  ...styles.progressBarFill,
                  width: `${(completedReps / targetReps) * 100}%`
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Middle Section - Characters */}
      <main style={styles.charactersSection}>
        {students.map((student) => (
          <div
            key={student.id}
            style={{
              ...styles.characterDisplay,
              opacity: student.isDetected ? 1 : 0.5
            }}
          >
            {/* Character Avatar Container */}
            <div style={styles.characterAvatarContainer}>
              <div
                style={{
                  ...styles.characterAvatar,
                  filter: student.isDetected ? 'none' : 'grayscale(100%)',
                  animation: student.isMoving ? 'bounce 1s infinite' : 'none'
                }}
              >
                {student.character.emoji}
              </div>

              {/* Completion Star */}
              {student.currentReps >= student.targetReps && (
                <div style={styles.completionStar}>⭐</div>
              )}

              {/* Feedback Bubble */}
              {student.lastFeedback && (
                <div
                  style={{
                    ...styles.feedbackBubble,
                    backgroundColor: student.lastFeedback.type === 'positive' ? '#4CAF50' : '#FF9800'
                  }}
                >
                  <p style={styles.feedbackBubbleText}>
                    {student.lastFeedback.message}
                  </p>
                  <div
                    style={{
                      ...styles.bubbleArrow,
                      borderColor: `${student.lastFeedback.type === 'positive' ? '#4CAF50' : '#FF9800'} transparent transparent transparent`
                    }}
                  />
                </div>
              )}
            </div>

            {/* Student Name */}
            <h2 style={styles.studentName}>{student.name}</h2>

            {/* Rep Counter */}
            <div style={styles.repCounter}>
              <span style={styles.repCount}>{student.currentReps}</span>
              <span style={styles.repTotal}>/{student.targetReps}</span>
            </div>

            {/* Status Indicator */}
            <div
              style={{
                ...styles.statusIndicator,
                backgroundColor: student.currentReps >= student.targetReps ? '#4CAF50' : '#FFB81C',
                animation: student.isMoving ? 'pulse 1s infinite' : 'none'
              }}
            />
          </div>
        ))}
      </main>

      {/* Bottom Section - Feedback Area */}
      <footer style={styles.bottomSection}>
        {/* Recent Feedbacks */}
        <div style={styles.feedbackList}>
          {recentFeedbacks.map((feedback, index) => (
            <div
              key={index}
              style={{
                ...styles.feedbackCard,
                borderColor: feedback.type === 'positive' ? '#4CAF50' : '#FF9800',
                backgroundColor: feedback.type === 'positive' ? 'rgba(76,175,80,0.2)' : 'rgba(255,152,0,0.2)'
              }}
            >
              <div style={styles.feedbackHeader}>
                <span style={styles.feedbackIcon}>
                  {feedback.type === 'positive' ? '⭐' : '💪'}
                </span>
                <span style={styles.feedbackStudentName}>{feedback.studentName}</span>
              </div>
              <p style={styles.feedbackMessage}>{feedback.message}</p>
            </div>
          ))}
        </div>

        {/* Encouragement Message */}
        <p style={styles.encouragementMessage}>
          {getEncouragementMessage()}
        </p>
      </footer>

      {/* Exercise Complete Overlay (조건부 렌더링) */}
      {/* {isExerciseComplete && (
        <div style={styles.completeOverlay}>
          <div style={styles.celebrationAnimation}>🎉 🎊 🎉</div>
          <h2 style={styles.completeTitle}>운영 완료!</h2>
          <p style={styles.completeMessage}>모두 잘했어요! 다음 운영을 준비하세요</p>
        </div>
      )} */}
    </div>
  );
}

// 스타일 정의
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#1A1A2E',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px',
    fontFamily: "'Pretendard', -apple-system, sans-serif",
    color: '#FFFFFF'
  },
  topSection: {
    height: '15%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 48px'
  },
  exerciseInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  exerciseIcon: {
    fontSize: '64px'
  },
  exerciseDetails: {},
  exerciseLabel: {
    fontSize: '24px',
    color: '#FFB81C',
    fontWeight: 500,
    margin: '0 0 8px 0'
  },
  exerciseName: {
    fontSize: '48px',
    fontWeight: 700,
    color: '#FFFFFF',
    margin: 0
  },
  overallProgress: {
    textAlign: 'right'
  },
  progressText: {
    fontSize: '32px',
    fontWeight: 600,
    color: '#FFFFFF',
    margin: '0 0 8px 0'
  },
  progressBarContainer: {
    width: '300px'
  },
  progressBarBg: {
    height: '16px',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFB81C',
    transition: 'width 0.3s ease'
  },
  charactersSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '32px',
    padding: '24px 0'
  },
  characterDisplay: {
    width: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'opacity 0.3s ease'
  },
  characterAvatarContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: '1',
    marginBottom: '16px'
  },
  characterAvatar: {
    fontSize: '120px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  completionStar: {
    position: 'absolute',
    top: '-20px',
    right: '-20px',
    fontSize: '48px',
    animation: 'pulse 1s infinite'
  },
  feedbackBubble: {
    position: 'absolute',
    top: '-80px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '12px 20px',
    borderRadius: '20px',
    whiteSpace: 'nowrap',
    animation: 'fadeInOut 3s'
  },
  feedbackBubbleText: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#FFFFFF',
    margin: 0
  },
  bubbleArrow: {
    position: 'absolute',
    bottom: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    borderWidth: '10px',
    borderStyle: 'solid'
  },
  studentName: {
    fontSize: '28px',
    fontWeight: 600,
    color: '#FFFFFF',
    margin: '0 0 8px 0'
  },
  repCounter: {
    padding: '8px 24px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '24px',
    marginBottom: '12px'
  },
  repCount: {
    fontSize: '36px',
    fontWeight: 700,
    color: '#FFB81C'
  },
  repTotal: {
    fontSize: '24px',
    color: 'rgba(255,255,255,0.6)'
  },
  statusIndicator: {
    width: '16px',
    height: '16px',
    borderRadius: '50%'
  },
  bottomSection: {
    height: '20%',
    padding: '24px 48px',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  feedbackList: {
    display: 'flex',
    gap: '16px',
    marginBottom: '16px',
    overflow: 'hidden'
  },
  feedbackCard: {
    flex: 1,
    padding: '16px 24px',
    borderRadius: '12px',
    border: '2px solid'
  },
  feedbackHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px'
  },
  feedbackIcon: {
    fontSize: '24px'
  },
  feedbackStudentName: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#FFFFFF'
  },
  feedbackMessage: {
    fontSize: '24px',
    fontWeight: 500,
    color: '#FFFFFF',
    margin: 0
  },
  encouragementMessage: {
    textAlign: 'center',
    fontSize: '32px',
    fontWeight: 600,
    color: '#FFB81C',
    margin: 0
  },
  completeOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  celebrationAnimation: {
    fontSize: '80px',
    marginBottom: '24px',
    animation: 'bounce 1s infinite'
  },
  completeTitle: {
    fontSize: '64px',
    fontWeight: 700,
    color: '#FFB81C',
    margin: '0 0 24px 0'
  },
  completeMessage: {
    fontSize: '36px',
    color: '#FFFFFF',
    margin: 0
  }
};
