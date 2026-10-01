import { Link } from 'react-router-dom'

export default function Adminpanel() {
  return (
    <nav className="navbar">
      <h2> Mi Catálogo</h2>
      <div className="links">
        <Link to="/">Inicio</Link>
        <Link to="/catalogo">Catálogo</Link>
        <Link to="/subir" className="btn-primary">+ Subir Producto</Link>
        <Link to="/login" className="btn-primary">Login</Link>
      </div>
    </nav>
  )
}