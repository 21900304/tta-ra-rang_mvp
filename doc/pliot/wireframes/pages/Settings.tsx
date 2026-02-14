// ========================================
// WireFrame: Settings.tsx
// 목적: 환경 설정 및 개인화
// 경로: /settings
// ========================================

import React, { useState } from 'react';

export default function Settings() {
  // 상태 관리
  const [user] = useState({ name: '김선생님', email: 'teacher@school.kr' });
  const [selectedCamera, setSelectedCamera] = useState('camera1');
  const [resolution, setResolution] = useState('720p');
  const [volume, setVolume] = useState(80);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [voiceFeedback, setVoiceFeedback] = useState(true);

  // 핸들러
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.target.value));
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
          <a href="/classes" style={styles.sidebarItem}>
            <span style={styles.sidebarIcon}>📋</span>
            <span style={styles.sidebarLabel}>클스 관리</span>
          </a>
          <a href="/settings" style={{ ...styles.sidebarItem, ...styles.sidebarItemActive }}>
            <span style={styles.sidebarIcon}>⚙️</span>
            <span style={styles.sidebarLabel}>설정</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <header style={styles.pageHeader}>
          <h1 style={styles.pageTitle}>설정</h1>
        </header>

        <div style={styles.settingsContainer}>
          {/* Account Section */}
          <section style={styles.settingsSection}>
            <h2 style={styles.sectionTitle}>계정 정보</h2>
            <div style={styles.settingsCard}>
              <div style={styles.formGroup}>
                <label style={styles.label}>이름</label>
                <input
                  type="text"
                  value={user.name}
                  style={styles.input}
                  readOnly
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>이메일</label>
                <input
                  type="email"
                  value={user.email}
                  style={{ ...styles.input, backgroundColor: '#F3F3F3' }}
                  disabled
                />
              </div>
              <button style={styles.secondaryButton}>비밀번호 변경</button>
            </div>
          </section>

          {/* Camera/Audio Section */}
          <section style={styles.settingsSection}>
            <h2 style={styles.sectionTitle}>침궤 및 오디오</h2>
            <div style={styles.settingsCard}>
              <div style={styles.formGroup}>
                <label style={styles.label}>침궤</label>
                <select
                  value={selectedCamera}
                  onChange={(e) => setSelectedCamera(e.target.value)}
                  style={styles.select}
                >
                  <option value="camera1">기본 침궤</option>
                  <option value="camera2">외장 침궤</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>해상도</label>
                <select
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  style={styles.select}
                >
                  <option value="720p">720p (권장)</option>
                  <option value="1080p">1080p</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>기본 음량</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  style={styles.slider}
                />
                <span style={styles.sliderValue}>{volume}%</span>
              </div>
            </div>
          </section>

          {/* Accessibility Section */}
          <section style={styles.settingsSection}>
            <h2 style={styles.sectionTitle}>접근성</h2>
            <div style={styles.settingsCard}>
              <div style={styles.toggleGroup}>
                <div>
                  <label style={styles.label}>고대비 모드</label>
                  <p style={styles.description}>시각적 대비를 높입니다</p>
                </div>
                <button
                  style={{
                    ...styles.toggle,
                    backgroundColor: highContrast ? '#005EB8' : '#E8EDEE'
                  }}
                  onClick={() => setHighContrast(!highContrast)}
                >
                  <span
                    style={{
                      ...styles.toggleKnob,
                      transform: highContrast ? 'translateX(24px)' : 'translateX(0)'
                    }}
                  />
                </button>
              </div>
              <div style={styles.toggleGroup}>
                <div>
                  <label style={styles.label}>큰 글씨 모드</label>
                  <p style={styles.description}>텍스트 크기를 120%로 표시합니다</p>
                </div>
                <button
                  style={{
                    ...styles.toggle,
                    backgroundColor: largeText ? '#005EB8' : '#E8EDEE'
                  }}
                  onClick={() => setLargeText(!largeText)}
                >
                  <span
                    style={{
                      ...styles.toggleKnob,
                      transform: largeText ? 'translateX(24px)' : 'translateX(0)'
                    }}
                  />
                </button>
              </div>
              <div style={styles.toggleGroup}>
                <div>
                  <label style={styles.label}>음성 피드백</label>
                  <p style={styles.description}>AI 피드백을 음성으로 읽어줍니다</p>
                </div>
                <button
                  style={{
                    ...styles.toggle,
                    backgroundColor: voiceFeedback ? '#005EB8' : '#E8EDEE'
                  }}
                  onClick={() => setVoiceFeedback(!voiceFeedback)}
                >
                  <span
                    style={{
                      ...styles.toggleKnob,
                      transform: voiceFeedback ? 'translateX(24px)' : 'translateX(0)'
                    }}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Help Section */}
          <section style={styles.settingsSection}>
            <h2 style={styles.sectionTitle}>도움말</h2>
            <div style={styles.settingsCard}>
              <a href="#" style={styles.menuItem}>
                <span style={styles.menuText}>사용 가이드</span>
                <span>›</span>
              </a>
              <a href="#" style={styles.menuItem}>
                <span style={styles.menuText}>단축키 안내</span>
                <span>›</span>
              </a>
              <a href="#" style={styles.menuItem}>
                <span style={styles.menuText}>고객 지원</span>
                <span>›</span>
              </a>
            </div>
          </section>
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
    margin: 0
  },
  settingsContainer: {
    maxWidth: '800px'
  },
  settingsSection: {
    marginBottom: '32px'
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#212B32',
    margin: '0 0 16px 0'
  },
  settingsCard: {
    padding: '24px',
    backgroundColor: '#FFFFFF',
    borderRadius: '12px'
  },
  formGroup: {
    marginBottom: '16px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 500,
    color: '#212B32',
    marginBottom: '8px'
  },
  input: {
    width: '100%',
    height: '48px',
    padding: '0 16px',
    fontSize: '16px',
    border: '1px solid #E8EDEE',
    borderRadius: '8px',
    boxSizing: 'border-box'
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
  slider: {
    width: '100%',
    marginTop: '8px'
  },
  sliderValue: {
    fontSize: '14px',
    color: '#768692',
    marginLeft: '8px'
  },
  secondaryButton: {
    height: '40px',
    padding: '0 16px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E8EDEE',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#425563',
    cursor: 'pointer'
  },
  toggleGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #E8EDEE'
  },
  toggle: {
    width: '48px',
    height: '24px',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    position: 'relative',
    transition: 'background-color 0.2s ease'
  },
  toggleKnob: {
    position: 'absolute',
    top: '2px',
    left: '2px',
    width: '20px',
    height: '20px',
    backgroundColor: '#FFFFFF',
    borderRadius: '50%',
    transition: 'transform 0.2s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  },
  description: {
    fontSize: '13px',
    color: '#768692',
    margin: '4px 0 0 0'
  },
  menuItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #E8EDEE',
    textDecoration: 'none',
    color: '#212B32'
  },
  menuText: {
    fontSize: '14px',
    color: '#212B32'
  }
};
