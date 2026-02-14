// ========================================
// WireFrame: Dashboard.tsx
// 목적: 교사가 가장 먼저 보는 화면으로, 수업을 빠르게 시작
// 경로: /
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

interface SidebarItem {
  label: string;
  path: string;
  icon: string;
  active?: boolean;
  disabled?: boolean;
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

const sidebarItems: SidebarItem[] = [
  { label: '대시보드', path: '/', icon: 'dashboard', active: true },
  { label: '수업 진행', path: '/session', icon: 'play', disabled: true },
  { label: '클스 관리', path: '/classes', icon: 'list' },
  { label: '설정', path: '/settings', icon: 'settings' }
];

export default function Dashboard() {
  // 상태 관리
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [classes] = useState<ClassData[]>(mockClasses);

  // 핸들러
  const handleClassSelect = (classId: string) => {
    const selected = classes.find(c => c.id === classId);
    setSelectedClass(selected || null);
  };

  const handleStartClass = () => {
    if (selectedClass) {
      // 캘리브레이션 화면으로 이동
      console.log('수업 시작:', selectedClass.name);
      // router.push('/calibration');
    }
  };

  const handleCreateClass = () => {
    // 클래스 생성 화면으로 이동
    console.log('새 클래스 생성');
    // router.push('/classes/edit/new');
  };

  return (
    <div style={styles.container}>
      {/* Global Navigation - 좌측 사이드바 */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.logo}>🏃 따라랑</div>
        </div>
        
        <nav style={styles.sidebarNav}>
          {sidebarItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              style={{
                ...styles.sidebarItem,
                ...(item.active ? styles.sidebarItemActive : {}),
                ...(item.disabled ? styles.sidebarItemDisabled : {})
              }}
            >
              <span style={styles.sidebarIcon}>{item.icon}</span>
              <span style={styles.sidebarLabel}>{item.label}</span>
            </a>
          ))}
        </nav>

        <div style={styles.sidebarFooter}>
          <div style={styles.userInfo}>
            <div style={styles.userAvatar}>👤</div>
            <div style={styles.userDetails}>
              <div style={styles.userName}>김선생님</div>
              <div style={styles.userRole}>특수체육교사</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={styles.mainContent}>
        {/* Page Header */}
        <header style={styles.pageHeader}>
          <h1 style={styles.greeting}>안녕하세요, 김선생님</h1>
          <p style={styles.subtitle}>오늘의 수업을 시작하세요</p>
        </header>

        {/* Hero Section - Quick Start */}
        <section style={styles.heroSection}>
          <div style={styles.heroContent}>
            <div style={styles.quickStart}>
              <h2 style={styles.heroTitle}>빠른 시작</h2>
              <p style={styles.heroDescription}>
                최근 사용한 클래스로 즉시 수업을 시작하세요
              </p>
              
              {/* 클래스 선택 드롭다운 */}
              <div style={styles.selectWrapper}>
                <label style={styles.selectLabel}>클스 선택</label>
                <select
                  style={styles.select}
                  value={selectedClass?.id || ''}
                  onChange={(e) => handleClassSelect(e.target.value)}
                >
                  <option value="">클스를 선택하세요</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                style={{
                  ...styles.primaryButton,
                  ...(selectedClass ? {} : styles.primaryButtonDisabled)
                }}
                onClick={handleStartClass}
                disabled={!selectedClass}
              >
                <span style={styles.buttonIcon}>▶️</span>
                수업 시작하기
              </button>
            </div>
            
            <div style={styles.heroImage}>
              🏃‍♂️ 🏃‍♀️ 🏃‍♂️
            </div>
          </div>
        </section>

        {/* Recent Classes Section */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>클스 목록</h3>
            <a href="/classes" style={styles.viewAllLink}>
              전체 보기 →
            </a>
          </div>

          <div style={styles.cardGrid}>
            {classes.map((classItem) => (
              <div
                key={classItem.id}
                style={{
                  ...styles.classCard,
                  ...(selectedClass?.id === classItem.id ? styles.classCardSelected : {})
                }}
                onClick={() => handleClassSelect(classItem.id)}
              >
                <h4 style={styles.cardTitle}>{classItem.name}</h4>
                <p style={styles.cardMeta}>
                  {classItem.exerciseCount}개 운동 · 약 {classItem.duration}분
                </p>
                
                <div style={styles.exerciseList}>
                  {classItem.exercises.slice(0, 3).map((ex, idx) => (
                    <span key={idx} style={styles.exerciseTag}>
                      {ex.name} {ex.reps}회
                    </span>
                  ))}
                  {classItem.exercises.length > 3 && (
                    <span style={styles.moreTag}>
                      +{classItem.exercises.length - 3}
                    </span>
                  )}
                </div>
                
                <p style={styles.lastUsed}>마지막 사용: {classItem.lastUsed}</p>
              </div>
            ))}

            {/* 새 클래스 생성 카드 */}
            <div style={styles.createCard} onClick={handleCreateClass}>
              <div style={styles.createIcon}>➕</div>
              <span style={styles.createText}>새 클래스 만들기</span>
            </div>
          </div>
        </section>
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
    height: '100vh',
    zIndex: 100
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
    transition: 'all 0.2s ease',
    cursor: 'pointer'
  },
  sidebarItemActive: {
    backgroundColor: '#E8F4FD',
    color: '#005EB8',
    borderRight: '3px solid #005EB8'
  },
  sidebarItemDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed'
  },
  sidebarIcon: {
    marginRight: '12px',
    fontSize: '20px'
  },
  sidebarLabel: {
    fontSize: '15px',
    fontWeight: 500
  },
  sidebarFooter: {
    padding: '16px 24px',
    borderTop: '1px solid #E8EDEE'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center'
  },
  userAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#E8F4FD',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '12px',
    fontSize: '20px'
  },
  userDetails: {},
  userName: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#212B32'
  },
  userRole: {
    fontSize: '12px',
    color: '#768692',
    marginTop: '2px'
  },
  mainContent: {
    flex: 1,
    marginLeft: '240px',
    padding: '32px'
  },
  pageHeader: {
    marginBottom: '32px'
  },
  greeting: {
    fontSize: '24px',
    fontWeight: 600,
    color: '#212B32',
    margin: 0
  },
  subtitle: {
    fontSize: '16px',
    color: '#425563',
    margin: '8px 0 0 0'
  },
  heroSection: {
    backgroundColor: '#E8F4FD',
    padding: '40px',
    borderRadius: '16px',
    marginBottom: '48px'
  },
  heroContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  quickStart: {
    flex: 1
  },
  heroTitle: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#005EB8',
    margin: '0 0 12px 0'
  },
  heroDescription: {
    fontSize: '16px',
    color: '#425563',
    margin: '0 0 24px 0'
  },
  selectWrapper: {
    marginBottom: '24px',
    maxWidth: '320px'
  },
  selectLabel: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 500,
    color: '#212B32',
    marginBottom: '8px'
  },
  select: {
    width: '100%',
    height: '48px',
    padding: '0 16px',
    fontSize: '16px',
    border: '1px solid #E8EDEE',
    borderRadius: '8px',
    backgroundColor: '#FFFFFF',
    cursor: 'pointer'
  },
  primaryButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '240px',
    height: '56px',
    backgroundColor: '#005EB8',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  primaryButtonDisabled: {
    backgroundColor: '#E8EDEE',
    color: '#768692',
    cursor: 'not-allowed'
  },
  buttonIcon: {
    marginRight: '8px',
    fontSize: '20px'
  },
  heroImage: {
    width: '360px',
    height: '240px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '80px'
  },
  section: {
    marginBottom: '48px'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#212B32',
    margin: 0
  },
  viewAllLink: {
    fontSize: '14px',
    color: '#005EB8',
    textDecoration: 'none'
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
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
  classCardSelected: {
    border: '2px solid #005EB8',
    boxShadow: '0 4px 12px rgba(0, 94, 184, 0.15)'
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#212B32',
    margin: '0 0 4px 0'
  },
  cardMeta: {
    fontSize: '14px',
    color: '#425563',
    margin: '0 0 16px 0'
  },
  exerciseList: {
    marginBottom: '16px'
  },
  exerciseTag: {
    display: 'inline-block',
    padding: '6px 12px',
    backgroundColor: '#F3F3F3',
    borderRadius: '6px',
    fontSize: '13px',
    color: '#425563',
    marginRight: '8px',
    marginBottom: '8px'
  },
  moreTag: {
    fontSize: '13px',
    color: '#768692'
  },
  lastUsed: {
    fontSize: '12px',
    color: '#768692',
    margin: 0
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
    minHeight: '160px',
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
