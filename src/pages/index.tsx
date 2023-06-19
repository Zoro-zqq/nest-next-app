import React from 'react'

export default () => {
  return <></>
}
/*
export async function getServerSideProps(ctx: NextPageContext) {
  // 是否为移动端（平板电脑不算做移动端）
  const isMobileDevice = isMobile({ ua: ctx.req, tablet: false })
  // 是否为平板电脑
  const isTabletDevice = !isMobileDevice && isMobile({ ua: ctx.req, tablet: true })
  let route = '/pc'
  if (isMobileDevice) {
    route = '/mobile'
  } else if (isTabletDevice) {
    route = '/tablet'
  }
  return {
    props: {},
    redirect: {
      destination: route,
      permanent: true
    }
  }
}
 */
