import {useState} from 'react'
// style
import './App.css'
// Pages
import AuthScreenPage from './pages/AuthScreenPage'
import HomePage from './pages/HomePage'


const App =()=> {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('jwt')?true:false)

  return (
    <>
    {loggedIn?<HomePage setLoggedIn={setLoggedIn}/>:<AuthScreenPage setLoggedIn={setLoggedIn}/>}
    </>
  )
}
export default App