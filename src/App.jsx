import { lazy } from 'react'
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import ProjectRoute from './components/layout/ProjectRoute.jsx'
import ScrollToTop from "./components/utils/ScrollToTop.jsx"
import PageMetadata from './components/utils/PageMetadata.jsx'

const Concurrencia = lazy(() => import('./pages/projects/Concurrencia.jsx'))
const Metodologia = lazy(() => import('./pages/projects/Metodologia.jsx'))

function App() {
  return (
    <>
      <PageMetadata />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/concurrencia" element={<ProjectRoute><Concurrencia /></ProjectRoute>} />
        <Route path="/projects/metodologia" element={<ProjectRoute><Metodologia /></ProjectRoute>} />
      </Routes>
    </>
  )
}

export default App
