import { Module, Global } from '@nestjs/common'
import { NextService } from './next.service.ts'
import { NextController } from './next.controller.ts'
import next from 'next'

@Global()
@Module({
  providers: [NextService],
  controllers: [NextController],
  exports: [NextService]
})
export class NextModule {
  constructor(private readonly next: NextService) {}

  public async prepare(options = {}) {
    const app = next(
      Object.assign(
        {
          dev: false,
          dir: process.cwd()
        },
        options
      )
    )
    return app.prepare().then(() => this.next.setApp(app))
  }
}
