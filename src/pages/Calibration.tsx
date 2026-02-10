import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import StudentSlot from '@/components/features/StudentSlot'
import { createMockStudents } from '@/lib/mockData'
import { Student } from '@/types'

export default function Calibration() {
  const navigate = useNavigate()
  const studentCount = parseInt(sessionStorage.getItem('studentCount') || '5')
  const [students, setStudents] = useState<Student[]>([])
  const [isCalibrating, setIsCalibrating] = useState(true)
  const [detectedCount, setDetectedCount] = useState(0)

  useEffect(() => {
    // Initialize students
    const initialStudents = createMockStudents(studentCount)
    setStudents(initialStudents)

    // Simulate gradual detection
    let count = 0
    const interval = setInterval(() => {
      count++
      setDetectedCount(count)

      if (count >= studentCount) {
        setIsCalibrating(false)
        clearInterval(interval)
      }
    }, 800)

    return () => clearInterval(interval)
  }, [studentCount])

  const handleStart = () => {
    // Store calibrated students
    sessionStorage.setItem('students', JSON.stringify(students))
    navigate('/play/teacher')
  }

  return (
    <div className="min-h-screen bg-neutral-grey py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-energy-blue">
            캘리브레이션
          </h1>
          <p className="text-dark-charcoal/60">
            카메라 앞에서 학생들의 위치를 확인합니다
          </p>
        </div>

        {/* Webcam Area */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
              {/* Placeholder for webcam */}
              <div className="text-center space-y-4">
                <div className="text-6xl">📹</div>
                {isCalibrating ? (
                  <>
                    <p className="text-white text-xl font-semibold">
                      카메라 연결 중...
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-3 h-3 bg-action-amber rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-action-amber rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-3 h-3 bg-action-amber rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </>
                ) : (
                  <p className="text-white text-xl font-semibold">
                    ✓ 카메라 연결 완료
                  </p>
                )}
              </div>

              {/* Position Guidelines */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 left-4 right-4 text-white/80 text-sm">
                  학생들은 왼쪽부터 오른쪽으로 배치해주세요
                </div>
              </div>

              {/* Detection Status */}
              <div className="absolute bottom-4 right-4">
                <Badge
                  variant={detectedCount === studentCount ? "success" : "secondary"}
                  className="text-base px-4 py-2"
                >
                  인식: {detectedCount} / {studentCount}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Character Matching Section */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold text-dark-charcoal mb-4">
              캐릭터 매칭
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {students.map((student, index) => (
                <StudentSlot
                  key={student.id}
                  student={{
                    ...student,
                    isDetected: index < detectedCount
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Confirmation Checklist */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold text-dark-charcoal mb-4">
              확인사항
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  detectedCount > 0 ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  {detectedCount > 0 && <span className="text-white text-sm">✓</span>}
                </div>
                <p className="text-dark-charcoal">학생들이 카메라에 잘 보이나요?</p>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  detectedCount === studentCount ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  {detectedCount === studentCount && <span className="text-white text-sm">✓</span>}
                </div>
                <p className="text-dark-charcoal">모든 학생이 캐릭터와 매칭되었나요?</p>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  !isCalibrating ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  {!isCalibrating && <span className="text-white text-sm">✓</span>}
                </div>
                <p className="text-dark-charcoal">학생들이 손을 들어 본인 캐릭터를 확인했나요?</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={() => navigate('/setup')}
          >
            이전
          </Button>
          <Button
            size="lg"
            className="flex-1"
            onClick={handleStart}
            disabled={isCalibrating || detectedCount !== studentCount}
            aria-label="운동 시작"
          >
            {isCalibrating ? '캘리브레이션 중...' : '운동 시작'}
          </Button>
        </div>
      </div>
    </div>
  )
}
