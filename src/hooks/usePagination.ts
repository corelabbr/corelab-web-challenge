import { SetStateAction, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Pagination } from 'types/models/Pagination'

interface PaginationResult<R> {
  data: R[]
  total: number
}

interface UsePagination<P, R> {
  fetcher: (params: P) => Promise<PaginationResult<R>>
  initialParams?: P
}

interface UsePaginationReturn<R, P> {
  data: PaginationResult<R>
  changeParams: (params: Partial<P>) => void
  loading: boolean
  params: Partial<P>
  setData: (data: R[]) => void
}

export function usePagination<R = any, P = Pagination>({
  fetcher,
  initialParams
}: UsePagination<P, R>): UsePaginationReturn<R, P> {
  const [params, setParams] = useState(initialParams || ({
    page: 0,
    size: 10
  } as P))
  const [data, setData] = useState<PaginationResult<R>>({
    data: [],
    total: 0
  })
  const [loading, setLoading] = useState(false)

  const handleChangeParams = (params: Partial<P>) => {
    setParams(state => ({
      ...state,
      ...params
    }))
  }

  const handleSetData = (data: R[]) => {
    setData(state => ({
      ...state,
      data
    }))
  }

  const handleFetch = async () => {
    setLoading(true)

    try {
      const data = await fetcher(params)
      setData(data)
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleFetch()
  }, [params])

  return {
    data,
    loading,
    params,
    changeParams: handleChangeParams,
    setData: handleSetData
  }
}
