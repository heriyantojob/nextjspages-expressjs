import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import Layout from '../components/layout/layout'
function MyApp({ Component,  pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Layout><Component {...pageProps} /> </Layout>
    </SessionProvider>
    
  )


}

export default MyApp


/* 
https://daisyui.com/
https://www.hyperui.dev/

template https://www.floatui.com/components/

https://merakiui.com/


https://mambaui.com/components/toggle
https://dev.to/cruip/25-places-where-you-can-get-free-tailwind-css-components-47lm
*/  

