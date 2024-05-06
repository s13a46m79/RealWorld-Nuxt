import { set } from "@vueuse/core"
import { ResponseModel } from "~/server/Response"
import { ArticleHelper } from "~/server/helper/ArticleHelper"
import prisma from "~/server/prismaConnect"

export default defineEventHandler(async (event) => {
  const slug = getRequestURL(event).pathname.split("/").pop()
  
  if(!slug) {
    setResponseStatus(event, 400)
    return new ResponseModel().setErrorMessage("Bad Request").get()
  }

  const result = await new ArticleHelper(prisma)
    .ArticleBySlug(slug)

  if(result)
    return new ResponseModel().setData(result).get()
  else {
    setResponseStatus(event, 500)
    return new ResponseModel().setErrorMessage("Internal Server Error").get()
  }
})