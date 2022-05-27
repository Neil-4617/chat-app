import React from 'react'
import {useQuery} from '@apollo/client'

// materialUI
import {Box, Typography, Divider, Stack} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'

// graphql
import {GET_ALL_USER} from '../graphql/queries'

// component
import ContactComponent from './ContactComponent'

const MessageComponent = ({setLoggedIn}) => {
	const {data, loading, error} = useQuery(GET_ALL_USER)

	if(loading) return <Typography variant="h6"> Loading chats...</Typography>

	if(error){
		console.log(error.message)
	}

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
				<LogoutIcon
					onClick = {() => {
						localStorage.removeItem('jwt')
						setLoggedIn(false)
						}
					} 
				/>	
			</Stack>
			<Divider />
			{
				data.users.map(
					item => {
						return <ContactComponent key={item.id} item={item} />
					}
				)
			}
		</Box>

	)
}

export default MessageComponent