import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel='stylesheet' href='/assets/iconfont/iconfont.css' />
          <link
            href='https://ik.imagekit.io/chinesefonts/packages/mkzyt/dist/猫啃珠圆体/result.css'
            rel='stylesheet'
          />
          <link rel='icon' href='/logo.png' />
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
