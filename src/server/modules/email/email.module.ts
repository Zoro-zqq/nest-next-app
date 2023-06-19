import { Module, Global } from '@nestjs/common'
import { EmailService } from './email.service.ts'

@Global()
@Module({
  imports: [],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}
