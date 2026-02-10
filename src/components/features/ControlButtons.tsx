import { Button } from '@/components/ui/button'
import { PlayState } from '@/types'

interface ControlButtonsProps {
  playState: PlayState
  onPlayPause: () => void
  onNext: () => void
  onStop: () => void
}

export default function ControlButtons({
  playState,
  onPlayPause,
  onNext,
  onStop
}: ControlButtonsProps) {
  return (
    <div className="flex gap-4 justify-center">
      <Button
        size="lg"
        variant={playState === 'playing' ? 'secondary' : 'default'}
        onClick={onPlayPause}
        aria-label={playState === 'playing' ? '일시정지' : '시작'}
        className="min-w-[140px]"
      >
        {playState === 'playing' ? (
          <>
            <span className="mr-2">⏸</span>
            일시정지
          </>
        ) : (
          <>
            <span className="mr-2">▶</span>
            시작
          </>
        )}
      </Button>

      <Button
        size="lg"
        variant="outline"
        onClick={onNext}
        aria-label="다음 운동"
        className="min-w-[140px]"
      >
        <span className="mr-2">⏭</span>
        다음 운동
      </Button>

      <Button
        size="lg"
        variant="destructive"
        onClick={onStop}
        aria-label="수업 종료"
        className="min-w-[140px]"
      >
        <span className="mr-2">⏹</span>
        수업 종료
      </Button>
    </div>
  )
}
