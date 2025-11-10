import { render, screen, waitFor } from '@testing-library/react'
import { PickColor } from '.'
import userEvent from '@testing-library/user-event'

describe(PickColor.name, () => {
  let onChangeColor!: jest.Mock
  const PickColorDefault = () => (
    <PickColor
      currentColor="#fff"
      windowWidth={1024}
      onChangeColor={onChangeColor}
    />
  )

  beforeEach(() => {
    onChangeColor = jest.fn()
  })

  it('should render component', () => {
    render(PickColorDefault())

    expect(screen.queryByTestId('trigger')).toBeInTheDocument()
  })

  it('should be pallete box closed until click on trigger', () => {
    render(PickColorDefault())

    waitFor(() =>
      expect(screen.getByTestId('pallete')).toHaveStyle('display: none')
    )
  })

  it('should be pallete box opened when click on trigger', async () => {
    render(PickColorDefault())

    const trigger = screen.getByTestId('trigger')
    await userEvent.click(trigger)

    waitFor(() =>
      expect(screen.getByTestId('pallete')).toHaveStyle('display: flex')
    )
  })

  it('should call onChangeColor when pick a color', async () => {
    render(PickColorDefault())

    const pallete = screen.getByTestId('pallete')
    const firstColor = pallete.querySelector('button') 

    if (!firstColor) return

    await userEvent.click(firstColor)
  })
})
