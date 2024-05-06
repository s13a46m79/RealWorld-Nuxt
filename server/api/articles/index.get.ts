import { ResponseModel } from "~/server/Response"
import { ArticleHelper } from "~/server/helper/ArticleHelper"
import prisma from "~/server/prismaConnect"

export default defineEventHandler(async (event) => {
  const filterAuthor = getRequestURL(event).searchParams.get('author')
  const filterFavorited = getRequestURL(event).searchParams.get('favorited')
  const filterTag = getRequestURL(event).searchParams.get('tag')

  let result
  // normal get all articles
  if(!filterAuthor && !filterFavorited && !filterTag) {
    result = await new ArticleHelper(prisma)
      .Articles()
  }

  // filter by author
  else if(filterAuthor) {
    result = await new ArticleHelper(prisma)
      .ArticlesByAuthor(filterAuthor)
  }

  // filter by tag
  else if(filterTag) {
    result = await new ArticleHelper(prisma)
      .ArticlesByTag(filterTag)
  }

  if(result)
    return new ResponseModel().setData(result).get()
  else {
    setResponseStatus(event, 500)
    return new ResponseModel().setErrorMessage("Internal Server Error").get()
  }
})