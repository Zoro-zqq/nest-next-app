import React from 'react'
import styles from './index.module.scss'

function Card({ cardInfo }) {
  return (
    <div className={styles['card']}>
      <div className={styles['content']}>
        <h2 className={styles['title']}>{cardInfo.title}</h2>
        <p className={styles['desc']}>{cardInfo.desc}</p>
        <button
          className={styles['btn']}
          onClick={() => {
            window.open(cardInfo.url)
          }}
        >
          跳转
        </button>
      </div>
    </div>
  )
}

export default Card
