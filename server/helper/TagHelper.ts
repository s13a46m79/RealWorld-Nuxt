import { PrismaClient, Prisma } from "@prisma/client/extension";

export class TagHelper {
  constructor(private prisma: PrismaClient) {}

  async Tags() {
    const tags = await this.prisma.tag.findMany({
      select: {
        name: true
      }
    })

    const tagsArray: string[] = []

    tags.forEach((tag: string) => {
      tagsArray.push(tag)
    })

    return {tags: tagsArray}
  }
}