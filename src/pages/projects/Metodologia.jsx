import ProjectMessages from '../../i18n/ProjectMessages';
import Navbar from "../../components/layout/navbar_project.jsx";
import IntroduceMetodologia from "../../components/sections/introduce_metodologia.jsx";

function Metodologia() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} ><ProjectMessages><IntroduceMetodologia /></ProjectMessages></main>
    </>
  );
}

export default Metodologia;
