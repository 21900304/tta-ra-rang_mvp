import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Setup from './pages/Setup'
import Calibration from './pages/Calibration'
import TeacherView from './pages/Play/TeacherView'
import StudentView from './pages/Play/StudentView'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/calibration" element={<Calibration />} />
        <Route path="/play/teacher" element={<TeacherView />} />
        <Route path="/play/student" element={<StudentView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
