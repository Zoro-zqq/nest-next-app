import { Module, Global } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'

@Global()
@Module({
  imports: [HttpModule],
  exports: [HttpModule],
  providers: []
})
export class GlobalModule {}
