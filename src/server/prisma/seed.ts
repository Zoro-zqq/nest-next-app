const path = require('path')
const { PrismaClient } = require('@prisma/client')
const { createHash } = require('crypto')

const cryptoPassword = (psw: string) => {
  const md5 = createHash('md5')
  md5.update(psw.toString())
  return md5.digest('hex')
}

const prisma = new PrismaClient()
const admin = {
  name: 'admin',
  email: 'admin@mail.com',
  password: `ZorQ${cryptoPassword('admin')}`,
  status: 1,
  role: 0
}
async function main() {
  await prisma.user.create({
    data: admin
  })
}

main()
  .catch(e => {
    console.log(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$connect()
  })
