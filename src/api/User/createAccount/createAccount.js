import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		createAccount: async (_, args) => {
			const { name, email, firstName = '', lastName = '', bio = '' } = args;
			const exists = await prisma.$exists.user({
				OR: [
					{
						username
					},
					{ email }
				]
			});
			if (exists) {
				throw Error('이미 존재하는 이름/이메일 입니다.');
			}
			await prisma.createUser({
				name,
				email,
				firstName,
				lastName,
				bio
			});
			return true;
		}
	}
};
