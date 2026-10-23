// ServicioActivoContext.jsx
import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { SERVICIO_A_CATEGORIAS } from "../../contenido/servicios/categorias-relacionadas.js";
import { registrarEvento } from '../../utilidades/analytics';

const ServicioActivoContext = createContext({ servicioActivo: null, limpiarServicio: () => {} });

export function ServicioActivoProvider({ children }) {
  const [servicioActivo, setServicioActivo] = useState(null);

  const activarServicio = useCallback((slugServicio, titulo) => {
    registrarEvento('interes_servicio', { seccion: slugServicio });
    const categorias = SERVICIO_A_CATEGORIAS[slugServicio] || [];
    setServicioActivo({ slug: slugServicio, titulo, categorias });
  }, []);

  const limpiarServicio = useCallback(() => setServicioActivo(null), []);

  const value = useMemo(
    () => ({ servicioActivo, activarServicio, limpiarServicio }),
    [servicioActivo, activarServicio, limpiarServicio]
  );

  return (
    <ServicioActivoContext.Provider value={value}>
      {children}
    </ServicioActivoContext.Provider>
  );
}

export const useServicioActivo = () => useContext(ServicioActivoContext);
