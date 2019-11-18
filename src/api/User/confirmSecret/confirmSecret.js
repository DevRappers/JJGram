import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
    Mutation: {
        confirmSecret: async(_, args) => {
            const { secret, email} = args;
            const user = await prisma.user({email});
            if(user.loginSecret === secret){
                // 만약 user.loginSecret가 secret와 같다면 JWT토큰을 return
                return generateToken(user.id);
            }else{
                throw Error("이메일/비밀값의 조합이 잘못되었습니다.");
            }
        }
    }
}