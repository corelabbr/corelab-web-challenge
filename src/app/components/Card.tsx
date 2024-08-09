import { cn } from '@/lib/utils'

type CardProps = {
  children?: React.ReactNode
  className?: string
  styles?: React.CSSProperties
}

export const Card = ({ children, className, styles }: CardProps) => {
  return (
    <div
      className={cn('bg-white rounded-lg shadow-md', className)}
      style={styles}
    >
      {children}
    </div>
  )
}
