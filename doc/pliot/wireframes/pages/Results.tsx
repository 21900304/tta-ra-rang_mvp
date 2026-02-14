// ========================================
// WireFrame: Results.tsx
// 목적: 수업 종료 후 학생별 성과를 요약하고 교사에게 평가 데이터 제공
// 경로: /results
// ========================================

import React, { useState } from 'react';

// 타입 정의
interface ExerciseResult {
  id: string;
  name: string;
  icon: string;
  target: number;
  completed: number;
}

interface StudentResult {
  id: string;
  name: string;
  character: {
    id: string;
    emoji: string;
  };
  completionRate: number;
  exercises: ExerciseResult[];
  aiComment?: string;
}

// Mock 데이터
const mockStudentResults: StudentResult[] = [
  {
    id: '1',
    name: '철수',
    character: { id: 'bear', emoji: '🐻' },
    completionRate: 100,
    exercises: [
      { id: 'squat', name: '스쿼트', icon: '🏃', target: 20, completed: 20 },
      { id: 'pushup', name: '푸쉬업', icon: '💪', target: 15, completed: 15 },
      { id: 'burpee', name: '버피', icon: '🔥', target: 10, completed: 10 }
    ],
    aiComment: '완벽한 수업이었어요! ⭐'
  },
  {
    id: '2',
    name: '영희',
    character: { id: 'rabbit', emoji: '🐰' },
    completionRate: 85,
    exercises: [
      { id: 'squat', name: '스쿼트', icon: '🏃', target: 20, completed: 20 },
      { id: 'pushup', name: '푸쉬업', icon: '💪', target: 15, completed: 12 },
      { id: 'burpee', name: '버피', icon: '🔥', target: 10, completed: 8 }
    ],
    aiComment: '푸쉬업에서 조금 어려워했어요'
  },
  {
    id: '3',
    name: '민수',
    character: { id: 'cat', emoji: '🐱' },
    completionRate: 95,
    exercises: [
      { id: 'squat', name: '스쿼트', icon: '🏃', target: 20, completed: 20 },
      { id: 'pushup', name: '푸쉬업', icon: '💪', target: 15, completed: 15 },
      { id: 'burpee', name: '버피', icon: '🔥', target: 10, completed: 8 }
    ],
    aiComment: '전반적으로 우수해요!'
  },
  {
    id: '4',
    name: '지영',
    character: { id: 'dog', emoji: '🐶' },
    completionRate: 70,
    exercises: [
      { id: 'squat', name: '스쿼트', icon: '🏃', target: 20, completed: 15 },
      { id: 'pushup', name: '푸쉬업', icon: '💪', target: 15, completed: 10 },
      { id: 'burpee', name: '버피', icon: '🔥', target: 10, completed: 7 }
    ],
    aiComment: '버피 연습이 필요해요'
  },
  {
    id: '5',
    name: '현우',
    character: { id: 'panda', emoji: '🐼' },
    completionRate: 90,
    exercises: [
      { id: 'squat', name: '스쿼트', icon: '🏃', target: 20, completed: 20 },
      { id: 'pushup', name: '푸쉬업', icon: '💪', target: 15, completed: 14 },
      { id: 'burpee', name: '버피', icon: '🔥', target: 10, completed: 9 }
    ],
    aiComment: '열심히 참여했어요!'
  },
  {
    id: '6',
    name: '수진',
    character: { id: 'fox', emoji: '🦊' },
    completionRate: 80,
    exercises: [
      { id: 'squat', name: '스쿼트', icon: '🏃', target: 20, completed: 18 },
      { id: 'pushup', name: '푸쉬업', icon: '💪', target: 15, completed: 12 },
      { id: 'burpee', name: '버피', icon: '🔥', target: 10, completed: 8 }
    ],
    aiComment: '꾸준히 노력했어요'
  }
];

export default function Results() {
  // 상태 관리
  const [studentResults] = useState<StudentResult[]>(mockStudentResults);
  const [className] = useState('Class 1 - 기본 체육');
  const [sessionDate] = useState('2026.02.14');
  const [startTime] = useState('15:23');
  const [endTime] = useState('15:45');

  // 계산된 값
  const overallCompletion = Math.round(
    studentResults.reduce((sum, s) => sum + s.completionRate, 0) / studentResults.length
  );
  const totalExercises = studentResults[0]?.exercises.length || 0;
  const totalReps = studentResults.reduce(
    (sum, s) => sum + s.exercises.reduce((eSum, e) => eSum + e.completed, 0),
    0
  );
  const sessionDuration = '22분';

  // 핸들러
  const handleSave = () => {
    console.log('결과 저장');
  };

  const handleShare = () => {
    console.log('결과 공유');
  };

  const handleNewSession = () => {
    console.log('새 수업 시작');
    // router.push('/');
  };

  // 헬퍼 함수
  const getResultColor = (rate: number) => {
    if (rate >= 90) return '#4CAF50';
    if (rate >= 70) return '#005EB8';
    return '#FF9800';
  };

  const getResultBgColor = (rate: number) => {
    if (rate >= 90) return '#E8F5E9';
    if (rate >= 70) return '#E8F4FD';
    return '#FFF3E0';
  };

  const getResultTextColor = (rate: number) => {
    if (rate >= 90) return '#4CAF50';
    if (rate >= 70) return '#005EB8';
    return '#FF9800';
  };

  const getCompletionLabel = (rate: number) => {
    if (rate >= 90) return '우수';
    if (rate >= 70) return '양호';
    return '보통';
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.logo}>🏃 따라랑</span>
          <h1 style={styles.pageTitle}>수업 결과</h1>
        </div>
        <p style={styles.timestamp}>
          {sessionDate} {startTime} ~ {endTime}
        </p>
      </header>

      {/* Main Content */}
      <main style={styles.mainContent}>
        {/* Summary Section */}
        <section style={styles.summarySection}>
          <div style={styles.celebrationIcon}>🎉</div>
          <h2 style={styles.summaryTitle}>수업 완료! 잘했어요!</h2>
          <p style={styles.className}>{className}</p>

          {/* Overall Stats */}
          <div style={styles.statsGrid}>
            <div style={{ ...styles.statCard, backgroundColor: '#E8F4FD' }}>
              <p style={{ ...styles.statValue, color: '#005EB8' }}>{overallCompletion}%</p>
              <p style={styles.statLabel}>전체 달성률</p>
            </div>
            <div style={{ ...styles.statCard, backgroundColor: '#E8F5E9' }}>
              <p style={{ ...styles.statValue, color: '#4CAF50' }}>{totalExercises}</p>
              <p style={styles.statLabel}>완료한 운영</p>
            </div>
            <div style={{ ...styles.statCard, backgroundColor: '#FFF3E0' }}>
              <p style={{ ...styles.statValue, color: '#FF9800' }}>{totalReps}</p>
              <p style={styles.statLabel}>총 운동 횟수</p>
            </div>
            <div style={{ ...styles.statCard, backgroundColor: '#F3E5F5' }}>
              <p style={{ ...styles.statValue, color: '#9C27B0' }}>{sessionDuration}</p>
              <p style={styles.statLabel}>수업 시간</p>
            </div>
          </div>

          {/* Overall Progress Bar */}
          <div style={styles.overallProgressContainer}>
            <div style={styles.overallProgressLabel}>
              <span style={styles.overallProgressText}>전체 진행률</span>
              <span style={{ ...styles.overallProgressValue, color: '#005EB8' }}>
                {overallCompletion}%
              </span>
            </div>
            <div style={styles.progressBarBg}>
              <div
                style={{
                  ...styles.progressBarFill,
                  width: `${overallCompletion}%`
                }}
              />
            </div>
          </div>
        </section>

        {/* Student Results */}
        <section style={styles.studentResultsSection}>
          <h3 style={styles.sectionTitle}>학생별 결과</h3>

          <div style={styles.studentResultsList}>
            {studentResults.map((result) => (
              <div
                key={result.id}
                style={{
                  ...styles.studentResultCard,
                  borderLeft: `4px solid ${getResultColor(result.completionRate)}`
                }}
              >
                <div style={styles.cardHeader}>
                  <div style={styles.studentInfo}>
                    <span style={styles.studentAvatar}>{result.character.emoji}</span>
                    <div>
                      <h4 style={styles.studentName}>{result.name}</h4>
                      <span
                        style={{
                          ...styles.completionBadge,
                          backgroundColor: getResultBgColor(result.completionRate)
                        }}
                      >
                        <span
                          style={{
                            ...styles.badgeText,
                            color: getResultTextColor(result.completionRate)
                          }}
                        >
                          {getCompletionLabel(result.completionRate)}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div style={styles.completionRate}>
                    <p style={{ ...styles.rateValue, color: getResultColor(result.completionRate) }}>
                      {result.completionRate}%
                    </p>
                    <p style={styles.rateLabel}>달성률</p>
                  </div>
                </div>

                {/* Exercise Breakdown */}
                <div style={styles.exerciseBreakdown}>
                  {result.exercises.map((ex) => (
                    <div
                      key={ex.id}
                      style={{
                        ...styles.exerciseTag,
                        backgroundColor: ex.completed >= ex.target ? '#E8F5E9' : '#FFF3E0'
                      }}
                    >
                      <span style={styles.exerciseIcon}>{ex.icon}</span>
                      <span style={styles.exerciseName}>{ex.name}</span>
                      <span
                        style={{
                          ...styles.exerciseCount,
                          color: ex.completed >= ex.target ? '#4CAF50' : '#FF9800'
                        }}
                      >
                        {ex.completed}/{ex.target}
                      </span>
                    </div>
                  ))}
                </div>

                {/* AI Comment */}
                {result.aiComment && (
                  <div style={styles.aiComment}>
                    <span style={styles.aiIcon}>✨</span>
                    <p style={styles.commentText}>{result.aiComment}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Action Buttons */}
        <section style={styles.actionSection}>
          <button style={styles.secondaryButton} onClick={handleSave}>
            💾 결과 저장
          </button>
          <button style={styles.secondaryButton} onClick={handleShare}>
            📤 공유하기
          </button>
          <button style={styles.primaryButton} onClick={handleNewSession}>
            🔄 새 수업 시작
          </button>
        </section>
      </main>
    </div>
  );
}

// 스타일 정의
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#F8F9FA',
    fontFamily: "'Pretendard', -apple-system, sans-serif"
  },
  header: {
    height: '80px',
    padding: '0 32px',
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #E8EDEE',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  logo: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#005EB8'
  },
  pageTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#212B32',
    margin: 0
  },
  timestamp: {
    fontSize: '14px',
    color: '#768692'
  },
  mainContent: {
    padding: '32px',
    maxWidth: '1000px',
    margin: '0 auto'
  },
  summarySection: {
    padding: '32px',
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    marginBottom: '32px',
    textAlign: 'center'
  },
  celebrationIcon: {
    fontSize: '64px',
    marginBottom: '16px'
  },
  summaryTitle: {
    fontSize: '32px',
    fontWeight: 700,
    color: '#212B32',
    margin: '0 0 8px 0'
  },
  className: {
    fontSize: '20px',
    color: '#425563',
    margin: '0 0 24px 0'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px',
    maxWidth: '800px',
    margin: '0 auto 32px'
  },
  statCard: {
    padding: '20px',
    borderRadius: '12px'
  },
  statValue: {
    fontSize: '36px',
    fontWeight: 700,
    margin: '0 0 4px 0'
  },
  statLabel: {
    fontSize: '14px',
    color: '#425563',
    margin: 0
  },
  overallProgressContainer: {
    maxWidth: '600px',
    margin: '0 auto'
  },
  overallProgressLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px'
  },
  overallProgressText: {
    fontSize: '14px',
    color: '#425563'
  },
  overallProgressValue: {
    fontSize: '14px',
    fontWeight: 600
  },
  progressBarBg: {
    height: '16px',
    backgroundColor: '#E8EDEE',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#005EB8',
    transition: 'width 0.3s ease'
  },
  studentResultsSection: {
    marginBottom: '32px'
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#212B32',
    margin: '0 0 24px 0'
  },
  studentResultsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  studentResultCard: {
    padding: '24px',
    backgroundColor: '#FFFFFF',
    borderRadius: '12px'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  studentInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  studentAvatar: {
    fontSize: '48px'
  },
  studentName: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#212B32',
    margin: '0 0 4px 0'
  },
  completionBadge: {
    padding: '4px 12px',
    borderRadius: '12px',
    display: 'inline-block'
  },
  badgeText: {
    fontSize: '13px',
    fontWeight: 500
  },
  completionRate: {
    textAlign: 'right'
  },
  rateValue: {
    fontSize: '32px',
    fontWeight: 700,
    margin: 0
  },
  rateLabel: {
    fontSize: '13px',
    color: '#768692',
    margin: '4px 0 0 0'
  },
  exerciseBreakdown: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    marginBottom: '16px'
  },
  exerciseTag: {
    padding: '8px 16px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  exerciseIcon: {
    fontSize: '16px'
  },
  exerciseName: {
    fontSize: '14px',
    color: '#212B32'
  },
  exerciseCount: {
    fontSize: '14px',
    fontWeight: 600
  },
  aiComment: {
    padding: '12px 16px',
    backgroundColor: '#F8F9FA',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  aiIcon: {
    fontSize: '16px',
    color: '#005EB8'
  },
  commentText: {
    fontSize: '14px',
    color: '#425563',
    margin: 0
  },
  actionSection: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    padding: '24px',
    backgroundColor: '#FFFFFF',
    borderRadius: '12px'
  },
  secondaryButton: {
    width: '160px',
    height: '48px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E8EDEE',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 500,
    color: '#425563',
    cursor: 'pointer'
  },
  primaryButton: {
    width: '160px',
    height: '48px',
    backgroundColor: '#005EB8',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 600,
    color: '#FFFFFF',
    cursor: 'pointer'
  }
};
