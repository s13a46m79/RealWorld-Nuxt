// import { ResponseModel } from "~/server/Response"
// import { FeedHelper } from "~/server/helper/ArticleHelper"
// import prisma from "~/server/prismaConnect"

// export default defineEventHandler(async (event) => {
//   const feedsCount = await new FeedHelper(prisma).Count()
//   if(feedsCount)
//     return new ResponseModel(200, "Success").setData(feedsCount).get()
//   else
//     return new ResponseModel(500, "Internal Server Error").get()
// })