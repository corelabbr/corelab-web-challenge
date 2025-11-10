import { render, screen, waitFor } from '@testing-library/react'
import { CreateTodoCard } from '.'
import userEvent from '@testing-library/user-event'

describe(CreateTodoCard.name, () => {
  let handleAddTodo!: jest.Mock
  const CreateTodoCardDefault = () => (
    <CreateTodoCard handleAddTodo={handleAddTodo} />
  )

  beforeEach(() => {
    handleAddTodo = jest.fn()
  })

  it('should render component', () => {
    render(CreateTodoCardDefault())

    expect(screen.getByRole('form')).toBeInTheDocument()
  })

  it('should have button to remove favorites if todo is favorie', async () => {
    const { container } = render(CreateTodoCardDefault())

    const button = screen.getByTestId('star-btn')
    await userEvent.click(button)

    const star = container.querySelector('[aria-label="remover dos favoritos"]')

    expect(star).toBeInTheDocument()
  })

  it('should have button to mark as favorite if todo is not favorie', () => {
    const { container } = render(CreateTodoCardDefault())

    const star = container.querySelector(
      '[aria-label="adicionar dos favoritos"]'
    )
    expect(star).toBeInTheDocument()
  })

  it('should open to create new todo when form is clicked', async () => {
    render(CreateTodoCardDefault())

    const form = screen.getByRole('form')
    await userEvent.click(form)

    const button = screen.getByTestId('create_btn')
    expect(button).toBeInTheDocument()
  })

  it('should open to create new todo when form is pressed enter', async () => {
    render(CreateTodoCardDefault())

    const form = screen.getByRole('form')
    await userEvent.type(form, '{enter}')

    const button = screen.getByTestId('create_btn')
    expect(button).toBeInTheDocument()
  })

  it('should enable fields when click on create new todo', async () => {
    render(CreateTodoCardDefault())

    const form = screen.getByRole('form')
    await userEvent.click(form)

    const fields = screen.getAllByRole('textbox')
    fields?.forEach(field => {
      expect(field).not.toBeDisabled()
    })
  })

  it('should clear form when click on X', async () => {
    render(CreateTodoCardDefault())

    const form = screen.getByRole('form')
    await userEvent.click(form)

    const field = screen.getByTestId('title')
    await userEvent.type(field, 'teste')

    const button = screen.getByTestId('x-btn')
    await userEvent.click(button)

    expect(field).toHaveValue('')
  })

  it('should disabled form when click on X', async () => {
    render(CreateTodoCardDefault())

    const form = screen.getByRole('form')
    await userEvent.click(form)

    const field = screen.getByTestId('title')

    const button = screen.getByTestId('x-btn')
    await userEvent.click(button)

    expect(field).toHaveAttribute('placeholder', 'Titulo')
  })

  it('should call handleAddTodo if form is valid when submit form', async () => {
    render(CreateTodoCardDefault())

    const form = screen.getByRole('form')
    await userEvent.click(form)
    const fields = screen.getAllByRole('textbox')

    await Promise.all(fields.map(field => userEvent.type(field, 'teste')))

    const createBtn = screen.getByTestId('create_btn')
    await userEvent.click(createBtn)

    waitFor(() => expect(handleAddTodo).toHaveBeenCalledTimes(1))
  })

  it('should show error message when form is invalid',async () => {
    render(CreateTodoCardDefault())

    const form = screen.getByRole('form')
    await userEvent.click(form)

    const createBtn = screen.getByTestId('create_btn')
    await userEvent.click(createBtn)

    const errorSpan = screen.queryByTestId('error')

    waitFor(() => expect(errorSpan).toBeInTheDocument())
  })
})
