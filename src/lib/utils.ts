import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function getExerciseIcon(type: string): string {
  switch (type) {
    case 'squat':
      return '🦵'
    case 'pushup':
      return '💪'
    case 'burpee':
      return '⚡'
    default:
      return '🏃'
  }
}

export function getCharacterEmoji(index: number): string {
  const characters = ['🦁', '🐯', '🐻', '🦊', '🐰', '🐼']
  return characters[index % characters.length]
}
