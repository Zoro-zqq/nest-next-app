import { Module } from '@nestjs/common'
import { CoopService } from './coop.service.ts'
import { CoopController } from './coop.controller.ts'

@Module({
  controllers: [CoopController],
  providers: [CoopService]
})
export class CoopModule {}
