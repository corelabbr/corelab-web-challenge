import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'
import { TodoType } from '@/types/Todo'
import TodoProvider from '@/context/TodoContext'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: '1',
          title: 'todo1',
          description: 'desc1',
          color: 'COLOR_DEFAULT',
          favorite: true,
          createdAt: '2',
        },
        {
          id: '2',
          title: 'todo2',
          description: 'desc2',
          color: 'COLOR_DEFAULT',
          favorite: false,
          createdAt: '3',
        },
      ] as TodoType[]),
  })
) as jest.Mock

describe('Page', () => {
  it('renders a coisa', async () => {
    const HomeComponent = await Home()

    render(<TodoProvider>{HomeComponent}</TodoProvider>)

    expect(screen.getByPlaceholderText(/Título/i)).toBeInTheDocument()

    expect(screen.getByText(/Favoritos/i)).toBeInTheDocument()
    expect(screen.getByText(/Outras/i)).toBeInTheDocument()

    const firstTodo = await screen.findByText(/todo1/i)
    const secondTodo = await screen.findByText(/todo2/i)

    const firstTodoDesc = await screen.findByText(/desc1/i)
    const secondTodoDesc = await screen.findByText(/desc2/i)

    expect(firstTodo).toBeInTheDocument()
    expect(secondTodo).toBeInTheDocument()

    expect(firstTodoDesc).toBeInTheDocument()
    expect(secondTodoDesc).toBeInTheDocument()
  })
})
