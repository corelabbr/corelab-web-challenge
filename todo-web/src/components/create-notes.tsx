'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from './ui/input'
import { Star } from 'lucide-react'
import { Textarea } from './ui/textarea'
import { useState } from 'react'
import { Button } from './ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { useToast } from './ui/use-toast'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'O título deve ter pelo menos 2 caracteres.',
  }),
  content: z.string().min(2, {
    message: 'A nota deve ter pelo menos 2 caracteres.',
  }),
})

const CreateNotes = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  })
  const [favorite, setFavorite] = useState(false)

  const changeFavorite = () => {
    setFavorite((prev) => !prev)
  }
  const { toast } = useToast()
  const { refresh } = useRouter()
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const request = await fetch('http://localhost:3333', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...values, favorite }),
    })
    if (request.status === 201) {
      toast({
        description: 'Nota criada com sucesso!',
        duration: 1000,
      })
    } else {
      toast({
        description: 'Erro ao criar nota!',
        variant: 'destructive',
        duration: 1000,
      })
    }
    setFavorite(false)
    form.reset()
    refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="rounded-3xl shadow-md">
          <CardHeader className="px-0 py-2">
            <CardTitle className="border-b-2">
              <div className="flex w-full justify-between px-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Título"
                          className="border-none text-base placeholder:text-black"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button type="button" onClick={changeFavorite}>
                  {favorite ? (
                    <Star className="text-yellow-500" />
                  ) : (
                    <Star className="text-gray-500" />
                  )}
                </button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Criar nota..."
                      className="resize-none border-none text-xs"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="relative">
            <Button
              type="submit"
              size={'sm'}
              className="absolute bottom-2 right-2 text-xs"
            >
              Criar nota
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

export default CreateNotes
