// ========================================
// WireFrame: Classes.tsx
// 목적: 클래스 생성, 편집, 삭제
// 경로: /classes
// ========================================

import React, { useState } from 'react';

// 타입 정의
interface ClassData {
  id: string;
  name: string;
  exerciseCount: number;
  duration: number;
  exercises: {
    name: string;
    reps: number;
  }[];
  lastUsed: string;
}

// Mock 데이터
const mockClasses: ClassData[] = [
  {
    id: '1',
    name: 'Class 1 - 기본 체육',
    exerciseCount: 3,
    duration: 20,
    exercises: [
      { name: '스쿼트', reps: 20 },
      { name: '푸쉬업', reps: 15 },
      { name: '버피', reps: 10 }
    ],
    lastUsed: '2일 전'
  },
  {
    id: '2',
    name: 'Class 2 - 상체 집중',
    exerciseCount: 2,
    duration: 15,
    exercises: [
      { name: '푸쉬업', reps: 20 },
      { name: '플랭크', reps: 30 }
    ],
    lastUsed: '1주일 전'
  },
  {
    id: '3',
    name: 'Class 3 - 하체 강화',
    exerciseCount: 2,
    duration: 18,
    exercises: [
      { name: '스쿼트', reps: 25 },
      { name: '런지', reps: 20 }
    ],
    lastUsed: '2주일 전'
  }
];

export default function Classes() {
  // 상태 관리
  const [classes] = useState<ClassData[]>(mockClasses);

  // 핸들러
  const handleEdit = (id: string) => {
    console.log('클스 편집:', id);
    // router.push(`/classes/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    console.log('클스 삭제:', id);
  };

  const handleCreate = () => {
    console.log('새 클래스 생성');
    // router.push('/classes/edit/new');
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.logo}>🏃 따라랑</div>
        </div>
        
        <nav style={styles.sidebarNav}>
          <a href="/" style={styles.sidebarItem}>
            <span style={styles.sidebarIcon}>🏠</span>
            <span style={styles.sidebarLabel}>대시보드</span>
          </a>
          <a href="/session" style={{ ...styles.sidebarItem, opacity: 0.5 }}>
            <span style={styles.sidebarIcon}>▶️</span>
            <span style={styles.sidebarLabel}>수업 진행</span>
          </a>
          <a href="/classes" style={{ ...styles.sidebarItem, ...styles.sidebarItemActive }}>
            <span style={styles.sidebarIcon}>📋</span>
            <span style={styles.sidebarLabel}>클스 관리</span>
          </a>
          <a href="/settings" style={styles.sidebarItem}>
            <span style={styles.sidebarIcon}>⚙️</span>
            <span style={styles.sidebarLabel}>설정</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <header style={styles.pageHeader}>
          <div>
            <h1 style={styles.pageTitle}>클스 관리</h1>
            <p style={styles.pageSubtitle}>수업에 사용할 클래스를 만들고 관리하세요</p>
          </div>
        </header>

        {/* Class Grid */}
        <div style={styles.classGrid}>
          {classes.map((classItem) => (
            <div key={classItem.id} style={styles.classCard}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>{classItem.name}</h3>
                <div style={styles.cardActions}>
                  <button
                    style={styles.iconButton}
                    onClick={() => handleEdit(classItem.id)}
                  >
                    ✏️
                  </button>
                  <button
                    style={styles.iconButton}
                    onClick={() => handleDelete(classItem.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <div style={styles.exerciseList}>
                {classItem.exercises.map((ex, idx) => (
                  <div key={idx} style={styles.exerciseItem}>
                    <span style={styles.exerciseName}>
                      {idx + 1}. {ex.name}
                    </span>
                    <span style={styles.exerciseReps}>{ex.reps}회</span>
                  </div>
                ))}
              </div>

              <div style={styles.cardFooter}>
                <span style={styles.metaInfo}>
                  총 {classItem.exerciseCount}개 운영 · 약 {classItem.duration}분
                </span>
                <span style={styles.lastUsed}>{classItem.lastUsed}</span>
              </div>
            </div>
          ))}

          {/* Create New Card */}
          <div style={styles.createCard} onClick={handleCreate}>
            <div style={styles.createIcon}>➕</div>
            <span style={styles.createText}>새 클래스 만들기</span>
          </div>
        </div>
      </main>
    </div>
  );
}

// 스타일 정의
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#F8F9FA',
    fontFamily: "'Pretendard', -apple-system, sans-serif"
  },
  sidebar: {
    width: '240px',
    backgroundColor: '#FFFFFF',
    borderRight: '1px solid #E8EDEE',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    height: '100vh'
  },
  sidebarHeader: {
    padding: '24px',
    borderBottom: '1px solid #E8EDEE'
  },
  logo: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#005EB8'
  },
  sidebarNav: {
    flex: 1,
    padding: '16px 0'
  },
  sidebarItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 24px',
    color: '#425563',
    textDecoration: 'none',
    cursor: 'pointer'
  },
  sidebarItemActive: {
    backgroundColor: '#E8F4FD',
    color: '#005EB8',
    borderRight: '3px solid #005EB8'
  },
  sidebarIcon: {
    marginRight: '12px',
    fontSize: '20px'
  },
  sidebarLabel: {
    fontSize: '15px',
    fontWeight: 500
  },
  mainContent: {
    flex: 1,
    marginLeft: '240px',
    padding: '32px'
  },
  pageHeader: {
    marginBottom: '32px'
  },
  pageTitle: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#212B32',
    margin: '0 0 8px 0'
  },
  pageSubtitle: {
    fontSize: '16px',
    color: '#425563',
    margin: 0
  },
  classGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '24px'
  },
  classCard: {
    padding: '24px',
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    border: '1px solid #E8EDEE',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px'
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#212B32',
    margin: 0
  },
  cardActions: {
    display: 'flex',
    gap: '8px'
  },
  iconButton: {
    width: '36px',
    height: '36px',
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '18px',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'background-color 0.2s ease'
  },
  exerciseList: {
    marginBottom: '16px'
  },
  exerciseItem: {
    padding: '8px 0',
    borderBottom: '1px solid #E8EDEE',
    display: 'flex',
    justifyContent: 'space-between'
  },
  exerciseName: {
    fontSize: '14px',
    color: '#425563'
  },
  exerciseReps: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#005EB8'
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  metaInfo: {
    fontSize: '13px',
    color: '#768692'
  },
  lastUsed: {
    fontSize: '13px',
    color: '#768692'
  },
  createCard: {
    padding: '24px',
    border: '2px dashed #005EB8',
    backgroundColor: '#F8FBFF',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '200px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  createIcon: {
    fontSize: '48px',
    color: '#005EB8',
    marginBottom: '12px'
  },
  createText: {
    fontSize: '16px',
    fontWeight: 500,
    color: '#005EB8'
  }
};
