import { Module } from '@nestjs/common'
import { PcService } from './pc.service.ts'
import { NextModule } from '../next/next.module.ts'
import { PcController } from './pc.controller.ts'

@Module({
  imports: [NextModule],
  controllers: [PcController],
  providers: [PcService]
})
export class PcModule {}
