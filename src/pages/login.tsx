import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <div className={styles.container}>
      <Head>
        <title>ログイン</title>
        <meta name="description" content="ログインページ。" />
      </Head>

      <main className={styles.main}>
        <p>
          <Button
            className="mt-4"
            variant="contained"
            onClick={() =>
              loginWithRedirect({ redirectUri: window.location.origin })
            }
          >
            Auth0でログイン
          </Button>
        </p>

        <p>
          アカウントをお持ちでない方は<Link href="/signup">新規登録</Link>
        </p>
      </main>
    </div>
  )
}

export default Home
