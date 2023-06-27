import React from 'react'
import { useSelector } from 'react-redux'
import { OurStore } from '../../store/store.ts'
import { ReactElement } from 'react'

type Props = {
  readonly children?: ReactElement
  readonly role?: 0
  readonly customText?: React.ReactNode
}
const AuthGuard: React.FC<Props> = ({ children, role, customText }) => {
  const { userInfo, isLogin } = useSelector((state: OurStore) => state.auth)

  // Without role allow all authorized users
  if (userInfo) {
    return <>{children}</>
  }

  if (role === 0 && userInfo?.roles === 0) {
    return <>{children}</>
  }

  return (
    <section>
      <h2 className='text-center'>未验证</h2>
      <div className='text-center'>
        {customText || '你没有权限访问这个页面，请联系管理员！！！'}
      </div>
    </section>
  )
}
export default AuthGuard
/* React.FC<Props>  */
