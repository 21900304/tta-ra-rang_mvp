import { Exercise } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn, getExerciseIcon } from '@/lib/utils'

interface ExerciseCardProps {
  sequence: Exercise[]
  isSelected: boolean
  onSelect: () => void
}

export default function ExerciseCard({ sequence, isSelected, onSelect }: ExerciseCardProps) {
  const totalTime = sequence.reduce((acc, ex) => acc + ex.target, 0) * 3 // 3초 per rep 가정

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-lg",
        isSelected && "border-energy-blue border-4 shadow-xl ring-2 ring-action-amber"
      )}
      onClick={onSelect}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-energy-blue">Class 1</CardTitle>
          <Badge variant="secondary">
            {Math.floor(totalTime / 60)}분 예상
          </Badge>
        </div>
        <CardDescription>기본 체력 향상 운동</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sequence.map((exercise, index) => (
            <div
              key={exercise.type}
              className="flex items-center gap-3 p-3 rounded-lg bg-neutral-grey/50"
            >
              <span className="text-3xl">{getExerciseIcon(exercise.type)}</span>
              <div className="flex-1">
                <p className="font-semibold text-dark-charcoal">{exercise.name}</p>
                <p className="text-sm text-dark-charcoal/60">목표: {exercise.target}회</p>
              </div>
              <Badge className="bg-action-amber text-dark-charcoal">
                {index + 1}단계
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
