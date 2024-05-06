import { PrismaClient } from "@prisma/client"

export class FeedLikeHelper{
  constructor(private prisma: PrismaClient) {}

  CountLike(FeedId: string) {
    return this.prisma.feedLike.count({
      where: {
        feedId: FeedId,
        value: true
      }
    })
  }

  GetLike(FeedId: string, UserId: string) {
    return this.prisma.feedLike.findFirst({
      where: {
        feedId: FeedId,
        userId: UserId
      }
    })
  }

  AddLike(FeedId: string, UserId: string) {
    return this.prisma.feedLike.upsert({
      where: {
        userId_feedId: {
          feedId: FeedId,
          userId: UserId
        }
      },
      update: {
        value: true
      },
      create: {
        feedId: FeedId,
        userId: UserId,
        value: true
      }
    })
  }

  DeleteLike(FeedId:string, UserId: string) {
    return this.prisma.feedLike.update({
      where: {
        userId_feedId: {
          feedId: FeedId,
          userId: UserId
        }
      },
      data: {
        value: false
      }
    })
  }
}