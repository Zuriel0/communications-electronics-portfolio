import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Concurrencia from "./pages/projects/Concurrencia.jsx"
import Metodologia from "./pages/projects/Metodologia.jsx"
import ScrollToTop from "./components/utils/ScrollToTop.jsx"

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/concurrencia" element={<Concurrencia />} />
        <Route path="/projects/metodologia" element={<Metodologia />} />
      </Routes>
    </>
  )
}

export default App