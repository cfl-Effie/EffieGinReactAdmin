/**
 * packages/hooks — 统一请求 Hook
 * 支持 loading / error / pagination / refresh 等状态
 */
import { useState, useCallback, useRef, useEffect } from 'react'

interface RequestOptions<T> {
  /** 请求函数 */
  api: (params?: any) => Promise<{ code: number; data: T; total?: number }>
  /** 默认参数 */
  defaultParams?: Record<string, any>
  /** 是否立即执行（默认 true） */
  immediate?: boolean
  /** 成功回调 */
  onSuccess?: (data: T) => void
  /** 失败回调 */
  onError?: (err: Error) => void
}

export function useRequest<T = any>({ api, defaultParams = {}, immediate = true, onSuccess, onError }: RequestOptions<T>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [params, setParams] = useState(defaultParams)
  const mounted = useRef(true)

  useEffect(() => { mounted.current = true; return () => { mounted.current = false } }, [])

  const run = useCallback(async (overrideParams?: Record<string, any>) => {
    setLoading(true)
    setError(null)
    try {
      const merged = { ...params, ...overrideParams }
      const res = await api(merged)
      if (!mounted.current) return
      if (res.code === 0 || res.code === 200) {
        setData(res.data)
        onSuccess?.(res.data)
      } else {
        throw new Error(res.data as any || '请求失败')
      }
    } catch (e: any) {
      if (mounted.current) {
        setError(e)
        onError?.(e)
      }
    } finally {
      if (mounted.current) setLoading(false)
    }
  }, [params])

  const refresh = useCallback(() => run(), [run])

  useEffect(() => { if (immediate) run() }, [])

  return { data, loading, error, params, setParams, run, refresh }
}

/** 分页状态 */
export interface PaginationState {
  page: number
  pageSize: number
  total: number
}

export function usePagination(initial: Partial<PaginationState> = {}) {
  const [pagination, setPagination] = useState<PaginationState>({
    page: initial.page || 1,
    pageSize: initial.pageSize || 10,
    total: initial.total || 0,
  })

  const onChange = useCallback((page: number, pageSize: number) => {
    setPagination(prev => ({ ...prev, page, pageSize }))
  }, [])

  return { pagination, setPagination, onChange }
}
