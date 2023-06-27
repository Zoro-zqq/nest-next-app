import { Module } from '@nestjs/common'
import { DocumentService } from './document.service'
import { DocumentController } from './document.controller'
import { OnlyofficeService } from '../onlyoffice/onlyoffice.service'

@Module({
  controllers: [DocumentController],
  providers: [DocumentService, OnlyofficeService]
})
export class DocumentModule {}
