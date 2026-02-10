import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import ControlButtons from '@/components/features/ControlButtons'
import ProgressBar from '@/components/features/ProgressBar'
import { classSequence, feedbackMessages } from '@/lib/mockData'
import { Student, PlayState, FeedbackMessage } from '@/types'

export default function TeacherView() {
  const navigate = useNavigate()
  const [students, setStudents] = useState<Student[]>([])
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [playState, setPlayState] = useState<PlayState>('idle')
  const [feedbacks, setFeedbacks] = useState<FeedbackMessage[]>([])

  useEffect(() => {
    // Load students from session storage
    const storedStudents = sessionStorage.getItem('students')
    if (storedStudents) {
      const parsedStudents = JSON.parse(storedStudents)
      setStudents(parsedStudents.map((s: Student) => ({
        ...s,
        count: 0,
        target: classSequence[0].target
      })))
    } else {
      navigate('/setup')
    }
  }, [navigate])

  // Mock: Simulate count increase
  useEffect(() => {
    if (playState !== 'playing') return

    const interval = setInterval(() => {
      setStudents(prev => prev.map(student => {
        if (student.count < student.target && Math.random() > 0.5) {
          return { ...student, count: student.count + 1 }
        }
        return student
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [playState])

  // Mock: Generate random feedback
  useEffect(() => {
    if (playState !== 'playing') return

    const interval = setInterval(() => {
      const randomStudent = students[Math.floor(Math.random() * students.length)]
      const randomMessage = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)]

      if (randomStudent) {
        const newFeedback: FeedbackMessage = {
          id: Date.now().toString(),
          studentId: randomStudent.id,
          message: randomMessage,
          timestamp: new Date(),
          type: randomMessage.includes('좋아요') || randomMessage.includes('잘') ? 'success' : 'info'
        }
        setFeedbacks(prev => [newFeedback, ...prev].slice(0, 10))
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [playState, students])

  const handlePlayPause = () => {
    setPlayState(prev => prev === 'playing' ? 'paused' : 'playing')
  }

  const handleNext = () => {
    if (currentExerciseIndex < classSequence.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1)
      setStudents(prev => prev.map(s => ({
        ...s,
        count: 0,
        target: classSequence[currentExerciseIndex + 1].target
      })))
    } else {
      setPlayState('completed')
    }
  }

  const handleStop = () => {
    if (confirm('정말로 수업을 종료하시겠습니까?')) {
      navigate('/')
    }
  }

  const currentExercise = classSequence[currentExerciseIndex]
  const totalCount = students.reduce((sum, s) => sum + s.count, 0)

  return (
    <div className="min-h-screen bg-neutral-grey py-6 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-energy-blue">
              {currentExercise.name} ({currentExerciseIndex + 1}/{classSequence.length})
            </h1>
            <p className="text-dark-charcoal/60 mt-1">교사용 제어 화면</p>
          </div>
          <Badge
            variant={playState === 'playing' ? 'success' : 'secondary'}
            className="text-base px-4 py-2"
          >
            {playState === 'playing' ? '진행 중' : playState === 'paused' ? '일시정지' : '대기'}
          </Badge>
        </div>

        {/* Progress Bar */}
        <Card>
          <CardContent className="pt-6">
            <ProgressBar
              exercises={classSequence}
              currentExerciseIndex={currentExerciseIndex}
              currentCount={totalCount / students.length}
            />
          </CardContent>
        </Card>

        {/* Control Buttons */}
        <Card>
          <CardContent className="pt-6 pb-6">
            <ControlButtons
              playState={playState}
              onPlayPause={handlePlayPause}
              onNext={handleNext}
              onStop={handleStop}
            />
          </CardContent>
        </Card>

        {/* Student Monitoring List */}
        <Card>
          <CardHeader>
            <CardTitle>학생 모니터링</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {students.map(student => {
                const progress = (student.count / student.target) * 100
                return (
                  <div
                    key={student.id}
                    className="flex items-center gap-4 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
                  >
                    <span className="text-3xl">{student.character}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-dark-charcoal">
                          {student.name}
                        </span>
                        <span className="text-sm font-medium text-action-amber">
                          {student.count} / {student.target}
                        </span>
                      </div>
                      <Progress value={student.count} max={student.target} className="h-2" />
                    </div>
                    <Badge variant={progress >= 100 ? 'success' : 'secondary'}>
                      {Math.round(progress)}%
                    </Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Feedback Log */}
        <Card>
          <CardHeader>
            <CardTitle>실시간 피드백</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {feedbacks.length === 0 ? (
                <p className="text-center text-dark-charcoal/50 py-8">
                  운동을 시작하면 피드백이 표시됩니다
                </p>
              ) : (
                feedbacks.map(feedback => {
                  const student = students.find(s => s.id === feedback.studentId)
                  return (
                    <div
                      key={feedback.id}
                      className="flex items-start gap-3 p-3 bg-white rounded-lg"
                    >
                      <span className="text-2xl">{student?.character}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-dark-charcoal">
                          {student?.name}
                        </p>
                        <p className="text-dark-charcoal/70">{feedback.message}</p>
                      </div>
                      <span className="text-xs text-dark-charcoal/50">
                        {feedback.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
