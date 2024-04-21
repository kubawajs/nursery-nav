import { useEffect, useState } from 'react'

function useFetch(url: string) {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw Error("Sorry, couldn't fetch data for this resource!")
                }
                return response.json()
            })
            .then(responseData => {
                setData(responseData)
                setIsLoading(false)
                setError(null)
            })
            .catch(error => {
                setIsLoading(false)
                setError(error.message)
            })
    }, [url])

    return { data, isLoading, error }
}

export default useFetch