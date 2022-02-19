import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

import { User } from '../../modules/types/User'

export type Props = {
  query: { id: string }
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const User = () => {
  const [user, setuser] = useState<User>()
  const [isLoading, setLoading] = useState(true)

  const router = useRouter()
  const { id } = router.query

  // if (!isReady) return <p>Loading1...</p>

  const { data } = useSWR(`/api/users/${id}`, fetcher)

  useEffect(() => {
    if (data) {
      setLoading(false)
      setuser(data)
    }
  }, [data])

  if (isLoading || !user) return <p>Loading...</p>

  return (
    <div>
      <h1>{user.name}</h1>
      <p>年齢：{user.age}</p>
      <div>
        {user.parts.map((part: string) => {
          return <p key={part}>{part}</p>
        })}
      </div>
    </div>
  )
}

export default User
