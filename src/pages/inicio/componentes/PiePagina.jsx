import { logo } from '../../../contenido/inicio'

export default function PiePagina() {
  return (
<footer className="landing-footer">
 <img src={logo} alt="Cima Herrajes" />
 <p>© {new Date().getFullYear()} Cima Herrajes. Todos los derechos reservados.</p>
 </footer>
  )
}
