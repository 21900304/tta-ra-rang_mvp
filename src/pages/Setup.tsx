import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import ExerciseCard from '@/components/features/ExerciseCard'
import { classSequence } from '@/lib/mockData'
import { cn } from '@/lib/utils'

export default function Setup() {
  const navigate = useNavigate()
  const [selectedClass, setSelectedClass] = useState<boolean>(false)
  const [studentCount, setStudentCount] = useState<number>(5)

  const handleNext = () => {
    if (selectedClass && studentCount > 0) {
      // Store settings in sessionStorage for other pages
      sessionStorage.setItem('studentCount', studentCount.toString())
      navigate('/calibration')
    }
  }

  return (
    <div className="min-h-screen bg-neutral-grey py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-energy-blue">
            수업 준비
          </h1>
          <p className="text-dark-charcoal/60">
            운동 종류와 학생 인원을 설정해주세요
          </p>
        </div>

        {/* Exercise Selection */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-dark-charcoal">
            1. 운동 선택
          </h2>
          <ExerciseCard
            sequence={classSequence}
            isSelected={selectedClass}
            onSelect={() => setSelectedClass(true)}
          />
        </div>

        {/* Student Count Selection */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-dark-charcoal">
            2. 학생 인원 설정
          </h2>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-3 justify-center">
                {[1, 2, 3, 4, 5, 6].map((count) => (
                  <button
                    key={count}
                    onClick={() => setStudentCount(count)}
                    className={cn(
                      "w-16 h-16 rounded-lg font-bold text-xl transition-all",
                      "border-2 hover:scale-105",
                      studentCount === count
                        ? "bg-action-amber text-dark-charcoal border-energy-blue shadow-lg"
                        : "bg-white text-dark-charcoal/60 border-gray-300 hover:border-energy-blue"
                    )}
                    aria-label={`${count}명 선택`}
                  >
                    {count}
                  </button>
                ))}
              </div>
              <p className="text-center mt-4 text-dark-charcoal/60">
                선택된 인원: <span className="font-bold text-action-amber">{studentCount}명</span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Screen Extension */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-dark-charcoal">
            3. 화면 확장 설정
          </h2>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <p className="text-dark-charcoal/60">
                  학생들이 볼 수 있도록 별도 화면(TV)을 준비해주세요
                </p>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.open('/play/student', '_blank', 'width=1920,height=1080')}
                  aria-label="학생용 창 열기"
                >
                  학생용 창 열기 (TV용)
                </Button>
                <p className="text-sm text-dark-charcoal/50">
                  * 별도 창이 열리면 전체화면으로 전환하세요
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={() => navigate('/')}
          >
            이전
          </Button>
          <Button
            size="lg"
            className="flex-1"
            onClick={handleNext}
            disabled={!selectedClass || studentCount === 0}
            aria-label="다음 단계로"
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  )
}
