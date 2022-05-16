// Dependencies
import {AuthenticationError, ForbiddenError} from 'apollo-server'
import bcrypt from 'bcryptjs'
import {PrismaClient} from '@prisma/client'
import jwt from 'jsonwebtoken'

// prisma client
const prisma = new PrismaClient()

// resolvers
const resolvers = {
	Query: {
		// users query
		users: async(_,args,{userId})=> {
			// check if user id logged in
			if(!userId) throw new ForbiddenError("You must be logged in")
			
			// // get all users in database except for the users logged in and reorder
			const users = await prisma.user.findMany({
				orderBy:{createdAt:"desc"},
				where:{id: {not: userId}}
			})
			return users
		},
		// messagesByUser query
		messagesByUser: async (_,{receiverId},{userId}) => {
			if(!userId) throw new ForbiddenError("You must be logged in")
			const messages = await prisma.message.findMany({
				where:{
					OR:[
						{senderId: userId, receiverId:receiverId},
						{senderId: receiverId, receiverId:userId}
					]
				},
				orderBy:{
					createdAt: "asc"
				}
			})
			return messages
		}
	},
	
	Mutation: {
		// signupUser Mutation
		signupUser: async (_,{userNew}) => {
			// check user input for email if already in database
			const user = await prisma.user.findUnique({where:{email:userNew.email}})
			if(user) throw new AuthenticationError("User already exists with that email")

			// hash the password of user input using bcrypt and add salt (10)
			const hashedPassword = await bcrypt.hash(userNew.password, 10)
			const newUser = await prisma.user.create({	
				data: {
					...userNew,
					password: hashedPassword
				}
			})
			return newUser
		},

		// signinUser Mutation
		signinUser: async (_, {userSignin}) => {
			// check user input for email and error if does not exist in Database
			const user = await prisma.user.findUnique({where:{email:userSignin.email}})
			if(!user) throw new AuthenticationError("User doesn't exist with that email")
			
			// check password
			const doMatch= await bcrypt.compare(userSignin.password, user.password)
			if(!doMatch) throw new AuthenticationError("Email or password is invalid")
			const token = await jwt.sign({userId:user.id},process.env.JWT_SECRET)
			return {token}
		},

		// createMessage Mutation
		createMessage: async(_,{receiverId, text},{userId}) => {
			if(!userId) throw new ForbiddenError("You must be logged in")
			const message = await prisma.message.create({
				data: {
					text: text,
					receiverId: receiverId,
					senderId: userId
				}
			})
			return message
		}
	}
}

export default resolvers