import { PrismaClient, Prisma } from "@prisma/client";

export class UserHelper{
  constructor(private prisma: PrismaClient) {}

  Users() {
    return this.prisma.user.findMany()
  }

  GetUserById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id: id
      }
    })
  }

  GetUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email: email
      }
    })
  }

  CreateUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: data
    })
  }

  DeleteUser(id: string) {
    return this.prisma.user.delete({
      where: {
        id: id
      }
    })
  }

  UpdateUser(email: string, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: {
        email: email
      },
      data: data
    })
  }
}