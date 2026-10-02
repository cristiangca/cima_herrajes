
import { useState } from 'react';
import '../styles/catalogo.css'
import imagen from '../assets/ventana.png'
import imagen2 from '../assets/barandal.png'
import imagen3 from '../assets/baño.png'
const PUERTAS = [
  {
    
    TITULO: "Corredizas",
    slug: "corredizas",
    img: imagen,
},
  
];
const VENTANAS = [
  {
    TITULO: "Corredizas",
    slug: "corredizas",
    img: imagen2,
  },
];
const BARANDILLAS = [
  {
    TITULO: "Barandillas",
    slug: "barandillas",
    img: imagen3,
  },
];

const CATEGORIAS = [
    {
        TITULO: "Puertas",
        slug: "puertas"
    },
    {
        TITULO: "Ventanas",
        slug: "ventanas"
    },
    {
        TITULO: "Barandillas",
        slug: "barandillas"
    }
 ];


 export default function Catalogo() {
     const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('puertas')
     const [productos, setProductos] = useState(PUERTAS)

    return (
    <div className="catalogo-container">
        
        <h1>soluciones diseñadas para adaptarde a casda sitio espacio Y necesidad </h1>
        <div className="catalogo-filtros">
            {CATEGORIAS.map((categoria) => (
                <button 
                     key={categoria.slug}
  className={`catalogo-filtro ${categoriaSeleccionada === categoria.slug ? 'active' : ''}`}
                    onClick={() => {
                        setCategoriaSeleccionada(categoria.slug);
                        if (categoria.slug === 'puertas') {
                            setProductos(PUERTAS);
                        } else if (categoria.slug === 'ventanas') {
                            setProductos(VENTANAS);
                        } else {
                            setProductos(BARANDILLAS);
                        }
                    }}
                >
                    {categoria.TITULO}
                </button>
            ))}
        </div>
        
        <div className="catalogo-grid">
            {productos.map((producto) => (
                <div key={producto.slug} className="catalogo-item">
                    <img src={producto.img} alt={producto.TITULO} />
                    <h2>{producto.TITULO}</h2>
                </div>
            ))}
        </div>
    </div>
)
        }

