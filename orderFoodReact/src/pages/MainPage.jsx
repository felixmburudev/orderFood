import Home from './Home'
import Menu from './Menu'
import '../styles/mainPage.css'
import NavBar from '../components/NavBar'
import ContactForm from './Contact'
import About from './About'

function MainPage() {
  return (
    <div className='main-page'>
    <NavBar/>
      <Home />
      <Menu/>
      <About/>
      {/* <ContactForm/> */}
      
    </div>
  )
}

export default MainPage
