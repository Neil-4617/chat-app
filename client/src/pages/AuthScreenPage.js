import React, {useState} from 'react'

// materialUI
import { Box, Card, Stack, Typography, TextField, Button, CircularProgress, Alert} from '@mui/material'

// apollo
import {useMutation} from '@apollo/client'

// graphql
import {SIGNUP_USER, LOGIN_USER} from '../graphql/mutation'


const AuthScreenPage = ({setLoggedIn}) => {
	// state
	const [showSignup, setShowSignup] = useState(false)
	const [formData, setFormData] = useState({})
	const [signupUser,{data:signupData,loading:signupLoading,error:signupError}] = useMutation(SIGNUP_USER)
	const [signinUser,{data:signinUserData,loading:signinUserLoading,error:signinUserError}] = useMutation(LOGIN_USER, {
		onCompleted(data){
			localStorage.setItem("jwt", data.signinUser.token)
			setLoggedIn(true)
		}
	})

	// handle event on every textfield
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
	}

	// loading
	if(signupLoading || signinUserLoading){
		return (
			<Box
				display ="flex"
				justifyContent ="center"
				alignItems = "center"
				height = "100vh"
			>
				<Box textAlign="center">
					<CircularProgress/>
					<Typography variant="h6">
						Processing...
					</Typography>
				</Box>
			</Box>
		)
	}

	// handle submit
	const handleSubmit = (e) => {
		e.preventDefault()
		if(showSignup){
			signupUser({
				variables:{
					userNew: formData
				}
			})
		}else {
			signinUser({
				variables:{
					userSignin: formData
				}
			})
		}
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
					{/* Signup*/}
					{signupData && <Alert severity="success">{signupData.signupUser.userName} is successfully registered</Alert>}
					{signupError && <Alert severity="error">{signupError.message}</Alert>}
					
					{/* Login*/}
					{signinUserData && <Alert severity="success">{signinUserData.signinUser.userName} is successfully Login</Alert>}
					{signinUserError && <Alert severity="error">{signinUserError.message}</Alert>}
					<Typography variant="h5">Please {showSignup? "Signup":"Login"} </Typography>
					{
						showSignup && 
							<TextField
								name="userName"
								label="User Name"
								variant="standard"
								onChange={handleChange}
								required
							/>						
					}
					<TextField
						type="email"
						name="email"
						label="Email"
						variant="standard"
						onChange={handleChange}
						required
					/>
					<TextField
						type="password"
						name="password"
						label="Password"
						variant="standard"
						onChange={handleChange}
						required
					/>
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