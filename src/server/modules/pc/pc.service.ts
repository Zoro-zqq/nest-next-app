import { Injectable } from '@nestjs/common'

@Injectable()
export class PcService {
  findOne(id: number) {
    return `This action returns a #${id} pc`
  }
}
