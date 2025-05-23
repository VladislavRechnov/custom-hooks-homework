import { useEffect, useRef, useState } from 'react'

export default function useHover<T extends HTMLElement = HTMLElement>(): [
  ref: React.RefObject<T | null>,
  boolean
] {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const handleMouseEnter = (event: MouseEvent) => {
      if (ref.current && ref.current.contains(event.target as Node)) {
        setIsHovered(true)
      }
    }

    const handleMouseLeave = (event: MouseEvent) => {
      if (ref.current && ref.current.contains(event.target as Node)) {
        setIsHovered(false)
      }
    }

    document.addEventListener('mouseover', handleMouseEnter)
    document.addEventListener('mouseout', handleMouseLeave)

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  })

  return [ref, isHovered]
}
