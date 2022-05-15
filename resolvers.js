// Dependencies
import {gql, AuthenticationError} from 'apollo-server'
import bcrypt from 'bcryptjs'
import {PrismaClient} from '@prisma/client'

// prisma client
const prisma = new PrismaClient()

// resolvers
const resolvers = {
	Query: {
		
	},
	
	Mutation: {
		// signUp user Mutation
		signupUser: async (_,{userNew}) => {
			// check user input for email
			const user = await prisma.user.findUnique({where:{email:userNew.email}})
			if(user) throw new AuthenticationError("User already exists with that email")

			// hash the password of user input using bcrypt
			const hashedPassword = await bcrypt.hash(userNew.password, 10)
			const newUser = await prisma.user.create({	
				data: {
					...userNew,
					password: hashedPassword
				}
			})
			console.log(newUser)
			return newUser
		}
	}
}

export default resolvers