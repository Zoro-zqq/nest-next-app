import { DocumentService } from './document.service'
import { Controller, Post, Body } from '@nestjs/common'
import { DocumentForceSaveDto } from './dto/document.dto'
import { NoAuth } from '../../decorator/customize'

@Controller('api/document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}
  @NoAuth()
  @Post('forceSave')
  async forceSave(@Body() body: DocumentForceSaveDto): Promise<any> {
    return await this.documentService.forceSave(body)
  }
}
