import {Box} from '@mui/material'
import MessageComponent from '../components/MessageComponent'
import {Route, Routes} from 'react-router-dom'
import DashboardComponent from '../components/DashboardComponent'
import MessageScreenComponent from '../components/MessageScreenComponent'

const AllRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={DashboardComponent}/>
			<Route path="/:id/:name" element ={MessageScreenComponent}/>
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