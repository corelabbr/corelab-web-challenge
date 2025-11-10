import { z } from 'zod'

export const todoSchemaValidation = z.object({
  title: z
    .string({ required_error: 'Título é obrigatório' })
    .min(2, 'Título deve ter pelo menos 1 caractere'),
  description: z
    .string({ required_error: 'Descrição é obrigatório' })
    .min(2, 'Descrição deve ter pelo menos 1 caractere')
})
