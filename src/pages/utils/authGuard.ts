import { wrapper } from '../store/store'

export default () => {
  return wrapper.getServerSideProps(store => {
    const { isLogin, userInfo } = store.getState().auth
    return async context => {
      if (!isLogin || !userInfo) {
        context.res?.writeHead(308, { Location: '/pc/login' })
        context.res?.end()
      }
      return {
        props: {}
      }
    }
  })
}
