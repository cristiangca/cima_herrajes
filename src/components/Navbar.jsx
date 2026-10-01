import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2> Mi Catálogo</h2>
      <div className="links">
        <Link to="/">Inicio</Link>
        <Link to="/catalogo">Catálogo</Link>
      </div>
    </nav>
  )
}