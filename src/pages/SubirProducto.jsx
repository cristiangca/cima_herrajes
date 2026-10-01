import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FiX, FiUploadCloud, FiPlus, FiTrash2, FiCheck,
  FiChevronDown, FiChevronUp, FiTag, FiBox, FiLayers
} from 'react-icons/fi'
import '../styles.css'

const CATEGORIAS = ['Ventanas', 'Puertas', 'Herrajes', 'Perfiles', 'Accesorios', 'Otro']
const UNIDADES = ['pieza', 'm²', 'metro', 'kg', 'juego']

export default function SubirProducto() {
  const navigate = useNavigate()
  const fileRef = useRef(null)

  const [form, setForm] = useState({
    nombre: '',
    categoria: 'Herrajes',
    unidad: 'pieza',
    precio: '',
    costo: '',
    descripcion: '',
    imagen: '',
    variantes: [],
    insumos: []
  })

  const [nuevaVariante, setNuevaVariante] = useState({ nombre: '', precio: '' })
  const [nuevoInsumo, setNuevoInsumo] = useState({ nombre: '', costo: '' })
  const [abrirVariantes, setAbrirVariantes] = useState(false)
  const [abrirInsumos, setAbrirInsumos] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const set = (campo, valor) => setForm(f => ({ ...f, [campo]: valor }))

  const handleImagen = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => set('imagen', reader.result)
    reader.readAsDataURL(file)
  }

  const onDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleImagen(e.dataTransfer.files[0])
  }

  const agregarVariante = () => {
    if (!nuevaVariante.nombre.trim()) return
    set('variantes', [...form.variantes, { ...nuevaVariante, id: Date.now() }])
    setNuevaVariante({ nombre: '', precio: '' })
  }

  const agregarInsumo = () => {
    if (!nuevoInsumo.nombre.trim()) return
    set('insumos', [...form.insumos, { ...nuevoInsumo, id: Date.now() }])
    setNuevoInsumo({ nombre: '', costo: '' })
  }

  const margen = form.precio && form.costo
    ? Math.round(((form.precio - form.costo) / form.precio) * 100)
    : null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.nombre.trim() || !form.precio) {
      alert('Nombre y precio son obligatorios')
      return
    }
    const nuevos = JSON.parse(localStorage.getItem('productos')) || []
    nuevos.push({ ...form, id: Date.now(), creado: new Date().toISOString() })
    localStorage.setItem('productos', JSON.stringify(nuevos))
    navigate('/catalogo')
  }

  return (
    <div className="prod-page">

      <header className="prod-topbar">
        <button className="prod-back" onClick={() => navigate('/catalogo')} aria-label="Cerrar">
          <FiX size={22} />
        </button>
        <h1>Nuevo producto</h1>
        <span className="prod-dot" />
      </header>

      <form className="prod-form" onSubmit={handleSubmit}>

        {/* IMAGEN */}
        <div
          className={`prod-upload ${dragOver ? 'over' : ''} ${form.imagen ? 'has-img' : ''}`}
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
        >
          {form.imagen ? (
            <>
              <img src={form.imagen} alt="preview" />
              <button
                type="button"
                className="prod-upload-remove"
                onClick={(e) => { e.stopPropagation(); set('imagen', '') }}
              >
                <FiTrash2 size={16} />
              </button>
            </>
          ) : (
            <div className="prod-upload-empty">
              <FiUploadCloud size={32} />
              <p><strong>Toca para subir</strong> o arrastra una imagen</p>
              <span>JPG, PNG · máx 2MB</span>
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleImagen(e.target.files[0])}
          />
        </div>

        {/* NOMBRE */}
        <div className="prod-field">
          <label>Nombre del producto *</label>
          <input
            value={form.nombre}
            onChange={(e) => set('nombre', e.target.value)}
            placeholder="Ej: Bisagra hidráulica 4''"
            autoFocus
          />
        </div>

        {/* CATEGORÍA (chips) */}
        <div className="prod-field">
          <label><FiTag size={14} /> Categoría</label>
          <div className="prod-chips">
            {CATEGORIAS.map(c => (
              <button
                key={c}
                type="button"
                className={`chip ${form.categoria === c ? 'active' : ''}`}
                onClick={() => set('categoria', c)}
              >
                {form.categoria === c && <FiCheck size={13} />} {c}
              </button>
            ))}
          </div>
        </div>

        {/* UNIDAD (chips compactos) */}
        <div className="prod-field">
          <label><FiBox size={14} /> Unidad de venta</label>
          <div className="prod-chips small">
            {UNIDADES.map(u => (
              <button
                key={u}
                type="button"
                className={`chip ${form.unidad === u ? 'active' : ''}`}
                onClick={() => set('unidad', u)}
              >
                {u}
              </button>
            ))}
          </div>
        </div>

        {/* PRECIO + COSTO */}
        <div className="prod-row">
          <div className="prod-field">
            <label>Precio venta *</label>
            <div className="prod-money">
              <span>$</span>
              <input
                type="number"
                value={form.precio}
                onChange={(e) => set('precio', e.target.value)}
                placeholder="0"
              />
            </div>
          </div>
          <div className="prod-field">
            <label>Costo</label>
            <div className="prod-money">
              <span>$</span>
              <input
                type="number"
                value={form.costo}
                onChange={(e) => set('costo', e.target.value)}
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {margen !== null && margen > 0 && (
          <div className="prod-margin">
            Margen estimado: <strong>{margen}%</strong>
          </div>
        )}

        {/* DESCRIPCIÓN */}
        <div className="prod-field">
          <label>Descripción <span className="opt">(opcional)</span></label>
          <textarea
            value={form.descripcion}
            onChange={(e) => set('descripcion', e.target.value)}
            rows={3}
            placeholder="Detalles, medidas, material, etc."
          />
        </div>

        {/* VARIANTES (colapsable) */}
        <div className="prod-collapse">
          <button
            type="button"
            className="prod-collapse-head"
            onClick={() => setAbrirVariantes(v => !v)}
          >
            <span><FiLayers size={16} /> Variantes {form.variantes.length > 0 && <em>({form.variantes.length})</em>}</span>
            {abrirVariantes ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
          </button>

          {abrirVariantes && (
            <div className="prod-collapse-body">
              {form.variantes.length > 0 && (
                <ul className="prod-list">
                  {form.variantes.map(v => (
                    <li key={v.id}>
                      <span>{v.nombre} {v.precio && <em>· ${v.precio}</em>}</span>
                      <button
                        type="button"
                        onClick={() => set('variantes', form.variantes.filter(x => x.id !== v.id))}
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <div className="prod-row">
                <input
                  placeholder="Ej: 1.20 x 1.00"
                  value={nuevaVariante.nombre}
                  onChange={(e) => setNuevaVariante({ ...nuevaVariante, nombre: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Precio"
                  value={nuevaVariante.precio}
                  onChange={(e) => setNuevaVariante({ ...nuevaVariante, precio: e.target.value })}
                />
              </div>
              <button type="button" className="prod-add" onClick={agregarVariante}>
                <FiPlus size={15} /> Agregar variante
              </button>
            </div>
          )}
        </div>

        {/* INSUMOS (colapsable) */}
        <div className="prod-collapse">
          <button
            type="button"
            className="prod-collapse-head"
            onClick={() => setAbrirInsumos(v => !v)}
          >
            <span><FiBox size={16} /> Insumos {form.insumos.length > 0 && <em>({form.insumos.length})</em>}</span>
            {abrirInsumos ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
          </button>

          {abrirInsumos && (
            <div className="prod-collapse-body">
              {form.insumos.length > 0 && (
                <ul className="prod-list">
                  {form.insumos.map(i => (
                    <li key={i.id}>
                      <span>{i.nombre} {i.costo && <em>· ${i.costo}</em>}</span>
                      <button
                        type="button"
                        onClick={() => set('insumos', form.insumos.filter(x => x.id !== i.id))}
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <div className="prod-row">
                <input
                  placeholder="Nombre del insumo"
                  value={nuevoInsumo.nombre}
                  onChange={(e) => setNuevoInsumo({ ...nuevoInsumo, nombre: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Costo"
                  value={nuevoInsumo.costo}
                  onChange={(e) => setNuevoInsumo({ ...nuevoInsumo, costo: e.target.value })}
                />
              </div>
              <button type="button" className="prod-add" onClick={agregarInsumo}>
                <FiPlus size={15} /> Agregar insumo
              </button>
            </div>
          )}
        </div>

      </form>

      {/* FOOTER STICKY */}
      <footer className="prod-footer">
        <button type="button" className="prod-btn-ghost" onClick={() => navigate('/catalogo')}>
          Cancelar
        </button>
        <button type="submit" form="" className="prod-btn-primary" onClick={handleSubmit}>
          <FiCheck size={18} /> Guardar producto
        </button>
      </footer>

    </div>
  )
}