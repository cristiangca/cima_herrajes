import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/home/Home.jsx'
import Catalogo from './pages/Catalogo.jsx'
import SubirProducto from './pages/SubirProducto.jsx'
import Adminpanel from './pages/Adminpanel.jsx'
import Login from './pages/Login.jsx'
export default function App() {
  const admin = true
  return (
    <>
    
      
     { admin === true ? <Adminpanel /> : <></> }
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/subir" element={<SubirProducto />} />
        </Routes>
      </main>
    </>
  )
}