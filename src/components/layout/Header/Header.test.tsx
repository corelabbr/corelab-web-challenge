import { render, screen } from '@testing-library/react'
import  { userEvent } from '@testing-library/user-event'
import { Header } from '.'

describe(Header.name, () => {
  it('should render Header', () => {
    render(<Header />)

    expect(screen.getByRole('heading')).toBeTruthy()
  })

  it('should have search field', async () => {
    render(<Header />)

    const input = screen.getByRole('search')
    const textContent = 'Teste'

    await userEvent.type(input, textContent)

    expect(input).toHaveValue(textContent)
  })

})

