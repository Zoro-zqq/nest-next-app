import { Module } from '@nestjs/common'
import { ChatGateway } from './chat.gateway.ts'

@Module({
  providers: [ChatGateway]
})
export class ChatModule {}
