import { useEffect, useState } from 'react'

export default function IndicadorScroll() {
 const [progress, setProgress] = useState(0)
 const [completado, setCompletado] = useState(false)

 useEffect(() => {
 let raf = 0

 const update = () => {
 cancelAnimationFrame(raf)
 raf = requestAnimationFrame(() => {
 const max = document.documentElement.scrollHeight - window.innerHeight
 const value = max > 0 ? window.scrollY / max : 0
 setProgress(Math.min(1, Math.max(0, value)))

 const contacto = document.getElementById('contacto')
 if (contacto) {
 const rect = contacto.getBoundingClientRect()
 setCompletado(rect.top <= window.innerHeight * 0.4)
 }
 })
 }

 update()
 window.addEventListener('scroll', update, { passive: true })
 window.addEventListener('resize', update)

 return () => {
 cancelAnimationFrame(raf)
 window.removeEventListener('scroll', update)
 window.removeEventListener('resize', update)
 }
 }, [])

 const sideWidth = `${Math.max(0, (1 - progress) * 50)}%`

 return (
 <div className={`scroll-indicator ${completado ? 'done' : ''}`} aria-hidden="true">
 <span
 className="scroll-indicator-line scroll-indicator-line-left"
 style={{ width: sideWidth }}
 />
 <span className="scroll-indicator-center" />
 <span
 className="scroll-indicator-line scroll-indicator-line-right"
 style={{ width: sideWidth }}
 />
 </div>
 )
}
