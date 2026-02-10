import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-grey px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Logo/Name */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-bold text-energy-blue">
            따라랑
          </h1>
          <div className="relative">
            <div className="absolute inset-0 bg-action-amber/20 blur-xl"></div>
            <p className="relative text-2xl md:text-3xl font-semibold text-dark-charcoal">
              선생님 따라, 화면 따라
            </p>
          </div>
        </div>

        {/* Service Description */}
        <div className="space-y-3 py-8">
          <p className="text-lg md:text-xl text-dark-charcoal/80">
            특수학급을 위한 AI 체육 플랫폼
          </p>
          <p className="text-base md:text-lg text-dark-charcoal/60">
            학생들과 함께 즐겁게 운동하고, 실시간으로 자세를 확인하세요
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <Button
            size="lg"
            className="w-full max-w-md h-16 text-xl font-bold shadow-lg hover:shadow-xl transition-all"
            onClick={() => navigate('/setup')}
            aria-label="수업 시작하기"
          >
            수업 시작하기
          </Button>
        </div>

        {/* Additional Info */}
        <div className="pt-8 text-sm text-dark-charcoal/50">
          <p>별도의 로그인 없이 바로 시작할 수 있습니다</p>
        </div>
      </div>
    </div>
  )
}
