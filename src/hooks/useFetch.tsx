import { useEffect, useState } from 'react'

export default function useFetch<T>(url: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()
  const [data, setData] = useState<T>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const response = await fetch(url)
        if (!response.ok)
          throw new Error(`HTTP Error. Response status: ${response.status}`)
        const newData = await response.json()

        setData(newData)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('Unknown error!')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, error, loading }
}
