// ========================================
// WireFrame: TeacherSession.tsx
// 목적: 실시간으로 6명 학생의 운영 수행 상황을 모니터링하고 수업을 제어
// 경로: /session/teacher
// ========================================

import React, { useState } from 'react';

// 타입 정의
interface StudentProgress {
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
  status: 'waiting' | 'doing' | 'completed' | 'struggling';
}

interface FeedbackLog {
  id: string;
  studentName: string;
  message: string;
  type: 'positive' | 'correction';
  time: string;
}

interface Exercise {
  id: string;
  name: string;
  icon: string;
}

// Mock 데이터
const mockStudents: StudentProgress[] = [
  { id: '1', name: '철수', character: { id: 'bear', emoji: '🐻' }, currentReps: 15, targetReps: 20, isDetected: true, isMoving: true, status: 'doing' },
  { id: '2', name: '영희', character: { id: 'rabbit', emoji: '🐰' }, currentReps: 20, targetReps: 20, isDetected: true, isMoving: false, status: 'completed' },
  { id: '3', name: '민수', character: { id: 'cat', emoji: '🐱' }, currentReps: 12, targetReps: 20, isDetected: true, isMoving: true, status: 'doing' },
  { id: '4', name: '지영', character: { id: 'dog', emoji: '🐶' }, currentReps: 8, targetReps: 20, isDetected: true, isMoving: false, status: 'waiting' },
  { id: '5', name: '현우', character: { id: 'panda', emoji: '🐼' }, currentReps: 0, targetReps: 20, isDetected: false, isMoving: false, status: 'waiting' },
  { id: '6', name: '수진', character: { id: 'fox', emoji: '🦊' }, currentReps: 18, targetReps: 20, isDetected: true, isMoving: true, status: 'doing' }
];

const mockFeedbacks: FeedbackLog[] = [
  { id: '1', studentName: '철수', message: '자세가 좋아요!', type: 'positive', time: '10:23' },
  { id: '2', studentName: '영희', message: '무릎을 조금 더 굽혀볼까요?', type: 'correction', time: '10:22' },
  { id: '3', studentName: '민수', message: '잘하고 있어요!', type: 'positive', time: '10:21' }
];

const mockExercise: Exercise = {
  id: 'squat',
  name: '스쿼트',
  icon: '🏃'
};

export default function TeacherSession() {
  // 상태 관리
  const [students] = useState<StudentProgress[]>(mockStudents);
  const [feedbacks] = useState<FeedbackLog[]>(mockFeedbacks);
  const [isPaused, setIsPaused] = useState(false);
  const [volume, setVolume] = useState(80);
  const [fps] = useState(25);
  const [isCameraConnected] = useState(true);
  const [elapsedTime] = useState('15:23');
  const [currentExerciseIndex] = useState(0);
  const totalExercises = 3;

  // 계산된 값
  const completedReps = students.filter(s => s.currentReps >= s.targetReps).length;
  const totalTargetReps = students.length * mockStudents[0].targetReps;
  const totalCurrentReps = students.reduce((sum, s) => sum + s.currentReps, 0);

  // 핸들러
  const handlePauseToggle = () => {
    setIsPaused(!isPaused);
  };

  const handleNextExercise = () => {
    console.log('다음 운영으로');
  };

  const handleEndSession = () => {
    console.log('수업 종료');
    // router.push('/results');
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.target.value));
  };

  // 헬퍼 함수
  const getProgressColor = (student: StudentProgress) => {
    if (student.status === 'completed') return '#4CAF50';
    if (student.status === 'doing') return '#005EB8';
    return '#E8EDEE';
  };

  const getStatusLabel = (student: StudentProgress) => {
    switch (student.status) {
      case 'completed': return '완료';
      case 'doing': return '진행 중';
      case 'waiting': return '대기';
      case 'struggling': return '도움 필요';
      default: return '';
    }
  };

  const getStatusBgColor = (student: StudentProgress) => {
    switch (student.status) {
      case 'completed': return '#E8F5E9';
      case 'doing': return '#E8F4FD';
      case 'waiting': return '#F3F3F3';
      case 'struggling': return '#FEF2F2';
      default: return '#F3F3F3';
    }
  };

  const getStatusTextColor = (student: StudentProgress) => {
    switch (student.status) {
      case 'completed': return '#4CAF50';
      case 'doing': return '#005EB8';
      case 'waiting': return '#768692';
      case 'struggling': return '#D5281B';
      default: return '#768692';
    }
  };

  return (
    <div style={styles.container}>
      {/* Top Bar */}
      <header style={styles.topBar}>
        <div style={styles.topBarLeft}>
          <button style={styles.backButton}>←</button>
          <div style={styles.classInfo}>
            <h1 style={styles.className}>Class 1 - 기본 체육</h1>
            <p style={styles.classTime}>{elapsedTime} · 2026.02.14</p>
          </div>
        </div>

        <div style={styles.currentExercise}>
          <span style={styles.exerciseIcon}>{mockExercise.icon}</span>
          <span style={styles.exerciseName}>{mockExercise.name}</span>
          <span style={styles.exerciseProgress}>
            {completedReps}/{students.length}명 완료
          </span>
        </div>

        <div style={styles.topBarRight}>
          <div style={styles.systemStatus}>
            <span style={{ 
              ...styles.statusDot, 
              backgroundColor: fps >= 20 ? '#4CAF50' : '#FF9800' 
            }} />
            <span style={styles.statusText}>{fps} FPS</span>
            <span style={{ 
              ...styles.cameraIcon, 
              color: isCameraConnected ? '#4CAF50' : '#D5281B' 
            }}>
              📷
            </span>
          </div>
          <button style={styles.fullscreenButton}>⛶</button>
        </div>
      </header>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Student Monitoring Grid */}
        <div style={styles.studentGrid}>
          <div style={styles.gridContainer}>
            {students.map((student) => (
              <div
                key={student.id}
                style={{
                  ...styles.studentCard,
                  borderColor: student.isDetected ? getProgressColor(student) : '#D5281B'
                }}
              >
                {/* Detection Indicator */}
                <div style={{
                  ...styles.detectionIndicator,
                  backgroundColor: student.isDetected ? '#4CAF50' : '#D5281B'
                }} />

                {/* Character */}
                <div style={styles.characterArea}>
                  <div style={{
                    ...styles.characterAvatar,
                    filter: student.isDetected ? 'none' : 'grayscale(100%)',
                    opacity: student.isDetected ? 1 : 0.5
                  }}>
                    {student.character.emoji}
                  </div>
                </div>

                {/* Student Info */}
                <div style={styles.studentInfo}>
                  <p style={styles.studentName}>{student.name}</p>
                  
                  <div style={styles.repCounter}>
                    <span style={styles.repCount}>{student.currentReps}</span>
                    <span style={styles.repTotal}>/{student.targetReps}회</span>
                  </div>

                  <div style={styles.progressBarContainer}>
                    <div style={styles.progressBarBg}>
                      <div
                        style={{
                          ...styles.progressBarFill,
                          width: `${(student.currentReps / student.targetReps) * 100}%`,
                          backgroundColor: getProgressColor(student)
                        }}
                      />
                    </div>
                  </div>

                  <div style={{
                    ...styles.statusBadge,
                    backgroundColor: getStatusBgColor(student)
                  }}>
                    <span style={{
                      ...styles.statusBadgeText,
                      color: getStatusTextColor(student)
                    }}>
                      {getStatusLabel(student)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <aside style={styles.rightSidebar}>
          {/* Mini Camera View */}
          <div style={styles.cameraSection}>
            <h3 style={styles.sidebarSectionTitle}>침궤 뷰</h3>
            <div style={styles.cameraPreview}>
              📷
            </div>
          </div>

          {/* Feedback Log */}
          <div style={styles.feedbackSection}>
            <h3 style={styles.sidebarSectionTitle}>피드백 로그</h3>
            <div style={styles.feedbackList}>
              {feedbacks.map((feedback) => (
                <div
                  key={feedback.id}
                  style={{
                    ...styles.feedbackItem,
                    backgroundColor: feedback.type === 'positive' ? '#E8F5E9' : '#FFF3E0',
                    borderLeft: `3px solid ${feedback.type === 'positive' ? '#4CAF50' : '#FF9800'}`
                  }}
                >
                  <div style={styles.feedbackHeader}>
                    <span style={styles.feedbackStudentName}>{feedback.studentName}</span>
                    <span style={styles.feedbackTime}>{feedback.time}</span>
                  </div>
                  <p style={styles.feedbackMessage}>{feedback.message}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom Control Bar */}
      <footer style={styles.controlBar}>
        {/* Exercise Progress */}
        <div style={styles.exerciseProgressSection}>
          <div>
            <p style={styles.progressLabel}>전체 진행률</p>
            <p style={styles.progressValue}>
              {currentExerciseIndex + 1}/{totalExercises}
            </p>
          </div>
          <div style={styles.overallProgressBar}>
            <div style={styles.progressBarBg}>
              <div
                style={{
                  ...styles.progressBarFill,
                  width: `${((currentExerciseIndex + completedReps / students.length) / totalExercises) * 100}%`
                }}
              />
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div style={styles.controlButtons}>
          <button
            style={styles.controlButton}
            onClick={handlePauseToggle}
          >
            {isPaused ? '▶️ 계속하기' : '⏸️ 일시정지'}
          </button>
          <button
            style={styles.controlButton}
            onClick={handleNextExercise}
          >
            ⏭️ 다음 운영
          </button>
          <button
            style={styles.endButton}
            onClick={handleEndSession}
          >
            ⏹️ 수업 끝내기
          </button>
        </div>

        {/* Volume Control */}
        <div style={styles.volumeControl}>
          <span>{volume === 0 ? '🔇' : '🔊'}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            style={styles.volumeSlider}
          />
        </div>
      </footer>
    </div>
  );
}

// 스타일 정의
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#F8F9FA',
    fontFamily: "'Pretendard', -apple-system, sans-serif"
  },
  topBar: {
    height: '64px',
    padding: '0 24px',
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #E8EDEE',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  topBarLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  backButton: {
    width: '40px',
    height: '40px',
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '20px',
    cursor: 'pointer'
  },
  classInfo: {},
  className: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#212B32',
    margin: 0
  },
  classTime: {
    fontSize: '13px',
    color: '#768692',
    margin: '4px 0 0 0'
  },
  currentExercise: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 24px',
    backgroundColor: '#E8F4FD',
    borderRadius: '24px'
  },
  exerciseIcon: {
    fontSize: '24px'
  },
  exerciseName: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#005EB8'
  },
  exerciseProgress: {
    fontSize: '16px',
    color: '#005EB8'
  },
  topBarRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  systemStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%'
  },
  statusText: {
    fontSize: '13px',
    color: '#425563'
  },
  cameraIcon: {
    fontSize: '16px'
  },
  fullscreenButton: {
    width: '40px',
    height: '40px',
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '20px',
    cursor: 'pointer'
  },
  mainContent: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden'
  },
  studentGrid: {
    flex: 1,
    padding: '24px',
    overflow: 'auto'
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',
    gap: '16px',
    height: '100%'
  },
  studentCard: {
    position: 'relative',
    padding: '16px',
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    border: '2px solid #E8EDEE',
    display: 'flex',
    flexDirection: 'column'
  },
  detectionIndicator: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    width: '12px',
    height: '12px',
    borderRadius: '50%'
  },
  characterArea: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  characterAvatar: {
    fontSize: '80px'
  },
  studentInfo: {
    marginTop: '12px',
    textAlign: 'center'
  },
  studentName: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#212B32',
    margin: '0 0 8px 0'
  },
  repCounter: {
    marginBottom: '8px'
  },
  repCount: {
    fontSize: '32px',
    fontWeight: 700,
    color: '#005EB8'
  },
  repTotal: {
    fontSize: '14px',
    color: '#768692'
  },
  progressBarContainer: {
    marginBottom: '8px'
  },
  progressBarBg: {
    height: '8px',
    backgroundColor: '#E8EDEE',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    transition: 'width 0.3s ease'
  },
  statusBadge: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '12px'
  },
  statusBadgeText: {
    fontSize: '12px',
    fontWeight: 500
  },
  rightSidebar: {
    width: '320px',
    backgroundColor: '#FFFFFF',
    borderLeft: '1px solid #E8EDEE',
    display: 'flex',
    flexDirection: 'column'
  },
  cameraSection: {
    padding: '16px',
    borderBottom: '1px solid #E8EDEE'
  },
  sidebarSectionTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#212B32',
    margin: '0 0 12px 0'
  },
  cameraPreview: {
    aspectRatio: '4/3',
    backgroundColor: '#000000',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontSize: '32px'
  },
  feedbackSection: {
    flex: 1,
    padding: '16px',
    overflow: 'auto'
  },
  feedbackList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  feedbackItem: {
    padding: '12px',
    borderRadius: '8px'
  },
  feedbackHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '4px'
  },
  feedbackStudentName: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#212B32'
  },
  feedbackTime: {
    fontSize: '11px',
    color: '#768692'
  },
  feedbackMessage: {
    fontSize: '13px',
    color: '#425563',
    margin: 0
  },
  controlBar: {
    height: '80px',
    padding: '0 24px',
    backgroundColor: '#FFFFFF',
    borderTop: '1px solid #E8EDEE',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  exerciseProgressSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  },
  progressLabel: {
    fontSize: '13px',
    color: '#768692',
    margin: 0
  },
  progressValue: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#212B32',
    margin: '4px 0 0 0'
  },
  overallProgressBar: {
    width: '200px'
  },
  controlButtons: {
    display: 'flex',
    gap: '12px'
  },
  controlButton: {
    height: '48px',
    padding: '0 24px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E8EDEE',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: 500,
    color: '#425563',
    cursor: 'pointer'
  },
  endButton: {
    height: '48px',
    padding: '0 24px',
    backgroundColor: '#FEF2F2',
    border: '1px solid #D5281B',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: 500,
    color: '#D5281B',
    cursor: 'pointer'
  },
  volumeControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  volumeSlider: {
    width: '100px'
  }
};
