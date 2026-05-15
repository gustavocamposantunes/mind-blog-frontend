import { cn } from '@/main/lib/utils'

type PasswordStrengthProps = {
  password: string
}

const getPasswordScore = (password: string) => {
  if (!password) {
    return 0
  }

  const checks = [
    password.length >= 8,
    password.length >= 12,
    /[a-z]/.test(password) && /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ]

  return Math.min(checks.filter(Boolean).length, 4)
}

const strengthLabels = ['Muito fraca', 'Fraca', 'Média', 'Forte', 'Muito forte']

const strengthStyles = [
  'bg-stone-200',
  'bg-red-500',
  'bg-amber-500',
  'bg-yellow-500',
  'bg-emerald-500',
]

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({
  password,
}) => {
  const strength = getPasswordScore(password)

  return (
    <div
      className="grid gap-2 rounded-md border border-stone-200 bg-stone-50 px-3 py-2"
      aria-live="polite"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-stone-700">
          Força da senha
        </span>
        <span
          className={cn('text-sm font-semibold', {
            'text-red-600': strength <= 1,
            'text-amber-600': strength === 2,
            'text-yellow-600': strength === 3,
            'text-emerald-600': strength === 4,
          })}
        >
          {strengthLabels[strength]}
        </span>
      </div>

      <div className="flex gap-1.5" aria-hidden="true">
        {Array.from({ length: 4 }).map((_, index) => (
          <span
            key={index}
            className={cn(
              'h-2 flex-1 rounded-full bg-stone-200 transition-colors',
              index < strength && strengthStyles[strength],
            )}
          />
        ))}
      </div>

      <p className="text-xs text-stone-500">
        Use 8+ caracteres, letras maiúsculas, números e símbolos.
      </p>
    </div>
  )
}