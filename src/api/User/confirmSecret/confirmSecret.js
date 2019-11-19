import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
    Mutation: {
        confirmSecret: async(_, args) => {
            const { secret, email} = args;
            const user = await prisma.user({email});
            if(user.loginSecret === secret){
                // 시크릿코드가 항상 달라야 하기 때문에 로그인 되면 secret코드를 비워준다.
                await prisma.updateUser({
                    where:{
                        id: user.id
                    },
                    data:{
                        loginSecret: ''
                    }
                });
                // 만약 user.loginSecret가 secret와 같다면 JWT토큰을 return
                return generateToken(user.id);
            }else{
                throw Error("이메일/비밀값의 조합이 잘못되었습니다.");
            }
        }
    }
}