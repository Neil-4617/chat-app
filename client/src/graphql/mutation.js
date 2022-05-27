import {gql} from '@apollo/client'

// Signup
export const SIGNUP_USER = gql`
	mutation SignupUser($userNew: UserInput!) {
	  signupUser(userNew: $userNew) {
	    id
	    userName
	    email
	  }
	}`

export const LOGIN_USER=gql`
	mutation SigninUser($userSignin: UserSigninInput!) {
	  signinUser(userSignin: $userSignin) {
	    token
	  }
}`

export const SEND_MESSAGE=gql`
	mutation CreateMessage($receiverId: Int!, $text: String!) {
	  createMessage(receiverId: $receiverId, text: $text) {
	    id
	    text
	    receiverId
	    senderId
	    createdAt
	  }
}
`