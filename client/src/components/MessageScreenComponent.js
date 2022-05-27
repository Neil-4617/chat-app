import {useState} from 'react'
import {useParams} from 'react-router-dom'
import {useQuery, useMutation, useSubscription} from '@apollo/client'

// graphql
import {GET_MESSAGES} from '../graphql/queries'
import {SEND_MESSAGE} from '../graphql/mutation'
import {MESSAGE_SUB} from '../graphql/subscriptions'
// materialUI
import {AppBar, Toolbar, Avatar, Typography, Stack, TextField} from '@mui/material'
import Box from '@mui/material/Box'
import SendIcon from '@mui/icons-material/Send';

// components
import MessageCardComponent from './MessageCardComponent'

const MessageScreenComponent = () => {

	const {id,userName} = useParams()
	const [text, setText] = useState("")
	const [messages, setMessages] = useState([])

	// get messages
	const {data, loading} = useQuery(GET_MESSAGES, {
		variables: {
			receiverId: +id
		},
		onCompleted(data){
			setMessages(data.messagesByUser)
		}
	})

	// send message
	const [sendMessage] = useMutation(SEND_MESSAGE) 
	// {
	// 	onCompleted(data){
	// 		setMessages((prevMessages)=> [...prevMessages, data.createMessage ])
	// 	}
	// }

	// subscription
	const {data:subscriptionData} = useSubscription(MESSAGE_SUB,{
		onSubscriptionData({subscriptionData:{data}}){
			setMessages((prevMessages)=> [...prevMessages, data.messageAdded])
		}
	})

	return (
 		<Box sx={{ flexGrow: 1 }}>
		  <AppBar position="static">
		    <Toolbar>
		     	<Avatar
					src={`https://ui-avatars.com/api/?name=${userName}&background=random&size=32&bold=true&fromat=svg`}
				/>
				<Typography 
					variant="h6"
					sx={{mx:1}}
				>{userName}</Typography>
		    </Toolbar>
		  </AppBar>
		  <Box
		  	height="70vh" 
		  	sx={{backgroundColor: "#e1f5fe", p:"10px", overflowY:"auto"}}

		  	>
		  	{
		  		loading? <Typography variant="h6">Loading chats...</Typography>
		  		: messages.map(message =>{
		  			return <MessageCardComponent key={message.createdAt} text={message.text}  date={message.createdAt} direction={message.receiverId === +id? "end": "start"}/>
		  		})
		  	}
		  {/*	
		  	<MessageCardComponent text = "Hi"  date="121212" direction="end"/>
		  	<MessageCardComponent text = "Nice to have in our group"  date="121212" direction="start"/>
		  */}
		  </Box>
		  <Stack direction="row">
			  <TextField
			  	placeholder = "type your message"
			  	variant = "standard"
			  	fullWidth
			  	multiline
			  	rows = {3}
			  	value={text}
			  	onChange = {e=>setText(e.target.value)}
			  />
			  <SendIcon 
			  	fontSize="large"
			  	onClick={()=>{
			  		sendMessage({
			  			variables:{
			  				receiverId: +id,
			  				text:text
			  			}
			  		})
			  	}}
			  />
		  </Stack>
		</Box>
	)
}

export default MessageScreenComponent