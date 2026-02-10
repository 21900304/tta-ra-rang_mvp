import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import CountDisplay from '@/components/features/CountDisplay'
import ProgressBar from '@/components/features/ProgressBar'
import { classSequence, createMockStudents } from '@/lib/mockData'
import { Student } from '@/types'
import { cn } from '@/lib/utils'

export default function StudentView() {
  const [students, setStudents] = useState<Student[]>([])
  const [currentExerciseIndex] = useState(0)
  const [activeStudentId, setActiveStudentId] = useState<number | null>(null)
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  useEffect(() => {
    // Initialize or sync with session storage
    const storedStudents = sessionStorage.getItem('students')
    if (storedStudents) {
      const parsedStudents = JSON.parse(storedStudents)
      setStudents(parsedStudents.map((s: Student) => ({
        ...s,
        count: Math.floor(Math.random() * 10), // Mock initial count
        target: classSequence[0].target
      })))
    } else {
      // Fallback for standalone view
      setStudents(createMockStudents(5))
    }
  }, [])

  // Mock: Simulate count increase and active student
  useEffect(() => {
    const interval = setInterval(() => {
      setStudents(prev => {
        const newStudents = prev.map(student => {
          if (student.count < student.target && Math.random() > 0.6) {
            return { ...student, count: student.count + 1 }
          }
          return student
        })

        // Set random active student
        const activeStudents = newStudents.filter(s => s.count < s.target)
        if (activeStudents.length > 0) {
          const randomActive = activeStudents[Math.floor(Math.random() * activeStudents.length)]
          setActiveStudentId(randomActive.id)
        }

        return newStudents
      })
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  // Mock: Show feedback periodically
  useEffect(() => {
    const messages = ['참 잘했어요!', '힘내세요!', '완벽해요!', '자세가 좋아요!']
    const interval = setInterval(() => {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)]
      setFeedbackMessage(randomMessage)
      setShowFeedback(true)

      setTimeout(() => {
        setShowFeedback(false)
      }, 3000)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const currentExercise = classSequence[currentExerciseIndex]
  const averageCount = Math.round(students.reduce((sum, s) => sum + s.count, 0) / students.length)

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-grey to-white py-8 px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl md:text-6xl font-bold text-energy-blue">
            {currentExercise.name}
          </h1>
          <p className="text-2xl text-dark-charcoal/60">
            {currentExerciseIndex + 1}단계 / {classSequence.length}단계
          </p>
        </div>

        {/* Character Area */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 py-8">
          {students.map(student => (
            <div
              key={student.id}
              className={cn(
                "flex flex-col items-center gap-3 transition-all duration-300",
                activeStudentId === student.id && "animate-bounce-gentle"
              )}
            >
              <Avatar
                className={cn(
                  "w-24 h-24 md:w-32 md:h-32 border-4 transition-all",
                  activeStudentId === student.id
                    ? "border-action-amber scale-110 shadow-2xl"
                    : "border-energy-blue"
                )}
              >
                <AvatarFallback className="text-5xl md:text-6xl bg-white">
                  {student.character}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <p className="font-bold text-lg md:text-xl text-dark-charcoal">
                  {student.name}
                </p>
                <Badge
                  variant={student.count >= student.target ? 'success' : 'secondary'}
                  className="mt-2 text-base px-3 py-1"
                >
                  {student.count}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Central Count Display */}
        <div className="py-8">
          <CountDisplay
            current={averageCount}
            target={currentExercise.target}
            size="lg"
          />
          <p className="text-center text-xl text-dark-charcoal/60 mt-4">
            평균 달성도
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto">
          <ProgressBar
            exercises={classSequence}
            currentExerciseIndex={currentExerciseIndex}
            currentCount={averageCount}
          />
        </div>

        {/* Feedback Overlay */}
        {showFeedback && (
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
            <div className="animate-scale-up bg-primary-red text-white px-12 py-8 rounded-3xl shadow-2xl">
              <div className="text-center space-y-4">
                <div className="text-7xl">⭐</div>
                <p className="text-4xl font-bold">{feedbackMessage}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
