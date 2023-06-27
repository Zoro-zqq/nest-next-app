import { MyWebSocketGateway } from './websocket.gateway.ts'
import { Module } from '@nestjs/common'

@Module({
  providers: [MyWebSocketGateway]
})
export class MyWebSocketModule {}
