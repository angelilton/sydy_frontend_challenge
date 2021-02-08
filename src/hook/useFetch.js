import { useState, useEffect } from 'react'
import axios from 'axios'

const url = `https://api.coindesk.com/v1/bpi/`

const useFetch = (search) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  // is fetch data if tag value
  const fetchData = async (search) => {
    setIsLoading(true)
    setIsError(false)

    try {
      const resp = await axios(`${url}${search}`)
      // const { EUR, USD, GBP } = resp.data.bpi

      setData(resp.data.bpi)
    } catch (error) {
      setIsError(true)
    }

    setIsLoading(false)
  }

  // render when usefetch is require
  useEffect(() => {
    fetchData(search)
  }, [search])

  return { data, isLoading, isError }
}

export default useFetch
