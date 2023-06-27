import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <meta http-equiv='Content-Security-Policy' content='upgrade-insecure-requests' />
        <Head>
          <link rel='icon' href='https://zorq.top/logo.png' />
          <link rel='stylesheet' href='/assets/iconfont/iconfont.css' />
          <link
            href='https://ik.imagekit.io/chinesefonts/packages/mkzyt/dist/猫啃珠圆体/result.css'
            rel='stylesheet'
          />
          <script defer src='/assets/iconfont/iconfont.js'></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
