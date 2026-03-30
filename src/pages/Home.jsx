import Navbar from '../components/layout/navbar.jsx'
import Hero from '../components/sections/hero.jsx'
import About from '../components/sections/about.jsx'
import Skills from '../components/sections/skills.jsx'
import Projects from '../components/sections/projects.jsx'
import TimelineSection from '../components/sections/TimelineSection.jsx'
import Contact from '../components/sections/contac.jsx'

function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <TimelineSection />
            <Contact />
        </>
    )
}

export default Home