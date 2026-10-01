import { useEffect, useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  FiSearch, FiPlus, FiTrash2, FiEdit2, FiBox,
  FiGrid, FiTag, FiX, FiFileText, FiArrowRight
} from 'react-icons/fi'
import '../styles/catalogo.css'

const TODAS = 'Todas'

export default function Catalogo() {
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()

  const [productos, setProductos] = useState([])
  const [busqueda, setBusqueda] = useState(params.get('q') || '')
  const [categoriaActiva, setCategoriaActiva] = useState(params.get('cat') || TODAS)
  const [confirmarId, setConfirmarId] = useState(null)

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('productos')) || []
    setProductos(data)
  }, [])

  useEffect(() => {
    const next = {}
    if (busqueda.trim()) next.q = busqueda.trim()
    if (categoriaActiva !== TODAS) next.cat = categoriaActiva
    setParams(next, { replace: true })
  }, [busqueda, categoriaActiva, setParams])

  const categorias = useMemo(() => {
    const set = new Set(productos.map(p => p.categoria).filter(Boolean))
    return [TODAS, ...Array.from(set)]
  }, [productos])

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase()
    return productos.filter(p => {
      const coincideCat = categoriaActiva === TODAS || p.categoria === categoriaActiva
      const coincideBusqueda = !q ||
        p.nombre?.toLowerCase().includes(q) ||
        p.descripcion?.toLowerCase().includes(q)
      return coincideCat && coincideBusqueda
    })
  }, [productos, busqueda, categoriaActiva])

  const eliminar = (id) => {
    const nuevos = productos.filter(p => p.id !== id)
    setProductos(nuevos)
    localStorage.setItem('productos', JSON.stringify(nuevos))
    setConfirmarId(null)
  }

  const limpiarFiltros = () => {
    setBusqueda('')
    setCategoriaActiva(TODAS)
  }

  const hayFiltros = busqueda.trim() !== '' || categoriaActiva !== TODAS

  return (
    <div className="cat-page">

      {/* Topbar */}
      <header className="cat-topbar">
        <div className="cat-title">
          <h1>Catálogo</h1>
          <span className="cat-count">
            {productos.length} {productos.length === 1 ? 'producto' : 'productos'}
          </span>
        </div>
        <button
          className="cat-new"
          onClick={() => navigate('/subir')}
        >
          <FiPlus size={18} /> Nuevo
        </button>
      </header>

      {/* Buscador */}
      <div className="cat-search-wrap">
        <div className="cat-search">
          <FiSearch size={18} />
          <input
            type="text"
            placeholder="Buscar por nombre o descripción..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          {busqueda && (
            <button
              type="button"
              className="cat-search-clear"
              onClick={() => setBusqueda('')}
              aria-label="Limpiar"
            >
              <FiX size={16} />
            </button>
          )}
        </div>

        {/* Chips de categorías */}
        {categorias.length > 1 && (
          <div className="cat-chips">
            {categorias.map(c => (
              <button
                key={c}
                type="button"
                className={`chip ${categoriaActiva === c ? 'active' : ''}`}
                onClick={() => setCategoriaActiva(c)}
              >
                {c === TODAS ? <FiGrid size={13} /> : <FiTag size={13} />}
                {c}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Estado vacío */}
      {productos.length === 0 && (
        <div className="cat-empty-state">
          <div className="cat-empty-icon"><FiBox size={38} /></div>
          <h2>Tu catálogo está vacío</h2>
          <p>Sube tu primer producto para empezar a armar tu catálogo.</p>
          <button className="prod-btn-primary" onClick={() => navigate('/subir')}>
            <FiPlus size={18} /> Subir producto
          </button>
        </div>
      )}

      {/* Sin resultados de filtro */}
      {productos.length > 0 && filtrados.length === 0 && (
        <div className="cat-empty-state small">
          <div className="cat-empty-icon"><FiSearch size={30} /></div>
          <h2>Sin resultados</h2>
          <p>No hay productos que coincidan con tu búsqueda.</p>
          <button className="prod-btn-ghost" onClick={limpiarFiltros}>
            <FiX size={16} /> Limpiar filtros
          </button>
        </div>
      )}

      {/* Grid */}
      {filtrados.length > 0 && (
        <div className="cat-grid-prod">
          {filtrados.map(p => {
            const tieneVariantes = p.variantes?.length > 0
            const tieneInsumos = p.insumos?.length > 0

            return (
              <article key={p.id} className="prod-card">

                <div className="prod-card-img">
                  {p.imagen ? (
                    <img src={p.imagen} alt={p.nombre} />
                  ) : (
                    <div className="prod-card-placeholder">
                      <FiBox size={30} />
                    </div>
                  )}
                  {p.categoria && (
                    <span className="prod-card-tag">{p.categoria}</span>
                  )}
                </div>

                <div className="prod-card-body">
                  <h3>{p.nombre}</h3>

                  {p.descripcion && (
                    <p className="prod-card-desc">{p.descripcion}</p>
                  )}

                  <div className="prod-card-meta">
                    {p.unidad && <span className="meta-pill">/ {p.unidad}</span>}
                    {tieneVariantes && (
                      <span className="meta-pill soft">{p.variantes.length} variantes</span>
                    )}
                    {tieneInsumos && (
                      <span className="meta-pill soft">{p.insumos.length} insumos</span>
                    )}
                  </div>

                  <div className="prod-card-price">
                    <span className="prod-card-money">${p.precio}</span>
                    {p.costo && (
                      <span className="prod-card-cost">costo ${p.costo}</span>
                    )}
                  </div>
                </div>

                <div className="prod-card-actions">
                  <button
                    type="button"
                    className="prod-icon-btn"
                    onClick={() => navigate(`/cotizaciones?producto=${p.id}`)}
                    title="Crear cotización"
                  >
                    <FiFileText size={16} />
                  </button>
                  <button
                    type="button"
                    className="prod-icon-btn"
                    onClick={() => navigate(`/subir?id=${p.id}`)}
                    title="Editar"
                  >
                    <FiEdit2 size={16} />
                  </button>
                  <button
                    type="button"
                    className="prod-icon-btn danger"
                    onClick={() => setConfirmarId(p.id)}
                    title="Eliminar"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>

              </article>
            )
          })}
        </div>
      )}

      {/* Modal confirmar eliminar */}
      {confirmarId && (
        <div className="prod-modal-overlay" onClick={() => setConfirmarId(null)}>
          <div className="prod-modal" onClick={(e) => e.stopPropagation()}>
            <h3>¿Eliminar producto?</h3>
            <p>Esta acción no se puede deshacer.</p>
            <div className="prod-modal-actions">
              <button
                className="prod-btn-ghost"
                onClick={() => setConfirmarId(null)}
              >
                Cancelar
              </button>
              <button
                className="prod-btn-danger"
                onClick={() => eliminar(confirmarId)}
              >
                <FiTrash2 size={16} /> Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}