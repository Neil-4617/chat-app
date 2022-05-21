import {Avatar, Stack, Typography} from '@mui/material'
import {useNavigate} from 'react-router-dom'

const ContactComponent = ({item:{id, userName}}) => {
	const navigate = useNavigate() 
	return (
		<Stack
			className = "userContact"
			direction = "row"
			spacing = {2}
			sx={{py:1, px:3}}
			onClick = {() => navigate(`/${id}/${userName}`)}
		>
			<Avatar
				 src={`https://ui-avatars.com/api/?name=${userName}&background=random&size=32&bold=true&fromat=svg`}
			/>
			<Typography
				variant = "subtitle2"
			>{userName}</Typography>
		</Stack>
	)

}

export default ContactComponent