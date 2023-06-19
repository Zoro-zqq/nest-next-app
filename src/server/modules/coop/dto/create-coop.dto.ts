import { IsNotEmpty } from 'class-validator'
export class CreateCoopDto {
  @IsNotEmpty()
  CoopType: string
  @IsNotEmpty()
  CoopName: string

  WorkNode: string
  Descript: string
  master: string
  CreateUserID: string
}
