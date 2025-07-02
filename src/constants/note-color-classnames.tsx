import type { NOTE_COLORS } from '@/constants/note-colors'

export const NOTE_COLOR_CLASSNAMES: Record<
  (typeof NOTE_COLORS)[number],
  string
> = {
  white: 'bg-white',
  light_blue: 'bg-[#BAE2FF]',
  mint_green: 'bg-[#B9FFDD]',
  light_yellow: 'bg-[#FFE8AC]',
  light_peach: 'bg-[#FFCAB9]',
  coral: 'bg-[#F99494]',
  sky_blue: 'bg-[#9DD6FF]',
  lavender: 'bg-[#ECA1FF]',
  yellow_green: 'bg-[#DAFF8B]',
  light_orange: 'bg-[#FFA285]',
  light_gray: 'bg-[#CDCDCD]',
  medium_gray: 'bg-[#979797]',
  light_brown: 'bg-[#A99A7C]',
}
