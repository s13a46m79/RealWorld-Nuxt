// import prisma from "~/server/prismaConnect"
// import { ResponseModel } from "~/server/Response"
// import { FeedLikeHelper } from "~/server/helper/FeedLikeHelper"
// import { jwtDecode } from "jwt-decode"
// import count from "../count"

// export default defineEventHandler(async (event) => {

//   const feedId = event.context.params?.id
//   if(feedId === undefined)
//     return new ResponseModel(400, "Bad Request").get()

//   const token = event.headers.get("authorization")
//   if(!token)
//     return new ResponseModel(401, "Unauthorized").get()

//   const decoded: { id: string } = jwtDecode(token)

//   const result = await new FeedLikeHelper(prisma)
//     .CountLike(feedId)
//     .catch((error) => {
//       console.log("Feed Like API Error:", error.message)
//       return new ResponseModel(500, "Internal Server Error").get()
//     })

//   const isLike = await new FeedLikeHelper(prisma)
//     .GetLike(feedId, decoded.id)
//     .then((res) => {
//       if(res?.value)
//         return true
//     })
//     .catch((error) => {
//       console.log("Feed Like API Error:", error.message)
//       return new ResponseModel(500, "Internal Server Error").get()
//     })

//   const responseData = {
//     count: result,
//     isLike: isLike
//   }

//   if (result != undefined) {
//     return new ResponseModel(200, "Success").setData(responseData).get()
//   } else {
//     return new ResponseModel(500, "Internal Server Error").get()
//   }
// })