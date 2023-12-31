import { HttpService } from '@nestjs/axios'
import { AxiosResponse } from 'axios'
import { createWriteStream, WriteStream } from 'fs'
import { join } from 'path'
import { Injectable, HttpStatus, HttpException } from '@nestjs/common'
import { ONLYOFFICE_COMMAND_URL } from '../../../shared/constants/env'

import { OnlyofficeCallbackDto, OnlyofficeForceSaveDto } from './dto/onlyoffice.dto'
import { OnlyofficeCallback, OnlyofficeForceSave } from './entity/onlyoffice.entity'
import { IOnlyofficeCommand, IOnlyofficeForceSave } from './onlyoffice.interface'

@Injectable()
export class OnlyofficeService {
  constructor(private readonly request: HttpService) {}

  async callback(body) {
    const { url, status } = body
    // 正在编辑文档但保存了当前文档状态
    if (status === 6) {
      try {
        // 根据地址下载文档文件
        const file: AxiosResponse = await this.request.axiosRef.get(url, {
          responseType: 'stream'
        })
        const stream: WriteStream = createWriteStream(
          join(__dirname, '../../../../public/assets/word', body.key)
        )
        file.data.pipe(stream)
      } catch (error) {
        // 返回 Onlyoffice 服务认识的报错
        throw new HttpException({ error: 7 }, HttpStatus.OK)
      }
    } else if (status === 7) {
      // 强制保存文档出错
      throw new HttpException({ error: status }, HttpStatus.OK)
    }
    // 默认返回成功的状态
    throw new HttpException({ error: 0 }, HttpStatus.OK)
  }

  // 强制保存文档
  async forceSave(body: OnlyofficeForceSaveDto): Promise<OnlyofficeForceSave> {
    const { key, userdata, useJwtEncrypt } = body

    const newBody: IOnlyofficeForceSave = {
      c: 'forcesave',
      key,
      userdata
    }

    // 如果是使用了 JWT 加密，重新组装请求参数
    // if (useJwtEncrypt === 'y') {
    //   newBody = {
    //     token: this.jwt.sign(newBody, {
    //       secret: this.config.get('onlyoffice.secret'),
    //     }),
    //   };
    // }

    const saveState: IOnlyofficeCommand = await this.request.axiosRef
      .post(ONLYOFFICE_COMMAND_URL, newBody)
      .then(res => res.data)

    // 组装返回值
    const data: OnlyofficeForceSave = {
      error: saveState.error,
      code: 602
    }

    // 保存成功
    if (saveState.error === 0) {
      data.code = 0
    } else if (saveState.error === 4) {
      // 文档未改变无需保存
      data.message = '文档未改变无需保存'
    } else {
      // 文档保存失败
      data.message = '文档保存失败'
    }
    return data
  }
}
