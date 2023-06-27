import { GetServerSideProps } from 'next'
import authGuard from '../utils/authGuard.ts'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
const PcModule = dynamic(() => import('./pc.module.tsx').then(mod => mod.default))

const PcIndex: React.FC & {
  getInitialProps: GetServerSideProps
} = () => {
  return (
    <Suspense fallback={<>loading...</>}>
      <PcModule />
    </Suspense>
  )
}

export default PcIndex

//路由守卫
PcIndex.getInitialProps = authGuard()
