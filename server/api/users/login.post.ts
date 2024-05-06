import { ResponseModel } from "~/server/Response";
import prisma from '~/server/prismaConnect';
import { UserHelper } from '~/server/helper/UserHelper';


export default defineEventHandler(async (event) => {

  const {user} = await readBody(event)

  const result = await new UserHelper(prisma)
    .GetUserByEmail(user.email)
    .then((res) => {
      if(!res) {
        setResponseStatus(event, 401)
        return new ResponseModel().setErrorMessage("Username or Password Incorrect").get()
      }
      if(user.password != res.password) {
        setResponseStatus(event, 401)
        return new ResponseModel().setErrorMessage("Username or Password Incorrect").get()
      }
      setResponseStatus(event, 200)
      return res
    }).catch((err) => {
      setResponseStatus(event, 500)
      return new ResponseModel().setErrorMessage("Internal Server Error").get()
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