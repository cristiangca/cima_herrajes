import TEXTOS from '../contenido/general/textos/Navbar.json'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>{TEXTOS.mi_catalogo}</h2>
      <div className="links">
        <Link to="/">{TEXTOS.inicio}</Link>
        <Link to="/catalogo">{TEXTOS.catalogo}</Link>
      </div>
    </nav>
  )
}
