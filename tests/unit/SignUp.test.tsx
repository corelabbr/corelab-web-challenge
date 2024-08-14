import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import SignUp from './../../src/pages/SignUp';
import AuthService from './../../src/services/authService';

// Verificando se o usuário consegue registrar no sistema.
describe('SignUp', () => {
    it('deve chamar a função de registro com os dados do usuário e simular uma chamada de API', async () => {
        // Mock da função de registro
        vi.spyOn(AuthService, 'register').mockResolvedValue(true);

        // Simular a função de navegação
        render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
        );

        // Preencher o formulário
        fireEvent.change(screen.getByPlaceholderText('Nome de usuário maior que 6 dígitos'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Seu e-mail'), { target: { value: 'testuser@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Sua senha maior que 6 dígitos'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText('Confirme sua senha'), { target: { value: 'password123' } });

        // Enviar o formulário usando data-testid
        fireEvent.click(screen.getByTestId('submit-button'));

        // Esperar a chamada da função de registro e navegação
        await waitFor(() => {
            expect(AuthService.register).toHaveBeenCalledWith('testuser', 'testuser@example.com', 'password123');
        });
    });

    it('deve exibir mensagens de erro para campos inválidos', async () => {
        render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
        );

        // Enviar o formulário sem preencher os campos
        fireEvent.click(screen.getByTestId('submit-button'));

        // Esperar e verificar mensagens de erro
        await waitFor(() => {
            expect(screen.getByText('Todos os campos são obrigatórios.')).toBeInTheDocument();
        });

        // Preencher o formulário com senhas diferentes
        fireEvent.change(screen.getByPlaceholderText('Nome de usuário maior que 6 dígitos'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Seu e-mail'), { target: { value: 'testuser@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Sua senha maior que 6 dígitos'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText('Confirme sua senha'), { target: { value: 'differentpassword' } });

        // Enviar o formulário
        fireEvent.click(screen.getByTestId('submit-button'));

        // Esperar e verificar mensagens de erro
        await waitFor(() => {
            expect(screen.getByText('As senhas são diferentes.')).toBeInTheDocument();
        });
    });
});
