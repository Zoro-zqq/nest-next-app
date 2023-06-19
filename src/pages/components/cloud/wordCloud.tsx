import * as THREE from 'three'
import { useRef, useState, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, TrackballControls } from '@react-three/drei'

const colorArr = ['#E7DAC5', '#B1E2B4', '#FCAE9F', '#FDDD82', '#CE9F41', '#A469E5', '#85CCA6']

function getTextColor(): string {
  return colorArr[Math.ceil(Math.random() * 6)]
}

function Word({ children, ...props }) {
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
      ref={ref}
      onPointerOver={over}
      onPointerOut={out}
      onClick={() => console.log('clicked')}
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
      for (let j = 0; j < count; j++)
        temp.push([
          new THREE.Vector3().setFromSpherical(
            spherical.set(radius * (Math.random() * 5 + 1), phiSpan * i, thetaSpan * j)
          ),
          'sbsb'
        ])
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
  return words.map(([pos, word], index) => <Word key={index} position={pos} children={word} />)
}

export default function WordCloud() {
  const position = new THREE.Vector3(0, 0, 35)
  return (
    <Canvas dpr={[1, 2]} camera={{ position, fov: 90 }}>
      <fog attach='fog' args={['#202025', 0, 80]} />
      <Cloud count={10} radius={30} />
      <TrackballControls />
    </Canvas>
  )
}
