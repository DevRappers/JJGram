import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        toggleLike: async(_, args, {request}) => {
            // request.user가 없다면 function이 끝남
            isAuthenticated(request);

            const { postId } = args;
            const { user } = request;
            const filterOptions = {
                AND: [
                    {
                        user:{
                        id: user.id
                        },
                    },
                    {
                        post: {
                            id: postId
                        }
                    }
                ]
            };

            try{
                // toggleLike이기 때문에 현재 like되어있는지 확인함
                const existingLike = await prisma.$exists.like(filterOptions);
                if(existingLike){
                    await prisma.deleteManyLikes(filterOptions);
                }
                else{
                    await prisma.createLike({
                        user:{
                            // connect는 post에 좋아요를 누르면 user.id와 연결시켜준다 그 id가 좋아요를 누르는 것이기 때문에
                            connect: {
                                id: user.id
                            }
                        },
                        post: {
                            // 해당하는 postId에 만들어줌
                            connect: {
                                id: postId
                            }
                        }
                        
                    })
                }
                return true;
            }
            catch{
                return false;
            }
        }
    }
}