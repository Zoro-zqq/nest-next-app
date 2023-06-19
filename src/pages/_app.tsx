import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import 'antd/dist/reset.css'
import './styles/public.css'
import React from 'react'
import { wrapper } from './store/store.ts'

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
export default MyApp

/* MyApp.getInitialProps = async (context: AppContext) => {
  const { ctx } = context
  console.log(ctx.req.headers['Authorization'], ctx.req, '???????????')
  return {
    ...App.getInitialProps(context) // 必须加上这个，表示透传_app.tsx默认的值
  }
} */
/* function redirect(ctx: NextPageContext, location: string) {
  if (ctx.req) {
    ctx.res?.writeHead(308, { Location: location })
    ctx.res?.end()
  } else {
    Router.push(location)
  }
}
 */
