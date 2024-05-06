import { PrismaClient, Prisma } from "@prisma/client";

interface Article extends Prisma.ArticleGetPayload<null> {
  tagList: string[] | Prisma.TagGetPayload<null>[]
  favorited: boolean
  favoritesCount: number
}

export class ArticleHelper {
  constructor(private prisma: PrismaClient) {}

  async Articles() {
    const articles = await this.prisma.article.findMany({
      include: {
        author: true,
        tagList: true
      }
    })

    const articlesCount = articles.length
    const newArticles: Article[] = []
    articles.forEach(article => {
      const favoritesCount = article.favoritedByIDs.length
      const favorited = favoritesCount > 0 ? true : false
      const newArticle: Article = {...article, favoritesCount, favorited}
      newArticles.push(newArticle)
    })
    
    return {
      articles: newArticles,
      articlesCount
    }
  }

  async ArticlesByAuthor(author: string) {
    const articles = await this.prisma.article.findMany({
      where: {
        author: {
          username: author
        }
      },
      include: {
        author: true,
        tagList: true
      }
    })

    const articlesCount = articles.length
    const newArticles: Article[] = []
    articles.forEach(article => {
      const favoritesCount = article.favoritedByIDs.length
      const favorited = favoritesCount > 0 ? true : false
      const newArticle: Article = {...article, favoritesCount, favorited}
      newArticles.push(newArticle)
    })
    
    return {
      articles: newArticles,
      articlesCount
    }
  }

  async ArticlesByTag(tag: string) {
    const articles = await this.prisma.article.findMany({
      where: {
        tagList: {
          some: {
            name: tag
          }
        }
      },
      include: {
        author: true,
        tagList: {
          orderBy: {
            name: 'asc'
          },
          select: {
            name: true
          }
        }
      }
    })

    const articlesCount = articles.length
    const newArticles: Article[] = []
    articles.forEach(article => {
      // count
      const favoritesCount = article.favoritedByIDs.length
      const favorited = favoritesCount > 0 ? true : false
      //@ts-ignore
      const newArticle: Article = {...article, favoritesCount, favorited}

      // tags
      const tags: string[] = []
      article.tagList.forEach(tag => tags.push(tag.name))
      console.log(tags)
      
      newArticle.tagList = tags
      newArticles.push(newArticle)
    })
    
    return {
      articles: newArticles,
      articlesCount
    }
  }

  ArticledById(id: string) {
    return this.prisma.article.findUnique({
      where: {
        id: id
      }
    })
  }

  async ArticleBySlug(slug: string) {
    const article = await this.prisma.article.findUnique({
      where: {
        slug: slug
      },
      include: {
        author: true,
        tagList: {
          select: {
            name: true
          }
        }
      }
    })

    const favoritesCount = article?.favoritedByIDs.length
    const favorited = favoritesCount! > 0 ? true : false

    //@ts-ignore
    const newArticle: Article = article

    newArticle.favoritesCount = favoritesCount ?? 0
    newArticle.favorited = favorited

    return {article}
  }

  ArticlePage(page: number, pageSize: number) {
    return this.prisma.article.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        author: true
      }
    })
  }

  async UpdateArticle(slug: string, data: Prisma.ArticleUpdateInput) {
    const article = await this.prisma.article.update({
      where: {
        slug: slug
      },
      data: data,
      include: {
        author: true,
        tagList: {
          select: {
            name: true
          }
        }
      }
    })

    const favoritesCount = article?.favoritedByIDs.length
    const favorited = favoritesCount! > 0 ? true : false

    //@ts-ignore
    const newArticle: Article = article

    newArticle.favoritesCount = favoritesCount ?? 0
    newArticle.favorited = favorited

    return {...newArticle}
  }

  Count() {
    return this.prisma.article.count()
  }

  async CreateArticle(data: Prisma.ArticleCreateInput) {
    const tags = data?.tagList as string[];
    delete data.tagList;
    const article = await this.prisma.article.create({
      include: {
        author: true,
        tagList: true
      },
      data: {
        ...data,
        tagList: {
          connectOrCreate: tags.map(tag => ({
            where: { name: tag },
            create: { name: tag }
          }))
        }
      },
    });

    const favoritesCount = article.favoritedByIDs.length
    const favorited = favoritesCount > 0 ? true : false

    return {
      ...article,
      favoritesCount,
      favorited
    }
  }
}