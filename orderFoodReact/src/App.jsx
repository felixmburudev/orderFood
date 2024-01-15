import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Menu from './pages/Menu'
import Cart from './pages/Cart'
// import Home from './pages/Home'
import MainPage from './pages/MainPage'
import NavBar from './components/NavBar'
import Signup from './pages/Signup'
import Login from './pages/Login'
import UserProfile from './pages/UserProfile'

function App() {

  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path='/' element={<MainPage/>} />
      <Route path='/menu' element={<Menu/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>} />
      <Route path='/Profile' element={<UserProfile/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
