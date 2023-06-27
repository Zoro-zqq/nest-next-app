import { Injectable, BadRequestException } from '@nestjs/common'
import { CreateCoopDto } from './dto/create-coop.dto.ts'
import { PrismaService } from '../prisma/prisma.service.ts'

@Injectable()
export class CoopService {
  constructor(private readonly prismaService: PrismaService) {}
  async createNewCoop(createCoopDto: CreateCoopDto) {
    try {
      let { master, CoopName, ...coopInfo } = createCoopDto
      let insertData = Object.assign(coopInfo, {
        Name: CoopName,
        CurBAID: 'B001',
        CreateDt: new Date(),
        LastUpdateDt: new Date(),
        CoopStatus: 'Runing',
        Descript: createCoopDto.Descript || ''
      })
      const res = await this.prismaService.$transaction(async tran => {
        const currentData = await this.prismaService.fx_coop.create({
          data: insertData
        })
        //把唯一的主办人添加进入fx_coopuser
        await this.AddCurCoopUserRole(
          {
            CoopID: currentData.CoopID,
            UserID: master,
            role: 'master'
          },
          tran
        )
        //刷新所有任务
        const allTaskData = await this.querySelfActiveCoopList(master, tran)
        return {
          currentData,
          allTaskData
        }
      })
      return res
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async querySelfActiveCoopList(UserID, tran: any) {
    if (!UserID) {
      throw new BadRequestException('缺少参数')
    }
    try {
      async function callback(t) {
        const coopList = await t.fx_coopuser.findMany({
          where: {
            UserID
          },
          include: {
            CoopInfo: true
          }
        })
        return coopList
      }
      if (!tran) {
        return await this.prismaService.$transaction(async $tran => {
          return callback($tran)
        })
      } else {
        return callback(tran)
      }
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async AddCurCoopUserRole({ CoopID, UserID, role }, tran) {
    try {
      //检查聊天是否存在
      const userRoles = await tran.fx_coopuser.findFirst({
        where: {
          CoopID,
          UserID
        },
        select: {
          WorkRoles: true,
          ID: true
        }
      })
      const roles = userRoles
        ? Array.from(new Set(userRoles.WorkRoles.split(',')))
            .concat(role)
            .join(',')
        : role
      //开始更新或者插入表
      if (userRoles) {
        return await tran.fx_coopuser.update({
          where: {
            ID: userRoles.ID
          },
          data: {
            WorkRoles: roles
          }
        })
      } else {
        return await tran.fx_coopuser.create({
          data: {
            CoopID,
            UserID,
            WorkRoles: roles
          }
        })
      }
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  findAll() {
    return `This action returns all coop`
  }

  findOne(id: number) {
    return `This action returns a #${id} coop`
  }

  remove(id: number) {
    return `This action removes a #${id} coop`
  }
}
