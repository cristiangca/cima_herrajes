import { useEffect, useRef, useState } from 'react'

export default function useReveal(threshold = 0.12) {
 const ref = useRef(null)
 const [visible, setVisible] = useState(false)

 useEffect(() => {
 const el = ref.current
 if (!el || visible) return

 if (typeof IntersectionObserver === 'undefined') {
 setVisible(true)
 return
 }

 const io = new IntersectionObserver(
 ([entry]) => {
 if (entry.isIntersecting) {
 setVisible(true)
 io.disconnect()
 }
 },
 { threshold, rootMargin: '0px 0px -60px 0px' }
 )
 io.observe(el)
 return () => io.disconnect()
 }, [threshold, visible])

 return [ref, visible]
}
