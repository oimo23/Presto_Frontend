import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mui/material'
import axios, { AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useState } from 'react'

import Header from '../components/templates/Header'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { useRequireLogin } from '../hooks/useRequireLogin'
// import mockUsers from '../modules/mock/mockUsers'
import { User } from '../modules/types/User'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  const { user, isAuthenticated, logout, getAccessTokenSilently } = useAuth0()
  const [authToken, setAuthToken] = useState<string>()
  const { currentUser } = useCurrentUser()
  const [usersList, setUsersList] = useState<User[]>()

  // ログインが必要なページとする
  useRequireLogin()

  // Auth0のトークンを取得したらconsole.infoに表示する
  useEffect(() => {
    ;(async () => {
      try {
        const token = await getAccessTokenSilently()
        setAuthToken(token)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [getAccessTokenSilently])

  useEffect(() => {
    (async function () {
      try {
        const response: AxiosResponse<any> = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URI}/api/users`,
          { headers: { Authorization: "Bearer token"} }
        )
        setUsersList(response.data.users)
      } catch (e) {
        console.error(e)
      }
    })();
  },[])

  const usersListHtml = usersList ? usersList.map((user) => (
    <li key={user.userId + user.name}>
      <Link href="/user/[id]" as={`/user/${user.userId}`}>
        {user.name}
      </Link>
    </li>
  )) : null

  return (
    <div className={styles.container}>
      {/* こんな感じでページごとのtitleなど設定できる */}
      <Head>
        <title>ユーザー一覧</title>
        <meta name="description" content="ユーザー一覧ページ。" />
      </Head>

      {/* こんな感じでコンポーネントを読み込める */}
      <Header />
      <main className={styles.main}>
        <p className="text-xl">ユーザー一覧</p>
        <ul>{ usersListHtml }</ul>
        <br />
        <Link href="/login">loginページへ</Link>
        <br />

        {isAuthenticated && (
          <>
            <h2>実際のログイン情報</h2>
            <p>{JSON.stringify(user)}</p>
            <p>ログイン中</p>
            <p>{user?.email}</p>
            <p>トークン</p>
            <p>{authToken}</p>
            <br />
            <h2>Swaggerからのログイン情報</h2>
            <p>{JSON.stringify(currentUser)}</p>
            <Button
              variant="contained"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              logout
            </Button>
          </>
        )}
      </main>
    </div>
  )
}

export default Home
