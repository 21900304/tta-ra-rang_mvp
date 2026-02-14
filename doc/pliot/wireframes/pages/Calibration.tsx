// ========================================
// WireFrame: Calibration.tsx
// 목적: 6명 학생을 6개 캐릭터 슬롯에 정확히 1:1 매칭
// 경로: /calibration
// ========================================

import React, { useState, useEffect } from 'react';

// 타입 정의
interface PoseData {
  id: string;
  x: number;
  y: number;
  score: number;
}

interface MatchedStudent {
  id: string;
  name: string;
  slotIndex: number;
  poseId: string;
}

interface CharacterSlot {
  index: number;
  character: {
    id: string;
    name: string;
    emoji: string;
    color: string;
  };
  student: MatchedStudent | null;
}

// 캐릭터 데이터
const characters = [
  { id: 'bear', name: '곰돌이', emoji: '🐻', color: '#8B4513' },
  { id: 'rabbit', name: '토끼', emoji: '🐰', color: '#FFB6C1' },
  { id: 'cat', name: '고양이', emoji: '🐱', color: '#FFA500' },
  { id: 'dog', name: '강아지', emoji: '🐶', color: '#D2691E' },
  { id: 'panda', name: '판다', emoji: '🐼', color: '#000000' },
  { id: 'fox', name: '여우', emoji: '🦊', color: '#FF6347' }
];

// Mock 데이터
const mockDetectedPoses: PoseData[] = [
  { id: 'pose1', x: 100, y: 200, score: 0.95 },
  { id: 'pose2', x: 250, y: 200, score: 0.92 },
  { id: 'pose3', x: 400, y: 200, score: 0.88 }
];

export default function Calibration() {
  // 상태 관리
  const [detectedPoses, setDetectedPoses] = useState<PoseData[]>([]);
  const [matchedStudents, setMatchedStudents] = useState<(MatchedStudent | null)[]>([
    { id: '1', name: '철수', slotIndex: 0, poseId: 'pose1' },
    { id: '2', name: '영희', slotIndex: 1, poseId: 'pose2' },
    { id: '3', name: '민수', slotIndex: 2, poseId: 'pose3' },
    null,
    null,
    null
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  // 계산된 값
  const matchedCount = matchedStudents.filter(s => s !== null).length;

  // 핸들러
  const handleReset = () => {
    setMatchedStudents([null, null, null, null, null, null]);
    setDetectedPoses([]);
  };

  const handleConfirm = () => {
    if (matchedCount > 0) {
      console.log('매칭 완료, 수업 시작');
      // router.push('/session/teacher');
    }
  };

  const handleCancel = () => {
    // router.push('/');
  };

  // 시뮬레이션: 포즈 감지
  useEffect(() => {
    const timer = setTimeout(() => {
      setDetectedPoses(mockDetectedPoses);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.logo}>🏃 따라랑</span>
          <h1 style={styles.pageTitle}>자리 맞추기</h1>
        </div>
        <button style={styles.closeButton} onClick={handleCancel}>
          ✕
        </button>
      </header>

      {/* Main Content */}
      <main style={styles.mainContent}>
        {/* Guide Message */}
        <div style={styles.guideSection}>
          <h2 style={styles.guideTitle}>
            학생들이 자리에 앉은 후 손을 들어주세요
          </h2>
          <p style={styles.guideSubtitle}>
            왼쪽부터 차례대로 앉으면 더 정확해요
          </p>
        </div>

        {/* Camera View */}
        <div style={styles.cameraContainer}>
          <div style={styles.cameraView}>
            <div style={styles.cameraPlaceholder}>
              📷 침궤 화면
              {detectedPoses.length > 0 && (
                <div style={styles.poseOverlay}>
                  {detectedPoses.map((pose) => (
                    <div
                      key={pose.id}
                      style={{
                        ...styles.poseMarker,
                        left: `${pose.x / 5}px`,
                        top: `${pose.y / 3}px`
                      }}
                    >
                      🎯
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Grid Lines */}
            <div style={styles.gridOverlay}>
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  style={{
                    ...styles.gridLine,
                    left: `${(i / 6) * 100}%`
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Character Slots */}
        <div style={styles.slotsContainer}>
          {characters.map((char, index) => {
            const student = matchedStudents[index];
            return (
              <div
                key={index}
                style={{
                  ...styles.characterSlot,
                  ...(student ? styles.characterSlotMatched : {})
                }}
              >
                <div style={styles.characterAvatar}>
                  <span style={{ fontSize: '64px' }}>{char.emoji}</span>
                </div>
                
                <div style={styles.slotInfo}>
                  {student ? (
                    <>
                      <p style={styles.studentName}>{student.name}</p>
                      <div style={styles.checkIcon}>✓</div>
                    </>
                  ) : (
                    <>
                      <p style={styles.waitingName}>{char.name}</p>
                      <div style={styles.pulseIndicator} />
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Status Bar */}
        <div style={styles.statusBar}>
          <div style={styles.statusIcon}>
            {matchedCount === 6 ? '✅' : '⏳'}
          </div>
          <span style={styles.statusText}>
            {matchedCount}/6명 확인 완료
          </span>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${(matchedCount / 6) * 100}%`,
                backgroundColor: matchedCount === 6 ? '#4CAF50' : '#005EB8'
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div style={styles.actionContainer}>
          <button
            style={styles.secondaryButton}
            onClick={handleReset}
          >
            🔄 다시 시도
          </button>
          <button
            style={{
              ...styles.primaryButton,
              ...(matchedCount === 0 ? styles.primaryButtonDisabled : {})
            }}
            onClick={handleConfirm}
            disabled={matchedCount === 0}
          >
            {matchedCount === 6 ? '✓ 확인 완료' : `✓ 걸어뛰기 (${matchedCount}명)`}
          </button>
        </div>

        {/* Tips */}
        <div style={styles.tipsSection}>
          <div style={styles.tipContent}>
            <span style={styles.tipIcon}>💡</span>
            <p style={styles.tipText}>
              팁: 학생들은 왼쪽부터 차례로 앉게 해주세요. 인식이 안 되면 조금 더 가까이 와주세요.
            </p>
          </div>
        </div>
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
    height: '64px',
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
    fontSize: '20px',
    fontWeight: 700,
    color: '#005EB8'
  },
  pageTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#212B32',
    margin: 0
  },
  closeButton: {
    width: '40px',
    height: '40px',
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '24px',
    color: '#768692',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainContent: {
    padding: '32px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  guideSection: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  guideTitle: {
    fontSize: '24px',
    fontWeight: 600,
    color: '#212B32',
    margin: '0 0 12px 0'
  },
  guideSubtitle: {
    fontSize: '16px',
    color: '#425563',
    margin: 0
  },
  cameraContainer: {
    maxWidth: '960px',
    margin: '0 auto 32px',
    borderRadius: '16px',
    overflow: 'hidden'
  },
  cameraView: {
    position: 'relative',
    aspectRatio: '16/9',
    backgroundColor: '#000000'
  },
  cameraPlaceholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontSize: '24px'
  },
  poseOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  poseMarker: {
    position: 'absolute',
    fontSize: '32px',
    transform: 'translate(-50%, -50%)'
  },
  gridOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  gridLine: {
    position: 'absolute',
    width: '1px',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.3)'
  },
  slotsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '48px',
    flexWrap: 'wrap'
  },
  characterSlot: {
    width: '120px',
    padding: '16px',
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    border: '2px solid #E8EDEE',
    textAlign: 'center',
    transition: 'all 0.3s ease'
  },
  characterSlotMatched: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50'
  },
  characterAvatar: {
    marginBottom: '12px'
  },
  slotInfo: {
    minHeight: '48px'
  },
  studentName: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#212B32',
    margin: '0 0 4px 0'
  },
  checkIcon: {
    color: '#4CAF50',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  waitingName: {
    fontSize: '14px',
    color: '#768692',
    margin: '0 0 8px 0'
  },
  pulseIndicator: {
    width: '12px',
    height: '12px',
    backgroundColor: '#FFB81C',
    borderRadius: '50%',
    margin: '0 auto',
    animation: 'pulse 1.5s infinite'
  },
  statusBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '32px'
  },
  statusIcon: {
    fontSize: '20px'
  },
  statusText: {
    fontSize: '16px',
    color: '#212B32',
    fontWeight: 500
  },
  progressBar: {
    width: '200px',
    height: '8px',
    backgroundColor: '#E8EDEE',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    transition: 'width 0.3s ease'
  },
  actionContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '32px'
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
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  primaryButton: {
    width: '200px',
    height: '48px',
    backgroundColor: '#005EB8',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 600,
    color: '#FFFFFF',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  primaryButtonDisabled: {
    backgroundColor: '#E8EDEE',
    color: '#768692',
    cursor: 'not-allowed'
  },
  tipsSection: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '16px 24px',
    backgroundColor: '#FFF8E1',
    borderRadius: '8px'
  },
  tipContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  tipIcon: {
    fontSize: '16px'
  },
  tipText: {
    fontSize: '14px',
    color: '#5D4037',
    margin: 0
  }
};
