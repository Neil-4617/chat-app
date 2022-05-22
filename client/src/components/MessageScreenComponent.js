import {useParams} from 'react-router-dom'
import {AppBar, Toolbar, Avatar, Typography, TextField} from '@mui/material'
import Box from '@mui/material/Box'

// components
import MessageCardComponent from './MessageCardComponent'

const MessageScreenComponent = () => {
	const {userName} = useParams()
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
		  	<MessageCardComponent text = "Hello there"  date="121212" direction="start"/>
		  	<MessageCardComponent text = "Hi"  date="121212" direction="end"/>
		  	<MessageCardComponent text = "Nice to have in our group"  date="121212" direction="start"/>
		  </Box>
		  <TextField
		  	placeholder = "type your message"
		  	variant = "standard"
		  	fullWidth
		  	multiline
		  	rows = {3}
		  />
		</Box>
	)
}

export default MessageScreenComponent