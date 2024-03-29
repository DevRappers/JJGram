import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        editUser: (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { name, email, firstName, lastName, bio, avatar } = args;
            const { user } = request;
            return prisma.updateUser({
                where:{
                    id: user.id
                },
                data:{
                    name,
                    email,
                    firstName,
                    lastName,
                    bio,
                    avatar
                }
            })
        }
    }
}