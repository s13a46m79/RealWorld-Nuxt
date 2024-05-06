import { ResponseModel } from "~/server/Response"
import { TagHelper } from "~/server/helper/TagHelper"
import prisma from "~/server/prismaConnect"

export default defineEventHandler(async (event) => {
  const result = await new TagHelper(prisma)
    .Tags()

  if(result)
    return new ResponseModel().setData(result).get()
  else {
    setResponseStatus(event, 500)
    return new ResponseModel().setErrorMessage("Internal Server Error").get()
  }
})