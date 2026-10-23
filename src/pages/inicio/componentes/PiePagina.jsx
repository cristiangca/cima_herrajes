import TEXTOS from '../../../contenido/general/textos/PiePagina.json'
import { logo } from "../../../contenido/inicio/secciones.js"

export default function PiePagina() {
  return (
<footer className="landing-footer">
 <img src={logo} alt={TEXTOS.cima_herrajes} />
 <p>{TEXTOS.texto}{new Date().getFullYear()}{TEXTOS.cima_herrajes_todos_los_derechos_reservados}</p>
 </footer>
  )
}
