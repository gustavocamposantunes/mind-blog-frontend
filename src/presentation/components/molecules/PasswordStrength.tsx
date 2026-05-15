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
  'bg-white/15',
  'bg-red-400',
  'bg-amber-400',
  'bg-yellow-300',
  'bg-emerald-400',
]

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({
  password,
}) => {
  const strength = getPasswordScore(password)

  return (
    <div
      className="grid gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2"
      aria-live="polite"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-white">Força da senha</span>
        <span className="text-sm font-semibold text-white">
          {strengthLabels[strength]}
        </span>
      </div>

      <div className="flex gap-1.5" aria-hidden="true">
        {Array.from({ length: 4 }).map((_, index) => (
          <span
            key={index}
            className={cn(
              'h-2 flex-1 rounded-full bg-white/10 transition-colors',
              index < strength && strengthStyles[strength],
            )}
          />
        ))}
      </div>

      <p className="text-xs text-white">
        Use 8+ caracteres, letras maiúsculas, números e símbolos.
      </p>
    </div>
  )
}
