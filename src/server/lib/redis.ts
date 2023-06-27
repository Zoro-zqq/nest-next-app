import { Redis, Command } from 'ioredis'
import { REDIS_CONFIG } from '../../shared/constants/env.ts'
import { Socket } from 'socket.io'

export type RedisClient = Redis

let client: RedisClient | undefined
//订阅
let subscriberClient: RedisClient | undefined
//socket instance
let socket: Socket | undefined
//'__keyevent@'+CONF.db+'__:expired' 固定写法 订阅redis key失效
const EXPIRED_KEY = '__keyevent@0__:expired'

export class redisService {
  public static async initClient(websocket: Socket, db: number = 0) {
    socket = websocket
    client = await redisService.newRedisClient(db)
    // Activate "notify-keyspace-events" for expired type events
    //Subscribe to the "notify-keyspace-events" channel used for expired type events
    client.sendCommand(
      new Command(
        'config',
        ['set', 'notify-keyspace-events', 'Ex'],
        {
          replyEncoding: 'utf-8'
        },
        redisService.SubscribeExpired
      )
    )
    return client
  }

  private static async newRedisClient(db: number = 0) {
    return new Redis({
      ...REDIS_CONFIG,
      db
    })
  }

  public static async get(key) {
    if (!client) return
    return client.get(key)
  }

  public static set(key, value = '') {
    if (!client) return
    client.set(key, value)
    // 设置key的过期时间60秒（其实也就是二维码的有效时间）
    client.expire(key, 60)
  }

  private static async SubscribeExpired() {
    subscriberClient = await redisService.newRedisClient()
    await subscriberClient.subscribe(EXPIRED_KEY, function () {
      subscriberClient.on('message', function (channel, msg) {
        console.log(`二维码：${msg} 已超时过期... `)
        // 二维码失效 通知 socket.js
        socket.emit('ScanCodeOvertime', msg)
      })
    })
  }
}
