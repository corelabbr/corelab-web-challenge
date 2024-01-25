'use client'
export default function Error({ error, reset, }: { error: Error, reset: () => void }) {
  return (
    <div className="error">
      <span>Algo deu errado 😥</span>
      <button onClick={() => reset()}>
        Recarregar página
      </button>
    </div>
  )
}