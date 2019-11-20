import { prisma } from "../../../../generated/prisma-client";

export default {
    Query:{
        me: async(_,__, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;

            // prisma는 연결되어있는 것을 불러오지 못하기 때문에 fragment를 만들어서 불러와줘야 한다.
            // 대신 fragment에 정의한 것만 가져올 수 있음
            // return prisma.user({ id: user.id }).$fragment(USER_FRAGMENT);

            // 이런식으로 graphql에 type을 지정하고 불러오는 방법도 존재함.
            const userProfile = await prisma.user({ id: user.id });
            const posts = await prisma.user({ id: user.id }).posts();
            return {
                user: userProfile,
                posts
            }
        }
    }
}