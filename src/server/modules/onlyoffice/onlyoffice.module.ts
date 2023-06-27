import { Module } from '@nestjs/common'
import { OnlyofficeService } from './onlyoffice.service'
import { OnlyofficeController } from './onlyoffice.controller'

@Module({
  controllers: [OnlyofficeController],
  providers: [OnlyofficeService]
})
export class OnlyofficeModule {}
