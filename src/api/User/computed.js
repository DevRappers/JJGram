import { prisma } from "../../../generated/prisma-client";

export default {
     // 이렇게 하면 사용가능함 schema에다가 모든 resolver를 하나로 merging하기 때문에
     User: {
        fullName: (parent) => {
            // 기본적으로 parent는 위에있는 resolver임.
            return `${parent.firstName} ${parent.lastName}`
        },
        isFollowing: async(parent, _, {request}) => {
            const { user } = request;
            const { id: parentId } =parent;
            try{
                // 요청한 아이디에 현재아이디로 following했는지 검사함
                return prisma.$exists.user({
                    AND: [
                        {id: user.id},
                        {following_some: {
                            id: parentId
                        }}
                    ]
                })
            }
            catch{
                return false;        
            }
        },
        // 나인가 판별 
        isSelf: (parent, _, {request}) => {
            const { user } = request;
            const { id: parentId } = parent;
            return user.id === parentId;
        }
    }
}