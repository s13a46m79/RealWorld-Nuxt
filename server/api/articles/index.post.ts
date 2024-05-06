import prisma from "~/server/prismaConnect"
import { ArticleHelper } from "~/server/helper/ArticleHelper"
import { jwtDecode } from "jwt-decode"
import { ResponseModel } from "~/server/Response"
import { UserHelper } from "~/server/helper/UserHelper"

export default defineEventHandler(async (event) => {
  const { article } = await readBody(event)

  const token = event.headers.get("Authorization")?.substring(6)
  if(!token) {
    setResponseStatus(event, 401)
    return new ResponseModel().setErrorMessage("Unauthorized").get()
  }
  const decoded: {email: string} = jwtDecode(token)

  const user = await new UserHelper(prisma)
    .GetUserByEmail(decoded.email)

  const slug = article.title.replaceAll(" ", "-").toLowerCase()
  article.slug = slug
  
  article.author = {
    connect: {
      id: user?.id
    }
  }

  const result = await new ArticleHelper(prisma)
    .CreateArticle(article)
    .catch(err => {
      setResponseStatus(event, 500)
      return null
    })

  const data = {
    article: result
  }

  if(result)
    return new ResponseModel().setData(data).get()
  else {
    setResponseStatus(event, 500)
    return new ResponseModel().setErrorMessage("Internal Server Error").get()
  }
})