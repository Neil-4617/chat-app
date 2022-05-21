import {useParams} from 'react-router-dom'
import {AppBar, Toolbar, Avatar, Typography, TextField} from '@mui/material'
import Box from '@mui/material/Box'

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
		  	height="80vh" 
		  	sx={{backgroundColor: '#e1f5fe'}}>
		  	hi
		  </Box>
		  <TextField
		  	placeholder = "type your message"
		  />
		</Box>
	)
}

export default MessageScreenComponent