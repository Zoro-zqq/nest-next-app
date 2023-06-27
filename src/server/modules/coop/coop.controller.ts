import { Controller, Get, Post, Body, Patch, Param, Delete, Session } from '@nestjs/common'
import { CoopService } from './coop.service.ts'
import { CreateCoopDto } from './dto/create-coop.dto.ts'

@Controller('api/coop')
export class CoopController {
  constructor(private readonly coopService: CoopService) {}

  @Post('createNewCoop')
  createNewCoop(@Body() createCoopDto: CreateCoopDto) {
    return this.coopService.createNewCoop(createCoopDto)
  }

  @Get('getAllTask')
  getAllTask(@Session() session) {
    return this.coopService.querySelfActiveCoopList(session.userId, null)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coopService.findOne(+id)
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCoopDto: UpdateCoopDto) {
  //   return this.coopService.update(+id, updateCoopDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coopService.remove(+id)
  }
}
