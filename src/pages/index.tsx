import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useState } from 'react'

import Header from '../components/templates/Header'
import mockUsers from '../modules/mock/mockUsers'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  const { user, isAuthenticated, logout, getAccessTokenSilently } = useAuth0()

  const [authToken, setAuthToken] = useState(null)

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

  const usersList = mockUsers.map((user) => (
    <li key={user.id + user.name}>
      <Link href="/user/[id]" as={`/user/${user.id}`}>
        {user.name}
      </Link>
    </li>
  ))

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
        <ul>{usersList}</ul>
        <br />
        <Link href="/login">loginページへ</Link>
        <br />

        {isAuthenticated && (
          <>
            <p>ログイン中</p>
            <p>{user?.email}</p>
            <p>トークン</p>
            <p>{authToken}</p>
            <Button variant="contained" onClick={() => logout()}>
              logout
            </Button>
          </>
        )}
      </main>
    </div>
  )
}

export default Home

// getServerSidePropsを宣言するとSSRになる
// export async function getServerSideProps() {
//   return {
//     props: {}, // ページコンポーネントにpropsとして渡されます。
//   }
// }
