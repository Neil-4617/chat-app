import {gql} from '@apollo/client'

// Signup
export const GET_ALL_USER = gql`
	query Query {
	  users {
	    id
	    userName
	    email
	  }
	}
`
export const GET_MESSAGES = gql`
	query MessagesByUser($receiverId: Int!) {
	  messagesByUser(receiverId: $receiverId) {
	    id
	    text
	    receiverId
	    senderId
	    createdAt
	  }  
}
`

