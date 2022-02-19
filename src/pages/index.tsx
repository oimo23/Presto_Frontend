import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import mockUsers from '../modules/mock/mockUsers'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const usersList = mockUsers.map((user) => (
    <li key={user.id + user.name}>
      <Link href="/user/[user.id]" as={`/user/${user.id}`}>
        {user.name}
      </Link>
    </li>
  ))

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p>ユーザー一覧</p>
        <div>{usersList}</div>
      </main>
    </div>
  )
}

export default Home
