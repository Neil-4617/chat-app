import {Box} from '@mui/material'
import {Routes, Route} from 'react-router-dom'
// import ContactComponent from '../components/ContactComponent'
import WelcomeComponent from '../components/WelcomeComponent'
import MessageScreenComponent from '../components/MessageScreenComponent'
import MessageComponent from '../components/MessageComponent'

const AllRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<WelcomeComponent/>} />
			<Route path="/:id/:userName" element ={<MessageScreenComponent/>} />
		</Routes>
	)
}

const HomePage = () => {

	return (
		<Box
			display="flex"
		>
			<MessageComponent/>
			<AllRoutes/>
		</Box>
	)
}

export default HomePage