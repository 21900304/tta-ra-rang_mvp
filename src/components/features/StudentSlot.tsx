import { Student } from '@/types'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface StudentSlotProps {
  student: Student
  isActive?: boolean
  showCount?: boolean
}

export default function StudentSlot({ student, isActive = false, showCount = false }: StudentSlotProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 p-4 rounded-lg transition-all",
        isActive && "animate-scale-up"
      )}
    >
      <div className="relative">
        <Avatar
          className={cn(
            "w-20 h-20 border-4 transition-all",
            student.isDetected
              ? "border-green-500 bg-white"
              : "border-gray-300 bg-gray-100"
          )}
        >
          <AvatarFallback className={cn(
            "text-4xl",
            student.isDetected ? "opacity-100" : "opacity-30"
          )}>
            {student.character}
          </AvatarFallback>
        </Avatar>

        {/* Detection Status Indicator */}
        <div
          className={cn(
            "absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white",
            student.isDetected ? "bg-green-500" : "bg-red-500"
          )}
          aria-label={student.isDetected ? "인식됨" : "미인식"}
        />
      </div>

      <div className="text-center">
        <p className="font-semibold text-dark-charcoal">{student.name}</p>
        {showCount && (
          <Badge variant="secondary" className="mt-1">
            {student.count} / {student.target}
          </Badge>
        )}
      </div>
    </div>
  )
}
