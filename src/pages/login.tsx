import { Button } from '@mui/material'
import TextField from '@mui/material/TextField'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  const router = useRouter()

  const loginClicked = () => {
    // ログインAPIを叩き、200が帰ってくればindexへ遷移する
    router.push('/')
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>ログイン</title>
        <meta name="description" content="ログインページ。" />
      </Head>

      <main className={styles.main}>
        <TextField
          className="mb-4"
          required
          id="outlined-required"
          label="Email"
          placeholder="メールアドレスを入力してください"
        />

        <TextField
          label="Password"
          type="password"
          autoComplete="current-password"
        />

        <p>
          <Button className="mt-4" variant="contained" onClick={loginClicked}>
            ログイン
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
