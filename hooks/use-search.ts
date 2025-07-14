import { useRouter as useAppRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

export function useSearch(paramName = 'search', debounceMs = 1000) {
  const router = useAppRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get(paramName) || '')
  const [debouncedSearchTerm] = useDebounce(searchTerm, debounceMs)

  const updateSearchParams = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams)

      if (query) {
        params.set(paramName, query)
      } else {
        params.delete(paramName)
      }

      router.push(`?${params.toString()}`, { scroll: false })
    },
    [router, searchParams, paramName],
  )

  useEffect(() => {
    updateSearchParams(debouncedSearchTerm)
  }, [debouncedSearchTerm, updateSearchParams])

  return {
    searchTerm,
    setSearchTerm,
  }
}
