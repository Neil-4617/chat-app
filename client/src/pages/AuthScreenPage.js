import React, {useState} from 'react'

// materialUI
import { Box, Card, Stack, Typography, TextField, Button} from '@mui/material'

const AuthScreenPage = () => {
	// state
	const [showSignup, setShowSignup] = useState(true)
	const [formData, setFormData] = useState({})
	
	// handle event on every textfield
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
	}

	// handle submit
	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(formData)
	}

	return(
		<Box 
			component="form" 
			onSubmit={handleSubmit}
			display="flex"
			justifyContent="center"
			alignItems="center"
			height="80vh"
		>
			<Card
				variant = "outlined"
				sx={{padding:"10px"}}
			>
				<Stack
					direction ="column"
					spacing={2}
					sx={{width:"400px"}} 
				>
					<Typography variant="h5">Please {showSignup? "Signup":"Login"} </Typography>
					{
						showSignup && 
							<TextField
								name="userName"
								label="User Name"
								variant="standard"
								onChange={handleChange}
							/>						
					}
					<TextField
						type="email"
						name="email"
						label="Email"
						variant="standard"
						onChange={handleChange}
					/>
					<TextField
						type="password"
						name="password"
						label="Password"
						variant="standard"
						onChange={handleChange}
					/>
					{
						showSignup &&
						<TextField
							type="password"
							name="confirmPassword"
							label="Confirm Password"
							variant="standard"
							onChange={handleChange}
						/>
					}
					
					<Typography 
						variant="subtitle2"
						color="textSecondary"
						onClick = {() => {
							setShowSignup(!showSignup)
							}
						}
					>{showSignup? "Sign in": "Create account"}
					</Typography>
					<Button variant="outlined" type="submit">{showSignup? "Signup":"Login"}</Button>	
				</Stack>
			</Card>
		</Box>
	)
}

export default AuthScreenPage