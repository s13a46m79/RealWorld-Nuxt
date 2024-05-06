import jwt from 'jsonwebtoken'
import { ResponseModel } from '~/server/Response'

export default defineEventHandler(async (event) => {
  const { token } = await readBody(event)

  if(!token) return new ResponseModel(401, "Unauthorized").get()

  let result = null
  try {
    result = jwt.verify(token, "secret-key")
  } catch(err: any) {
    if(err.message == "jwt expired")
      return new ResponseModel(401, "Login expired").get()
  }

  if(result) {
    return new ResponseModel(200, "Authorized").get()
  } else {
    return new ResponseModel(401, "Unauthorized").get()
  }
  
})