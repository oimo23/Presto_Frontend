import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

import { User } from './type'

export type Props = {
  query: { id: string }
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const User = (props: User) => {
  const [user, setuser] = useState(null)
  const [isLoading, setLoading] = useState(false)

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
      setuser(data)
    }
  }, [data])

  if (isLoading) return <p>Loading...</p>
  if (!user) return <p>No profile user</p>

  return (
    <div>
      <h1>{user.name}</h1>
      <p>年齢：{user.age}</p>
      <div>
        {user.parts.map((part) => {
          return <p key={part}>{part}</p>
        })}
      </div>
    </div>
  )
}

export default User
