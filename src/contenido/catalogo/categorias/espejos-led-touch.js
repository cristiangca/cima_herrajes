// EDITABLE: nombre, productos e imágenes de espejos-led-touch.
// Conserva id y slug para mantener enlaces, variantes y filtros.
import { imagenesEspejo } from "../variantes/espejos.js"

export default {
  TITULO: "Espejos LED Touch",
  slug: "espejos-led-touch",
  productos: [
    { id: "elt-allegro", TITULO: "Allegro", slug: "allegro", img: imagenesEspejo("allegro")["blanco-calido"], luces: imagenesEspejo("allegro") },
    { id: "elt-halo", TITULO: "Halo", slug: "halo", img: imagenesEspejo("halo")["blanco-calido"], luces: imagenesEspejo("halo") },
    { id: "elt-resplandor", TITULO: "Resplandor", slug: "resplandor", img: imagenesEspejo("resplandor")["blanco-calido"], luces: imagenesEspejo("resplandor") },
    { id: "elt-lumin", TITULO: "Lumin", slug: "lumin", img: imagenesEspejo("lumin")["blanco-calido"], luces: imagenesEspejo("lumin") },
    { id: "elt-allegro-circular", TITULO: "Allegro Circular", slug: "allegro-circular", img: imagenesEspejo("allegro-circular")["blanco-calido"], luces: imagenesEspejo("allegro-circular") },
    { id: "elt-ovalado-halo", TITULO: "Ovalado Halo", slug: "ovalado-halo", img: imagenesEspejo("ovalado-halo")["blanco-calido"], luces: imagenesEspejo("ovalado-halo") },
    { id: "elt-ovalado-resplandor", TITULO: "Ovalado Resplandor", slug: "ovalado-resplandor", img: imagenesEspejo("ovalado-resplandor")["blanco-calido"], luces: imagenesEspejo("ovalado-resplandor") },
    { id: "elt-ovalado-allegro", TITULO: "Ovalado Allegro", slug: "ovalado-allegro", img: imagenesEspejo("ovalado-allegro")["blanco-calido"], luces: imagenesEspejo("ovalado-allegro") },
    { id: "elt-halo-circular", TITULO: "Halo Circular", slug: "halo-circular", img: imagenesEspejo("halo-circular")["blanco-calido"], luces: imagenesEspejo("halo-circular") },
    { id: "elt-resplandor-circular", TITULO: "Resplandor Circular", slug: "resplandor-circular", img: imagenesEspejo("resplandor-circular")["blanco-calido"], luces: imagenesEspejo("resplandor-circular") }
  ]
};
