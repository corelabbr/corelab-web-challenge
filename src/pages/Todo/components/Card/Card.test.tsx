import { queryHelpers, render, screen, waitFor } from '@testing-library/react'
import { Card } from '.'
import { todoMock, todoMock2 } from '__mock__/todoMock'
import userEvent from '@testing-library/user-event'

type CardProps = Partial<Parameters<typeof Card>[0]>

describe(Card.name, () => {
  let onDelete: jest.Mock
  let onChange: jest.Mock

  const DefaultCard = (props: CardProps = {} as CardProps) => (
    <Card
      todo={todoMock}
      onChangeData={onChange}
      onDeleteTodo={onDelete}
      windowWidth={1024}
      animationTo="top"
      {...props}
    />
  )

  beforeEach(() => {
    onDelete = jest.fn()
    onChange = jest.fn()
  })

  it('should render component', () => {
    render(DefaultCard())

    expect(screen.getByRole('form')).toBeInTheDocument()
  })

  it('should have button to remove favorites if todo is favorie', () => {
    const { container } = render(DefaultCard({ todo: todoMock2 }))

    const star = container.querySelector('[aria-label="remover dos favoritos"]')
    expect(star).toBeInTheDocument()
  })

  it('should have button to mark as favorite if todo is not favorie', () => {
    const { container } = render(DefaultCard())

    const star = container.querySelector(
      '[aria-label="adicionar dos favoritos"]'
    )
    expect(star).toBeInTheDocument()
  })

  it('should call onChangeData when star button is clicked', async () => {
    render(DefaultCard())

    const starButton = screen.getByTestId('star-btn')
    await userEvent.click(starButton)

    waitFor(() => expect(onChange).toHaveBeenCalledTimes(1))
  })

  it('should call onChangeData when star button is pressed enter', async () => {
    render(DefaultCard())

    const starButton = screen.getByTestId('star-btn')
    await userEvent.type(starButton, '{enter}')

    waitFor(() => expect(onChange).toHaveBeenCalledTimes(1))
  })

  it('should enable inputs when pencil button is clicked', async () => {
    render(DefaultCard())

    const button = screen.getByTestId('pencil_edit')
    await userEvent.click(button)

    const textfields = screen.queryAllByRole('textbox')
    textfields.forEach(element => {
      expect(element).not.toBeDisabled()
    })
  })

  it('should enable inputs when pencil button is pressed enter', async () => {
    render(DefaultCard())

    const button = screen.getByTestId('pencil_edit')
    await userEvent.type(button, '{enter}')

    const textfields = screen.queryAllByRole('textbox')
    textfields.forEach(element => {
      waitFor(() => expect(element).not.toBeDisabled())
    })
  })

  it('should call onChangeData when pencil button is pressed enter two times', async () => {
    render(DefaultCard())

    const button = screen.getByTestId('pencil_edit')
    await userEvent.type(button, '{enter}')
    await userEvent.type(button, '{enter}')

    waitFor(() => expect(onChange).toHaveBeenCalledTimes(1))
  })

  it('should call onChangeData when pencil button is clicked two times', async () => {
    render(DefaultCard())

    const button = screen.getByTestId('pencil_edit')
    await userEvent.click(button)
    await userEvent.click(button)

    waitFor(() => expect(onChange).toHaveBeenCalledTimes(1))
  })

  it('should call onChangeData with new data', async () => {
    render(DefaultCard({ todo: todoMock }))

    const button = screen.getByTestId('pencil_edit')
    await userEvent.click(button)

    const field = screen.getByTestId('title')
    await userEvent.type(field, 'teste editando')

    await userEvent.click(button)

    waitFor(() => expect(onChange).toHaveBeenCalledWith({
      ...todoMock,
      title: 'teste editando'
    }))
  })

  it('should show error if field is invalid', async () => {
    render(DefaultCard({ todo: todoMock }))

    const button = screen.getByTestId('pencil_edit')
    await userEvent.click(button)

    const field = screen.getByTestId('title')
    await userEvent.clear(field)

    await userEvent.click(button)

    const errorSpan = screen.getByTestId('error') 
    waitFor(() => expect(errorSpan).toHaveStyle('visibility: visible'))
  })

  it('should call onDeleteTodo when X button is clicked', async () => {
    render(DefaultCard())

    const button = screen.getByTestId('x_btn')
    await userEvent.click(button)

    waitFor(() => expect(onDelete).toHaveBeenCalledTimes(1))
  })
})
