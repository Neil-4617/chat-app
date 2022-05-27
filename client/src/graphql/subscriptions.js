import {gql} from '@apollo/client'

export const MESSAGE_SUB = gql`
	subscription Subscription {
	  messageAdded {
	    id
	    text
	    receiverId
	    senderId
	    createdAt
	  }
	}
`