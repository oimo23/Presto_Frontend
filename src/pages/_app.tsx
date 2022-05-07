import '../styles/globals.css'

import { Auth0Provider } from '@auth0/auth0-react'
import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import axios from 'axios'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import { useEffect } from 'react'
import { RecoilRoot, useSetRecoilState } from 'recoil'

import createEmotionCache from '../modules/framework/materialUI/createEmotionCache'
import theme from '../modules/framework/materialUI/theme'
import { User } from '../modules/types/User'
import { currentUserState } from '../states/currentUser'

const clientSideEmotionCache = createEmotionCache()
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

function AppInit() {
  const setCurrentUser = useSetRecoilState(currentUserState)

  useEffect(() => {
    (async function () {
      try {
        const currentUser: User = await axios.get(
          'http://localhost:8002/api/users/me',
          { headers: { Authorization: "Bearer token"} }
        )
	      // ログインユーザーの情報が取得できたのでグローバルステートにセット
        setCurrentUser(currentUser);
      } catch {
        setCurrentUser(null);
      }
    })();
  },[])

  return null
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, router } = props
  
  useEffect(() => {
    if(router.pathname === "/login") return; // pathnameが"/login"の場合には処理を行わない
    // ここに処理を書く
 },[router.pathname])

  return (
    <Auth0Provider
      domain="dev-cz3row9p.us.auth0.com"
      clientId="k7WmaACzWh7AApP1UnThbDg3mpMMLiqK"
      redirectUri="http://localhost:3000/"
    >
      <RecoilRoot>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
          <AppInit />
        </ThemeProvider>
      </CacheProvider>
      </RecoilRoot>
    </Auth0Provider>
  )
}

export default MyApp
