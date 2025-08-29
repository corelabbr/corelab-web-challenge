import { render, screen, fireEvent } from '@testing-library/react';
import { DashboardPage } from './index';

describe('DashboardPage', () => {
  it('renders the main components', () => {
    render(<DashboardPage />);

    expect(screen.getByPlaceholderText('Search notes')).toBeInTheDocument();
    expect(screen.getByText('CoreNotes')).toBeInTheDocument();
  });

  it('updates the search input value when typing', () => {
    render(<DashboardPage />);
    const input = screen.getByPlaceholderText('Search notes') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'New task' } });
    expect(input.value).toBe('New task');
  });

  it('clears the search input when clicking the clear button', () => {
    render(<DashboardPage />);
    const input = screen.getByPlaceholderText('Search notes') as HTMLInputElement;
    const clearButton = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'Test' } });
    expect(input.value).toBe('Test');

    fireEvent.click(clearButton);
    expect(input.value).toBe('');
  });
});
