import * as THREE from 'three'
import { useRef, useState, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, TrackballControls } from '@react-three/drei'
import { BASIC_URL, BLOG_URL } from '../../../shared/constants/env'

const colorArr = [
  '#E7DAC5',
  '#B1E2B4',
  '#FCAE9F',
  '#FDDD82',
  '#CE9F41',
  '#A469E5',
  '#85CCA6',
  '#1296db',
  'rgb(236,171,68)',
  'rgb(253,227,133)'
]
const textUrl = [
  ['自定义工作流', `${BASIC_URL}/pc/workflow`],
  ['博客', `${BASIC_URL}/pc/myBlog`],
  ['在线office', `${BASIC_URL}/pc/onlyOffice`],
  ['表单设计器', `${BASIC_URL}/pc/sheetDesigner`],
  ['技术资讯', `${BASIC_URL}/pc/information`],
  ['前端笔记', `${BLOG_URL}/front_end/`],
  ['后端笔记', `${BLOG_URL}/back_end/`],
  ['必备应用', `${BLOG_URL}/apps/Applist.html`],
  ['AI应用', `${BLOG_URL}/apps/ChatGPT.html`],
  ['代码规范化', `${BLOG_URL}/lint/01.html`],
  ['vue笔记 ', `${BLOG_URL}/back_end/NestJS/01.html`],
  ['nest笔记', `${BLOG_URL}/front_end/front_end_framework/vue3/01.html`],
  ['react笔记', `${BLOG_URL}/front_end/front_end_framework/react/01.html`],
  ['稀土掘金', `https://juejin.cn/`],
  ['InfoQ', `https://www.infoq.cn/`],
  ['OSCHINA（开源中国）', `https://www.oschina.net/`],
  ['SegmentFault知否', `https://segmentfault.com/blogs`],
  ['GitHub', `https://github.com/`],
  ['DEV', `https://dev.to/`],
  ['Stack Overflow', `https://stackoverflow.com/`],
  ['DZone', `https://dzone.com/`],
  ['Google Developers', `https://developers.google.cn/`]
]
const len = textUrl.length
const fontUrl = '/font/zihun.ttf'

function getTextColor(): string {
  return colorArr[Math.ceil(Math.random() * 9)]
}

function Word({ children, url, ...props }) {
  const color = new THREE.Color()
  const fontProps = {
    fontSize: 2.5,
    letterSpacing: -0.05,
    lineHeight: 1,
    'material-toneMapped': false
  }
  const textColor = getTextColor()
  const ref = useRef<any>()
  const [hovered, setHovered] = useState(false)
  const over = e => (e.stopPropagation(), setHovered(true))
  const out = () => setHovered(false)
  // Tie component to the render-loop
  useFrame(({ camera }, delta) => {
    // Make text face the camera
    if (ref && ref.current) {
      ref.current!.quaternion.copy(camera.quaternion)
      // Animate font color
      ref.current!.material.color.lerp(color.set(hovered ? '#000' : textColor), 0.1)
    }
  })
  useEffect(() => void (document.body.style.cursor = hovered ? 'pointer' : 'auto'), [hovered])
  return (
    <Text
      font={fontUrl}
      ref={ref}
      fontSize={36}
      onPointerOver={over}
      onPointerOut={out}
      onClick={() => {
        window.open(url)
      }}
      {...props}
      {...fontProps}
      children={children}
    />
  )
}

function Cloud({ count = 8, radius = 20 }) {
  // Create a count x count random words with spherical distribution
  const words = useMemo(() => {
    const temp = []
    const spherical = new THREE.Spherical()
    const phiSpan = Math.PI / (count + 1)
    const thetaSpan = (Math.PI * 2) / count
    for (let i = 1; i < count + 1; i++)
      for (let j = 0; j < count; j++) {
        let index = (i * j) % len
        temp.push([
          new THREE.Vector3().setFromSpherical(
            spherical.set(radius * (Math.random() * 5 + 1), phiSpan * i, thetaSpan * j)
          ),
          textUrl[index][0],
          textUrl[index][1]
        ])
      }
    return temp
  }, [count, radius])
  // const ref = useRef<any>()
  // useFrame((state, delta) => {
  //   if (ref && ref.current) {
  //     ref.current.rotation.z -= delta / 10
  //   }
  // })
  //   return (
  //     <group ref={ref}>

  //     </group>
  //   )
  return words.map(([pos, word, url], index) => (
    <Word key={index} position={pos} url={url} children={word} />
  ))
}

export default function WordCloud() {
  const position = new THREE.Vector3(0, 0, 24)
  return (
    <Canvas dpr={[1, 2]} camera={{ position, fov: 90 }}>
      <fog attach='fog' args={['#202025', 0, 80]} />
      <Cloud count={10} radius={30} />
      <TrackballControls />
    </Canvas>
  )
}
