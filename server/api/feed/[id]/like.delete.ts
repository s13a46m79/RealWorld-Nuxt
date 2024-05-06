// import { ResponseModel } from "~/server/Response"
// import { FeedLikeHelper } from "~/server/helper/FeedLikeHelper"
// import prisma from "~/server/prismaConnect"

// export default defineEventHandler(async (event) => {
//   const {feedId, userId} = await readBody(event)
//   if(feedId === undefined || userId === undefined)
//     return new ResponseModel(400, "Bad Request").get()

//   const result = await new FeedLikeHelper(prisma)
//     .DeleteLike(feedId, userId)
//     .catch((error) => {
//       console.log("Feed Like API Error:", error)
//       return new ResponseModel(500, "Internal Server Error").get()
//     })

//   if(result)
//     return new ResponseModel(200, "Success").setData(result).get()
//   else return new ResponseModel(500, "Internal Server Error").get()
// })