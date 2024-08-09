import { cn } from '@/lib/utils'

type ToggleIconButtonProps = {
  isActive: boolean
} & React.HTMLAttributes<HTMLButtonElement>

export const ToogleIconButton = ({ isActive, ...props }: ToggleIconButtonProps) => {
  return (
    <button
      {...props}
      className={cn('p-2 rounded-full', isActive && 'bg-[#FFE3B3]')}
    ></button>
  )
}
