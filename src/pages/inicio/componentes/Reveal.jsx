import useReveal from '../hooks/useReveal'

export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) {
 const [ref, visible] = useReveal()
 return (
 <Tag
 ref={ref}
 className={`reveal ${visible ? 'in' : ''} ${className}`.trim()}
 style={{ transitionDelay: `${delay}ms` }}
 {...rest}
 >
 {children}
 </Tag>
 )
}
