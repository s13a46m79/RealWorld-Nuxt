import { ResponseModel } from "~/server/Response"
import { ArticleHelper } from "~/server/helper/ArticleHelper"
import prisma from "~/server/prismaConnect"

export default defineEventHandler(async (event) => {
  const slug = getRequestURL(event).pathname.split("/").pop()
  
  const { article } = await readBody(event)

  if(!slug || !article.body) {
    setResponseStatus(event, 400)
    return new ResponseModel().setErrorMessage("Bad Request").get()
  }

  const data = {
    body: article.body
  }

  const result = await new ArticleHelper(prisma)
    .UpdateArticle(slug, data)

  const response = {
    article: result
  }

  if(result)
    return new ResponseModel().setData(response).get()
  else {
    setResponseStatus(event, 500)
    return new ResponseModel().setErrorMessage("Internal Server Error").get()
  }
})