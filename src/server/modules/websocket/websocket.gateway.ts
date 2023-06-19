import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WsException,
  OnGatewayInit,
  WebSocketServer,
  ConnectedSocket
} from '@nestjs/websockets'
import { UseInterceptors } from '@nestjs/common'
import { WsServiceResponseInterceptor } from '../../interceptor/ws.response.interceptor.ts'
import { Server, Socket } from 'socket.io'
import { redisService } from '../../lib/redis.ts'
import { randomNumber, getQRcode } from '../../lib/utils.ts'

@UseInterceptors(new WsServiceResponseInterceptor())
@WebSocketGateway(4000, {
  transports: ['websocket'],
  cors: true
})
export class MyWebSocketGateway implements OnGatewayInit {
  constructor() {}
  @WebSocketServer() server: Server

  afterInit(socket: Socket) {
    redisService.initClient(socket)
  }

  // Web端获取二维码和uuid
  @SubscribeMessage('getQRcode')
  getQRcode(@ConnectedSocket() client: Socket) {
    const uuid = String(randomNumber())
    const QRcode = getQRcode(uuid) // 根据uuid生成二维码的base64
    redisService.set(uuid, '') // 保存uuid 到redis中，但是用户数据留空，由移动端上传
    client.emit('sendQRcode', { uuid: uuid, QRcode: QRcode }) // 向web端发送uuid和二维码base64数据
    return 'success'
  }

  /**
   * 检查移动端用户是否扫码二维码登录，如果扫码登录了
   * 那么二维码显示登录成功样式，并显示登录用户信息
   */
  @SubscribeMessage('checkScanCode')
  async checkScanCode(@MessageBody() reqData: { key: string }, @ConnectedSocket() client: Socket) {
    console.log(`Web端(Vue)在询问用户是否扫码：${reqData.key}...`)

    let userInfo = await redisService.get(reqData.key)
    // 如果key对应的value为空，那么用户未扫码
    // 反之 用户扫码并确定登录
    userInfo == null || userInfo.length == 0
      ? client.emit('waitScanCode')
      : client.emit('SuccessScanCode', userInfo)
    return 'waiting'
  }

  // web端用户掉线
  @SubscribeMessage('disconnect')
  disconnect() {
    console.log('web端用户掉线...')
    return 'disconnect'
  }
}
