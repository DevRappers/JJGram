import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation:{
        upload: async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { caption, files } = args;
            const post = await prisma.createPost(
                {
                    caption,
                    user: {
                        connect:{
                            id: user.id
                        }
                    }
                }
            );
            // file목록을 만들어줌 
            files.forEach(async file => {
                await prisma.createFile({
                    url: file,
                    post: {
                        connect:{
                            id: post.id
                        }
                    }
                })
            });
            return post;
        }
    }
}