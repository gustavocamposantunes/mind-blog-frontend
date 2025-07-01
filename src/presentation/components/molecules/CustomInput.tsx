import React from 'react'

import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface ICustomInput extends React.ComponentProps<'input'> {
  label: string
}

export const CustomInput: React.FC<ICustomInput> = ({
  label,
  className,
  ...props
}) => (
  <div className={`grid w-full items-center gap-1.5 ${className}`}>
    <Label htmlFor={props.id} className="text-stone-950 text-lg md:text-base!">
      {label}
    </Label>
    <Input className="text-xl md:text-base!" {...props} />
  </div>
)
