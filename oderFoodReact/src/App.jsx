import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Menu from './pages/Menu'
import Cart from './pages/Cart'
import Home from './pages/Home'
import ActionTypes from './context/actionTypes'
import MainPage from './pages/MainPage'
import NavBar from './components/NavBar'

function App() {

  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path='/' element={<MainPage/>} />
      <Route path='/menu' element={<Menu/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/ch' element={<ActionTypes/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
