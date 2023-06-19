'use client'
import { Maximize2, Minimize2, Minus, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { setOpenApp } from '../../store/slice/appSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../store/store'

interface TrafficProps {
  id: string
  handleMax: () => void
  handleMini: () => void
  handleMinimize: () => void
}

const TrafficHeader = ({ id, handleMax, handleMini, handleMinimize }: TrafficProps) => {
  const { max } = useSelector((state: AppState) => state.app)
  const dispatch = useDispatch()

  const trafficLightRef = useRef<HTMLDivElement | null>(null)
  const [enter, setEnter] = useState(false)
  const closeHandler = () => {
    dispatch(
      setOpenApp({
        windowName: id,
        type: 'close'
      })
    )
  }
  useEffect(() => {
    const trafficLight = trafficLightRef.current
    if (trafficLight) {
      trafficLight.addEventListener('mouseenter', () => {
        setEnter(true)
      })
      trafficLight.addEventListener('mouseleave', () => {
        setEnter(false)
      })
      return () => {
        trafficLight.removeEventListener('mouseenter', () => {
          setEnter(true)
        })
        trafficLight.removeEventListener('mouseleave', () => {
          setEnter(false)
        })
      }
    }
  }, [trafficLightRef])

  return (
    <div
      style={{
        position: 'absolute',
        backgroundColor: 'transparent'
      }}
    >
      <div
        ref={trafficLightRef}
        style={{
          position: 'relative',
          width: '60px',
          display: 'flex',
          marginLeft: '5px'
        }}
      >
        <div
          onClick={closeHandler}
          style={{
            backgroundColor: 'rgb(239 68 68)',
            borderRadius: '50%',
            width: '14px',
            height: '14px',
            marginLeft: '5px',
            marginTop: '10px'
          }}
        >
          {' '}
        </div>
        <div
          onClick={handleMinimize}
          style={{
            backgroundColor: 'rgb(234 179 8)',
            borderRadius: '50%',
            width: '16px',
            height: '16px',
            marginLeft: '5px',
            marginTop: '10px'
          }}
        ></div>
        <div
          style={{
            backgroundColor: 'rgb(34 197 94)',
            borderRadius: '50%',
            width: '14px',
            height: '14px',
            marginLeft: '5px',
            marginTop: '10px'
          }}
        ></div>
        {!enter && (
          <div
            style={{
              position: 'absolute',
              display: 'flex',
              marginTop: '9px',
              gap: '10px'
            }}
          >
            <X
              onClick={closeHandler}
              size={14}
              color='black'
              strokeWidth={2}
              style={{
                marginLeft: '5px',
                marginTop: '2px'
              }}
            />
            <Minus
              onClick={handleMinimize}
              size={12}
              color='black'
              strokeWidth={3}
              style={{
                marginLeft: '-3px',
                marginTop: '3px'
              }}
            />
            {max ? (
              <Minimize2
                style={{
                  marginLeft: '-2px',
                  marginTop: '2px'
                }}
                onClick={handleMini}
                size={12}
                color='black'
                strokeWidth={2}
              />
            ) : (
              <Maximize2
                style={{
                  marginLeft: '-2px',
                  marginTop: '2px'
                }}
                onClick={handleMax}
                size={12}
                color='black'
                strokeWidth={2}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default TrafficHeader
