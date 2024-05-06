import CrptoJs from 'crypto-js';
import { ResponseModel } from "~/server/Response";
import prisma from '~/server/prismaConnect';
import { UserHelper } from '~/server/helper/UserHelper';

export default defineEventHandler(async (event) => {
  const {username, email, password} = await readBody(event)
  
  const salt = Date.now().toString()
  const result = await new UserHelper(prisma)
    .CreateUser({
      email: email,
      name: username,
      salt: salt,
      password: CrptoJs.MD5(password + salt).toString()
    }).then(() => {
      return new ResponseModel(201, "Account Created").get()
    })
    .catch((err) => {
      if(err.message.toString().includes("Unique constraint failed on the constraint"))
        return new ResponseModel(409, "Account already exist").get()
    })
    

  if(result != null)
    return result
  else
    return new ResponseModel(500, "Internal Server Error").get()
})