import Navbar from '../components/layout/navbar.jsx'
import Hero from '../components/sections/HeroVariant.jsx'
import About from '../components/sections/about.jsx'
import Skills from '../components/sections/skills.jsx'
import Projects from '../components/sections/projects.jsx'
import TimelineSection from '../components/sections/TimelineSection.jsx'
import Contact from '../components/sections/contac.jsx'
import Credentials from '../components/sections/Credentials.jsx'

function Home() {
    return (
        <>
            <Navbar />
            <main id="main-content" tabIndex={-1} >
            <Hero />
            <About />
            <Projects />
            <Skills />
            <TimelineSection />
            <Credentials />
            <Contact />
            </main>
        </>
    )
}

export default Home
