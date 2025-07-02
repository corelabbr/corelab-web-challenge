import type { ComponentProps } from 'react'

export function Favorite(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="#FFA000"
      stroke="#455A64"
      {...props}
    >
      <title>Favorite</title>

      <path
        d="M5.47998 5.50375L0.326172 6.29666L4.88529 9.9638L3.69595 15.5141L7.85865 12.3425L13.0125 15.5141L11.6249 9.9638L15.4903 6.29666L10.2373 5.50375L7.85865 0.349945L5.47998 5.50375Z"
        strokeWidth={1.5}
      />
    </svg>
  )
}
