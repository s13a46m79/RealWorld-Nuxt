// import { ResponseModel } from "~/server/Response"
// import { FeedHelper } from "~/server/helper/ArticleHelper"
// import prisma from "~/server/prismaConnect"

// export default defineEventHandler(async (event) => {

//   const page = getRequestURL(event).searchParams.get('page') || "1"
//   const pageSize = 5

//   const result = await new FeedHelper(prisma)
//     .FeedPage(parseInt(page), pageSize)
//     .catch((error) => {
//       console.log("Feed Page API Error:", error)
//       return new ResponseModel(500, "Internal Server Error").get()
//     })

//   if(result)
//     return new ResponseModel(200, "Success").setData(result).get()
//   else return new ResponseModel(500, "Internal Server Error").get()
// })