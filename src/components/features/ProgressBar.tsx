import { Progress } from '@/components/ui/progress'
import { Exercise } from '@/types'

interface ProgressBarProps {
  exercises: Exercise[]
  currentExerciseIndex: number
  currentCount: number
}

export default function ProgressBar({
  exercises,
  currentExerciseIndex,
  currentCount
}: ProgressBarProps) {
  const totalTarget = exercises.reduce((sum, ex) => sum + ex.target, 0)
  const completedCount = exercises
    .slice(0, currentExerciseIndex)
    .reduce((sum, ex) => sum + ex.target, 0)
  const currentProgress = completedCount + currentCount
  const percentage = Math.min((currentProgress / totalTarget) * 100, 100)

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {exercises.map((exercise, index) => (
            <div
              key={exercise.type}
              className={`px-3 py-1 rounded text-sm font-medium ${
                index === currentExerciseIndex
                  ? 'bg-action-amber text-dark-charcoal'
                  : index < currentExerciseIndex
                  ? 'bg-energy-blue text-white'
                  : 'bg-gray-300 text-dark-charcoal/60'
              }`}
            >
              {exercise.name}
            </div>
          ))}
        </div>
        <span className="text-sm font-semibold text-dark-charcoal">
          {Math.round(percentage)}%
        </span>
      </div>
      <Progress value={currentProgress} max={totalTarget} className="h-3" />
    </div>
  )
}
