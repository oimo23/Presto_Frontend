import { dividerClasses, Skeleton } from '@mui/material'
import axios, { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Position } from '../../modules/types/Position'
// import useSWR from 'swr'
import { User } from '../../modules/types/User'

export type Props = {
  query: { id: string }
}

// const fetcher = (url: string) => fetch(url).then((res) => res.json())

const User = () => {
  const [user, setuser] = useState<User>()
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState<User>()
  const router = useRouter()
  const { id } = router.query

  // const { data } = useSWR(`/api/users/${id}`, fetcher)

  useEffect(() => {
    (async function () {
      try {
        const response: AxiosResponse<any> = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URI}/api/users/${id}`,
          { headers: { Authorization: "Bearer token"} }
        )
        setData(response.data)
      } catch (e) {
        console.error(e)
      }
    })();
  },[])

  useEffect(() => {
    if (data) {
      setLoading(false)
      setuser(data)
    }
  }, [data])

  if (isLoading || !user) {
    return (
      <>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </>
    )
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>年齢：{user.age}</p>
      <div>
        {user.positions.map((position: Position) => {
          return (
            <div key={position.name}>
              <span>{position.name}</span>
              <span>{position.career}年</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default User
