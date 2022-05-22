import React from 'react'
import {Box, Typography, Divider, Stack} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'

// component
import ContactComponent from './ContactComponent'

const MessageComponent = () => {
	const dummyUsers = [
		{id:1, userName: "Remo"},
		{id:2, userName: "Maxx"},
		{id:3, userName: "John"},
	]

	return (
		<Box
			backgroundColor = "#36FCB5"
			height = "100vh"
			width = "25vw"
			padding = "10px"
		>	
			<Stack
				direction="row"
				justifyContent="space-between"
			>
				<Typography 
					variant ="h6"
					color ="primary"
				>
					Chat
				</Typography>
				<LogoutIcon />	
			</Stack>
			<Divider />
			{
				dummyUsers.map(
					item => {
						return <ContactComponent key={item.id} item={item} />
					}
				)
			}
		</Box>

	)
}

export default MessageComponent