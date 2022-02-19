import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

import { User } from '../../modules/types/User'

export type Props = {
  query: { id: string }
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const User = () => {
  // const [user, setuser] = useState<User | null>(null)
  const [isLoading, setLoading] = useState(true)

  const router = useRouter()
  const { id } = router.query

  // ページがマウントされた時
  // useEffect(() => {
  //   if (!id) return

  //   setLoading(true)
  //   fetch(`/api/users/${id}`)
  //     .then((res) => res.json())
  //     .then((user) => {
  //       console.info(user)
  //       setuser(user)
  //       setLoading(false)
  //     })
  // }, [])

  const { data } = useSWR(`/api/users/${id}`, fetcher)

  useEffect(() => {
    if (data) {
      setLoading(false)
    }
  }, [data])

  if (isLoading) return <p>Loading...</p>

  return (
    <div>
      <h1>{data.name}</h1>
      <p>年齢：{data.age}</p>
      <div>
        {data.parts.map((part: string) => {
          return <p key={part}>{part}</p>
        })}
      </div>
    </div>
  )
}

export default User
