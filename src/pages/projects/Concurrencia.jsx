import ProjectMessages from '../../i18n/ProjectMessages';
import Navbar from "../../components/layout/navbar_project.jsx"
import Introduce from "../../components/sections/introduce.jsx"


function ProjectDetail() {

  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} ><ProjectMessages><Introduce /></ProjectMessages></main>



    </>
  )
}

export default ProjectDetail
