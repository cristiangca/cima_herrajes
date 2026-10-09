// ServicioActivoContext.jsx
import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { SERVICIO_A_CATEGORIAS } from './map-servicios-categorias.jsx';

const ServicioActivoContext = createContext(null);

export function ServicioActivoProvider({ children }) {
  const [servicioActivo, setServicioActivo] = useState(null);

  const activarServicio = useCallback((slugServicio) => {
    const categorias = SERVICIO_A_CATEGORIAS[slugServicio] || [];
    setServicioActivo({ slug: slugServicio, categorias });
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