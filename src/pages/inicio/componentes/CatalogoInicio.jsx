import TEXTOS from '../../../contenido/catalogo/textos/CatalogoInicio.json'
import Catalogo from '../../Catalogo'

export default function CatalogoInicio() {
  return (
<section id="que-hacemos" className="titulo-seccion" aria-label={TEXTOS.especialidades}>
 <span className="kicker">{TEXTOS.que_hacemos}</span>
<h1 className="di">{TEXTOS.soluciones_disenadas_para_adaptarse}<br />{TEXTOS.a_cada_espacio_y_necesidad}</h1> <Catalogo interactivo={false} />
</section>
  )
}
