import CrptoJs from 'crypto-js';
import jwt from 'jsonwebtoken'
import { ResponseModel } from "~/server/Response";
import prisma from '~/server/prismaConnect';
import { UserHelper } from '~/server/helper/UserHelper';

export const SECRET = "secret-key"

export default defineEventHandler(async (event) => {

  const {email, password} = await readBody(event)

  const result = await new UserHelper(prisma)
    .GetUserByEmail(email)
    .then((res) => {
      if(!res)
        return new ResponseModel(401, "Username or Password Incorrect").get()
      const hashedPassword = CrptoJs.MD5(password + res.salt).toString()
      if(hashedPassword != res.password)
        return new ResponseModel(401, "Username or Password Incorrect").get()
      const accessToken = jwt.sign({username: res.name, id: res.id}, SECRET, {expiresIn: "1h"})
      return new ResponseModel(200, "Login Success").setToken(accessToken).get()
    }).catch((err) => {
      return new ResponseModel(500, "Internal Server Error").get()
    })
    
  if(result)
    return result
  else return new ResponseModel(500, "Internal Server Error").get()
})