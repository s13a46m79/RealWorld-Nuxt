import { ResponseModel } from "~/server/Response";
import prisma from '~/server/prismaConnect';
import { UserHelper } from '~/server/helper/UserHelper';
import jwt from 'jsonwebtoken'

export const SECRET = "secret-key"

export default defineEventHandler(async (event) => {
  
  const {user} = await readBody(event)
  
  const accessToken = jwt.sign({username: user.username, email: user.email}, SECRET, {expiresIn: "1h"})
  const result = await new UserHelper(prisma)
    .CreateUser({
      email: user.email,
      username: user.username,
      password: user.password,
      token: accessToken
    }).then((data) => {
      setResponseStatus(event, 201)
      return data
    })
    .catch((err) => {
      if(err.message.toString().includes("Unique constraint failed on the constraint"))
        setResponseStatus(event, 409)
        return new ResponseModel().setErrorMessage("Email already exists").get()
    })

  const data = {
    "user": result
  };

  if(result != null) {
    return new ResponseModel().setData(data).get()
  }
  else {
    setResponseStatus(event, 500)
    return new ResponseModel().setErrorMessage("Internal Server Error").get()
  }
})