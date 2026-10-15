export default function Slide({ id, className = '', children }) {
 return (
 <section id={id} className={`slide ${className}`}>
 <div className="slide-inner">{children}</div>
 </section>
 )
}
