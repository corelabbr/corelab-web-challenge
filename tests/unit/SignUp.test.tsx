import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import SignUp from './../../src/pages/SignUp';
import AuthService from './../../src/services/authService';

describe('SignUp', () => {
    it('deve chamar a função de registro com os dados do usuário e simular uma chamada de API', async () => {
        vi.spyOn(AuthService, 'register').mockResolvedValue(true);

        render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Seu nome completo'), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByPlaceholderText('Seu e-mail'), { target: { value: 'testuser@testmail.com' } });
        fireEvent.change(screen.getByPlaceholderText('Sua senha maior que 6 dígitos'), { target: { value: 'Password123' } });
        fireEvent.change(screen.getByPlaceholderText('Confirme sua senha'), { target: { value: 'Password123' } });

        fireEvent.click(screen.getByTestId('submit-button'));

        await waitFor(() => {
            expect(AuthService.register).toHaveBeenCalledWith('Test User', 'testuser@testmail.com', 'Password123');
        });
    });

    it('deve exibir mensagens de erro para campos inválidos', async () => {
        render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByTestId('submit-button'));

        await waitFor(() => {
            expect(screen.getByText('Todos os campos são obrigatórios.')).toBeInTheDocument();
        });

        fireEvent.change(screen.getByPlaceholderText('Seu nome completo'), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByPlaceholderText('Seu e-mail'), { target: { value: 'testuser@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Sua senha maior que 6 dígitos'), { target: { value: 'Password123' } });
        fireEvent.change(screen.getByPlaceholderText('Confirme sua senha'), { target: { value: 'differentpassword' } });

        fireEvent.click(screen.getByTestId('submit-button'));

        await waitFor(() => {
            expect(screen.getByText(
                'A confirmação deve ser igual e conter pelo menos uma letra maiúscula e um número.'
            )).toBeInTheDocument();
        });
    });
});
