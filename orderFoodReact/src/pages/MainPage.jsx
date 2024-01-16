import Home from './Home'
import Menu from './Menu'
import '../styles/mainPage.css'
import NavBar from '../components/NavBar'

function MainPage() {
  return (
    <div className='main-page'>
    <NavBar/>
      <Home />
      <Menu/>
      
    </div>
  )
}

export default MainPage
