import { Button } from '@mui/material'
import TextField from '@mui/material/TextField'
import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>登録する</title>
        <meta name="description" content="登録する" />
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
          <Button className="mt-4" variant="contained">
            登録
          </Button>
        </p>
      </main>
    </div>
  )
}

export default Home
