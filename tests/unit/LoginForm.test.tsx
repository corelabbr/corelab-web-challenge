import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import SignIn from './../../src/pages/SignIn';
import AuthService from './../../src/services/authService';

// Verificando se o usuário consegue se registrar.
describe('LoginForm', () => {
    it('deve chamar a função onLogin com os dados do usuário e simular uma chamada de API', async () => {
        // Mock da função API
        vi.spyOn(AuthService, 'login').mockResolvedValue(true);

        // Simular a função de login
        const onLoginMock = vi.fn();
        render(
            <MemoryRouter>
                <SignIn onLogin={onLoginMock} />
            </MemoryRouter>
        );

        // Preencher o formulário
        fireEvent.change(screen.getByPlaceholderText('Seu nome de usuário'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Digite sua senha'), { target: { value: 'password123' } });

        // Enviar o formulário
        fireEvent.click(screen.getByText('Entrar'));

        // Esperar a chamada da função de login e navegação
        await waitFor(() => {
            expect(AuthService.login).toHaveBeenCalledWith('testuser', 'password123');
            expect(onLoginMock).toHaveBeenCalledWith(true);
        });
    });
});
