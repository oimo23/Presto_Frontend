import '../styles/globals.css'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  // useEffect(async () => {
  //   if (router.pathname === '/login') return // pathnameが"/login"の場合には処理を行わない
  //   // ここに処理を書く
  //   try {
  //     const response = await axios.post('/api/authCheck')
  //     console.info(response)
  //   } catch (error) {
  //     console.info(error)
  //   }
  // }, [router.pathname])

  return <Component {...pageProps} />
}

export default MyApp
