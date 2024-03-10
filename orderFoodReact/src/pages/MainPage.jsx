import Home from './Home'
import Menu from './Menu'
import '../styles/mainPage.css'
import NavBar from '../components/NavBar'
import ContactForm from './Contact'
import About from './About'
import Footer from './Footer'

function MainPage() {
  return (
    <div className='main-page'>
    <NavBar/>
      <Home />
      <Menu/>
      <About/>
      <ContactForm/>
      <Footer/>
      
    </div>
  )
}

export default MainPage
