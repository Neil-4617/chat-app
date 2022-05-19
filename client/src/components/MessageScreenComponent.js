import {useParams} from 'react-router-dom'
import {Typography} from '@mui/material'

const MessageScreenComponent = () => {
	const {id, userName} = useParams()
	return (
		<Typography>{id} {userName} </Typography>
	)
}

export default MessageScreenComponent