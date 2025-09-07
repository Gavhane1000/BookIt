import LandingComponent from '../components/LandingComponenet'
import Navbar from '../components/NavBar'
import About from '../components/About'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
        <Navbar />
        <About />
        <LandingComponent />
        <Footer />
    </>
  )
}

export default Home
