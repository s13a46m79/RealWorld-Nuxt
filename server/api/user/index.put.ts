import { ResponseModel } from "~/server/Response"
import { jwtDecode } from "jwt-decode"
import { UserHelper } from "~/server/helper/UserHelper"
import prisma from "~/server/prismaConnect"

export default defineEventHandler(async (event) => {
  const { user } = await readBody(event)
  const token = event.headers.get("Authorization")?.substring(6)

  if(!token) {
    setResponseStatus(event, 401)
    return new ResponseModel().setErrorMessage("Unauthorized").get()
  }

  const decoded: {email: string} = jwtDecode(token)

  const result = await new UserHelper(prisma)
    .UpdateUser(decoded.email, {email: user.email})
    .then((res) => {
      if(!res) {
        setResponseStatus(event, 401)
        return new ResponseModel().setErrorMessage("User Not Found").get()
      }
      setResponseStatus(event, 200)
      return res
    })

  const data = {
    user: result
  }

  if(result)
    return new ResponseModel().setData(data).get()
  else {
    setResponseStatus(event, 500)
    return new ResponseModel().setErrorMessage("Internal Server Error").get()
  }

})