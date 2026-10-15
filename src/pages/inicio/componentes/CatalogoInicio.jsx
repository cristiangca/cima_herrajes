import Catalogo from '../../Catalogo'

export default function CatalogoInicio() {
  return (
<section id="que-hacemos" className="titulo-seccion" aria-label="Especialidades">
 <span className="kicker">Que hacemos </span>
<h1 className="di">
  Soluciones diseñadas para adaptarse  <br /> a
  cada espacio y necesidad
</h1> <Catalogo interactivo={false} />
</section>
  )
}
