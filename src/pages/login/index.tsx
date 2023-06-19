import React, { Suspense, useState, useEffect, useRef } from 'react'
import * as Transition from 'react-transition-group'
import styles from './scss/login.module.scss'
import { Spin } from 'antd'
import ScanLogin from '../components/login/scanLogin'
import NormalLogin from '../components/login/normalLogin'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Vector3,
  BufferGeometry,
  Float32BufferAttribute,
  Points,
  PointsMaterial,
  AdditiveBlending,
  Clock
} from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 声明场景
let scene: any
// 声明相机
let camera: any
// 声明渲染器
let renderer: any
let p

const LoginPage = props => {
  const [loginIdentity, setLoginIdentity] = useState(false)
  const loginRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scene = new Scene()
    camera = new PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000)
    camera.position.set(0, 4, 36)
    renderer = new WebGLRenderer({
      alpha: true
      // antialias: true
    })
    renderer.setSize(innerWidth, innerHeight)
    renderThreeScene()
    p.visible = false
    // scene.visible = false
    return () => {
      window.removeEventListener('resize', windowResize)
    }
  }, [loginRef])

  useEffect(() => {
    if (!loginIdentity) {
      if (p && p.visible) {
        p.visible = loginIdentity
      }
      return
    }
    let timer,
      step = 0 // 运动步长
    function render() {
      if (!timer) {
        p.opacity = 0
        p.visible = loginIdentity
      }
      renderer.render(scene, camera)
      step += 0.01
      p.opacity = step
      timer = requestAnimationFrame(render) // 重复执行渲染方法
      if (step >= 1) {
        cancelAnimationFrame(timer)
      }
    }

    render()
  }, [loginIdentity])

  function renderThreeScene() {
    document.querySelector('#z-login')!.appendChild(renderer.domElement)
    window.addEventListener('resize', windowResize)
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.enablePan = false

    let gu = {
      time: { value: 0 }
    }

    let sizes: Array<number> = []
    let shift: number[] = []
    let pushShift = () => {
      shift.push(
        Math.random() * Math.PI,
        Math.random() * Math.PI * 2,
        (Math.random() * 0.9 + 0.1) * Math.PI * 0.1,
        Math.random() * 0.9 + 0.1
      )
    }
    let pts: Array<any> = []
    for (let i = 0; i < 10000; i++) {
      sizes.push(Math.random() * 1.5 + 0.5)
      pushShift()
      pts.push(new Vector3().randomDirection().multiplyScalar(Math.random() * 0.5 + 9.5))
    }
    for (let i = 0; i < 80000; i++) {
      let r = 11,
        R = 40
      let rand = Math.pow(Math.random(), 1.5)
      let radius = Math.sqrt(R * R * rand + (1 - rand) * r * r)
      pts.push(
        new Vector3().setFromCylindricalCoords(
          radius,
          Math.random() * 2 * Math.PI,
          (Math.random() - 1) * 3
        )
      )
      sizes.push(Math.random() * 1.5 + 0.5)
      pushShift()
    }
    let g = new BufferGeometry().setFromPoints(pts)
    g.setAttribute('sizes', new Float32BufferAttribute(sizes, 1))
    g.setAttribute('shift', new Float32BufferAttribute(shift, 4))
    let m = new PointsMaterial({
      size: 0.125,
      transparent: true,
      depthTest: false,
      blending: AdditiveBlending
    })
    m.onBeforeCompile = shader => {
      shader.uniforms.time = gu.time
      shader.vertexShader = `
uniform float time;
attribute float sizes;
attribute vec4 shift;
varying vec3 vColor;
${shader.vertexShader}
`
        .replace(`gl_PointSize = size;`, `gl_PointSize = size * sizes;`)
        .replace(
          `#include <color_vertex>`,
          `#include <color_vertex>
float d = length(abs(position) / vec3(40., 10., 40));
d = clamp(d, 0., 1.);
vColor = mix(vec3(227., 155., 0.), vec3(100., 50., 255.), d) / 255.;
`
        )
        .replace(
          `#include <begin_vertex>`,
          `#include <begin_vertex>
float t = time;
float moveT = mod(shift.x + shift.z * t, PI2);
float moveS = mod(shift.y + shift.z * t, PI2);
transformed += vec3(cos(moveS) * sin(moveT), cos(moveT), sin(moveS) * sin(moveT)) * shift.w;
`
        )
      shader.fragmentShader = `
varying vec3 vColor;
${shader.fragmentShader}
`
        .replace(
          `#include <clipping_planes_fragment>`,
          `#include <clipping_planes_fragment>
float d = length(gl_PointCoord.xy - 0.5);
//if (d > 0.5) discard;
`
        )
        .replace(
          `vec4 diffuseColor = vec4( diffuse, opacity );`,
          `vec4 diffuseColor = vec4( vColor, smoothstep(0.5, 0.1, d)/* * 0.5 + 0.5*/ );`
        )
    }
    p = new Points(g, m)
    p.rotation.order = 'ZYX'
    p.rotation.z = 0.4
    p.rotation.x = -0.2
    p.position.x = 12
    p.position.y = 4
    scene.add(p)

    let clock = new Clock()

    renderer.setAnimationLoop(() => {
      controls.update()
      let t = clock.getElapsedTime() * 0.5
      gu.time.value = t * Math.PI
      p.rotation.y = t * 0.05
      renderer.render(scene, camera)
    })
  }
  function windowResize() {
    camera.aspect = innerWidth / innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(innerWidth, innerHeight)
  }

  return (
    <div
      id='z-login'
      ref={loginRef}
      className={`${styles['z-login']}  ${loginIdentity ? styles['z-login-back'] : ''}`}
    >
      <div className={styles['z-login-main-content']}>
        <div className={styles['z-login-identity-wrapper']}>
          <h6>
            <span>账号密码登录</span>
            <span>扫码登录</span>
          </h6>
          <input
            value={Number(loginIdentity)}
            onChange={e => setLoginIdentity(!loginIdentity)}
            className='checkbox'
            type='checkbox'
            id={styles['identity-checkbox']}
            name='identity-checkbox'
          />
          <label htmlFor={styles['identity-checkbox']}></label>
        </div>
        <div
          className={`${styles['z-login-card-3d-wrapper']} ${
            loginIdentity ? styles['loginCardTransfer'] : ''
          }`}
        >
          <Transition.CSSTransition in={loginIdentity} timeout={800} classNames='fade'>
            <div>
              <div className={styles['before-box']}></div>
              <div className={styles['after-box']}></div>
            </div>
          </Transition.CSSTransition>
          <Suspense fallback={<Spin tip='Loading...' />}>
            <NormalLogin></NormalLogin>
          </Suspense>
          <ScanLogin setLoginIdentity={setLoginIdentity} loginIdentity={loginIdentity}></ScanLogin>
        </div>
      </div>
    </div>
  )
}

// LoginPage.getInitialProps = async context => {
//   return {}
// }

export default LoginPage
