import { Injectable, HttpStatus, HttpException } from '@nestjs/common'
import { OnlyofficeService } from '../onlyoffice/onlyoffice.service'
import { DocumentForceSaveDto } from './dto/document.dto'
import { DocumentForceSave } from './entity/document.entity'

@Injectable()
export class DocumentService {
  constructor(private onlyofficeService: OnlyofficeService) {}

  async forceSave(body: DocumentForceSaveDto): Promise<DocumentForceSave> {
    // 1、保存业务数据
    // 2、调用 Onlyoffice 的强制保存，实际业务中可能还有更多的业务操作，可根据实际情况删改
    const { id: userdata, key, useJwtEncrypt } = body
    const data = await this.onlyofficeService.forceSave({
      key,
      // 将业务参数传给 Onlyoffice 服务，当回调里面存在多个请求时，标识符将有助于区分特定请求
      userdata,
      useJwtEncrypt
    })
    // 保存成功
    if (data.error === 0) {
      return null
    }
    throw new HttpException(data, HttpStatus.OK)
  }
}
